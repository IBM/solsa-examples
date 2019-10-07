/*
 * Copyright 2019 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-template-curly-in-string */
// @ts-check

const solsa = require('solsa')

module.exports = function bcCustomer (appConfig) {
  const app = new solsa.Bundle()

  // Cloudant database used by catalog microservice
  app.cloudantBinding_Secret = new solsa.core.v1.Secret({
    metadata: {
      name: appConfig.getInstanceName('cloudant-secret'),
      labels: appConfig.addCommonLabelsTo({ micro: 'customer', tier: 'backend' })
    },
    type: 'Opaque',
    data: { 'password': solsa.base64Encode(appConfig.values.cloudant.rootPassword) }
  })
  app.cloudant_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: appConfig.getInstanceName('cloudant'),
      labels: appConfig.addCommonLabelsTo({ micro: 'customer', service: 'cloudant-db', tier: 'backend' })
    },
    spec: {
      replicas: appConfig.values.cloudant.replicaCount,
      template: {
        spec: {
          containers: [
            {
              name: 'cloudant',
              image: `${appConfig.values.cloudant.image.repository}:${appConfig.values.cloudant.image.tag}`,
              ports: [ { containerPort: appConfig.values.cloudant.ports.port } ],
              env: [{
                name: 'CLOUDANT_ROOT_PASSWORD',
                valueFrom: { secretKeyRef: { name: app.cloudantBinding_Secret.metadata.name, key: 'password' } }
              }
              ]
            }
          ]
        }
      }
    }
  })
  app.cloudant_Deployment.propogateLabels()
  app.cloudantService = app.cloudant_Deployment.getService()

  app.populateCloudant_Job = new solsa.batch.v1.Job({
    metadata: {
      name: appConfig.getInstanceName('populate-cloudant'),
      labels: appConfig.addCommonLabelsTo({ micro: 'customer', tier: 'backend' })
    },
    spec: {
      template: {
        spec: {
          initContainers: [
            {
              name: 'wait-for-cloudant',
              image: 'busybox',
              env: [{ name: 'READINESS_URL', value: `http://${app.cloudantService.metadata.name}:${appConfig.values.cloudant.ports.port}` }],
              command: ['sh', '-c', 'while true; do echo "checking cloudant readiness"; wget -q -O - $READINESS_URL | grep Welcome; result=$?; if [ $result -eq 0 ]; then echo "Success: Cloudant is ready!"; break; fi; echo "...not ready yet; sleeping 3 seconds before retry"; sleep 3; done;']
            }
          ],
          containers: [
            {
              name: 'populate-db',
              image: `${appConfig.values.customer.cloudantInitJob.image.repository}:${appConfig.values.customer.cloudantInitJob.image.tag}`,
              args: [ app.cloudantService.metadata.name, `${appConfig.values.cloudant.ports.port}` ]
            }
          ],
          restartPolicy: 'Never'
        }
      }
    }
  })

  const cloudantHostAndPort = `${app.cloudantService.metadata.name}:${appConfig.values.cloudant.ports.port}`
  app.customer_ConfigMap = new solsa.core.v1.ConfigMap({
    metadata: {
      name: appConfig.getInstanceName('customer-config'),
      labels: appConfig.addCommonLabelsTo({ tier: 'backend', micro: 'customer' })
    },
    data: {
      'jvm.options': `-Dapplication.rest.client.CloudantClientService/mp-rest/url=http://${cloudantHostAndPort}\n`
    }
  })

  const authHostAndPort = `${appConfig.getInstanceName('auth')}:${appConfig.values.auth.ports.https}`
  app.customer_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: appConfig.getInstanceName('customer'),
      labels: appConfig.addCommonLabelsTo({ micro: 'customer', service: 'server', tier: 'backend' })
    },
    spec: {
      replicas: appConfig.values.customer.replicaCount,
      template: {
        spec: {
          volumes: [
            { name: 'keystorevol', secret: { secretName: 'keystoresecret' } },
            { name: 'config-volume', configMap: { name: app.customer_ConfigMap.metadata.name } }
          ],
          containers: [
            {
              name: 'customer',
              image: `${appConfig.values.customer.image.repository}:${appConfig.values.customer.image.tag}`,
              ports: [
                { name: 'http', containerPort: appConfig.values.customer.ports.http },
                { name: 'https', containerPort: appConfig.values.customer.ports.https }
              ],
              readinessProbe: {
                httpGet: { path: '/', port: appConfig.values.customer.ports.https, scheme: 'HTTPS' },
                initialDelaySeconds: 60,
                timeoutSeconds: 60
              },
              livenessProbe: {
                httpGet: { path: '/health', port: appConfig.values.customer.ports.https, scheme: 'HTTPS' },
                initialDelaySeconds: 1500,
                timeoutSeconds: 500
              },
              env: [
                { name: 'jwksUri', value: `https://${authHostAndPort}/oidc/endpoint/OP/jwk` },
                { name: 'jwksIssuer', value: `https://${authHostAndPort}/oidc/endpoint/OP` },
                { name: 'administratorRealm', value: `user:https://${authHostAndPort}/oidc/endpoint/OP/user` },
                { name: 'auth_health', value: `https://${authHostAndPort}/health` },
                { name: 'host', value: `${app.cloudantService.metadata.name}` },
                { name: 'PORT', value: `${appConfig.values.customer.ports.http}` },
                { name: 'RELEASE_NAME', value: appConfig.appName },
                { name: 'jwtid', value: appConfig.values.customer.jwt.id },
                { name: 'zipkinHost', value: appConfig.getInstanceName('zipkin') },
                { name: 'zipkinPort', value: `${appConfig.values.zipkin.ports.zipkin}` }
              ],
              resources: appConfig.values.customer.resources,
              volumeMounts: [
                { name: 'keystorevol', mountPath: '/etc/keystorevol', readOnly: true },
                { name: 'config-volume', mountPath: appConfig.values.customer.volumes.mountPath }
              ]
            }
          ]
        }
      }
    }
  })
  app.customer_Deployment.propogateLabels()
  app.customer_Service = app.customer_Deployment.getService()

  return app
}
