/* eslint-disable no-template-curly-in-string */
const solsa = require('solsa')

module.exports = function bcAuth () {
  const app = new solsa.Bundle()

  app.bluecomputeAuth_Service = new solsa.core.v1.Service({
    metadata: {
      name: 'bluecompute-auth',
      labels: {
        app: 'auth',
        implementation: 'microprofile',
        tier: 'backend',
        version: 'v1',
        'app.kubernetes.io/name': 'bluecompute-auth',
        'app.kubernetes.io/managed-by': 'Tiller',
        'app.kubernetes.io/instance': 'bluecompute',
        heritage: 'Tiller',
        release: 'bluecompute',
        chart: 'auth-0.1.0'
      }
    },
    spec: {
      type: 'ClusterIP',
      ports: [ { name: 'http', port: 9080 }, { name: 'https', port: 9443 } ],
      selector: {
        app: 'auth',
        implementation: 'microprofile',
        tier: 'backend',
        version: 'v1',
        'app.kubernetes.io/name': 'bluecompute-auth',
        'helm.sh/chart': 'auth-0.1.0',
        'app.kubernetes.io/managed-by': 'Tiller',
        'app.kubernetes.io/instance': 'bluecompute',
        heritage: 'Tiller',
        release: 'bluecompute',
        chart: 'auth-0.1.0'
      }
    }
  })

  app.bluecomputeAuth_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: 'bluecompute-auth',
      labels: {
        app: 'auth',
        implementation: 'microprofile',
        tier: 'backend',
        version: 'v1',
        'app.kubernetes.io/name': 'bluecompute-auth',
        'app.kubernetes.io/managed-by': 'Tiller',
        'app.kubernetes.io/instance': 'bluecompute',
        heritage: 'Tiller',
        release: 'bluecompute',
        chart: 'auth-0.1.0'
      }
    },
    spec: {
      replicas: 1,
      template: {
        metadata: {
          labels: {
            app: 'auth',
            implementation: 'microprofile',
            tier: 'backend',
            version: 'v1',
            'app.kubernetes.io/name': 'bluecompute-auth',
            'helm.sh/chart': 'auth-0.1.0',
            'app.kubernetes.io/managed-by': 'Tiller',
            'app.kubernetes.io/instance': 'bluecompute',
            heritage: 'Tiller',
            release: 'bluecompute',
            chart: 'auth-0.1.0'
          }
        },
        spec: {
          containers: [
            {
              name: 'auth',
              image: 'ibmcase/auth-mp:v3.0.0',
              imagePullPolicy: 'Always',
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
  return app
}
