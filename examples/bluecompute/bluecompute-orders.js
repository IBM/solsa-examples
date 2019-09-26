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

module.exports = function bcOrders () {
  const app = new solsa.Bundle()

  app.bluecomputeMariadb_Secret = new solsa.core.v1.Secret({
    metadata: { name: 'bluecompute-mariadb' },
    type: 'Opaque',
    data: { 'mariadb-root-password': 'cGFzc3dvcmQ=', 'mariadb-password': 'cGFzc3dvcmQ=' }
  })

  app.bluecomputeOrdersMariadbSecret = new solsa.core.v1.Secret({
    metadata: { name: 'bluecompute-orders-mariadb-secret' },
    type: 'Opaque',
    data: { 'mariadb-password': 'cGFzc3dvcmQ=' }
  })

  app.bluecomputeMariadb_ConfigMap = new solsa.core.v1.ConfigMap({
    metadata: { name: 'bluecompute-mariadb' },
    data: {
      'my.cnf': '[mysqld]\n' +
      'skip-name-resolve\n' +
      'explicit_defaults_for_timestamp\n' +
      'basedir=/opt/bitnami/mariadb\n' +
      'port=3306\n' +
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
      'port=3306\n' +
      'socket=/opt/bitnami/mariadb/tmp/mysql.sock\n' +
      'default-character-set=UTF8\n' +
      '\n' +
      '[manager]\n' +
      'port=3306\n' +
      'socket=/opt/bitnami/mariadb/tmp/mysql.sock\n' +
      'pid-file=/opt/bitnami/mariadb/tmp/mysqld.pid'
    }
  })

  app.bluecomputeMariadbTests_ConfigMap = new solsa.core.v1.ConfigMap({
    metadata: { name: 'bluecompute-mariadb-tests' },
    data: {
      'run.sh': '@test "Testing MariaDB is accessible" {\n' +
      "  mysql -h bluecompute-mariadb -uroot -p$MARIADB_ROOT_PASSWORD -e 'show databases;'\n" +
      '}'
    }
  })

  app.bluecomputeOrdersData_ConfigMap = new solsa.core.v1.ConfigMap({
    metadata: { name: 'bluecompute-orders-data' },
    data: {
      'mysql_data.sql': 'create database if not exists ordersdb;\n' +
      'use ordersdb;\n' +
      'create table if not exists orders (\n' +
      '   orderId varchar(64) not null primary key,\n' +
      '   itemId int not null,\n' +
      '   customerId varchar(64) not null,\n' +
      '   count int not null,\n' +
      '   date timestamp not null\n' +
      ');'
    }
  })

  app.bluecomputeMariadb_Service = new solsa.core.v1.Service({
    metadata: { name: 'bluecompute-mariadb' },
    spec: {
      type: 'ClusterIP',
      ports: [ { name: 'mysql', port: 3307, targetPort: 'mysql' } ],
      selector: { app: 'mariadb', component: 'master' }
    }
  })

  app.bluecomputeOrders_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: { name: 'bluecompute-orders' },
    spec: {
      replicas: 1,
      template: {
        spec: {
          containers: [
            {
              name: 'orders',
              image: 'ibmcase/orders-mp:v4.0.0',
              imagePullPolicy: 'IfNotPresent',
              ports: [ { name: 'http', containerPort: 9080 }, { name: 'https', containerPort: 9443 } ],
              readinessProbe: {
                httpGet: { path: '/', port: 9443, scheme: 'HTTPS' },
                initialDelaySeconds: 30
              },
              livenessProbe: {
                httpGet: { path: '/health', port: 9443, scheme: 'HTTPS' },
                initialDelaySeconds: 1500,
                timeoutSeconds: 500
              },
              env: [
                { name: 'auth_health', value: 'https://bluecompute-auth:9443/health' },
                {
                  name: 'inventory_url',
                  value: 'http://bluecompute-inventory:9080/inventory/rest/inventory/stock'
                },
                {
                  name: 'inventory_health',
                  value: 'http://bluecompute-inventory:9080/health'
                },
                {
                  name: 'jwksUri',
                  value: 'https://bluecompute-auth:9443/oidc/endpoint/OP/jwk'
                },
                {
                  name: 'jwksIssuer',
                  value: 'https://bluecompute-auth:9443/oidc/endpoint/OP'
                },
                {
                  name: 'jwksUser',
                  value: 'user:https://bluecompute-auth:9443/oidc/endpoint/OP/user'
                },
                {
                  name: 'administratorRealm',
                  value: 'user:https://bluecompute-auth:9443/oidc/endpoint/OP/user'
                },
                {
                  name: 'jdbcURL',
                  value: 'jdbc:mysql://bluecompute-mariadb:3307/ordersdb?useSSL=false'
                },
                { name: 'rabbit', value: 'bluecompute-rabbitmq' },
                { name: 'PORT', value: '9080' },
                { name: 'RELEASE_NAME', value: 'bluecompute' },
                { name: 'jwtid', value: 'myMpJwt' },
                { name: 'zipkinHost', value: 'bluecompute-zipkin' },
                { name: 'zipkinPort', value: '9411' }
              ],
              resources: { requests: { cpu: '150m', memory: '64Mi' } },
              volumeMounts: [ { name: 'keystorevol', mountPath: '/etc/keystorevol', readOnly: true } ]
            }
          ],
          volumes: [ { name: 'keystorevol', secret: { secretName: 'keystoresecret' } } ]
        }
      }
    }
  })
  app.bluecomputeOrders_Service = app.bluecomputeOrders_Deployment.getService()

  app.bluecomputeRabbitmq_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: 'bluecompute-rabbitmq',
      labels: {
        app: 'orders',
        implementation: 'microprofile',
        tier: 'backend'
      }
    },
    spec: {
      replicas: 1,
      template: {
        spec: {
          containers: [{
            name: 'rabbitmq',
            image: 'rabbitmq',
            imagePullPolicy: 'Always',
            ports: [
              { name: 'main', containerPort: 5672 },
              { name: 'management', containerPort: 15672 },
              { name: 'epmd', containerPort: 4369 },
              { name: 'dist', containerPort: 25672 }
            ]
          }]
        }
      }
    }
  })
  app.bluecomputeRabbitmq_Service = app.bluecomputeRabbitmq_Deployment.getService()

  app.bluecomputeMariadb_StatefulSet = new solsa.apps.v1beta1.StatefulSet({
    metadata: {
      name: 'bluecompute-mariadb',
      labels: {
        app: 'mariadb',
        component: 'master'
      }
    },
    spec: {
      selector: { matchLabels: { component: 'master', app: 'mariadb' } },
      serviceName: 'bluecompute-mariadb',
      replicas: 1,
      updateStrategy: { type: 'RollingUpdate' },
      template: {
        metadata: {
          annotations: { 'sidecar.istio.io/inject': 'false' },
          labels: {
            app: 'mariadb',
            component: 'master'
          }
        },
        spec: {
          securityContext: { fsGroup: 1001, runAsUser: 1001 },
          affinity: {
            podAntiAffinity: {
              preferredDuringSchedulingIgnoredDuringExecution: [
                {
                  weight: 1,
                  podAffinityTerm: {
                    topologyKey: 'kubernetes.io/hostname',
                    labelSelector: { matchLabels: { app: 'mariadb' } }
                  }
                }
              ]
            }
          },
          containers: [
            {
              name: 'mariadb',
              image: 'docker.io/bitnami/mariadb:10.1.36',
              imagePullPolicy: 'IfNotPresent',
              env: [
                {
                  name: 'MARIADB_ROOT_PASSWORD',
                  valueFrom: {
                    secretKeyRef: { name: 'bluecompute-mariadb', key: 'mariadb-root-password' }
                  }
                },
                { name: 'MARIADB_USER', value: 'dbuser' },
                {
                  name: 'MARIADB_PASSWORD',
                  valueFrom: { secretKeyRef: { name: 'bluecompute-mariadb', key: 'mariadb-password' } }
                },
                { name: 'MARIADB_DATABASE', value: 'ordersdb' }
              ],
              ports: [ { name: 'mysql', containerPort: 3306 } ],
              livenessProbe: {
                exec: {
                  command: [ 'sh', '-c', 'exec mysqladmin status -uroot -p$MARIADB_ROOT_PASSWORD' ]
                },
                initialDelaySeconds: 120,
                periodSeconds: 10,
                timeoutSeconds: 1,
                successThreshold: 1,
                failureThreshold: 3
              },
              readinessProbe: {
                exec: {
                  command: [ 'sh', '-c', 'exec mysqladmin status -uroot -p$MARIADB_ROOT_PASSWORD' ]
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
          ],
          volumes: [
            { name: 'config', configMap: { name: 'bluecompute-mariadb' } },
            { name: 'data', emptyDir: {} }
          ]
        }
      }
    }
  })

  app.bluecomputeOrdersJob = new solsa.batch.v1.Job({
    metadata: {
      name: 'bluecompute-orders-job',
      labels: {
        app: 'orders',
        tier: 'backend'
      }
    },
    spec: {
      template: {
        metadata: {
          name: 'bluecompute-orders-job',
          annotations: { 'sidecar.istio.io/inject': 'false' }
        },
        spec: {
          restartPolicy: 'Never',
          initContainers: [
            {
              name: 'test-mariadb',
              image: 'mysql:5.7.14',
              imagePullPolicy: 'IfNotPresent',
              command: [
                '/bin/bash',
                '-c',
                'until mysql -h ${MYSQL_HOST} -P ${MYSQL_PORT} -u${MYSQL_USER} -p${MYSQL_PASSWORD} -e status; do echo waiting for mariadb; sleep 1; done'
              ],
              env: [
                { name: 'MYSQL_HOST', value: 'bluecompute-mariadb' },
                { name: 'MYSQL_PORT', value: '3307' },
                { name: 'MYSQL_DATABASE', value: 'ordersdb' },
                { name: 'MYSQL_USER', value: 'root' },
                {
                  name: 'MYSQL_PASSWORD',
                  valueFrom: {
                    secretKeyRef: { name: 'bluecompute-orders-mariadb-secret', key: 'mariadb-password' }
                  }
                }
              ]
            }
          ],
          containers: [
            {
              name: 'populate-mysql',
              image: 'mysql:5.7.14',
              imagePullPolicy: 'IfNotPresent',
              volumeMounts: [ { mountPath: '/orders-data', name: 'orders-data', readOnly: false } ],
              command: [ '/bin/bash', '-c' ],
              args: [
                'cp /orders-data/mysql_data.sql .; sed -i "s/ordersdb/${MYSQL_DATABASE}/g" mysql_data.sql; until mysql -h ${MYSQL_HOST} -P ${MYSQL_PORT} -u${MYSQL_USER} -p${MYSQL_PASSWORD} <mysql_data.sql; do echo "waiting for mysql"; sleep 1; done; echo "Loaded data into database";'
              ],
              env: [
                { name: 'MYSQL_HOST', value: 'bluecompute-mariadb' },
                { name: 'MYSQL_PORT', value: '3307' },
                { name: 'MYSQL_DATABASE', value: 'ordersdb' },
                { name: 'MYSQL_USER', value: 'root' },
                {
                  name: 'MYSQL_PASSWORD',
                  valueFrom: {
                    secretKeyRef: { name: 'bluecompute-orders-mariadb-secret', key: 'mariadb-password' }
                  }
                }
              ]
            }
          ],
          volumes: [ { name: 'orders-data', configMap: { name: 'bluecompute-orders-data' } } ]
        }
      }
    }
  })
  return app
}
