/* eslint-disable no-template-curly-in-string */
const solsa = require('solsa')

module.exports = function bcCatalog () {
  const app = new solsa.Bundle()

  app.bluecomputeBindingRefarchComposeForElasticsearch_Secret = new solsa.core.v1.Secret({
    metadata: {
      name: 'bluecompute-binding-refarch-compose-for-elasticsearch',
      namespace: 'bluecompute',
      labels: {
        datastore: 'elasticsearch',
        release: 'bluecompute',
        chart: 'bluecompute-ibmcase-elasticsearch-0.0.1'
      }
    },
    type: 'Opaque',
    data: {
      binding: 'eyJ1cmkiOiJodHRwOi8vYmx1ZWNvbXB1dGUtY2F0YWxvZy1lbGFzdGljc2VhcmNoOjkyMDAvIn0='
    }
  })

  app.bluecomputeCatalogElasticsearch_Service = new solsa.core.v1.Service({
    metadata: {
      name: 'bluecompute-catalog-elasticsearch',
      labels: {
        datastore: 'elasticsearch',
        release: 'bluecompute',
        chart: 'ibmcase-elasticsearch-0.0.1'
      }
    },
    spec: {
      ports: [
        { name: 'http', port: 9200, protocol: 'TCP' },
        { name: 'transport', port: 9300, protocol: 'TCP' }
      ],
      selector: { datastore: 'elasticsearch' }
    }
  })

  app.bluecomputeCatalogElasticsearch_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: 'bluecompute-catalog-elasticsearch',
      namespace: 'bluecompute',
      labels: {
        datastore: 'elasticsearch',
        release: 'bluecompute',
        chart: 'ibmcase-elasticsearch-0.0.1'
      }
    },
    spec: {
      replicas: 1,
      template: {
        metadata: { labels: { datastore: 'elasticsearch' } },
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
                { name: 'DISCOVERY_SERVICE', value: 'bluecompute-catalog-elasticsearch' },
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

  app.bluecomputeCatalogConfig_ConfigMap = new solsa.core.v1.ConfigMap({
    metadata: { name: 'bluecompute-catalog-config' },
    data: {
      'jvm.options': '\n' +
        '-Dclient.InventoryServiceClient/mp-rest/url=http://bluecompute-inventory:9080/inventory/rest/inventory\n'
    }
  })

  app.bluecomputeCatalog_Service = new solsa.core.v1.Service({
    metadata: {
      annotations: { bluecompute: 'true' },
      name: 'bluecompute-catalog',
      labels: {
        'app.kubernetes.io/name': 'bluecompute-catalog',
        'app.kubernetes.io/managed-by': 'Tiller',
        'app.kubernetes.io/instance': 'bluecompute',
        heritage: 'Tiller',
        release: 'bluecompute',
        chart: 'catalog-0.1.0'
      }
    },
    spec: {
      type: 'NodePort',
      ports: [{ name: 'http', port: 9080 }, { name: 'https', port: 9443 }],
      selector: {
        'app.kubernetes.io/name': 'bluecompute-catalog',
        'app.kubernetes.io/managed-by': 'Tiller',
        'app.kubernetes.io/instance': 'bluecompute',
        heritage: 'Tiller',
        release: 'bluecompute',
        'helm.sh/chart': 'catalog-0.1.0',
        chart: 'catalog-0.1.0'
      }
    }
  })

  app.bluecomputeCatalog_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: 'bluecompute-catalog',
      labels: {
        'app.kubernetes.io/name': 'bluecompute-catalog',
        'app.kubernetes.io/managed-by': 'Tiller',
        'app.kubernetes.io/instance': 'bluecompute',
        heritage: 'Tiller',
        release: 'bluecompute',
        chart: 'catalog-0.1.0'
      }
    },
    spec: {
      replicas: 1,
      revisionHistoryLimit: 1,
      template: {
        metadata: {
          labels: {
            'app.kubernetes.io/name': 'bluecompute-catalog',
            'app.kubernetes.io/managed-by': 'Tiller',
            'app.kubernetes.io/instance': 'bluecompute',
            heritage: 'Tiller',
            release: 'bluecompute',
            'helm.sh/chart': 'catalog-0.1.0',
            chart: 'catalog-0.1.0'
          }
        },
        spec: {
          containers: [
            {
              name: 'catalog',
              image: 'ibmcase/catalog-mp:v3.0.0',
              imagePullPolicy: 'IfNotPresent',
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
          ],
          volumes: [{ name: 'config-volume', configMap: { name: 'bluecompute-catalog-config' } }]
        }
      }
    }
  })
  return app
}
