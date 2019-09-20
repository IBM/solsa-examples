/* eslint-disable no-template-curly-in-string */
const solsa = require('solsa')

module.exports = function bcConfig () {
  const app = new solsa.Bundle()

  app.bluecomputePrometheus_ClusterRole = new solsa.rbac.v1beta1.ClusterRole({
    metadata: {
      labels: {
        app: 'bluecompute-prometheus',
        chart: 'ibm-icpmonitoring-1.1.0',
        component: 'prometheus',
        release: 'bluecompute',
        heritage: 'Tiller'
      },
      name: 'bluecompute-prometheus',
      namespace: 'bluecompute'
    },
    rules: [
      {
        apiGroups: [ '' ],
        resources: [ 'nodes', 'nodes/proxy', 'services', 'endpoints', 'pods' ],
        verbs: [ 'get', 'list', 'watch' ]
      },
      { nonResourceURLs: [ '/metrics' ], verbs: [ 'get' ] }
    ]
  })

  app.bluecomputeClusterRole = new solsa.rbac.v1beta1.ClusterRole({
    metadata: {
      name: 'bluecompute-cluster-role',
      labels: {
        chart: 'bluecompute-bluecompute-0.0.6',
        release: 'bluecompute',
        implementation: 'microprofile'
      }
    },
    rules: [
      {
        apiGroups: [ 'extensions' ],
        resources: [ 'podsecuritypolicies' ],
        resourceNames: [ 'bluecompute-pod-security-policy' ],
        verbs: [ 'use' ]
      }
    ]
  })

  app.bluecomputePrometheus_ClusterRoleBinding = new solsa.rbac.v1beta1.ClusterRoleBinding({
    metadata: {
      labels: {
        app: 'bluecompute-prometheus',
        chart: 'ibm-icpmonitoring-1.1.0',
        component: 'prometheus',
        release: 'bluecompute',
        heritage: 'Tiller'
      },
      name: 'bluecompute-prometheus'
    },
    roleRef: {
      apiGroup: 'rbac.authorization.k8s.io',
      kind: 'ClusterRole',
      name: 'bluecompute-prometheus'
    },
    subjects: [ { kind: 'ServiceAccount', name: 'default', namespace: 'bluecompute' } ]
  })

  app.bluecomputeFabric8Rbac_ClusterRoleBinding = new solsa.rbac.v1beta1.ClusterRoleBinding({
    metadata: { name: 'bluecompute-fabric8-rbac' },
    subjects: [ { kind: 'ServiceAccount', name: 'default', namespace: 'bluecompute' } ],
    roleRef: { kind: 'ClusterRole', name: 'cluster-admin', apiGroup: 'rbac.authorization.k8s.io' }
  })

  app.bluecomputeClusterRoleBinding = new solsa.rbac.v1beta1.ClusterRoleBinding({
    metadata: {
      name: 'bluecompute-cluster-role-binding',
      labels: {
        chart: 'bluecompute-bluecompute-0.0.6',
        release: 'bluecompute',
        implementation: 'microprofile'
      }
    },
    subjects: [ { kind: 'ServiceAccount', name: 'default', namespace: 'bluecompute' } ],
    roleRef: {
      apiGroup: 'rbac.authorization.k8s.io',
      kind: 'ClusterRole',
      name: 'bluecompute-cluster-role'
    }
  })

  app.bluecomputeKeystoreJob = new solsa.batch.v1.Job({
    metadata: { name: 'bluecompute-keystore-job' },
    spec: {
      template: {
        metadata: { name: 'bluecompute-keystore-job' },
        spec: {
          containers: [
            {
              name: 'keystore',
              image: 'ibmcase/keygen-mp:v3.0.0',
              imagePullPolicy: 'Always',
              resources: { requests: { cpu: '200m', memory: '300Mi' } },
              command: [ 'sh', './bc_certs/keygen.sh' ],
              args: [ 'bluecompute' ]
            }
          ],
          restartPolicy: 'Never'
        }
      }
    }
  })

  app.bluecomputeWeb_Ingress = new solsa.extensions.v1beta1.Ingress({
    metadata: {
      annotations: null,
      name: 'bluecompute-web',
      labels: {
        app: 'bluecompute',
        micro: 'web-bff',
        tier: 'frontend',
        implementation: 'microprofile',
        heritage: 'Tiller',
        release: 'bluecompute',
        chart: 'web-0.0.1'
      }
    },
    spec: {
      rules: [
        {
          host: 'bluecompute.mycluster12345.us-south.containers.appdomain.cloud',
          http: {
            paths: [ { path: '/', backend: { serviceName: 'bluecompute-web', servicePort: 80 } } ]
          }
        }
      ]
    }
  })

  return app
}
