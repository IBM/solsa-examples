/* eslint-disable no-template-curly-in-string */
const solsa = require('solsa')

module.exports = function bcCustomer () {
  const app = new solsa.Bundle()

  app.bluecomputeCustomer_Service = new solsa.core.v1.Service({
    metadata: {
      name: 'bluecompute-customer',
      labels: {
        app: 'customer',
        implementation: 'microprofile',
        tier: 'backend',
        version: 'v1',
        'app.kubernetes.io/name': 'bluecompute-customer',
        'app.kubernetes.io/managed-by': 'Tiller',
        'app.kubernetes.io/instance': 'bluecompute',
        heritage: 'Tiller',
        release: 'bluecompute',
        chart: 'customer-0.1.0'
      }
    },
    spec: {
      type: 'NodePort',
      ports: [ { name: 'http', port: 9080 }, { name: 'https', port: 9443 } ],
      selector: {
        app: 'customer',
        implementation: 'microprofile',
        tier: 'backend',
        version: 'v1',
        'app.kubernetes.io/name': 'bluecompute-customer',
        'helm.sh/chart': 'customer-0.1.0',
        'app.kubernetes.io/managed-by': 'Tiller',
        'app.kubernetes.io/instance': 'bluecompute',
        heritage: 'Tiller',
        release: 'bluecompute',
        chart: 'customer-0.1.0'
      }
    }
  })

  app.bluecomputeCustomer_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: 'bluecompute-customer',
      labels: {
        app: 'customer',
        implementation: 'microprofile',
        tier: 'backend',
        version: 'v1',
        'app.kubernetes.io/name': 'bluecompute-customer',
        'app.kubernetes.io/managed-by': 'Tiller',
        'app.kubernetes.io/instance': 'bluecompute',
        heritage: 'Tiller',
        release: 'bluecompute',
        chart: 'customer-0.1.0'
      }
    },
    spec: {
      replicas: 1,
      template: {
        metadata: {
          labels: {
            app: 'customer',
            implementation: 'microprofile',
            tier: 'backend',
            version: 'v1',
            'app.kubernetes.io/name': 'bluecompute-customer',
            'helm.sh/chart': 'customer-0.1.0',
            'app.kubernetes.io/managed-by': 'Tiller',
            'app.kubernetes.io/instance': 'bluecompute',
            heritage: 'Tiller',
            release: 'bluecompute',
            chart: 'customer-0.1.0'
          }
        },
        spec: {
          containers: [
            {
              name: 'customer',
              image: 'customer:latest',
              imagePullPolicy: 'IfNotPresent',
              readinessProbe: {
                httpGet: { path: '/health', port: 9443, scheme: 'HTTPS' },
                initialDelaySeconds: 60,
                periodSeconds: 20,
                failureThreshold: 6
              },
              livenessProbe: {
                httpGet: { path: '/', port: 9443, scheme: 'HTTPS' },
                initialDelaySeconds: 60,
                periodSeconds: 10,
                failureThreshold: 6
              },
              env: [
                { name: 'jwksUri', value: 'https://auth-auth:9443/oidc/endpoint/OP/jwk' },
                { name: 'jwksIssuer', value: 'https://auth-auth:9443/oidc/endpoint/OP' },
                {
                  name: 'administratorRealm',
                  value: 'user:https://auth-auth:9443/oidc/endpoint/OP/user'
                },
                { name: 'auth_health', value: 'https://auth-auth:9443/health' },
                { name: 'host', value: 'customer-svc-couchdb' },
                { name: 'PORT', value: '9080' },
                { name: 'RELEASE_NAME', value: 'bluecompute' },
                { name: 'jwtid', value: 'myMpJwt' },
                { name: 'zipkinHost', value: 'bluecompute-zipkin' },
                { name: 'zipkinPort', value: '9411' }
              ],
              resources: { requests: { memory: '64Mi' } },
              volumeMounts: [ { name: 'keystorevol', mountPath: '/etc/keystorevol', readOnly: true } ]
            }
          ],
          volumes: [ { name: 'keystorevol', secret: { secretName: 'keystoresecret' } } ]
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
              name: 'populate',
              image: 'populate',
              imagePullPolicy: 'IfNotPresent',
              command: [ '/bin/sh', '-c', 'python3 /tmp/populate.py  customer-svc-couchdb 5984' ]
            }
          ],
          restartPolicy: 'Never'
        }
      }
    }
  })
  return app
}
