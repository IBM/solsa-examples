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

module.exports = function bcAuth () {
  const app = new solsa.Bundle()

  app.bluecomputeAuth_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: 'bluecompute-auth',
      labels: {
        implementation: 'microprofile',
        tier: 'backend',
        version: 'v1'
      }
    },
    spec: {
      replicas: 1,
      template: {
        spec: {
          containers: [
            {
              name: 'auth',
              image: 'ibmcase/auth-mp:v3.0.0',
              imagePullPolicy: 'Always',
              ports: [ { name: 'http', containerPort: 9080 }, { name: 'https', containerPort: 9443 } ],
              readinessProbe: {
                httpGet: { path: '/', port: 9443, scheme: 'HTTPS' },
                initialDelaySeconds: 60,
                timeoutSeconds: 60
              },
              livenessProbe: {
                httpGet: { path: '/health', port: 9443, scheme: 'HTTPS' },
                initialDelaySeconds: 60,
                timeoutSeconds: 60
              },
              resources: { requests: { cpu: '200m', memory: '300Mi' } },
              env: [
                { name: 'PORT', value: '9080' },
                { name: 'APPLICATION_NAME', value: 'bluecompute' }
              ],
              volumeMounts: [ { name: 'keystorevol', mountPath: '/etc/keystorevol', readOnly: true } ]
            }
          ],
          volumes: [ { name: 'keystorevol', secret: { secretName: 'keystoresecret' } } ]
        }
      }
    }
  })
  app.bluecomputeAuth_Deployment.propogateLabels()
  app.bluecomputeAuth_Service = app.bluecomputeAuth_Deployment.getService()

  return app
}
