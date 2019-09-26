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

module.exports = function bcConfig () {
  const app = new solsa.Bundle()

  app.bluecomputePrometheus_ClusterRole = new solsa.rbac.v1beta1.ClusterRole({
    metadata: { name: 'bluecompute-prometheus' },
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
    metadata: { name: 'bluecompute-cluster-role' },
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
    metadata: { name: 'bluecompute-prometheus' },
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
    metadata: { name: 'bluecompute-cluster-role-binding' },
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

  return app
}
