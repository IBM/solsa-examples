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

module.exports = function bcWeb () {
  const app = new solsa.Bundle()

  app.bluecomputeWebConfig_ConfigMap = new solsa.core.v1.ConfigMap({
    metadata: {
      labels: {
        micro: 'web-bff',
        tier: 'frontend'
      },
      name: 'bluecompute-web-config'
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
      'default.json': '{\n' +
      '  "Application": {\n' +
      '    "cluster_name": "",\n' +
      '    "region": ""\n' +
      '  },\n' +
      '  "Auth-Server": {\n' +
      '    "client_id":"bluecomputeweb",\n' +
      '    "client_secret":"bluecomputewebs3cret"\n' +
      '  },\n' +
      '  "APIs": {\n' +
      '    "protocol": "http",\n' +
      '    "protocols": "https",\n' +
      '    "catalog": {\n' +
      '      "service_name": "bluecompute-catalog:9080/catalog",\n' +
      '      "base_path": "/rest",\n' +
      '      "require": [\n' +
      '      ]\n' +
      '    },\n' +
      '    "order": {\n' +
      '      "service_name": "bluecompute-orders:9443/orders",\n' +
      '      "base_path": "/rest",\n' +
      '      "require": [\n' +
      '        "oauth"\n' +
      '      ]\n' +
      '    },\n' +
      '    "review": {\n' +
      '      "base_path": "/api",\n' +
      '      "require": [\n' +
      '        "oauth"\n' +
      '      ]\n' +
      '    },\n' +
      '    "customerService": {\n' +
      '      "service_name": "bluecompute-customer:9443/customer",\n' +
      '      "base_path": "/rest",\n' +
      '      "paths": {\n' +
      '        "customer": "/customer"\n' +
      '      },\n' +
      '      "require": [\n' +
      '          "oauth"\n' +
      '      ],\n' +
      '      "redirect_url": "http://localhost"\n' +
      '    },\n' +
      '    "customer": {\n' +
      '        "service_name": "bluecompute-auth:9443/oidc/endpoint",\n' +
      '        "base_path": "/OP",\n' +
      '        "paths": {\n' +
      '          "userinfo": "/userinfo"\n' +
      '        },\n' +
      '        "require": [\n' +
      '          "oauth"\n' +
      '        ],\n' +
      '        "redirect_url": "http://localhost"\n' +
      '    },\n' +
      '    "oauth20": {\n' +
      '      "protocol": "https",\n' +
      '      "service_name": "bluecompute-auth:9443/oidc/endpoint",\n' +
      '      "base_path": "/OP",\n' +
      '      "paths": {\n' +
      '        "authz": "/authorize",\n' +
      '        "token": "/token"\n' +
      '      },\n' +
      '      "grant_types": [\n' +
      '        "password"\n' +
      '      ],\n' +
      '      "scopes": [\n' +
      '        "bluecompute"\n' +
      '      ],\n' +
      '      "redirect_url": "http://localhost"\n' +
      '    }\n' +
      '  }\n' +
      '}\n'
    }
  })

  app.bluecomputeWeb_Deployment = new solsa.extensions.v1beta1.Deployment({
    metadata: {
      name: 'bluecompute-web',
      labels: {
        micro: 'web-bff',
        tier: 'frontend'
      }
    },
    spec: {
      replicas: 1,
      template: {
        spec: {
          containers: [
            {
              name: 'web',
              image: 'ibmcase/bc-web-mp:v2.0.0',
              imagePullPolicy: 'Always',
              ports: [ { containerPort: 8000, protocol: 'TCP' } ],
              volumeMounts: [ { name: 'config-volume', mountPath: '/StoreWebApp/config' } ]
            }
          ],
          volumes: [
            {
              name: 'config-volume',
              configMap: {
                name: 'bluecompute-web-config',
                items: [
                  { key: 'checks', path: 'checks' },
                  { key: 'default.json', path: 'default.json' }
                ]
              }
            }
          ]
        }
      }
    }
  })

  app.bluecomputeWeb_Service = app.bluecomputeWeb_Deployment.getService()

  return app
}
