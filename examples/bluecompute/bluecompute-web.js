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

module.exports = function bcWeb (appConfig) {
  const authHostAndPort = `${appConfig.getInstanceName('auth')}:${appConfig.values.auth.ports.https}`
  const catalogHostAndPort = `${appConfig.getInstanceName('catalog')}:${appConfig.values.catalog.ports.http}`
  const customerHostAndPort = `${appConfig.getInstanceName('customer')}:${appConfig.values.customer.ports.https}`
  const ordersHostAndPort = `${appConfig.getInstanceName('orders')}:${appConfig.values.orders.ports.https}`
  const webConfigJSON = {
    Application: { cluster_name: '', region: '' },
    'Auth-Server': { client_id: 'bluecomputeweb', client_secret: 'bluecomputewebs3cret' },
    APIs: {
      protocol: 'http',
      protocols: 'https',
      catalog: { service_name: `${catalogHostAndPort}/catalog`, base_path: '/rest', require: [] },
      order: {
        service_name: `${ordersHostAndPort}/orders`,
        base_path: '/rest',
        require: [ 'oauth' ]
      },
      review: { base_path: '/api', require: [ 'oauth' ] },
      customerService: {
        service_name: `${customerHostAndPort}/customer`,
        base_path: '/rest',
        paths: { customer: '/customer' },
        require: [ 'oauth' ],
        redirect_url: 'http://localhost'
      },
      customer: {
        service_name: `${authHostAndPort}/oidc/endpoint`,
        base_path: '/OP',
        paths: { userinfo: '/userinfo' },
        require: [ 'oauth' ],
        redirect_url: 'http://localhost'
      },
      oauth20: {
        protocol: 'https',
        service_name: `${authHostAndPort}/oidc/endpoint`,
        base_path: '/OP',
        paths: { authz: '/authorize', token: '/token' },
        grant_types: [ 'password' ],
        scopes: [ 'bluecompute' ],
        redirect_url: 'http://localhost'
      }
    }
  }
  let webConfigMap = new solsa.core.v1.ConfigMap({
    metadata: {
      name: appConfig.getInstanceName('web-config'),
      labels: appConfig.addCommonLabelsTo({ micro: 'web-bff', tier: 'frontend' })
    },
    data: {
      checks: '# Check the main website, including text content\r\n' +
      '/\tIBM Cloud Architecture\r\n' +
      '\r\n' +
      '#Check the Inventory page\r\n' +
      '/catalog/ Dayton Meat Chopper\r\n' +
      '\r\n' +
      '# Check for stylesheets and for text content in stylesheets\r\n' +
      '/stylesheets/font-awesome/font-awesome.css    @font-face\r\n' +
      '\r\n' +
      '\r\n' +
      '# Check a sub-domain\r\n' +
      '#//some-subdomain.some-site.com/reviews Review Data\r\n' +
      '\r\n' +
      '# Check HTTP access, and for text content\r\n' +
      '# http://localhost:8000\tBlueCompute Store!\r\n' +
      '# http://localhost:8000/inventory/\tDayton Meat Chopper\r\n',
      'default.json': JSON.stringify(webConfigJSON)
    }
  })

  let webDeployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: appConfig.getInstanceName('web'),
      labels: appConfig.addCommonLabelsTo({ micro: 'web-bff', tier: 'frontend' })
    },
    spec: {
      replicas: appConfig.values.web.replicaCount,
      template: {
        spec: {
          volumes: [
            {
              name: 'config-volume',
              configMap: {
                name: webConfigMap.metadata.name,
                items: [
                  { key: 'checks', path: 'checks' },
                  { key: 'default.json', path: 'default.json' }
                ]
              }
            }
          ],
          containers: [
            {
              name: 'web',
              image: `${appConfig.values.web.image.repository}:${appConfig.values.web.image.tag}`,
              ports: [ { containerPort: appConfig.values.web.ports.http } ],
              volumeMounts: [ { name: 'config-volume', mountPath: '/StoreWebApp/config' } ]
            }
          ]
        }
      }
    }
  })
  webDeployment.propogateLabels()
  let webService = webDeployment.getService()
  let ingress = webService.getIngress({ vhost: appConfig.appName })

  return new solsa.Bundle({ webConfigMap, webDeployment, webService, ingress })
}
