/* eslint-disable no-template-curly-in-string */
const solsa = require('solsa')

module.exports = function bcCustomer () {
  const app = new solsa.Bundle()

  app.bluecomputeCustomerConfig_ConfigMap = new solsa.core.v1.ConfigMap({
    metadata: { name: 'bluecompute-customer-config' },
    data: {
      'jvm.options': '-Dapplication.rest.client.CloudantClientService/mp-rest/url=http://bluecompute-cloudant-service:80\n'
    }
  })

  app.bluecomputeCustomer_Service = new solsa.core.v1.Service({
    metadata: {
      name: 'bluecompute-customer',
      labels: {
        chart: 'bluecompute-customer-0.0.1',
        release: 'bluecompute',
        implementation: 'microprofile'
      }
    },
    spec: {
      type: 'NodePort',
      ports: [ { name: 'http', port: 9080 }, { name: 'https', port: 9443 } ],
      selector: {
        app: 'bluecompute',
        micro: 'customer',
        service: 'server',
        release: 'bluecompute',
        implementation: 'microprofile'
      }
    }
  })
  app.bluecomputeCloudantService = new solsa.core.v1.Service({
    metadata: {
      name: 'bluecompute-cloudant-service',
      labels: { chart: 'customer-0.0.1', release: 'bluecompute', implementation: 'microprofile' }
    },
    spec: {
      type: 'NodePort',
      ports: [ { port: 80, nodePort: 31222 } ],
      selector: {
        micro: 'customer',
        service: 'cloudant-db',
        release: 'bluecompute',
        implementation: 'microprofile'
      }
    }
  })

  app.bluecomputeCustomer_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: 'bluecompute-customer',
      labels: {
        app: 'bluecompute',
        micro: 'customer',
        service: 'server',
        tier: 'backend',
        release: 'bluecompute',
        implementation: 'microprofile',
        chart: 'customer-0.0.1'
      }
    },
    spec: {
      replicas: 1,
      template: {
        metadata: {
          labels: {
            app: 'bluecompute',
            micro: 'customer',
            service: 'server',
            tier: 'backend',
            release: 'bluecompute',
            implementation: 'microprofile'
          }
        },
        spec: {
          containers: [
            {
              name: 'customer',
              image: 'ibmcase/customer-mp:v4.0.0',
              imagePullPolicy: 'IfNotPresent',
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
                { name: 'host', value: 'bluecompute-cloudant-service' },
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

  app.bluecomputeCloudant_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: 'bluecompute-cloudant',
      labels: {
        app: 'bluecompute',
        micro: 'customer',
        service: 'cloudant-db',
        tier: 'backend',
        release: 'bluecompute',
        implementation: 'microprofile',
        chart: 'customer-0.0.1'
      }
    },
    spec: {
      replicas: 1,
      template: {
        metadata: {
          labels: {
            app: 'bluecompute',
            micro: 'customer',
            service: 'cloudant-db',
            tier: 'backend',
            release: 'bluecompute',
            implementation: 'microprofile'
          }
        },
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
              args: [ 'bluecompute-cloudant-service', '80' ]
            }
          ],
          restartPolicy: 'Never'
        }
      }
    }
  })

  return app
}
