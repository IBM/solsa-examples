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

module.exports = function bcClusterConfig (appConfig) {
  const app = new solsa.Bundle()

  // Initialization Job to create keystore secret
  app.keystoreJob = new solsa.batch.v1.Job({
    metadata: {
      name: appConfig.getInstanceName('keystore-job'),
      labels: appConfig.addCommonLabelsTo({})
    },
    spec: {
      template: {
        spec: {
          containers: [
            {
              name: 'keystore',
              image: `${appConfig.values.keystore.image.repository}:${appConfig.values.keystore.image.tag}`,
              resources: appConfig.values.keystore.resources,
              command: [ 'sh', './bc_certs/keygen.sh' ],
              args: [ appConfig.namespace ]
            }
          ],
          restartPolicy: 'Never'
        }
      }
    }
  })
  app.keystoreJob.propogateLabels()

  /*
   * Add needed capabilities to default ServiceAccount in the deployment namespace
   */
  app.podSecurityPolicy = new solsa.extensions.v1beta1.PodSecurityPolicy({
    metadata: {
      name: appConfig.getInstanceName('pod-security-policy'),
      labels: appConfig.addCommonLabelsTo({})
    },
    spec: {
      allowedCapabilities: [ 'IPC_LOCK' ],
      fsGroup: { rule: 'RunAsAny' },
      hostPorts: [ { max: 65535, min: 1 } ],
      privileged: true,
      runAsUser: { rule: 'RunAsAny' },
      seLinux: { rule: 'RunAsAny' },
      supplementalGroups: { rule: 'RunAsAny' },
      volumes: [ '*' ]
    }
  })
  app.clusterRole = new solsa.rbac.v1beta1.ClusterRole({
    metadata: {
      name: appConfig.getInstanceName('cluster-role'),
      labels: appConfig.addCommonLabelsTo({})
    },
    rules: [
      {
        apiGroups: [ 'extensions' ],
        resources: [ 'podsecuritypolicies' ],
        resourceNames: [ app.podSecurityPolicy.metadata.name ],
        verbs: [ 'use' ]
      },
      {
        apiGroups: [ '' ],
        resources: [ 'secrets' ],
        verbs: ['create']
      }
    ]
  })
  app.clusterRoleBinding = new solsa.rbac.v1beta1.ClusterRoleBinding({
    metadata: {
      name: appConfig.getInstanceName('cluster-role-binding'),
      labels: appConfig.addCommonLabelsTo({})
    },
    subjects: [ { kind: 'ServiceAccount', name: 'default', namespace: appConfig.namespace } ],
    roleRef: {
      apiGroup: 'rbac.authorization.k8s.io',
      kind: 'ClusterRole',
      name: app.clusterRole.metadata.name
    }
  })

  app.prometheus_ClusterRole = new solsa.rbac.v1beta1.ClusterRole({
    metadata: {
      name: appConfig.getInstanceName('prometheus'),
      labels: appConfig.addCommonLabelsTo({})
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
  app.prometheus_ClusterRoleBinding = new solsa.rbac.v1beta1.ClusterRoleBinding({
    metadata: {
      name: appConfig.getInstanceName('prometheus'),
      labels: appConfig.addCommonLabelsTo({})
    },
    roleRef: {
      apiGroup: 'rbac.authorization.k8s.io',
      kind: 'ClusterRole',
      name: app.prometheus_ClusterRole.metadata.name
    },
    subjects: [ { kind: 'ServiceAccount', name: 'default', namespace: appConfig.namespace } ]
  })

  return app
}
