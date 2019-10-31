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

  app.elasticsearchBinding_Secret = new solsa.core.v1.Secret({
    metadata: {
      name: appConfig.getInstanceName('elasticsearch-binding'),
      labels: appConfig.addCommonLabelsTo({ micro: 'catalog', tier: 'backend' })
    },
    type: 'Opaque',
    data: {
      binding: solsa.base64Encode(`http://${appConfig.getInstanceName('catalog-elasticsearch')}:${appConfig.values.elasticsearch.ports.http}/`)
    }
  })

  app.catalogElasticsearch_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: appConfig.getInstanceName('catalog-elasticsearch'),
      labels: appConfig.addCommonLabelsTo({ tier: 'backend', micro: 'catalog', datastore: 'elasticsearch' })
    },
    spec: {
      replicas: appConfig.values.elasticsearch.replicaCount,
      template: {
        spec: {
          volumes: [{ name: 'storage', emptyDir: {} }],
          containers: [
            {
              name: 'elasticsearch',
              image: `${appConfig.values.elasticsearch.image.repository}:${appConfig.values.elasticsearch.image.tag}`,
              securityContext: { capabilities: { add: ['IPC_LOCK'] } },
              ports: [
                { name: 'http', containerPort: appConfig.values.elasticsearch.ports.http, protocol: 'TCP' },
                { name: 'transport', containerPort: appConfig.values.elasticsearch.ports.transport, protocol: 'TCP' }
              ],
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
              resources: appConfig.values.elasticsearch.resources
            }
          ]
        }
      }
    }
  })
  app.catalogElasticsearch_Deployment.propogateLabels()
  app.catalogElasticsearch_Service = app.catalogElasticsearch_Deployment.getService()

  const invHostAndPort = `${appConfig.getInstanceName('inventory')}:${appConfig.values.inventory.ports.http}`
  app.catalog_ConfigMap = new solsa.core.v1.ConfigMap({
    metadata: {
      name: appConfig.getInstanceName('catalog-config'),
      labels: appConfig.addCommonLabelsTo({ micro: 'catalog', tier: 'backend' })
    },
    data: {
      'jvm.options': '\n' +
        `-Dclient.InventoryServiceClient/mp-rest/url=http://${invHostAndPort}/inventory/rest/inventory\n`
    }
  })

  app.catalog_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: appConfig.getInstanceName('catalog'),
      labels: appConfig.addCommonLabelsTo({ tier: 'backend', micro: 'catalog' })
    },
    spec: {
      replicas: appConfig.values.catalog.replicaCount,
      template: {
        spec: {
          volumes: [{ name: 'config-volume', configMap: { name: app.catalog_ConfigMap.metadata.name } }],
          containers: [
            {
              name: 'catalog',
              image: `${appConfig.values.catalog.image.repository}:${appConfig.values.catalog.image.tag}`,
              ports: [
                { name: 'http', containerPort: appConfig.values.catalog.ports.http },
                { name: 'https', containerPort: appConfig.values.catalog.ports.https }
              ],
              readinessProbe: {
                httpGet: { path: '/health', port: appConfig.values.catalog.ports.http },
                initialDelaySeconds: 60,
                periodSeconds: 20,
                timeoutSeconds: 60,
                failureThreshold: 6
              },
              livenessProbe: {
                httpGet: { path: '/', port: appConfig.values.catalog.ports.http },
                initialDelaySeconds: 60,
                periodSeconds: 10,
                timeoutSeconds: 60,
                failureThreshold: 6
              },
              resources: appConfig.values.catalog.resources,
              env: [
                { name: 'inventory_health', value: `http://${invHostAndPort}/health` },
                {
                  name: 'elasticsearch_url',
                  valueFrom: {
                    secretKeyRef: { name: app.elasticsearchBinding_Secret.metadata.name, key: 'binding' }
                  }
                },
                { name: 'zipkinHost', value: `${appConfig.getInstanceName('zipkin')}` },
                { name: 'zipkinPort', value: `${appConfig.values.zipkin.ports.zipkin}` },
                { name: 'PORT', value: `${appConfig.values.catalog.ports.http}` },
                { name: 'APPLICATION_NAME', value: `${appConfig.appName}` },
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
              volumeMounts: [{ name: 'config-volume', mountPath: appConfig.values.catalog.volumes.mountPath }]
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
