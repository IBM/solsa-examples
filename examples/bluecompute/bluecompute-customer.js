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

module.exports = function bcCustomer () {
  const app = new solsa.Bundle()

  app.bluecomputeCustomerConfig_ConfigMap = new solsa.core.v1.ConfigMap({
    metadata: { name: 'bluecompute-customer-config' },
    data: {
      'jvm.options': '-Dapplication.rest.client.CloudantClientService/mp-rest/url=http://bluecompute-cloudant:80\n'
    }
  })

  app.bluecomputeCustomer_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: 'bluecompute-customer',
      labels: {
        micro: 'customer',
        service: 'server',
        tier: 'backend'
      }
    },
    spec: {
      replicas: 1,
      template: {
        spec: {
          containers: [
            {
              name: 'customer',
              image: 'ibmcase/customer-mp:v4.0.0',
              imagePullPolicy: 'IfNotPresent',
              ports: [ { name: 'http', containerPort: 9080 }, { name: 'https', containerPort: 9443 } ],
              readinessProbe: {
                httpGet: { path: '/', port: 9443, scheme: 'HTTPS' },
                initialDelaySeconds: 60,
                timeoutSeconds: 60
              },
              livenessProbe: {
                httpGet: { path: '/health', port: 9443, scheme: 'HTTPS' },
                initialDelaySeconds: 1500,
                timeoutSeconds: 500
              },
              env: [
                {
                  name: 'jwksUri',
                  value: 'https://bluecompute-auth:9443/oidc/endpoint/OP/jwk'
                },
                {
                  name: 'jwksIssuer',
                  value: 'https://bluecompute-auth:9443/oidc/endpoint/OP'
                },
                {
                  name: 'administratorRealm',
                  value: 'user:https://bluecompute-auth:9443/oidc/endpoint/OP/user'
                },
                { name: 'auth_health', value: 'https://bluecompute-auth:9443/health' },
                { name: 'host', value: 'bluecompute-cloudant' },
                { name: 'PORT', value: '9080' },
                { name: 'RELEASE_NAME', value: 'bluecompute' },
                { name: 'jwtid', value: 'myMpJwt' },
                { name: 'zipkinHost', value: 'bluecompute-zipkin' },
                { name: 'zipkinPort', value: '9411' }
              ],
              resources: { requests: { cpu: '200m', memory: '300Mi' } },
              volumeMounts: [
                { name: 'keystorevol', mountPath: '/etc/keystorevol', readOnly: true },
                { name: 'config-volume', mountPath: '/opt/ibm/wlp/usr/shared' }
              ]
            }
          ],
          volumes: [
            { name: 'keystorevol', secret: { secretName: 'keystoresecret' } },
            { name: 'config-volume', configMap: { name: 'bluecompute-customer-config' } }
          ]
        }
      }
    }
  })
  app.bluecomputeCustomer_Service = app.bluecomputeCustomer_Deployment.getService()

  app.bluecomputeCloudant_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: 'bluecompute-cloudant',
      labels: {
        micro: 'customer',
        service: 'cloudant-db',
        tier: 'backend'
      }
    },
    spec: {
      replicas: 1,
      template: {
        spec: {
          containers: [
            {
              name: 'cloudant',
              image: 'ibmcom/cloudant-developer',
              imagePullPolicy: 'Always',
              ports: [ { containerPort: 80 } ],
              env: [ { name: 'CLOUDANT_ROOT_PASSWORD', value: 'pass' } ]
            }
          ]
        }
      }
    }
  })
  app.bluecomputeCloudantService = app.bluecomputeCloudant_Deployment.getService()

  app.bluecomputePopulate_Job = new solsa.batch.v1.Job({
    metadata: { name: 'bluecompute-populate' },
    spec: {
      template: {
        spec: {
          containers: [
            {
              name: 'populate-db',
              image: 'ibmcase/populate',
              imagePullPolicy: 'IfNotPresent',
              args: [ 'bluecompute-cloudant', '80' ]
            }
          ],
          restartPolicy: 'Never'
        }
      }
    }
  })

  return app
}
