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

module.exports = function bcOrders (appConfig) {
  let mariadbSecret = new solsa.core.v1.Secret({
    metadata: {
      name: appConfig.getInstanceName('mariadb'),
      labels: appConfig.addCommonLabelsTo({ micro: 'orders', tier: 'backend' })
    },
    type: 'Opaque',
    data: {
      'mariadb-root-password': solsa.base64Encode(appConfig.values.mariadb.rootUser.password),
      'mariadb-password': solsa.base64Encode(appConfig.values.mariadb.db.password)
    }
  })

  let ordersMariadbSecret = new solsa.core.v1.Secret({
    metadata: {
      name: appConfig.getInstanceName('orders-mariadb-secret'),
      labels: appConfig.addCommonLabelsTo({ micro: 'orders', tier: 'backend' })
    },
    type: 'Opaque',
    data: { 'mariadb-password': solsa.base64Encode(appConfig.values.mariadb.db.password) }
  })

  let mariadbConfigMap = new solsa.core.v1.ConfigMap({
    metadata: {
      name: appConfig.getInstanceName('mariadb'),
      labels: appConfig.addCommonLabelsTo({ micro: 'orders', tier: 'backend' })
    },
    data: {
      'my.cnf': '[mysqld]\n' +
        'skip-name-resolve\n' +
        'explicit_defaults_for_timestamp\n' +
        'basedir=/opt/bitnami/mariadb\n' +
        `port=${appConfig.values.mariadb.ports.mysql}\n` +
        'socket=/opt/bitnami/mariadb/tmp/mysql.sock\n' +
        'tmpdir=/opt/bitnami/mariadb/tmp\n' +
        'max_allowed_packet=16M\n' +
        'bind-address=0.0.0.0\n' +
        'pid-file=/opt/bitnami/mariadb/tmp/mysqld.pid\n' +
        'log-error=/opt/bitnami/mariadb/logs/mysqld.log\n' +
        'character-set-server=UTF8\n' +
        'collation-server=utf8_general_ci\n' +
        '\n' +
        '[client]\n' +
        `port=${appConfig.values.mariadb.ports.mysql}\n` +
        'socket=/opt/bitnami/mariadb/tmp/mysql.sock\n' +
        'default-character-set=UTF8\n' +
        '\n' +
        '[manager]\n' +
        `port=${appConfig.values.mariadb.ports.mysql}\n` +
        'socket=/opt/bitnami/mariadb/tmp/mysql.sock\n' +
        'pid-file=/opt/bitnami/mariadb/tmp/mysqld.pid'
    }
  })

  let ordersDataConfigMap = new solsa.core.v1.ConfigMap({
    metadata: {
      name: appConfig.getInstanceName('orders-data'),
      labels: appConfig.addCommonLabelsTo({ micro: 'orders', tier: 'backend' })
    },
    data: {
      'mysql_data.sql': `create database if not exists ${appConfig.values.mariadb.db.name};\n` +
        `use ${appConfig.values.mariadb.db.name};\n` +
        'create table if not exists orders (\n' +
        '   orderId varchar(64) not null primary key,\n' +
        '   itemId int not null,\n' +
        '   customerId varchar(64) not null,\n' +
        '   count int not null,\n' +
        '   date timestamp not null\n' +
        ');'
    }
  })

  let rabbitmqDeployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: appConfig.getInstanceName('rabbitmq'),
      labels: appConfig.addCommonLabelsTo({ micro: 'orders', tier: 'backend', service: 'orders' })
    },
    spec: {
      replicas: appConfig.values.rabbitmq.replicaCount,
      template: {
        spec: {
          containers: [{
            name: 'rabbitmq',
            image: `${appConfig.values.rabbitmq.image.repository}:${appConfig.values.rabbitmq.image.tag}`,
            ports: [
              { name: 'main', containerPort: appConfig.values.rabbitmq.ports.main },
              { name: 'management', containerPort: appConfig.values.rabbitmq.ports.management },
              { name: 'epmd', containerPort: appConfig.values.rabbitmq.ports.epmd },
              { name: 'dist', containerPort: appConfig.values.rabbitmq.ports.dist }
            ]
          }]
        }
      }
    }
  })
  rabbitmqDeployment.propogateLabels()
  let rabbitmqService = rabbitmqDeployment.getService()

  let mariadbStatefulSet = new solsa.apps.v1beta1.StatefulSet({
    metadata: {
      name: appConfig.getInstanceName('mariadb'),
      labels: appConfig.addCommonLabelsTo({ micro: 'orders', tier: 'backend', service: 'mariadb', component: 'master' })
    },
    spec: {
      serviceName: appConfig.getInstanceName('mariadb'),
      replicas: appConfig.values.mariadb.replicaCount,
      updateStrategy: { type: 'RollingUpdate' },
      template: {
        spec: {
          securityContext: { fsGroup: 1001, runAsUser: 1001 },
          affinity: {
            podAntiAffinity: {
              preferredDuringSchedulingIgnoredDuringExecution: [
                {
                  weight: 1,
                  podAffinityTerm: {
                    topologyKey: 'kubernetes.io/hostname',
                    labelSelector: { matchLabels: { service: 'mariadb' } }
                  }
                }
              ]
            }
          },
          volumes: [
            { name: 'config', configMap: { name: mariadbConfigMap.metadata.name } },
            { name: 'data', emptyDir: {} }
          ],
          containers: [
            {
              name: 'mariadb',
              image: `${appConfig.values.mariadb.image.repository}:${appConfig.values.mariadb.image.tag}`,
              env: [
                {
                  name: 'MARIADB_ROOT_PASSWORD',
                  valueFrom: {
                    secretKeyRef: { name: mariadbSecret.metadata.name, key: 'mariadb-root-password' }
                  }
                },
                { name: 'MARIADB_USER', value: `${appConfig.values.mariadb.db.user}` },
                {
                  name: 'MARIADB_PASSWORD',
                  valueFrom: { secretKeyRef: { name: mariadbSecret.metadata.name, key: 'mariadb-password' } }
                },
                { name: 'MARIADB_DATABASE', value: `${appConfig.values.mariadb.db.name}` }
              ],
              ports: [{ name: 'mysql', containerPort: appConfig.values.mariadb.ports.mysql }],
              livenessProbe: {
                exec: {
                  command: ['sh', '-c', 'exec mysqladmin status -uroot -p$MARIADB_ROOT_PASSWORD']
                },
                initialDelaySeconds: 120,
                periodSeconds: 10,
                timeoutSeconds: 1,
                successThreshold: 1,
                failureThreshold: 3
              },
              readinessProbe: {
                exec: {
                  command: ['sh', '-c', 'exec mysqladmin status -uroot -p$MARIADB_ROOT_PASSWORD']
                },
                initialDelaySeconds: 30,
                periodSeconds: 10,
                timeoutSeconds: 1,
                successThreshold: 1,
                failureThreshold: 3
              },
              resources: {},
              volumeMounts: [
                { name: 'data', mountPath: '/bitnami/mariadb' },
                {
                  name: 'config',
                  mountPath: '/opt/bitnami/mariadb/conf/my.cnf',
                  subPath: 'my.cnf'
                }
              ]
            }
          ]
        }
      }
    }
  })
  let mariadbService = mariadbStatefulSet.getService()

  const authHostAndPort = `${appConfig.getInstanceName('auth')}:${appConfig.values.auth.ports.https}`
  const inventoryHostAndPort = `${appConfig.getInstanceName('inventory')}:${appConfig.values.inventory.ports.http}`
  let ordersDeployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: appConfig.getInstanceName('orders'),
      labels: appConfig.addCommonLabelsTo({ micro: 'orders', tier: 'backend', service: 'orders' })
    },
    spec: {
      replicas: appConfig.values.orders.replicaCount,
      template: {
        spec: {
          volumes: [{ name: 'keystorevol', secret: { secretName: 'keystoresecret' } }],
          containers: [
            {
              name: 'orders',
              image: `${appConfig.values.orders.image.repository}:${appConfig.values.orders.image.tag}`,
              ports: [
                { name: 'http', containerPort: appConfig.values.orders.ports.http },
                { name: 'https', containerPort: appConfig.values.orders.ports.https }],
              readinessProbe: {
                httpGet: { path: '/', port: appConfig.values.orders.ports.https, scheme: 'HTTPS' },
                initialDelaySeconds: 30
              },
              livenessProbe: {
                httpGet: { path: '/health', port: appConfig.values.orders.ports.https, scheme: 'HTTPS' },
                initialDelaySeconds: 1500,
                timeoutSeconds: 500
              },
              env: [
                { name: 'auth_health', value: `https://${authHostAndPort}/health` },
                {
                  name: 'inventory_url',
                  value: `http://${inventoryHostAndPort}/inventory/rest/inventory/stock`
                },
                {
                  name: 'inventory_health',
                  value: `http://${inventoryHostAndPort}/health`
                },
                {
                  name: 'jwksUri',
                  value: `https://${authHostAndPort}/oidc/endpoint/OP/jwk`
                },
                {
                  name: 'jwksIssuer',
                  value: `https://${authHostAndPort}/oidc/endpoint/OP`
                },
                {
                  name: 'jwksUser',
                  value: `user:https://${authHostAndPort}/oidc/endpoint/OP/user`
                },
                {
                  name: 'administratorRealm',
                  value: `user:https://${authHostAndPort}/oidc/endpoint/OP/user`
                },
                {
                  name: 'jdbcURL',
                  value: `jdbc:mysql://${mariadbService.metadata.name}:${appConfig.values.mariadb.ports.mysql}/${appConfig.values.mariadb.db.name}?useSSL=false`
                },
                { name: 'rabbit', value: `${rabbitmqService.metadata.name}` },
                { name: 'PORT', value: `${appConfig.values.orders.ports.http}` },
                { name: 'RELEASE_NAME', value: `${appConfig.appName}` },
                { name: 'jwtid', value: `${appConfig.values.orders.jwt.id}` },
                { name: 'zipkinHost', value: `${appConfig.getInstanceName('zipkin')}` },
                { name: 'zipkinPort', value: `${appConfig.values.zipkin.ports.zipkin}` }
              ],
              resources: appConfig.values.orders.resources,
              volumeMounts: [{ name: 'keystorevol', mountPath: '/etc/keystorevol', readOnly: true }]
            }
          ]
        }
      }
    }
  })
  ordersDeployment.propogateLabels()
  let ordersService = ordersDeployment.getService()

  const jobEnv = [
    { name: 'MYSQL_HOST', value: mariadbService.metadata.name },
    { name: 'MYSQL_PORT', value: `${appConfig.values.mariadb.ports.mysql}` },
    { name: 'MYSQL_DATABASE', value: `${appConfig.values.mariadb.db.name}` },
    { name: 'MYSQL_USER', value: 'root' },
    {
      name: 'MYSQL_PASSWORD',
      valueFrom: {
        secretKeyRef: { name: ordersMariadbSecret.metadata.name, key: 'mariadb-password' }
      }
    }
  ]
  let ordersJob = new solsa.batch.v1.Job({
    metadata: {
      name: appConfig.getInstanceName('orders-job'),
      labels: appConfig.addCommonLabelsTo({ micro: 'orders', tier: 'backend' })
    },
    spec: {
      template: {
        spec: {
          restartPolicy: 'Never',
          volumes: [{ name: 'orders-data', configMap: { name: ordersDataConfigMap.metadata.name } }],
          initContainers: [
            {
              name: 'wait-for-mariadb',
              image: `${appConfig.values.mysql.image.repository}:${appConfig.values.mysql.image.tag}`,
              command: [
                '/bin/bash',
                '-c',
                'until mysql -h ${MYSQL_HOST} -P ${MYSQL_PORT} -u${MYSQL_USER} -p${MYSQL_PASSWORD} -e status; do echo waiting for mariadb; sleep 1; done'
              ],
              env: jobEnv
            }
          ],
          containers: [
            {
              name: 'populate-mariadb',
              image: `${appConfig.values.mysql.image.repository}:${appConfig.values.mysql.image.tag}`,
              volumeMounts: [{ mountPath: '/orders-data', name: 'orders-data', readOnly: false }],
              command: ['/bin/bash', '-c'],
              args: [
                'cp /orders-data/mysql_data.sql .; sed -i "s/' + `${appConfig.values.mariadb.db.name}` + '/${MYSQL_DATABASE}/g" mysql_data.sql; until mysql -h ${MYSQL_HOST} -P ${MYSQL_PORT} -u${MYSQL_USER} -p${MYSQL_PASSWORD} <mysql_data.sql; do echo "waiting for mysql"; sleep 1; done; echo "Loaded data into database";'
              ],
              env: jobEnv
            }
          ]
        }
      }
    }
  })

  return new solsa.Bundle({
    mariadbSecret,
    ordersMariadbSecret,
    mariadbConfigMap,
    ordersDataConfigMap,
    rabbitmqDeployment,
    rabbitmqService,
    mariadbStatefulSet,
    mariadbService,
    ordersDeployment,
    ordersService,
    ordersJob
  })
}
