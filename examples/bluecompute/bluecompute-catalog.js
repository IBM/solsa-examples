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

module.exports = function bcCatalog (appConfig) {
  const app = new solsa.Bundle()

  app.bindingRefarchComposeForElasticsearch_Secret = new solsa.core.v1.Secret({
    metadata: { name: appConfig.getInstanceName('binding-refarch-compose-for-elasticsearch') },
    type: 'Opaque',
    data: {
      binding: 'eyJ1cmkiOiJodHRwOi8vYmx1ZWNvbXB1dGUtY2F0YWxvZy1lbGFzdGljc2VhcmNoOjkyMDAvIn0='
    }
  })

  app.catalogElasticsearch_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: appConfig.getInstanceName('catalog-elasticsearch'),
      labels: appConfig.addCommonLabelsTo({ tier: 'backend', micro: 'catalog', datastore: 'elasticsearch' })
    },
    spec: {
      replicas: 1,
      template: {
        spec: {
          volumes: [{ name: 'storage', hostPath: { path: '/var/lib/elasticsearch-catalog' } }],
          containers: [
            {
              name: 'elasticsearch',
              securityContext: { capabilities: { add: ['IPC_LOCK'] } },
              image: 'quay.io/pires/docker-elasticsearch-kubernetes:1.7.1-4',
              imagePullPolicy: 'Always',
              env: [
                {
                  name: 'KUBERNETES_CA_CERTIFICATE_FILE',
                  value: '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt'
                },
                {
                  name: 'NAMESPACE',
                  valueFrom: { fieldRef: { fieldPath: 'metadata.namespace' } }
                },
                { name: 'CLUSTER_NAME', value: 'catalog' },
                { name: 'DISCOVERY_SERVICE', value: appConfig.getInstanceName('catalog-elasticsearch') },
                { name: 'NODE_MASTER', value: 'true' },
                { name: 'NODE_DATA', value: 'true' },
                { name: 'HTTP_ENABLE', value: 'true' },
                { name: 'ES_JAVA_OPTS', value: '-Xms256m -Xmx256m' }
              ],
              volumeMounts: [{ mountPath: '/data', name: 'storage' }],
              resources: { limits: { memory: '700Mi' }, requests: { memory: '350Mi' } },
              ports: [
                { containerPort: 9200, name: 'http', protocol: 'TCP' },
                { containerPort: 9300, name: 'transport', protocol: 'TCP' }
              ]
            }
          ]
        }
      }
    }
  })
  app.catalogElasticsearch_Deployment.propogateLabels()
  app.catalogElasticsearch_Service = app.catalogElasticsearch_Deployment.getService()

  app.catalogConfig_ConfigMap = new solsa.core.v1.ConfigMap({
    metadata: { name: appConfig.getInstanceName('catalog-config') },
    data: {
      'jvm.options': '\n' +
        '-Dclient.InventoryServiceClient/mp-rest/url=http://bluecompute-inventory:9080/inventory/rest/inventory\n'
    }
  })

  app.catalog_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: appConfig.getInstanceName('catalog'),
      labels: appConfig.addCommonLabelsTo({ tier: 'backend', micro: 'catalog' })
    },
    spec: {
      replicas: 1,
      template: {
        spec: {
          volumes: [{ name: 'config-volume', configMap: { name: 'bluecompute-catalog-config' } }],
          containers: [
            {
              name: 'catalog',
              image: 'ibmcase/catalog-mp:v3.0.0',
              imagePullPolicy: 'IfNotPresent',
              ports: [{ name: 'http', containerPort: 9080 }, { name: 'https', containerPort: 9443 }],
              readinessProbe: {
                httpGet: { path: '/health', port: 9080 },
                initialDelaySeconds: 60,
                periodSeconds: 20,
                timeoutSeconds: 60,
                failureThreshold: 6
              },
              livenessProbe: {
                httpGet: { path: '/', port: 9080 },
                initialDelaySeconds: 60,
                periodSeconds: 10,
                timeoutSeconds: 60,
                failureThreshold: 6
              },
              resources: { requests: { cpu: '200m', memory: '300Mi' } },
              env: [
                {
                  name: 'inventory_health',
                  value: 'http://bluecompute-inventory:9080/health'
                },
                {
                  name: 'elasticsearch_url',
                  value: 'http://bluecompute-catalog-elasticsearch:9200'
                },
                { name: 'zipkinHost', value: 'bluecompute-zipkin' },
                { name: 'zipkinPort', value: '9411' },
                { name: 'PORT', value: '9080' },
                { name: 'APPLICATION_NAME', value: 'bluecompute' },
                {
                  name: 'IBM_APM_SERVER_URL',
                  valueFrom: {
                    secretKeyRef: { name: 'apm-server-config', key: 'ibm_apm_server_url', optional: true }
                  }
                },
                {
                  name: 'IBM_APM_KEYFILE',
                  valueFrom: {
                    secretKeyRef: { name: 'apm-server-config', key: 'ibm_apm_keyfile', optional: true }
                  }
                },
                {
                  name: 'IBM_APM_KEYFILE_PASSWORD',
                  valueFrom: {
                    secretKeyRef: {
                      name: 'apm-server-config',
                      key: 'ibm_apm_keyfile_password',
                      optional: true
                    }
                  }
                },
                {
                  name: 'IBM_APM_INGRESS_URL',
                  valueFrom: {
                    secretKeyRef: { name: 'apm-server-config', key: 'ibm_apm_ingress_url', optional: true }
                  }
                },
                {
                  name: 'IBM_APM_ACCESS_TOKEN',
                  valueFrom: {
                    secretKeyRef: {
                      name: 'apm-server-config',
                      key: 'ibm_apm_access_token',
                      optional: true
                    }
                  }
                }
              ],
              volumeMounts: [{ name: 'config-volume', mountPath: '/opt/ibm/wlp/usr/shared' }]
            }
          ]
        }
      }
    }
  })
  app.catalog_Deployment.propogateLabels()
  app.catalog_Service = app.catalog_Deployment.getService()

  return app
}
