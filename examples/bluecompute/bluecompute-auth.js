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

module.exports = function bcAuth (appConfig) {
  let authDeployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: appConfig.getInstanceName('auth'),
      labels: appConfig.addCommonLabelsTo({ micro: 'auth', tier: 'backend' })
    },
    spec: {
      replicas: appConfig.values.auth.replicaCount,
      template: {
        spec: {
          volumes: [ { name: 'keystorevol', secret: { secretName: 'keystoresecret' } } ],
          containers: [
            {
              name: 'auth',
              image: `${appConfig.values.auth.image.repository}:${appConfig.values.auth.image.tag}`,
              ports: [
                { name: 'http', containerPort: appConfig.values.auth.ports.http },
                { name: 'https', containerPort: appConfig.values.auth.ports.https }
              ],
              readinessProbe: {
                httpGet: { path: '/', port: appConfig.values.auth.ports.https, scheme: 'HTTPS' },
                initialDelaySeconds: 60,
                timeoutSeconds: 60
              },
              livenessProbe: {
                httpGet: { path: '/health', port: appConfig.values.auth.ports.https, scheme: 'HTTPS' },
                initialDelaySeconds: 60,
                timeoutSeconds: 60
              },
              resources: appConfig.values.auth.resources,
              env: [
                { name: 'PORT', value: `${appConfig.values.auth.ports.http}` },
                { name: 'APPLICATION_NAME', value: appConfig.appName }
              ],
              volumeMounts: [ { name: 'keystorevol', mountPath: '/etc/keystorevol', readOnly: true } ]
            }
          ]
        }
      }
    }
  })
  authDeployment.propogateLabels()
  let authService = authDeployment.getService()

  return new solsa.Bundle({ authDeployment, authService })
}
