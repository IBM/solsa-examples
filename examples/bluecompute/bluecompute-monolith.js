/* eslint-disable no-template-curly-in-string */
const solsa = require('solsa')

const app = new solsa.Bundle()
module.exports = app

app.bluecomputePodSecurityPolicy = new solsa.extensions.v1beta1.PodSecurityPolicy({
  metadata: {
    name: 'bluecompute-pod-security-policy',
    labels: {
      chart: 'bluecompute-bluecompute-0.0.6',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
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

app.bluecomputeGrafanaSecret = new solsa.core.v1.Secret({
  metadata: {
    labels: {
      app: 'bluecompute-grafana',
      chart: 'ibm-icpmonitoring-1.1.0',
      component: 'grafana',
      release: 'bluecompute',
      heritage: 'Tiller'
    },
    name: 'bluecompute-grafana-secret'
  },
  type: 'Opaque',
  data: { username: 'YWRtaW4=', password: 'YWRtaW4=' }
})

app.bluecomputeBindingRefarchComposeForElasticsearch_Secret = new solsa.core.v1.Secret({
  metadata: {
    name: 'bluecompute-binding-refarch-compose-for-elasticsearch',
    namespace: 'bluecompute',
    labels: {
      datastore: 'elasticsearch',
      release: 'bluecompute',
      chart: 'bluecompute-ibmcase-elasticsearch-0.0.1'
    }
  },
  type: 'Opaque',
  data: {
    binding: 'eyJ1cmkiOiJodHRwOi8vYmx1ZWNvbXB1dGUtY2F0YWxvZy1lbGFzdGljc2VhcmNoOjkyMDAvIn0='
  }
})

app.bluecomputeInventoryMysqlSecret = new solsa.core.v1.Secret({
  metadata: {
    name: 'bluecompute-inventory-mysql-secret',
    labels: {
      chart: 'bluecompute-inventory-0.0.1',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  },
  type: 'Opaque',
  data: { 'mysql-password': 'cGFzc3dvcmQ=' }
})

app.bluecomputeInventorydb_Secret = new solsa.core.v1.Secret({
  metadata: {
    name: 'bluecompute-inventorydb',
    labels: {
      app: 'bluecompute-inventorydb',
      chart: 'inventorydb-0.0.1',
      release: 'bluecompute',
      heritage: 'Tiller',
      implementation: 'microprofile'
    }
  },
  type: 'Opaque',
  data: { 'mysql-root-password': 'cGFzc3dvcmQ=', 'mysql-password': 'cGFzc3dvcmQ=' }
})

app.bluecomputeMariadb_Secret = new solsa.core.v1.Secret({
  metadata: {
    name: 'bluecompute-mariadb',
    labels: { app: 'mariadb', chart: 'mariadb-5.2.2', release: 'bluecompute', heritage: 'Tiller' }
  },
  type: 'Opaque',
  data: { 'mariadb-root-password': 'cGFzc3dvcmQ=', 'mariadb-password': 'cGFzc3dvcmQ=' }
})

app.bluecomputeMysql_Secret = new solsa.core.v1.Secret({
  metadata: {
    name: 'bluecompute-mysql',
    labels: {
      app: 'bluecompute-mysql',
      chart: 'mysql-0.10.2',
      release: 'bluecompute',
      heritage: 'Tiller'
    }
  },
  type: 'Opaque',
  data: { 'mysql-root-password': 'cGFzc3dvcmQ=', 'mysql-password': 'cGFzc3dvcmQ=' }
})

app.bluecomputeOrdersMariadbSecret = new solsa.core.v1.Secret({
  metadata: {
    name: 'bluecompute-orders-mariadb-secret',
    labels: {
      chart: 'bluecompute-orders-0.0.1',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  },
  type: 'Opaque',
  data: { 'mariadb-password': 'cGFzc3dvcmQ=' }
})

app.bluecomputeOrdersdb_Secret = new solsa.core.v1.Secret({
  metadata: {
    name: 'bluecompute-ordersdb',
    labels: {
      app: 'bluecompute-ordersdb',
      chart: 'ordersdb-0.0.1',
      release: 'bluecompute',
      heritage: 'Tiller',
      implementation: 'microprofile'
    }
  },
  type: 'Opaque',
  data: { 'mysql-root-password': 'cGFzc3dvcmQ=', 'mysql-password': 'cGFzc3dvcmQ=' }
})

app.bluecomputeCatalogConfig_ConfigMap = new solsa.core.v1.ConfigMap({
  metadata: { name: 'bluecompute-catalog-config' },
  data: {
    'jvm.options': '\n' +
      '-Dclient.InventoryServiceClient/mp-rest/url=http://bluecompute-inventory:9080/inventory/rest/inventory\n'
  }
})

app.bluecomputeCustomerConfig_ConfigMap = new solsa.core.v1.ConfigMap({
  metadata: { name: 'bluecompute-customer-config' },
  data: {
    'jvm.options': '-Dapplication.rest.client.CloudantClientService/mp-rest/url=http://bluecompute-cloudant-service:80\n'
  }
})

app.bluecomputePrometheusAlertrules_ConfigMap = new solsa.core.v1.ConfigMap({
  metadata: {
    labels: {
      app: 'bluecompute-prometheus',
      chart: 'ibm-icpmonitoring-1.1.0',
      component: 'prometheus',
      release: 'bluecompute',
      heritage: 'Tiller'
    },
    name: 'bluecompute-prometheus-alertrules'
  },
  data: { 'alert.rules': '' }
})

app.bluecomputePrometheusAlertmanager_ConfigMap = new solsa.core.v1.ConfigMap({
  metadata: {
    labels: {
      app: 'bluecompute-prometheus',
      chart: 'ibm-icpmonitoring-1.1.0',
      component: 'alertmanager',
      release: 'bluecompute',
      heritage: 'Tiller'
    },
    name: 'bluecompute-prometheus-alertmanager'
  },
  data: {
    'alertmanager.yml': 'global:\n' +
      'receivers:\n' +
      '  - name: default-receiver\n' +
      'route:\n' +
      '  group_wait: 10s\n' +
      '  group_interval: 5m\n' +
      '  receiver: default-receiver\n' +
      '  repeat_interval: 3h'
  }
})

app.bluecomputeGrafana_ConfigMap = new solsa.core.v1.ConfigMap({
  metadata: {
    labels: {
      app: 'bluecompute-grafana',
      chart: 'ibm-icpmonitoring-1.1.0',
      component: 'grafana',
      release: 'bluecompute',
      heritage: 'Tiller'
    },
    name: 'bluecompute-grafana'
  },
  data: {
    'grafana.ini': '; instance_name = ${HOSTNAME}\n' +
      '[paths]\n' +
      'data = /var/lib/grafana/data\n' +
      'logs = /var/log/grafana\n' +
      'plugins = /var/lib/grafana/plugins\n' +
      '\n' +
      '[server]\n' +
      ';protocol = http\n' +
      ';http_addr =\n' +
      'http_port = 3000\n' +
      ';domain = localhost\n' +
      ';enforce_domain = false\n' +
      ';router_logging = false\n' +
      ';static_root_path = public\n' +
      ';enable_gzip = false\n' +
      ';cert_file =\n' +
      ';cert_key =\n' +
      '\n' +
      '[database]\n' +
      ';type = sqlite3\n' +
      ';host = 127.0.0.1:3306\n' +
      ';name = grafana\n' +
      ';user = root\n' +
      ';password =\n' +
      ';ssl_mode = disable\n' +
      ';path = grafana.db\n' +
      '\n' +
      '[session]\n' +
      ';provider = file\n' +
      ';provider_config = sessions\n' +
      ';cookie_name = grafana_sess\n' +
      ';cookie_secure = false\n' +
      ';session_life_time = 86400\n' +
      '\n' +
      '[analytics]\n' +
      ';reporting_enabled = true\n' +
      'check_for_updates = true\n' +
      ';google_analytics_ua_id =\n' +
      '\n' +
      '[security]\n' +
      ';admin_user = admin\n' +
      ';admin_password = admin\n' +
      ';secret_key = SW2YcwTIb9zpOOhoPsMm\n' +
      ';login_remember_days = 7\n' +
      ';cookie_username = grafana_user\n' +
      ';cookie_remember_name = grafana_remember\n' +
      ';disable_gravatar = false\n' +
      ';data_source_proxy_whitelist =\n' +
      '\n' +
      '[snapshots]\n' +
      ';external_enabled = true\n' +
      ';external_snapshot_url = https://snapshots-origin.raintank.io\n' +
      ';external_snapshot_name = Publish to snapshot.raintank.io\n' +
      '\n' +
      '[users]\n' +
      ';allow_sign_up = true\n' +
      ';allow_org_create = true\n' +
      ';auto_assign_org = true\n' +
      ';auto_assign_org_role = Viewer\n' +
      ';login_hint = email or username\n' +
      'default_theme = light\n' +
      '\n' +
      '[auth.anonymous]\n' +
      ';enabled = true\n' +
      ';org_name = Main Org.\n' +
      ';org_role = Admin\n' +
      '\n' +
      '[auth.github]\n' +
      ';enabled = false\n' +
      ';allow_sign_up = false\n' +
      ';client_id = some_id\n' +
      ';client_secret = some_secret\n' +
      ';scopes = user:email,read:org\n' +
      ';auth_url = https://github.com/login/oauth/authorize\n' +
      ';token_url = https://github.com/login/oauth/access_token\n' +
      ';api_url = https://api.github.com/user\n' +
      ';team_ids =\n' +
      ';allowed_organizations =\n' +
      '\n' +
      '[auth.google]\n' +
      ';enabled = false\n' +
      ';allow_sign_up = false\n' +
      ';client_id = some_client_id\n' +
      ';client_secret = some_client_secret\n' +
      ';scopes = https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email\n' +
      ';auth_url = https://accounts.google.com/o/oauth2/auth\n' +
      ';token_url = https://accounts.google.com/o/oauth2/token\n' +
      ';api_url = https://www.googleapis.com/oauth2/v1/userinfo\n' +
      ';allowed_domains =\n' +
      '\n' +
      '[auth.proxy]\n' +
      ';enabled = false\n' +
      ';header_name = X-WEBAUTH-USER\n' +
      ';header_property = username\n' +
      ';auto_sign_up = true\n' +
      '\n' +
      '[auth.basic]\n' +
      ';enabled = true\n' +
      '\n' +
      '[auth.ldap]\n' +
      ';enabled = false\n' +
      ';config_file = /etc/grafana/ldap.toml\n' +
      '\n' +
      '[smtp]\n' +
      ';enabled = false\n' +
      ';host = localhost:25\n' +
      ';user =\n' +
      ';password =\n' +
      ';cert_file =\n' +
      ';key_file =\n' +
      ';skip_verify = false\n' +
      ';from_address = admin@grafana.localhost\n' +
      '\n' +
      '[emails]\n' +
      ';welcome_email_on_sign_up = false\n' +
      '\n' +
      '[log]\n' +
      'mode = console\n' +
      'level = info\n' +
      '\n' +
      '[log.console]\n' +
      ';level =\n' +
      ';format = console\n' +
      '\n' +
      '[event_publisher]\n' +
      ';enabled = false\n' +
      ';rabbitmq_url = amqp://localhost/\n' +
      ';exchange = grafana_events\n' +
      '\n' +
      '[dashboards.json]\n' +
      'enabled = true\n' +
      'path = /etc/dashboards\n' +
      '\n' +
      '[metrics]\n' +
      ';enabled           = true\n' +
      ';interval_seconds  = 10\n' +
      '\n' +
      '; [metrics.graphite]\n' +
      '; address = localhost:2003\n' +
      '; prefix = prod.grafana.%(instance_name)s.\n' +
      '\n' +
      '[grafana_com]\n' +
      'url = https://grafana.com'
  }
})

app.bluecomputeGrafanaDashboards_ConfigMap = new solsa.core.v1.ConfigMap({
  metadata: {
    labels: {
      app: 'bluecompute-grafana',
      chart: 'ibm-icpmonitoring-1.1.0',
      component: 'grafana',
      release: 'bluecompute',
      heritage: 'Tiller'
    },
    name: 'bluecompute-grafana-dashboards'
  },
  data: {
    'prometheus-monitoring.json': '{\n' +
      '  "__inputs": [\n' +
      '    {\n' +
      '      "name": "DS_PROMETHEUS",\n' +
      '      "label": "Prometheus",\n' +
      '      "description": "Prometheus which you want to monitor",\n' +
      '      "type": "datasource",\n' +
      '      "pluginId": "prometheus",\n' +
      '      "pluginName": "Prometheus"\n' +
      '    }\n' +
      '  ],\n' +
      '  "__requires": [\n' +
      '    {\n' +
      '      "type": "grafana",\n' +
      '      "id": "grafana",\n' +
      '      "name": "Grafana",\n' +
      '      "version": "4.6.0"\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "panel",\n' +
      '      "id": "graph",\n' +
      '      "name": "Graph",\n' +
      '      "version": ""\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "datasource",\n' +
      '      "id": "prometheus",\n' +
      '      "name": "Prometheus",\n' +
      '      "version": "1.0.0"\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "panel",\n' +
      '      "id": "singlestat",\n' +
      '      "name": "Singlestat",\n' +
      '      "version": ""\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "panel",\n' +
      '      "id": "text",\n' +
      '      "name": "Text",\n' +
      '      "version": ""\n' +
      '    }\n' +
      '  ],\n' +
      '  "annotations": {\n' +
      '    "list": []\n' +
      '  },\n' +
      '  "description": "Dashboard for monitoring of Prometheus v2.x.x",\n' +
      '  "editable": true,\n' +
      '  "gnetId": 3681,\n' +
      '  "graphTooltip": 1,\n' +
      '  "hideControls": false,\n' +
      '  "id": null,\n' +
      '  "links": [\n' +
      '    {\n' +
      '      "icon": "doc",\n' +
      '      "tags": [],\n' +
      '      "targetBlank": true,\n' +
      '      "title": "Prometheus Docs",\n' +
      '      "tooltip": "",\n' +
      '      "type": "link",\n' +
      '      "url": "http://prometheus.io/docs/introduction/overview/"\n' +
      '    }\n' +
      '  ],\n' +
      '  "refresh": "5m",\n' +
      '  "rows": [\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 161,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "#299c46",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "#bf1b00"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 1,\n' +
      '          "format": "s",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 1000000,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "id": 41,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "time() - process_start_time_seconds{instance=\\"$instance\\"}",\n' +
      '              "format": "time_series",\n' +
      '              "instant": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "refId": "A"\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Uptime",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "80%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": true,\n' +
      '          "colors": [\n' +
      '            "#299c46",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "#bf1b00"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "format": "short",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 1000000,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "id": 42,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 4,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "prometheus_tsdb_head_series{instance=\\"$instance\\"}",\n' +
      '              "format": "time_series",\n' +
      '              "instant": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "refId": "A"\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "500000,800000,1000000",\n' +
      '          "title": "Total count of time series",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "150%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "#299c46",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "#d44a3a"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "format": "none",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "id": 48,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "version",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "prometheus_build_info{instance=\\"$instance\\"}",\n' +
      '              "format": "table",\n' +
      '              "instant": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "refId": "A"\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Version",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "80%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "avg"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "#299c46",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "#d44a3a"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "format": "ms",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "id": 49,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "prometheus_tsdb_head_max_time{instance=\\"$instance\\"} - prometheus_tsdb_head_min_time{instance=\\"$instance\\"}",\n' +
      '              "format": "time_series",\n' +
      '              "instant": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "refId": "A"\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Actual head block length",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "80%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "content": "<img src=\\"https://cdn.worldvectorlogo.com/logos/prometheus.svg\\"/ height=\\"140px\\">",\n' +
      '          "height": "",\n' +
      '          "id": 50,\n' +
      '          "links": [],\n' +
      '          "mode": "html",\n' +
      '          "span": 1,\n' +
      '          "title": "",\n' +
      '          "transparent": true,\n' +
      '          "type": "text"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": true,\n' +
      '          "colors": [\n' +
      '            "#e6522c",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "#299c46"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 1,\n' +
      '          "format": "none",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "id": 52,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 1,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "2",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "refId": "A"\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "10,20",\n' +
      '          "title": "",\n' +
      '          "transparent": true,\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "200%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "avg"\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": false,\n' +
      '      "title": "Header instance info",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": "250",\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 15,\n' +
      '          "legend": {\n' +
      '            "avg": true,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 4,\n' +
      '          "stack": true,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "max(prometheus_engine_query_duration_seconds{instance=\\"$instance\\"}) by (instance, slice)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "max duration for {{slice}}",\n' +
      '              "metric": "prometheus_local_storage_rushed_mode",\n' +
      '              "refId": "A",\n' +
      '              "step": 900\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Query elapsed time",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "s",\n' +
      '              "label": "",\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max to persist": "#3F6833"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 17,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 4,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_tsdb_head_series_created_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "created on {{ instance }}",\n' +
      '              "metric": "prometheus_local_storage_maintain_series_duration_seconds_count",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_tsdb_head_series_removed_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance) * -1",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "removed on {{ instance }}",\n' +
      '              "refId": "B"\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Head series created/deleted",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max to persist": "#3F6833"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 13,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 4,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_target_scrapes_exceeded_sample_limit_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance) > 0",\n' +
      '              "format": "time_series",\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "exceeded_sample_limit on {{ instance }}",\n' +
      '              "metric": "prometheus_local_storage_chunk_ops_total",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_target_scrapes_sample_duplicate_timestamp_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance) > 0",\n' +
      '              "format": "time_series",\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "duplicate_timestamp on {{ instance }}",\n' +
      '              "metric": "prometheus_local_storage_chunk_ops_total",\n' +
      '              "refId": "B",\n' +
      '              "step": 1800\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_target_scrapes_sample_out_of_bounds_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance) > 0",\n' +
      '              "format": "time_series",\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "out_of_bounds on {{ instance }}",\n' +
      '              "metric": "prometheus_local_storage_chunk_ops_total",\n' +
      '              "refId": "C",\n' +
      '              "step": 1800\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_target_scrapes_sample_out_of_order_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance) > 0",\n' +
      '              "format": "time_series",\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "out_of_order on {{ instance }}",\n' +
      '              "metric": "prometheus_local_storage_chunk_ops_total",\n' +
      '              "refId": "D",\n' +
      '              "step": 1800\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_rule_evaluation_failures_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance) > 0",\n' +
      '              "format": "time_series",\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "rule_evaluation_failure on {{ instance }}",\n' +
      '              "metric": "prometheus_local_storage_chunk_ops_total",\n' +
      '              "refId": "G",\n' +
      '              "step": 1800\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_tsdb_compactions_failed_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance) > 0",\n' +
      '              "format": "time_series",\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "tsdb_compactions_failed on {{ instance }}",\n' +
      '              "metric": "prometheus_local_storage_chunk_ops_total",\n' +
      '              "refId": "K",\n' +
      '              "step": 1800\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_tsdb_reloads_failures_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance) > 0",\n' +
      '              "format": "time_series",\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "tsdb_reloads_failures on {{ instance }}",\n' +
      '              "metric": "prometheus_local_storage_chunk_ops_total",\n' +
      '              "refId": "L",\n' +
      '              "step": 1800\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_tsdb_head_series_not_found{instance=\\"$instance\\"}[$aggregation_interval])) by (instance) > 0",\n' +
      '              "format": "time_series",\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "head_series_not_found on {{ instance }}",\n' +
      '              "metric": "prometheus_local_storage_chunk_ops_total",\n' +
      '              "refId": "N",\n' +
      '              "step": 1800\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_evaluator_iterations_missed_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance) > 0",\n' +
      '              "format": "time_series",\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "evaluator_iterations_missed on {{ instance }}",\n' +
      '              "metric": "prometheus_local_storage_chunk_ops_total",\n' +
      '              "refId": "O",\n' +
      '              "step": 1800\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_evaluator_iterations_skipped_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance) > 0",\n' +
      '              "format": "time_series",\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "evaluator_iterations_skipped on {{ instance }}",\n' +
      '              "metric": "prometheus_local_storage_chunk_ops_total",\n' +
      '              "refId": "P",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Prometheus errors",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": false,\n' +
      '      "title": "Main info",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 250,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "description": "",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "grid": {},\n' +
      '          "id": 25,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": true,\n' +
      '            "current": true,\n' +
      '            "max": true,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "sort": "max",\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 6,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "prometheus_target_interval_length_seconds{instance=\\"$instance\\",quantile=\\"0.99\\"} - $scrape_interval",\n' +
      '              "format": "time_series",\n' +
      '              "interval": "2m",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "{{instance}}",\n' +
      '              "metric": "",\n' +
      '              "refId": "A",\n' +
      '              "step": 300\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Scrape delay (counts with 1m scrape interval)",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "s",\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max to persist": "#3F6833"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 14,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [\n' +
      '            {\n' +
      '              "alias": "Queue length",\n' +
      '              "yaxis": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 6,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(prometheus_evaluator_duration_seconds{instance=\\"$instance\\"}) by (instance, quantile)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Queue length",\n' +
      '              "metric": "prometheus_local_storage_indexing_queue_length",\n' +
      '              "refId": "B",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Rule evaulation duration",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "s",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": true,\n' +
      '      "title": "Scrape & rule duration",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 250,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max to persist": "#3F6833"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 18,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 3,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(increase(http_requests_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance, handler) > 0",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{ handler }} on {{ instance }}",\n' +
      '              "metric": "",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Request count",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "none",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max to persist": "#3F6833"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 16,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "hideEmpty": true,\n' +
      '            "hideZero": true,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 3,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "max(sum(http_request_duration_microseconds{instance=\\"$instance\\"}) by (instance, handler, quantile)) by (instance, handler) > 0",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{ handler }} on {{ instance }}",\n' +
      '              "refId": "B"\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Request duration per handler",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "µs",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max to persist": "#3F6833"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 19,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 3,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(increase(http_request_size_bytes{instance=\\"$instance\\", quantile=\\"0.99\\"}[$aggregation_interval])) by (instance, handler) > 0",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{ handler }} in {{ instance }}",\n' +
      '              "refId": "B"\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Request size by handler",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "bytes",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Allocated bytes": "#F9BA8F",\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max count collector": "#bf1b00",\n' +
      '            "Max count harvester": "#bf1b00",\n' +
      '            "Max to persist": "#3F6833",\n' +
      '            "RSS": "#890F02"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 8,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [\n' +
      '            {\n' +
      '              "alias": "/Max.*/",\n' +
      '              "fill": 0,\n' +
      '              "linewidth": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 3,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(prometheus_engine_queries{instance=\\"$instance\\"}) by (instance, handler)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Current count ",\n' +
      '              "metric": "last",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(prometheus_engine_queries_concurrent_max{instance=\\"$instance\\"}) by (instance, handler)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Max count",\n' +
      '              "metric": "last",\n' +
      '              "refId": "B",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Cont of concurent queries",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": true,\n' +
      '      "title": "Requests & queries",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 250,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Alert queue capacity on o collector": "#bf1b00",\n' +
      '            "Alert queue capacity on o harvester": "#bf1b00",\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max to persist": "#3F6833"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 20,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [\n' +
      '            {\n' +
      '              "alias": "/.*capacity.*/",\n' +
      '              "fill": 0,\n' +
      '              "linewidth": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 4,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(prometheus_notifications_queue_capacity{instance=\\"$instance\\"})by (instance)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Alert queue capacity ",\n' +
      '              "metric": "prometheus_local_storage_checkpoint_last_size_bytes",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(prometheus_notifications_queue_length{instance=\\"$instance\\"})by (instance)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Alert queue size on ",\n' +
      '              "metric": "prometheus_local_storage_checkpoint_last_size_bytes",\n' +
      '              "refId": "B",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Alert queue size",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "bytes",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max to persist": "#3F6833"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 21,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 4,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(prometheus_notifications_alertmanagers_discovered{instance=\\"$instance\\"}) by (instance)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Checkpoint chunks written/s",\n' +
      '              "metric": "prometheus_local_storage_checkpoint_series_chunks_written_sum",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Count of discovered alertmanagers",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "none",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max to persist": "#3F6833"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 39,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 4,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_notifications_dropped_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance) > 0",\n' +
      '              "format": "time_series",\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "notifications_dropped on {{ instance }}",\n' +
      '              "metric": "prometheus_local_storage_chunk_ops_total",\n' +
      '              "refId": "F",\n' +
      '              "step": 1800\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_rule_evaluation_failures_total{rule_type=\\"alerting\\",instance=\\"$instance\\"}[$aggregation_interval])) by (rule_type,instance) > 0",\n' +
      '              "format": "time_series",\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "rule_evaluation_failures on {{ instance }}",\n' +
      '              "metric": "prometheus_local_storage_chunk_ops_total",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Alerting errors",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": true,\n' +
      '      "title": "Alerting",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 250,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "fill": 1,\n' +
      '          "id": 36,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 3,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_tsdb_reloads_total{instance=\\"$instance\\"}[30m])) by (instance)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{ instance }}",\n' +
      '              "refId": "A"\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Reloaded block from disk",\n' +
      '          "tooltip": {\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max to persist": "#3F6833"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 5,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 3,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(prometheus_tsdb_blocks_loaded{instance=\\"$instance\\"}) by (instance)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Loaded data blocks",\n' +
      '              "metric": "prometheus_local_storage_memory_chunkdescs",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Loaded data blocks",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max to persist": "#3F6833"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 3,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 3,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "prometheus_tsdb_head_series{instance=\\"$instance\\"}",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Time series count",\n' +
      '              "metric": "prometheus_local_storage_memory_series",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Time series total count",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 1,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 3,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(rate(prometheus_tsdb_head_samples_appended_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "samples/s {{instance}}",\n' +
      '              "metric": "prometheus_local_storage_ingested_samples_total",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Samples Appended per second",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": "",\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": true,\n' +
      '      "title": "TSDB stats",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 250,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max to persist": "#3F6833",\n' +
      '            "To persist": "#9AC48A"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 2,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [\n' +
      '            {\n' +
      '              "alias": "/Max.*/",\n' +
      '              "fill": 0\n' +
      '            }\n' +
      '          ],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 4,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(prometheus_tsdb_head_chunks{instance=\\"$instance\\"}) by (instance)",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Head chunk count",\n' +
      '              "metric": "prometheus_local_storage_memory_chunks",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Head chunks count",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "fill": 1,\n' +
      '          "id": 35,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 4,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "max(prometheus_tsdb_head_max_time{instance=\\"$instance\\"}) by (instance) - min(prometheus_tsdb_head_min_time{instance=\\"$instance\\"}) by (instance)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{ instance }}",\n' +
      '              "refId": "A"\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Length of head block",\n' +
      '          "tooltip": {\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "ms",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max to persist": "#3F6833"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 4,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 4,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(rate(prometheus_tsdb_head_chunks_created_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "created on {{ instance }}",\n' +
      '              "refId": "B"\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(rate(prometheus_tsdb_head_chunks_removed_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance) * -1",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "deleted on {{ instance }}",\n' +
      '              "refId": "C"\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Head Chunks Created/Deleted per second",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": true,\n' +
      '      "title": "Head block stats",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 250,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "fill": 1,\n' +
      '          "id": 33,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 3,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(increase(prometheus_tsdb_compaction_duration_sum{instance=\\"$instance\\"}[30m]) / increase(prometheus_tsdb_compaction_duration_count{instance=\\"$instance\\"}[30m])) by (instance)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{ instance }}",\n' +
      '              "refId": "B"\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Compaction duration",\n' +
      '          "tooltip": {\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "s",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "fill": 1,\n' +
      '          "id": 34,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 3,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(prometheus_tsdb_head_gc_duration_seconds{instance=\\"$instance\\"}) by (instance, quantile)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{ quantile }} on {{ instance }}",\n' +
      '              "refId": "A"\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Go Garbage collection duration",\n' +
      '          "tooltip": {\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "s",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "fill": 1,\n' +
      '          "id": 37,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 3,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(prometheus_tsdb_wal_truncate_duration_seconds{instance=\\"$instance\\"}) by (instance, quantile)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{ quantile }} on {{ instance }}",\n' +
      '              "refId": "A"\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "WAL truncate duration seconds",\n' +
      '          "tooltip": {\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "fill": 1,\n' +
      '          "id": 38,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 3,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(tsdb_wal_fsync_duration_seconds{instance=\\"$instance\\"}) by (instance, quantile)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{ quantile }} {{ instance }}",\n' +
      '              "refId": "A"\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "WAL fsync duration seconds",\n' +
      '          "tooltip": {\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "s",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": true,\n' +
      '      "title": "Data maintenance",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 250,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Allocated bytes": "#7EB26D",\n' +
      '            "Allocated bytes - 1m max": "#BF1B00",\n' +
      '            "Allocated bytes - 1m min": "#BF1B00",\n' +
      '            "Allocated bytes - 5m max": "#BF1B00",\n' +
      '            "Allocated bytes - 5m min": "#BF1B00",\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max to persist": "#3F6833",\n' +
      '            "RSS": "#447EBC"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": null,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 6,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [\n' +
      '            {\n' +
      '              "alias": "/-/",\n' +
      '              "fill": 0\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "collector heap size",\n' +
      '              "color": "#E0752D",\n' +
      '              "fill": 0,\n' +
      '              "linewidth": 2\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "collector kubernetes memory limit",\n' +
      '              "color": "#BF1B00",\n' +
      '              "fill": 0,\n' +
      '              "linewidth": 3\n' +
      '            }\n' +
      '          ],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 4,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(process_resident_memory_bytes{instance=\\"$instance\\"}) by (instance)",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Total resident memory - {{instance}}",\n' +
      '              "metric": "process_resident_memory_bytes",\n' +
      '              "refId": "B",\n' +
      '              "step": 1800\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(go_memstats_alloc_bytes{instance=\\"$instance\\"}) by (instance)",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Total llocated bytes - {{instance}}",\n' +
      '              "metric": "go_memstats_alloc_bytes",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Memory",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "bytes",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Allocated bytes": "#F9BA8F",\n' +
      '            "Chunks": "#1F78C1",\n' +
      '            "Chunks to persist": "#508642",\n' +
      '            "Max chunks": "#052B51",\n' +
      '            "Max to persist": "#3F6833",\n' +
      '            "RSS": "#890F02"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 7,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 4,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "rate(go_memstats_alloc_bytes_total{instance=\\"$instance\\"}[$aggregation_interval])",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Allocated Bytes/s",\n' +
      '              "metric": "go_memstats_alloc_bytes",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Allocations per second",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "bytes",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "id": 9,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": false,\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "hideEmpty": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 4,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(rate(process_cpu_seconds_total{instance=\\"$instance\\"}[$aggregation_interval])) by (instance)",\n' +
      '              "format": "time_series",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "CPU/s",\n' +
      '              "metric": "prometheus_local_storage_ingested_samples_total",\n' +
      '              "refId": "B",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "CPU per second",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": [\n' +
      '              "avg"\n' +
      '            ]\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "none",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": "0",\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": true,\n' +
      '      "title": "RAM&CPU",\n' +
      '      "titleSize": "h6"\n' +
      '    }\n' +
      '  ],\n' +
      '  "schemaVersion": 14,\n' +
      '  "style": "dark",\n' +
      '  "tags": [\n' +
      '    "prometheus"\n' +
      '  ],\n' +
      '  "templating": {\n' +
      '    "list": [\n' +
      '      {\n' +
      '        "auto": true,\n' +
      '        "auto_count": 30,\n' +
      '        "auto_min": "2m",\n' +
      '        "current": {\n' +
      '          "text": "auto",\n' +
      '          "value": "$__auto_interval"\n' +
      '        },\n' +
      '        "hide": 0,\n' +
      '        "label": "aggregation interval",\n' +
      '        "name": "aggregation_interval",\n' +
      '        "options": [\n' +
      '          {\n' +
      '            "selected": true,\n' +
      '            "text": "auto",\n' +
      '            "value": "$__auto_interval"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "1m",\n' +
      '            "value": "1m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "10m",\n' +
      '            "value": "10m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "30m",\n' +
      '            "value": "30m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "1h",\n' +
      '            "value": "1h"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "6h",\n' +
      '            "value": "6h"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "12h",\n' +
      '            "value": "12h"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "1d",\n' +
      '            "value": "1d"\n' +
      '          }\n' +
      '        ],\n' +
      '        "query": "1m,10m,30m,1h,6h,12h,1d",\n' +
      '        "refresh": 2,\n' +
      '        "type": "interval"\n' +
      '      },\n' +
      '      {\n' +
      '        "allValue": null,\n' +
      '        "current": {},\n' +
      '        "datasource": "prometheus",\n' +
      '        "hide": 0,\n' +
      '        "includeAll": false,\n' +
      '        "label": "Instance",\n' +
      '        "multi": false,\n' +
      '        "name": "instance",\n' +
      '        "options": [],\n' +
      '        "query": "label_values(prometheus_build_info, instance)",\n' +
      '        "refresh": 2,\n' +
      '        "regex": "",\n' +
      '        "sort": 2,\n' +
      '        "tagValuesQuery": "",\n' +
      '        "tags": [],\n' +
      '        "tagsQuery": "",\n' +
      '        "type": "query",\n' +
      '        "useTags": false\n' +
      '      },\n' +
      '      {\n' +
      '        "current": {\n' +
      '          "value": "60",\n' +
      '          "text": "60"\n' +
      '        },\n' +
      '        "hide": 0,\n' +
      '        "label": "Scrape interval seconds",\n' +
      '        "name": "scrape_interval",\n' +
      '        "options": [\n' +
      '          {\n' +
      '            "value": "60",\n' +
      '            "text": "60"\n' +
      '          }\n' +
      '        ],\n' +
      '        "query": "60",\n' +
      '        "type": "constant"\n' +
      '      }\n' +
      '    ]\n' +
      '  },\n' +
      '  "time": {\n' +
      '    "from": "now-1d",\n' +
      '    "to": "now"\n' +
      '  },\n' +
      '  "timepicker": {\n' +
      '    "refresh_intervals": [\n' +
      '      "5s",\n' +
      '      "10s",\n' +
      '      "30s",\n' +
      '      "1m",\n' +
      '      "5m",\n' +
      '      "15m",\n' +
      '      "30m",\n' +
      '      "1h",\n' +
      '      "2h"\n' +
      '    ],\n' +
      '    "time_options": [\n' +
      '      "5m",\n' +
      '      "15m",\n' +
      '      "1h",\n' +
      '      "6h",\n' +
      '      "12h",\n' +
      '      "24h"\n' +
      '    ]\n' +
      '  },\n' +
      '  "timezone": "browser",\n' +
      '  "title": "Prometheus Stats",\n' +
      '  "version": 8\n' +
      '}  ',
    'kubernetes-cluster-monitoring.json': '{\n' +
      '  "__inputs": [\n' +
      '    {\n' +
      '      "name": "DS_PROMETHEUS",\n' +
      '      "label": "Prometheus",\n' +
      '      "description": "",\n' +
      '      "type": "datasource",\n' +
      '      "pluginId": "prometheus",\n' +
      '      "pluginName": "Prometheus"\n' +
      '    }\n' +
      '  ],\n' +
      '  "__requires": [\n' +
      '    {\n' +
      '      "type": "panel",\n' +
      '      "id": "graph",\n' +
      '      "name": "Graph",\n' +
      '      "version": ""\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "panel",\n' +
      '      "id": "singlestat",\n' +
      '      "name": "Singlestat",\n' +
      '      "version": ""\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "grafana",\n' +
      '      "id": "grafana",\n' +
      '      "name": "Grafana",\n' +
      '      "version": "3.1.1"\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "datasource",\n' +
      '      "id": "prometheus",\n' +
      '      "name": "Prometheus",\n' +
      '      "version": "1.3.0"\n' +
      '    }\n' +
      '  ],\n' +
      '  "id": null,\n' +
      '  "title": "Kubernetes cluster monitoring (via Prometheus)",\n' +
      '  "description": "Monitors Kubernetes cluster using Prometheus. Shows overall cluster CPU / Memory / Filesystem usage as well as individual pod, containers, systemd services statistics. Uses cAdvisor metrics only.",\n' +
      '  "tags": [\n' +
      '    "kubernetes"\n' +
      '  ],\n' +
      '  "style": "dark",\n' +
      '  "timezone": "browser",\n' +
      '  "editable": true,\n' +
      '  "hideControls": false,\n' +
      '  "sharedCrosshair": false,\n' +
      '  "rows": [\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "editable": true,\n' +
      '      "height": "200px",\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)",\n' +
      '            "thresholdLine": false\n' +
      '          },\n' +
      '          "height": "200px",\n' +
      '          "id": 32,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": false,\n' +
      '            "avg": true,\n' +
      '            "current": true,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": false,\n' +
      '            "show": false,\n' +
      '            "sideWidth": 200,\n' +
      '            "sort": "current",\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_network_receive_bytes_total{kubernetes_io_hostname=~\\"^$Node$\\"}[5m]))",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "Received",\n' +
      '              "metric": "network",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "- sum (rate (container_network_transmit_bytes_total{kubernetes_io_hostname=~\\"^$Node$\\"}[5m]))",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "Sent",\n' +
      '              "metric": "network",\n' +
      '              "refId": "B",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Network I/O pressure",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "transparent": false,\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "Bps",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "Bps",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "title": "Network I/O pressure"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "editable": true,\n' +
      '      "height": "250px",\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": true,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "percent",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": true,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "180px",\n' +
      '          "id": 4,\n' +
      '          "interval": null,\n' +
      '          "isNew": true,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 4,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (container_memory_working_set_bytes{id=\\"/\\",kubernetes_io_hostname=~\\"^$Node$\\"}) / sum (machine_memory_bytes{kubernetes_io_hostname=~\\"^$Node$\\"}) * 100",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "65, 90",\n' +
      '          "title": "Cluster memory usage",\n' +
      '          "transparent": false,\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "80%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": true,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "percent",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": true,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "180px",\n' +
      '          "id": 6,\n' +
      '          "interval": null,\n' +
      '          "isNew": true,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 4,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_cpu_usage_seconds_total{id=\\"/\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) / sum (machine_cpu_cores{kubernetes_io_hostname=~\\"^$Node$\\"}) * 100",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "65, 90",\n' +
      '          "title": "Cluster CPU usage (5m avg)",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "80%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": true,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "percent",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": true,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "180px",\n' +
      '          "id": 7,\n' +
      '          "interval": null,\n' +
      '          "isNew": true,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 4,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (container_fs_usage_bytes{device=~\\"^/dev/[sv]da[1-9]$\\",id=\\"/\\",kubernetes_io_hostname=~\\"^$Node$\\"}) / sum (container_fs_limit_bytes{device=~\\"^/dev/[sv]da[1-9]$\\",id=\\"/\\",kubernetes_io_hostname=~\\"^$Node$\\"}) * 100",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "",\n' +
      '              "metric": "",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "65, 90",\n' +
      '          "title": "Cluster filesystem usage",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "80%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "bytes",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 9,\n' +
      '          "interval": null,\n' +
      '          "isNew": true,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "20%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "20%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (container_memory_working_set_bytes{id=\\"/\\",kubernetes_io_hostname=~\\"^$Node$\\"})",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Used",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "bytes",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 10,\n' +
      '          "interval": null,\n' +
      '          "isNew": true,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (machine_memory_bytes{kubernetes_io_hostname=~\\"^$Node$\\"})",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Total",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "none",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 11,\n' +
      '          "interval": null,\n' +
      '          "isNew": true,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": " cores",\n' +
      '          "postfixFontSize": "30%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_cpu_usage_seconds_total{id=\\"/\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m]))",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Used",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "none",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 12,\n' +
      '          "interval": null,\n' +
      '          "isNew": true,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": " cores",\n' +
      '          "postfixFontSize": "30%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (machine_cpu_cores{kubernetes_io_hostname=~\\"^$Node$\\"})",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Total",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "bytes",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 13,\n' +
      '          "interval": null,\n' +
      '          "isNew": true,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (container_fs_usage_bytes{device=~\\"^/dev/[sv]da[1-9]$\\",id=\\"/\\",kubernetes_io_hostname=~\\"^$Node$\\"})",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Used",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "bytes",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 14,\n' +
      '          "interval": null,\n' +
      '          "isNew": true,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (container_fs_limit_bytes{device=~\\"^/dev/[sv]da[1-9]$\\",id=\\"/\\",kubernetes_io_hostname=~\\"^$Node$\\"})",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Total",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        }\n' +
      '      ],\n' +
      '      "showTitle": false,\n' +
      '      "title": "Total usage"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "editable": true,\n' +
      '      "height": "250px",\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 3,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 0,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "height": "",\n' +
      '          "id": 17,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": true,\n' +
      '            "current": true,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": true,\n' +
      '            "show": true,\n' +
      '            "sort": "current",\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": true,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_cpu_usage_seconds_total{image!=\\"\\",name=~\\"^k8s_.*\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (pod_name)",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "{{ pod_name }}",\n' +
      '              "metric": "container_cpu",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Pods CPU usage (5m avg)",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "transparent": false,\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "none",\n' +
      '              "label": "cores",\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "showTitle": false,\n' +
      '      "title": "Pods CPU usage"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": true,\n' +
      '      "editable": true,\n' +
      '      "height": "250px",\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 3,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 0,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "height": "",\n' +
      '          "id": 23,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": true,\n' +
      '            "current": true,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": true,\n' +
      '            "show": true,\n' +
      '            "sort": "current",\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": true,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_cpu_usage_seconds_total{systemd_service_name!=\\"\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (systemd_service_name)",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "{{ systemd_service_name }}",\n' +
      '              "metric": "container_cpu",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "System services CPU usage (5m avg)",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "none",\n' +
      '              "label": "cores",\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "title": "System services CPU usage"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": true,\n' +
      '      "editable": true,\n' +
      '      "height": "250px",\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 3,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 0,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "height": "",\n' +
      '          "id": 24,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": true,\n' +
      '            "current": true,\n' +
      '            "hideEmpty": false,\n' +
      '            "hideZero": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": true,\n' +
      '            "show": true,\n' +
      '            "sideWidth": null,\n' +
      '            "sort": "current",\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": true,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_cpu_usage_seconds_total{image!=\\"\\",name=~\\"^k8s_.*\\",container_name!=\\"POD\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (container_name, pod_name)",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "pod: {{ pod_name }} | {{ container_name }}",\n' +
      '              "metric": "container_cpu",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_cpu_usage_seconds_total{image!=\\"\\",name!~\\"^k8s_.*\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (kubernetes_io_hostname, name, image)",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "docker: {{ kubernetes_io_hostname }} | {{ image }} ({{ name }})",\n' +
      '              "metric": "container_cpu",\n' +
      '              "refId": "B",\n' +
      '              "step": 10\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_cpu_usage_seconds_total{rkt_container_name!=\\"\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (kubernetes_io_hostname, rkt_container_name)",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "rkt: {{ kubernetes_io_hostname }} | {{ rkt_container_name }}",\n' +
      '              "metric": "container_cpu",\n' +
      '              "refId": "C",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Containers CPU usage (5m avg)",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "none",\n' +
      '              "label": "cores",\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "title": "Containers CPU usage"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": true,\n' +
      '      "editable": true,\n' +
      '      "height": "500px",\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 3,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 0,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 20,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": true,\n' +
      '            "current": true,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": false,\n' +
      '            "show": true,\n' +
      '            "sort": "current",\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": true,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_cpu_usage_seconds_total{id!=\\"/\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (id)",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "{{ id }}",\n' +
      '              "metric": "container_cpu",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "All processes CPU usage (5m avg)",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "none",\n' +
      '              "label": "cores",\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "showTitle": false,\n' +
      '      "title": "All processes CPU usage"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "editable": true,\n' +
      '      "height": "250px",\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 0,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 25,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": true,\n' +
      '            "current": true,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": true,\n' +
      '            "show": true,\n' +
      '            "sideWidth": 200,\n' +
      '            "sort": "current",\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": true,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (container_memory_working_set_bytes{image!=\\"\\",name=~\\"^k8s_.*\\",kubernetes_io_hostname=~\\"^$Node$\\"}) by (pod_name)",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "{{ pod_name }}",\n' +
      '              "metric": "container_memory_usage:sort_desc",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Pods memory usage",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "bytes",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "title": "Pods memory usage"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": true,\n' +
      '      "editable": true,\n' +
      '      "height": "250px",\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 0,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 26,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": true,\n' +
      '            "current": true,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": true,\n' +
      '            "show": true,\n' +
      '            "sideWidth": 200,\n' +
      '            "sort": "current",\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": true,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (container_memory_working_set_bytes{systemd_service_name!=\\"\\",kubernetes_io_hostname=~\\"^$Node$\\"}) by (systemd_service_name)",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "{{ systemd_service_name }}",\n' +
      '              "metric": "container_memory_usage:sort_desc",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "System services memory usage",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "bytes",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "title": "System services memory usage"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": true,\n' +
      '      "editable": true,\n' +
      '      "height": "250px",\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 0,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 27,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": true,\n' +
      '            "current": true,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": true,\n' +
      '            "show": true,\n' +
      '            "sideWidth": 200,\n' +
      '            "sort": "current",\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": true,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (container_memory_working_set_bytes{image!=\\"\\",name=~\\"^k8s_.*\\",container_name!=\\"POD\\",kubernetes_io_hostname=~\\"^$Node$\\"}) by (container_name, pod_name)",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "pod: {{ pod_name }} | {{ container_name }}",\n' +
      '              "metric": "container_memory_usage:sort_desc",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum (container_memory_working_set_bytes{image!=\\"\\",name!~\\"^k8s_.*\\",kubernetes_io_hostname=~\\"^$Node$\\"}) by (kubernetes_io_hostname, name, image)",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "docker: {{ kubernetes_io_hostname }} | {{ image }} ({{ name }})",\n' +
      '              "metric": "container_memory_usage:sort_desc",\n' +
      '              "refId": "B",\n' +
      '              "step": 10\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum (container_memory_working_set_bytes{rkt_container_name!=\\"\\",kubernetes_io_hostname=~\\"^$Node$\\"}) by (kubernetes_io_hostname, rkt_container_name)",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "rkt: {{ kubernetes_io_hostname }} | {{ rkt_container_name }}",\n' +
      '              "metric": "container_memory_usage:sort_desc",\n' +
      '              "refId": "C",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Containers memory usage",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "bytes",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "title": "Containers memory usage"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": true,\n' +
      '      "editable": true,\n' +
      '      "height": "500px",\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 0,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 28,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": true,\n' +
      '            "current": true,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": false,\n' +
      '            "show": true,\n' +
      '            "sideWidth": 200,\n' +
      '            "sort": "current",\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": true,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (container_memory_working_set_bytes{id!=\\"/\\",kubernetes_io_hostname=~\\"^$Node$\\"}) by (id)",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "{{ id }}",\n' +
      '              "metric": "container_memory_usage:sort_desc",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "All processes memory usage",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "bytes",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "title": "All processes memory usage"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "editable": true,\n' +
      '      "height": "250px",\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 16,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": true,\n' +
      '            "current": true,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": true,\n' +
      '            "show": true,\n' +
      '            "sideWidth": 200,\n' +
      '            "sort": "current",\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_network_receive_bytes_total{image!=\\"\\",name=~\\"^k8s_.*\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (pod_name)",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "-> {{ pod_name }}",\n' +
      '              "metric": "network",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "- sum (rate (container_network_transmit_bytes_total{image!=\\"\\",name=~\\"^k8s_.*\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (pod_name)",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "<- {{ pod_name }}",\n' +
      '              "metric": "network",\n' +
      '              "refId": "B",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Pods network I/O (5m avg)",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "Bps",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "title": "Pods network I/O"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": true,\n' +
      '      "editable": true,\n' +
      '      "height": "250px",\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 30,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": true,\n' +
      '            "current": true,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": true,\n' +
      '            "show": true,\n' +
      '            "sideWidth": 200,\n' +
      '            "sort": "current",\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_network_receive_bytes_total{image!=\\"\\",name=~\\"^k8s_.*\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (container_name, pod_name)",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "-> pod: {{ pod_name }} | {{ container_name }}",\n' +
      '              "metric": "network",\n' +
      '              "refId": "B",\n' +
      '              "step": 10\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "- sum (rate (container_network_transmit_bytes_total{image!=\\"\\",name=~\\"^k8s_.*\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (container_name, pod_name)",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "<- pod: {{ pod_name }} | {{ container_name }}",\n' +
      '              "metric": "network",\n' +
      '              "refId": "D",\n' +
      '              "step": 10\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_network_receive_bytes_total{image!=\\"\\",name!~\\"^k8s_.*\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (kubernetes_io_hostname, name, image)",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "-> docker: {{ kubernetes_io_hostname }} | {{ image }} ({{ name }})",\n' +
      '              "metric": "network",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "- sum (rate (container_network_transmit_bytes_total{image!=\\"\\",name!~\\"^k8s_.*\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (kubernetes_io_hostname, name, image)",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "<- docker: {{ kubernetes_io_hostname }} | {{ image }} ({{ name }})",\n' +
      '              "metric": "network",\n' +
      '              "refId": "C",\n' +
      '              "step": 10\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_network_transmit_bytes_total{rkt_container_name!=\\"\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (kubernetes_io_hostname, rkt_container_name)",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "-> rkt: {{ kubernetes_io_hostname }} | {{ rkt_container_name }}",\n' +
      '              "metric": "network",\n' +
      '              "refId": "E",\n' +
      '              "step": 10\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "- sum (rate (container_network_transmit_bytes_total{rkt_container_name!=\\"\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (kubernetes_io_hostname, rkt_container_name)",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "<- rkt: {{ kubernetes_io_hostname }} | {{ rkt_container_name }}",\n' +
      '              "metric": "network",\n' +
      '              "refId": "F",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Containers network I/O (5m avg)",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "Bps",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "title": "Containers network I/O"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": true,\n' +
      '      "editable": true,\n' +
      '      "height": "500px",\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 29,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": true,\n' +
      '            "current": true,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": false,\n' +
      '            "show": true,\n' +
      '            "sideWidth": 200,\n' +
      '            "sort": "current",\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_network_receive_bytes_total{id!=\\"/\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (id)",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "-> {{ id }}",\n' +
      '              "metric": "network",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "- sum (rate (container_network_transmit_bytes_total{id!=\\"/\\",kubernetes_io_hostname=~\\"^$Node$\\"}[5m])) by (id)",\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "<- {{ id }}",\n' +
      '              "metric": "network",\n' +
      '              "refId": "B",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "All processes network I/O (5m avg)",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "Bps",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "title": "All processes network I/O"\n' +
      '    }\n' +
      '  ],\n' +
      '  "time": {\n' +
      '    "from": "now-5m",\n' +
      '    "to": "now"\n' +
      '  },\n' +
      '  "timepicker": {\n' +
      '    "refresh_intervals": [\n' +
      '      "5s",\n' +
      '      "10s",\n' +
      '      "30s",\n' +
      '      "1m",\n' +
      '      "5m",\n' +
      '      "15m",\n' +
      '      "30m",\n' +
      '      "1h",\n' +
      '      "2h",\n' +
      '      "1d"\n' +
      '    ],\n' +
      '    "time_options": [\n' +
      '      "5m",\n' +
      '      "15m",\n' +
      '      "1h",\n' +
      '      "6h",\n' +
      '      "12h",\n' +
      '      "24h",\n' +
      '      "2d",\n' +
      '      "7d",\n' +
      '      "30d"\n' +
      '    ]\n' +
      '  },\n' +
      '  "templating": {\n' +
      '    "list": [\n' +
      '      {\n' +
      '        "allValue": ".*",\n' +
      '        "current": {},\n' +
      '        "datasource": "prometheus",\n' +
      '        "hide": 0,\n' +
      '        "includeAll": true,\n' +
      '        "multi": false,\n' +
      '        "name": "Node",\n' +
      '        "options": [],\n' +
      '        "query": "label_values(kubernetes_io_hostname)",\n' +
      '        "refresh": 1,\n' +
      '        "type": "query"\n' +
      '      }\n' +
      '    ]\n' +
      '  },\n' +
      '  "annotations": {\n' +
      '    "list": []\n' +
      '  },\n' +
      '  "refresh": "10s",\n' +
      '  "schemaVersion": 12,\n' +
      '  "version": 13,\n' +
      '  "links": [],\n' +
      '  "gnetId": 315\n' +
      '}  ',
    'docker-host-container-monitoring.json': '{\n' +
      '  "__inputs": [\n' +
      '    {\n' +
      '      "name": "DS_PROMETHEUS",\n' +
      '      "label": "Prometheus",\n' +
      '      "description": "",\n' +
      '      "type": "datasource",\n' +
      '      "pluginId": "prometheus",\n' +
      '      "pluginName": "Prometheus"\n' +
      '    }\n' +
      '  ],\n' +
      '  "__requires": [\n' +
      '    {\n' +
      '      "type": "panel",\n' +
      '      "id": "graph",\n' +
      '      "name": "Graph",\n' +
      '      "version": ""\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "panel",\n' +
      '      "id": "table",\n' +
      '      "name": "Table",\n' +
      '      "version": ""\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "grafana",\n' +
      '      "id": "grafana",\n' +
      '      "name": "Grafana",\n' +
      '      "version": "3.1.1"\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "datasource",\n' +
      '      "id": "prometheus",\n' +
      '      "name": "Prometheus",\n' +
      '      "version": "1.0.0"\n' +
      '    }\n' +
      '  ],\n' +
      '  "id": null,\n' +
      '  "title": "Docker Host & Container Overview",\n' +
      '  "tags": [\n' +
      '    "docker"\n' +
      '  ],\n' +
      '  "style": "dark",\n' +
      '  "timezone": "browser",\n' +
      '  "editable": true,\n' +
      '  "hideControls": false,\n' +
      '  "sharedCrosshair": true,\n' +
      '  "rows": [\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "editable": true,\n' +
      '      "height": 143.625,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "SENT": "#BF1B00"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 5,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 19,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null as zero",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 1,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 2,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(rate(container_network_receive_bytes_total{id=\\"/\\"}[$interval])) by (id)",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "RECEIVED",\n' +
      '              "refId": "A",\n' +
      '              "step": 4\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "- sum(rate(container_network_transmit_bytes_total{id=\\"/\\"}[$interval])) by (id)",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "SENT",\n' +
      '              "refId": "B",\n' +
      '              "step": 4\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Network Traffic on Node",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "transparent": false,\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "bytes",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Ops-Infrastructure": "#447EBC",\n' +
      '            "{}": "#DEDAF7"\n' +
      '          },\n' +
      '          "bars": true,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 0,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 3,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 7,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": false,\n' +
      '          "linewidth": 3,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null as zero",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 10,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 1.9899973849372385,\n' +
      '          "stack": true,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "count(rate(container_last_seen{name=~\\".+\\",container_group=\\"monitoring\\"}[$interval]))",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Monitoring",\n' +
      '              "metric": "container_last_seen",\n' +
      '              "refId": "A",\n' +
      '              "step": 4\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "count(rate(container_last_seen{name=~\\".+\\",container_group=\\"ops-infrastructure\\"}[$interval]))",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Backend-Infrastructure",\n' +
      '              "refId": "B",\n' +
      '              "step": 4\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "count(rate(container_last_seen{name=~\\".+\\",container_group=\\"backend-infrastructure\\"}[$interval]))",\n' +
      '              "hide": false,\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Backend-Workers",\n' +
      '              "refId": "C",\n' +
      '              "step": 4\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "count(rate(container_last_seen{name=~\\".+\\",container_group=\\"backend-workers\\"}[$interval]))",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Ops-Infrastructure",\n' +
      '              "refId": "D",\n' +
      '              "step": 4\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Running Containers (by Container Group)",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "none",\n' +
      '              "label": "",\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": 0,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "{id=\\"/\\",instance=\\"cadvisor:8080\\",job=\\"prometheus\\"}": "#BA43A9"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 3,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 5,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null as zero",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 2.0707047594142263,\n' +
      '          "stack": true,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(rate(container_cpu_system_seconds_total[2m]))",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "a",\n' +
      '              "refId": "B",\n' +
      '              "step": 120\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(rate(container_cpu_system_seconds_total{name=~\\".+\\"}[2m]))",\n' +
      '              "hide": true,\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "nur container",\n' +
      '              "refId": "F",\n' +
      '              "step": 10\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(rate(container_cpu_system_seconds_total{id=\\"/\\"}[2m]))",\n' +
      '              "hide": true,\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "nur docker host",\n' +
      '              "metric": "",\n' +
      '              "refId": "A",\n' +
      '              "step": 20\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(rate(process_cpu_seconds_total[$interval])) * 100",\n' +
      '              "hide": false,\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "host",\n' +
      '              "metric": "",\n' +
      '              "refId": "C",\n' +
      '              "step": 4\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(rate(container_cpu_system_seconds_total{name=~\\".+\\"}[2m])) + sum(rate(container_cpu_system_seconds_total{id=\\"/\\"}[2m])) + sum(rate(process_cpu_seconds_total[2m]))",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "",\n' +
      '              "refId": "D",\n' +
      '              "step": 120\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "CPU Usage on Node",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "percent",\n' +
      '              "label": "",\n' +
      '              "logBase": 1,\n' +
      '              "max": 120,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Belegete Festplatte": "#BF1B00",\n' +
      '            "Free Disk Space": "#7EB26D",\n' +
      '            "Used Disk Space": "#BF1B00",\n' +
      '            "{}": "#BF1B00"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 4,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 13,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 3,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null as zero",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 2,\n' +
      '          "stack": true,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "node_filesystem_free{fstype=\\"aufs\\"}",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Free Disk Space",\n' +
      '              "refId": "A",\n' +
      '              "step": 4\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "node_filesystem_size{fstype=\\"aufs\\"} - node_filesystem_free{fstype=\\"aufs\\"}",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Used Disk Space",\n' +
      '              "refId": "B",\n' +
      '              "step": 4\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Free and Used Disk Space on Node",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "bytes",\n' +
      '              "label": "",\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": 0,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "Available Memory": "#7EB26D",\n' +
      '            "Unavailable Memory": "#BF1B00"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 4,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 20,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 3,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null as zero",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 2,\n' +
      '          "stack": true,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "container_memory_rss{name=~\\".+\\"}",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{__name__}}",\n' +
      '              "refId": "D",\n' +
      '              "step": 30\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(container_memory_rss{name=~\\".+\\"})",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{__name__}}",\n' +
      '              "refId": "A",\n' +
      '              "step": 20\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "container_memory_usage_bytes{name=~\\".+\\"}",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{name}}",\n' +
      '              "refId": "B",\n' +
      '              "step": 20\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "container_memory_rss{id=\\"/\\"}",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{__name__}}",\n' +
      '              "refId": "C",\n' +
      '              "step": 30\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(container_memory_rss)",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{__name__}}",\n' +
      '              "refId": "E",\n' +
      '              "step": 30\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "node_memory_Buffers",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "node_memory_Dirty",\n' +
      '              "refId": "N",\n' +
      '              "step": 30\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "node_memory_MemFree",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{__name__}}",\n' +
      '              "refId": "F",\n' +
      '              "step": 30\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "node_memory_MemAvailable",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Available Memory",\n' +
      '              "refId": "H",\n' +
      '              "step": 4\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "node_memory_MemTotal - node_memory_MemAvailable",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Unavailable Memory",\n' +
      '              "refId": "G",\n' +
      '              "step": 4\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "node_memory_Inactive",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{__name__}}",\n' +
      '              "refId": "I",\n' +
      '              "step": 30\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "node_memory_KernelStack",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{__name__}}",\n' +
      '              "refId": "J",\n' +
      '              "step": 30\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "node_memory_Active",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{__name__}}",\n' +
      '              "refId": "K",\n' +
      '              "step": 30\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "node_memory_MemTotal - (node_memory_Active + node_memory_MemFree + node_memory_Inactive)",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Unknown",\n' +
      '              "refId": "L",\n' +
      '              "step": 40\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "node_memory_MemFree + node_memory_Inactive ",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{__name__}}",\n' +
      '              "refId": "M",\n' +
      '              "step": 30\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "container_memory_rss{name=~\\".+\\"}",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{__name__}}",\n' +
      '              "refId": "O",\n' +
      '              "step": 30\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "node_memory_Inactive + node_memory_MemFree + node_memory_MemAvailable",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "",\n' +
      '              "refId": "P",\n' +
      '              "step": 40\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Available Memory on Node",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "bytes",\n' +
      '              "label": "",\n' +
      '              "logBase": 1,\n' +
      '              "max": 4200000000,\n' +
      '              "min": 0,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 3,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": false,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null as zero",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 1.939297855648535,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(rate(node_disk_bytes_read[$interval])) by (device)",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "OUT on /{{device}}",\n' +
      '              "metric": "node_disk_bytes_read",\n' +
      '              "refId": "A",\n' +
      '              "step": 4\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(rate(node_disk_bytes_written[$interval])) by (device)",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "IN on /{{device}}",\n' +
      '              "metric": "",\n' +
      '              "refId": "B",\n' +
      '              "step": 4\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "refId": "C"\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Disk I/O on Node",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "Bps",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "title": "New row"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "editable": true,\n' +
      '      "height": 284.609375,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 5,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 1,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": true,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null as zero",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 6.0790694124949285,\n' +
      '          "stack": true,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(rate(container_cpu_usage_seconds_total{name=~\\".+\\"}[$interval])) by (name) * 100",\n' +
      '              "hide": false,\n' +
      '              "interval": "",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{name}}",\n' +
      '              "metric": "container_cp",\n' +
      '              "refId": "F",\n' +
      '              "step": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "CPU Usage per Container (Stacked)",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "percent",\n' +
      '              "label": "",\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {\n' +
      '            "node_load15": "#CCA300"\n' +
      '          },\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 0,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 4,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": true,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null as zero",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 5.920930587505071,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "{__name__=~\\"^node_load.*\\"}",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{__name__}}",\n' +
      '              "metric": "node",\n' +
      '              "refId": "A",\n' +
      '              "step": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "System Load on Node",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "title": "Row"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "editable": true,\n' +
      '      "height": 203.515625,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(247, 226, 2, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(244, 0, 0, 0.22)",\n' +
      '            "thresholdLine": false\n' +
      '          },\n' +
      '          "id": 9,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "hideEmpty": false,\n' +
      '            "hideZero": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": true,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null as zero",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 6,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(rate(container_network_transmit_bytes_total{name=~\\".+\\"}[$interval])) by (name)",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{name}}",\n' +
      '              "refId": "A",\n' +
      '              "step": 2\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "rate(container_network_transmit_bytes_total{id=\\"/\\"}[$interval])",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "",\n' +
      '              "refId": "B",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Sent Network Traffic per Container",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "transparent": false,\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "Bps",\n' +
      '              "label": "",\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": "",\n' +
      '              "logBase": 10,\n' +
      '              "max": 8,\n' +
      '              "min": 0,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 3,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 10,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": true,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null as zero",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 6,\n' +
      '          "stack": true,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(container_memory_rss{name=~\\".+\\"}) by (name)",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{name}}",\n' +
      '              "refId": "A",\n' +
      '              "step": 2\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "container_memory_usage_bytes{name=~\\".+\\"}",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{name}}",\n' +
      '              "refId": "B",\n' +
      '              "step": 240\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Memory Usage per Container (Stacked)",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "bytes",\n' +
      '              "label": "",\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "title": "New row"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "editable": true,\n' +
      '      "height": 222.703125,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 1,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 8,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": true,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null as zero",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 6,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(rate(container_network_receive_bytes_total{name=~\\".+\\"}[$interval])) by (name)",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{name}}",\n' +
      '              "refId": "A",\n' +
      '              "step": 2\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "- rate(container_network_transmit_bytes_total{name=~\\".+\\"}[$interval])",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{name}}",\n' +
      '              "refId": "B",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Received Network Traffic per Container",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "transparent": false,\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "Bps",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 3,\n' +
      '          "grid": {\n' +
      '            "threshold1": null,\n' +
      '            "threshold1Color": "rgba(216, 200, 27, 0.27)",\n' +
      '            "threshold2": null,\n' +
      '            "threshold2Color": "rgba(234, 112, 112, 0.22)"\n' +
      '          },\n' +
      '          "id": 11,\n' +
      '          "isNew": true,\n' +
      '          "legend": {\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "show": true,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null as zero",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "span": 6,\n' +
      '          "stack": true,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "container_memory_rss{name=~\\".+\\"}",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{name}}",\n' +
      '              "refId": "A",\n' +
      '              "step": 20\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "container_memory_usage_bytes{name=~\\".+\\"}",\n' +
      '              "hide": true,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{name}}",\n' +
      '              "refId": "B",\n' +
      '              "step": 20\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "sum(container_memory_cache{name=~\\".+\\"}) by (name)",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{name}}",\n' +
      '              "refId": "C",\n' +
      '              "step": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Cached Memory per Container (Stacked)",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": true,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "show": true\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "bytes",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "title": "New row"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "editable": true,\n' +
      '      "height": "250px",\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "columns": [\n' +
      '            {\n' +
      '              "text": "Avg",\n' +
      '              "value": "avg"\n' +
      '            }\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fontSize": "100%",\n' +
      '          "hideTimeOverride": false,\n' +
      '          "id": 18,\n' +
      '          "isNew": true,\n' +
      '          "links": [],\n' +
      '          "pageSize": 100,\n' +
      '          "scroll": true,\n' +
      '          "showHeader": true,\n' +
      '          "sort": {\n' +
      '            "col": 0,\n' +
      '            "desc": true\n' +
      '          },\n' +
      '          "span": 6,\n' +
      '          "styles": [\n' +
      '            {\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "pattern": "Time",\n' +
      '              "type": "date"\n' +
      '            },\n' +
      '            {\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "/.*/",\n' +
      '              "thresholds": [],\n' +
      '              "type": "number",\n' +
      '              "unit": "short"\n' +
      '            }\n' +
      '          ],\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "cadvisor_version_info",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "cAdvisor Version: {{cadvisorVersion}}",\n' +
      '              "refId": "A",\n' +
      '              "step": 2\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "prometheus_build_info",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Prometheus Version: {{version}}",\n' +
      '              "refId": "B",\n' +
      '              "step": 2\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "node_exporter_build_info",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Node-Exporter Version: {{version}}",\n' +
      '              "refId": "C",\n' +
      '              "step": 2\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "cadvisor_version_info",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Docker Version: {{dockerVersion}}",\n' +
      '              "refId": "D",\n' +
      '              "step": 2\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "cadvisor_version_info",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Host OS Version: {{osVersion}}",\n' +
      '              "refId": "E",\n' +
      '              "step": 2\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "cadvisor_version_info",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "Host Kernel Version: {{kernelVersion}}",\n' +
      '              "refId": "F",\n' +
      '              "step": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "",\n' +
      '          "transform": "timeseries_aggregations",\n' +
      '          "type": "table"\n' +
      '        }\n' +
      '      ],\n' +
      '      "showTitle": false,\n' +
      '      "title": "Check this out"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "editable": true,\n' +
      '      "height": 290.98582985381427,\n' +
      '      "panels": [],\n' +
      '      "title": "New row"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "editable": true,\n' +
      '      "height": 127,\n' +
      '      "panels": [],\n' +
      '      "title": "New row"\n' +
      '    }\n' +
      '  ],\n' +
      '  "time": {\n' +
      '    "from": "now-15m",\n' +
      '    "to": "now"\n' +
      '  },\n' +
      '  "timepicker": {\n' +
      '    "refresh_intervals": [\n' +
      '      "5s",\n' +
      '      "10s",\n' +
      '      "30s",\n' +
      '      "1m",\n' +
      '      "5m",\n' +
      '      "15m",\n' +
      '      "30m",\n' +
      '      "1h",\n' +
      '      "2h",\n' +
      '      "1d"\n' +
      '    ],\n' +
      '    "time_options": [\n' +
      '      "5m",\n' +
      '      "15m",\n' +
      '      "1h",\n' +
      '      "6h",\n' +
      '      "12h",\n' +
      '      "24h",\n' +
      '      "2d",\n' +
      '      "7d",\n' +
      '      "30d"\n' +
      '    ]\n' +
      '  },\n' +
      '  "templating": {\n' +
      '    "list": [\n' +
      '      {\n' +
      '        "allValue": ".+",\n' +
      '        "current": {},\n' +
      '        "datasource": "prometheus",\n' +
      '        "hide": 0,\n' +
      '        "includeAll": true,\n' +
      '        "label": "Container Group",\n' +
      '        "multi": true,\n' +
      '        "name": "containergroup",\n' +
      '        "options": [],\n' +
      '        "query": "label_values(container_group)",\n' +
      '        "refresh": 1,\n' +
      '        "regex": "",\n' +
      '        "type": "query"\n' +
      '      },\n' +
      '      {\n' +
      '        "auto": true,\n' +
      '        "auto_count": 50,\n' +
      '        "auto_min": "50s",\n' +
      '        "current": {\n' +
      '          "tags": [],\n' +
      '          "text": "auto",\n' +
      '          "value": "$__auto_interval"\n' +
      '        },\n' +
      '        "datasource": null,\n' +
      '        "hide": 0,\n' +
      '        "includeAll": false,\n' +
      '        "label": "Interval",\n' +
      '        "multi": false,\n' +
      '        "name": "interval",\n' +
      '        "options": [\n' +
      '          {\n' +
      '            "selected": true,\n' +
      '            "text": "auto",\n' +
      '            "value": "$__auto_interval"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "30s",\n' +
      '            "value": "30s"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "1m",\n' +
      '            "value": "1m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "2m",\n' +
      '            "value": "2m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "3m",\n' +
      '            "value": "3m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "5m",\n' +
      '            "value": "5m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "7m",\n' +
      '            "value": "7m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "10m",\n' +
      '            "value": "10m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "30m",\n' +
      '            "value": "30m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "1h",\n' +
      '            "value": "1h"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "6h",\n' +
      '            "value": "6h"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "12h",\n' +
      '            "value": "12h"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "1d",\n' +
      '            "value": "1d"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "7d",\n' +
      '            "value": "7d"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "14d",\n' +
      '            "value": "14d"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "30d",\n' +
      '            "value": "30d"\n' +
      '          }\n' +
      '        ],\n' +
      '        "query": "30s,1m,2m,3m,5m,7m,10m,30m,1h,6h,12h,1d,7d,14d,30d",\n' +
      '        "refresh": 0,\n' +
      '        "type": "interval"\n' +
      '      }\n' +
      '    ]\n' +
      '  },\n' +
      '  "annotations": {\n' +
      '    "list": []\n' +
      '  },\n' +
      '  "refresh": "10s",\n' +
      '  "schemaVersion": 12,\n' +
      '  "version": 0,\n' +
      '  "links": [],\n' +
      '  "gnetId": 395,\n' +
      '  "description": "A simple overview of the most important Docker host and container metrics. (cAdvisor/Prometheus)"\n' +
      '}  ',
    'ICP2.1-Performance.json': '{\n' +
      '  "__inputs": [\n' +
      '    {\n' +
      '      "name": "DS_PROMETHEUS",\n' +
      '      "label": "prometheus",\n' +
      '      "description": "",\n' +
      '      "type": "datasource",\n' +
      '      "pluginId": "prometheus",\n' +
      '      "pluginName": "Prometheus"\n' +
      '    }\n' +
      '  ],\n' +
      '  "__requires": [\n' +
      '    {\n' +
      '      "type": "grafana",\n' +
      '      "id": "grafana",\n' +
      '      "name": "Grafana",\n' +
      '      "version": "4.4.3"\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "panel",\n' +
      '      "id": "graph",\n' +
      '      "name": "Graph",\n' +
      '      "version": ""\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "datasource",\n' +
      '      "id": "prometheus",\n' +
      '      "name": "Prometheus",\n' +
      '      "version": "1.0.0"\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "panel",\n' +
      '      "id": "singlestat",\n' +
      '      "name": "Singlestat",\n' +
      '      "version": ""\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "panel",\n' +
      '      "id": "table",\n' +
      '      "name": "Table",\n' +
      '      "version": ""\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "panel",\n' +
      '      "id": "text",\n' +
      '      "name": "Text",\n' +
      '      "version": ""\n' +
      '    }\n' +
      '  ],\n' +
      '  "annotations": {\n' +
      '    "list": []\n' +
      '  },\n' +
      '  "description": "Monitors ICP cluster using Prometheus. Shows overall Metrics Summary (High Level KPIs , Container, Pod CPU and Memory.",\n' +
      '  "editable": true,\n' +
      '  "gnetId": 315,\n' +
      '  "graphTooltip": 0,\n' +
      '  "hideControls": false,\n' +
      '  "id": null,\n' +
      '  "links": [\n' +
      '    {\n' +
      '      "icon": "external link",\n' +
      '      "tags": [],\n' +
      '      "targetBlank": true,\n' +
      '      "title": "Kibana",\n' +
      '      "type": "link",\n' +
      '      "url": "https://<icp_IP_address>:8443/kibana"\n' +
      '    },\n' +
      '    {\n' +
      '      "asDropdown": true,\n' +
      '      "icon": "external link",\n' +
      '      "includeVars": false,\n' +
      '      "keepTime": true,\n' +
      '      "tags": [],\n' +
      '      "targetBlank": true,\n' +
      '      "title": "DashBoards",\n' +
      '      "type": "dashboards"\n' +
      '    }\n' +
      '  ],\n' +
      '  "refresh": false,\n' +
      '  "rows": [\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 98,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": null,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "s",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 33,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "20%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "20%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "time() - max(node_boot_time{instance=~\\".*\\"})",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "interval": "15m",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Youngest Node Uptime",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "bytes",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 9,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "20%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "20%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(node_memory_MemTotal)",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "",\n' +
      '              "refId": "A",\n' +
      '              "step": 30\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Total memory",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "bytes",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 10,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(node_memory_MemAvailable)",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "refId": "A",\n' +
      '              "step": 30\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Available Memory",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": true,\n' +
      '          "colors": [\n' +
      '            "rgba(245, 54, 54, 0.9)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(50, 172, 45, 0.97)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "format": "percent",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "id": 39,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": " sum(node_memory_MemAvailable) / sum(node_memory_MemTotal) * 100",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "refId": "A",\n' +
      '              "step": 60\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "10,20",\n' +
      '          "title": "Memory Free",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "80%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": true,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": null,\n' +
      '          "format": "percent",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "id": 46,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_cpu_usage_seconds_total{id=\\"/\\"}[15m])) / sum (machine_cpu_cores) * 100",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "refId": "A",\n' +
      '              "step": 60\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "75,90",\n' +
      '          "title": "ICP Total CPU 15 Minute Average",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "80%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": null,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "none",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 11,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "30%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 1,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "avg(machine_cpu_cores)",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "interval": "1s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "",\n' +
      '              "metric": "machine_cpu_cores",\n' +
      '              "refId": "A",\n' +
      '              "step": 30\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Avg. Machine Cores",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "content": "#####   Visit the CSMO-ICP  Git Hub Page.      ",\n' +
      '          "id": 43,\n' +
      '          "links": [\n' +
      '            {\n' +
      '              "targetBlank": true,\n' +
      '              "title": "CSMO-ICP",\n' +
      '              "type": "absolute",\n' +
      '              "url": "https://ibm.biz/BdjCrN"\n' +
      '            }\n' +
      '          ],\n' +
      '          "mode": "markdown",\n' +
      '          "span": 1,\n' +
      '          "title": "",\n' +
      '          "transparent": true,\n' +
      '          "type": "text"\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": false,\n' +
      '      "title": "ICP Usage Summary One",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 127,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": null,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "s",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 40,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "20%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "20%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "time() - min(node_boot_time{instance=~\\".*\\"})",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "interval": "15m",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Oldest Node Uptime",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "bytes",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 14,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(node_filesystem_size)",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "",\n' +
      '              "metric": "container_fs_limit_bytes",\n' +
      '              "refId": "A",\n' +
      '              "step": 30\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Total Disk Space",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "bytes",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 13,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(node_filesystem_free)",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "refId": "A",\n' +
      '              "step": 30\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Disk Space Available",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": true,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 1,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "percentunit",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 1,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "100px",\n' +
      '          "hideTimeOverride": false,\n' +
      '          "id": 7,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "50%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "min((node_filesystem_size{fstype=~\\"xfs|ext4\\"} - node_filesystem_free{fstype=~\\"xfs|ext4\\"} )/ node_filesystem_size{fstype=~\\"xfs|ext4\\"})",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "interval": "15m",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "",\n' +
      '              "metric": "",\n' +
      '              "refId": "A",\n' +
      '              "step": 1800\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "0.75, 0.90",\n' +
      '          "title": "Disk Space Used",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "80%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": null,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "none",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 32,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "30%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 2,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "count(rate(container_last_seen{name=~\\".+\\"}[5m]))",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "metric": "kubelet_running_pod_count",\n' +
      '              "refId": "A",\n' +
      '              "step": 30\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Active Containers Last 5 min",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": null,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "none",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 12,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "30%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 1,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(kubelet_running_pod_count) ",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "metric": "kubelet_running_pod_count",\n' +
      '              "refId": "A",\n' +
      '              "step": 30\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "Active Pods",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        },\n' +
      '        {\n' +
      '          "cacheTimeout": null,\n' +
      '          "colorBackground": false,\n' +
      '          "colorValue": false,\n' +
      '          "colors": [\n' +
      '            "rgba(50, 172, 45, 0.97)",\n' +
      '            "rgba(237, 129, 40, 0.89)",\n' +
      '            "rgba(245, 54, 54, 0.9)"\n' +
      '          ],\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": null,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "format": "none",\n' +
      '          "gauge": {\n' +
      '            "maxValue": 100,\n' +
      '            "minValue": 0,\n' +
      '            "show": false,\n' +
      '            "thresholdLabels": false,\n' +
      '            "thresholdMarkers": true\n' +
      '          },\n' +
      '          "height": "1px",\n' +
      '          "id": 31,\n' +
      '          "interval": null,\n' +
      '          "links": [],\n' +
      '          "mappingType": 1,\n' +
      '          "mappingTypes": [\n' +
      '            {\n' +
      '              "name": "value to text",\n' +
      '              "value": 1\n' +
      '            },\n' +
      '            {\n' +
      '              "name": "range to text",\n' +
      '              "value": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "maxDataPoints": 100,\n' +
      '          "nullPointMode": "connected",\n' +
      '          "nullText": null,\n' +
      '          "postfix": "",\n' +
      '          "postfixFontSize": "30%",\n' +
      '          "prefix": "",\n' +
      '          "prefixFontSize": "50%",\n' +
      '          "rangeMaps": [\n' +
      '            {\n' +
      '              "from": "null",\n' +
      '              "text": "N/A",\n' +
      '              "to": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "span": 1,\n' +
      '          "sparkline": {\n' +
      '            "fillColor": "rgba(31, 118, 189, 0.18)",\n' +
      '            "full": false,\n' +
      '            "lineColor": "rgb(31, 120, 193)",\n' +
      '            "show": false\n' +
      '          },\n' +
      '          "tableColumn": "",\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(kube_node_info)",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "",\n' +
      '              "metric": "machine_cpu_cores",\n' +
      '              "refId": "A",\n' +
      '              "step": 30\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": "",\n' +
      '          "title": "ICP Node Count",\n' +
      '          "type": "singlestat",\n' +
      '          "valueFontSize": "50%",\n' +
      '          "valueMaps": [\n' +
      '            {\n' +
      '              "op": "=",\n' +
      '              "text": "N/A",\n' +
      '              "value": "null"\n' +
      '            }\n' +
      '          ],\n' +
      '          "valueName": "current"\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": false,\n' +
      '      "title": "ICP Usage Summary Two",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 354,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "columns": [],\n' +
      '          "datasource": "prometheus",\n' +
      '          "fontSize": "100%",\n' +
      '          "hideTimeOverride": true,\n' +
      '          "id": 35,\n' +
      '          "links": [],\n' +
      '          "minSpan": 1,\n' +
      '          "pageSize": 5,\n' +
      '          "scroll": true,\n' +
      '          "showHeader": true,\n' +
      '          "sort": {\n' +
      '            "col": 3,\n' +
      '            "desc": false\n' +
      '          },\n' +
      '          "span": 2,\n' +
      '          "styles": [\n' +
      '            {\n' +
      '              "alias": "Time",\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "pattern": "Time",\n' +
      '              "type": "hidden"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "app",\n' +
      '              "thresholds": [],\n' +
      '              "type": "hidden",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "component",\n' +
      '              "thresholds": [],\n' +
      '              "type": "hidden",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "job",\n' +
      '              "thresholds": [],\n' +
      '              "type": "hidden",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "kubernetes_namespace",\n' +
      '              "thresholds": [],\n' +
      '              "type": "hidden",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "kubernetes_name",\n' +
      '              "thresholds": [],\n' +
      '              "type": "hidden",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "Percent",\n' +
      '              "colorMode": "cell",\n' +
      '              "colors": [\n' +
      '                "rgba(50, 172, 45, 0.97)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(245, 54, 54, 0.9)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "Value",\n' +
      '              "thresholds": [\n' +
      '                "70",\n' +
      '                "90"\n' +
      '              ],\n' +
      '              "type": "number",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "/.*/",\n' +
      '              "thresholds": [],\n' +
      '              "type": "number",\n' +
      '              "unit": "short"\n' +
      '            }\n' +
      '          ],\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "((node_memory_MemTotal - node_memory_MemAvailable) / node_memory_MemTotal) * 100",\n' +
      '              "format": "table",\n' +
      '              "hide": false,\n' +
      '              "interval": "1s",\n' +
      '              "intervalFactor": 2,\n' +
      '              "refId": "A",\n' +
      '              "step": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": "1s",\n' +
      '          "title": "Memory by node",\n' +
      '          "transform": "table",\n' +
      '          "transparent": false,\n' +
      '          "type": "table"\n' +
      '        },\n' +
      '        {\n' +
      '          "columns": [],\n' +
      '          "fontSize": "100%",\n' +
      '          "hideTimeOverride": true,\n' +
      '          "id": 37,\n' +
      '          "links": [],\n' +
      '          "minSpan": 5,\n' +
      '          "pageSize": 5,\n' +
      '          "scroll": true,\n' +
      '          "showHeader": true,\n' +
      '          "sort": {\n' +
      '            "col": 3,\n' +
      '            "desc": true\n' +
      '          },\n' +
      '          "span": 5,\n' +
      '          "styles": [\n' +
      '            {\n' +
      '              "alias": "Time",\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "pattern": "Time",\n' +
      '              "type": "hidden"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(50, 172, 45, 0.97)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(245, 54, 54, 0.9)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "",\n' +
      '              "thresholds": [\n' +
      '                ""\n' +
      '              ],\n' +
      '              "type": "number",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "utilization",\n' +
      '              "colorMode": "cell",\n' +
      '              "colors": [\n' +
      '                "rgba(50, 172, 45, 0.97)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(245, 54, 54, 0.9)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "Value",\n' +
      '              "thresholds": [\n' +
      '                "70",\n' +
      '                "80"\n' +
      '              ],\n' +
      '              "type": "number",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "/.*/",\n' +
      '              "thresholds": [],\n' +
      '              "type": "number",\n' +
      '              "unit": "short"\n' +
      '            }\n' +
      '          ],\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "topk(5,  sum(rate(container_cpu_usage_seconds_total{name=~\\".+\\"}[5m])) by (name,namespace)) * 100",\n' +
      '              "format": "table",\n' +
      '              "hide": false,\n' +
      '              "interval": "1s",\n' +
      '              "intervalFactor": 5,\n' +
      '              "legendFormat": " ",\n' +
      '              "metric": "",\n' +
      '              "refId": "A",\n' +
      '              "step": 5\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": "1s",\n' +
      '          "timeShift": null,\n' +
      '          "title": "Top 5 Containers by CPU",\n' +
      '          "transform": "table",\n' +
      '          "type": "table"\n' +
      '        },\n' +
      '        {\n' +
      '          "columns": [],\n' +
      '          "fontSize": "100%",\n' +
      '          "hideTimeOverride": true,\n' +
      '          "id": 38,\n' +
      '          "links": [],\n' +
      '          "pageSize": 5,\n' +
      '          "scroll": true,\n' +
      '          "showHeader": true,\n' +
      '          "sort": {\n' +
      '            "col": 2,\n' +
      '            "desc": true\n' +
      '          },\n' +
      '          "span": 5,\n' +
      '          "styles": [\n' +
      '            {\n' +
      '              "alias": "Time",\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "pattern": "Time",\n' +
      '              "type": "hidden"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "memory",\n' +
      '              "colorMode": "cell",\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "Value",\n' +
      '              "thresholds": [\n' +
      '                "15",\n' +
      '                "20"\n' +
      '              ],\n' +
      '              "type": "number",\n' +
      '              "unit": "decbytes"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "image",\n' +
      '              "thresholds": [],\n' +
      '              "type": "hidden",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "/.*/",\n' +
      '              "thresholds": [],\n' +
      '              "type": "number",\n' +
      '              "unit": "short"\n' +
      '            }\n' +
      '          ],\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "topk (5, (sum(container_memory_usage_bytes{image!=\\"\\"}) by (name, namespace)))",\n' +
      '              "format": "table",\n' +
      '              "hide": false,\n' +
      '              "interval": "1s",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "",\n' +
      '              "refId": "A",\n' +
      '              "step": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": "1s",\n' +
      '          "title": "Top 5 Container by Memory",\n' +
      '          "transform": "table",\n' +
      '          "transparent": true,\n' +
      '          "type": "table"\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": false,\n' +
      '      "title": "Top Five",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 250,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": null,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 0,\n' +
      '          "grid": {},\n' +
      '          "height": "",\n' +
      '          "hideTimeOverride": false,\n' +
      '          "id": 17,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": true,\n' +
      '            "show": true,\n' +
      '            "sideWidth": 6,\n' +
      '            "sort": "current",\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": true,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": true,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(rate(container_cpu_usage_seconds_total{name=~\\".+\\"}[$interval])) by (name) * 100",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "interval": "1m",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{name}}",\n' +
      '              "metric": "",\n' +
      '              "refId": "A",\n' +
      '              "step": 120\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Container CPU Utilization",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": false,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "transparent": false,\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "none",\n' +
      '              "label": "CPU Percentage",\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": false,\n' +
      '      "title": "Dashboard Row",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 217,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": 2,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 2,\n' +
      '          "grid": {},\n' +
      '          "id": 25,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": true,\n' +
      '            "show": true,\n' +
      '            "sideWidth": 200,\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 3,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": true,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sort_desc(sum(container_memory_usage_bytes{image!=\\"\\"}) by (name, image))",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "interval": "10s",\n' +
      '              "intervalFactor": 1,\n' +
      '              "legendFormat": "{{ name }}",\n' +
      '              "metric": "container_memory_usage:sort_desc",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Container Memory Usage",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": false,\n' +
      '            "shared": false,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "bytes",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": false,\n' +
      '      "title": "Pods memory usage",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 272,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "decimals": null,\n' +
      '          "editable": true,\n' +
      '          "error": false,\n' +
      '          "fill": 0,\n' +
      '          "grid": {},\n' +
      '          "height": "",\n' +
      '          "hideTimeOverride": false,\n' +
      '          "id": 44,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": false,\n' +
      '            "current": true,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": true,\n' +
      '            "show": true,\n' +
      '            "sort": "current",\n' +
      '            "sortDesc": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 2,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "connected",\n' +
      '          "percentage": true,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 6,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": true,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (rate (container_cpu_usage_seconds_total{image!=\\"\\",name=~\\"^k8s_.*\\"}[$interval])) by (pod_name)",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "interval": "1m",\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{ pod_name }}",\n' +
      '              "metric": "",\n' +
      '              "refId": "A",\n' +
      '              "step": 120\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Pod CPU Utilization",\n' +
      '          "tooltip": {\n' +
      '            "msResolution": true,\n' +
      '            "shared": false,\n' +
      '            "sort": 2,\n' +
      '            "value_type": "cumulative"\n' +
      '          },\n' +
      '          "transparent": false,\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "none",\n' +
      '              "label": "CPU Second Second Avg by Interval",\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        },\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "fill": 2,\n' +
      '          "id": 47,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": false,\n' +
      '            "current": true,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": true,\n' +
      '            "show": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 3,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 6,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum (container_memory_working_set_bytes{image!=\\"\\",name=~\\"^k8s_.*\\"}) by (pod_name)",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{ pod_name }}",\n' +
      '              "metric": "container_memory_usage:sort_desc",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Pods Memory Usage",\n' +
      '          "tooltip": {\n' +
      '            "shared": false,\n' +
      '            "sort": 1,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "decbytes",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": false,\n' +
      '      "title": "Pods",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 250,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "fill": 2,\n' +
      '          "id": 34,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": false,\n' +
      '            "current": true,\n' +
      '            "hideEmpty": false,\n' +
      '            "hideZero": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": true,\n' +
      '            "show": true,\n' +
      '            "total": false,\n' +
      '            "values": true\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 3,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "node_load15",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{instance}} 15min",\n' +
      '              "refId": "A",\n' +
      '              "step": 4\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "node_load5",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{instance}} 5min",\n' +
      '              "refId": "B",\n' +
      '              "step": 4\n' +
      '            },\n' +
      '            {\n' +
      '              "expr": "node_load1",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{instance}} 1min",\n' +
      '              "metric": "",\n' +
      '              "refId": "C",\n' +
      '              "step": 4\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Worker Nodes 15, 5, 1 Load Average",\n' +
      '          "tooltip": {\n' +
      '            "shared": false,\n' +
      '            "sort": 1,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": false\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": false,\n' +
      '      "title": "Load Avg.",\n' +
      '      "titleSize": "h6"\n' +
      '    }\n' +
      '  ],\n' +
      '  "schemaVersion": 14,\n' +
      '  "style": "dark",\n' +
      '  "tags": [],\n' +
      '  "templating": {\n' +
      '    "list": [\n' +
      '      {\n' +
      '        "auto": false,\n' +
      '        "auto_count": 50,\n' +
      '        "auto_min": "50s",\n' +
      '        "current": {\n' +
      '          "text": "5m",\n' +
      '          "value": "5m"\n' +
      '        },\n' +
      '        "hide": 0,\n' +
      '        "label": "interval",\n' +
      '        "name": "interval",\n' +
      '        "options": [\n' +
      '          {\n' +
      '            "selected": true,\n' +
      '            "text": "5m",\n' +
      '            "value": "5m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "10m",\n' +
      '            "value": "10m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "15m",\n' +
      '            "value": "15m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "30m",\n' +
      '            "value": "30m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "1h",\n' +
      '            "value": "1h"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "6h",\n' +
      '            "value": "6h"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "12h",\n' +
      '            "value": "12h"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "1d",\n' +
      '            "value": "1d"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "7d",\n' +
      '            "value": "7d"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "14d",\n' +
      '            "value": "14d"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "30d",\n' +
      '            "value": "30d"\n' +
      '          }\n' +
      '        ],\n' +
      '        "query": "5m,10m,15m,30m,1h,6h,12h,1d,7d,14d,30d",\n' +
      '        "refresh": 2,\n' +
      '        "type": "interval"\n' +
      '      }\n' +
      '    ]\n' +
      '  },\n' +
      '  "time": {\n' +
      '    "from": "now-1h",\n' +
      '    "to": "now"\n' +
      '  },\n' +
      '  "timepicker": {\n' +
      '    "nowDelay": "",\n' +
      '    "refresh_intervals": [\n' +
      '      "5s",\n' +
      '      "10s",\n' +
      '      "30s",\n' +
      '      "1m",\n' +
      '      "5m",\n' +
      '      "15m",\n' +
      '      "30m",\n' +
      '      "1h",\n' +
      '      "2h",\n' +
      '      "1d"\n' +
      '    ],\n' +
      '    "time_options": [\n' +
      '      "5m",\n' +
      '      "15m",\n' +
      '      "1h",\n' +
      '      "6h",\n' +
      '      "12h",\n' +
      '      "24h",\n' +
      '      "2d",\n' +
      '      "7d",\n' +
      '      "30d"\n' +
      '    ]\n' +
      '  },\n' +
      '  "timezone": "browser",\n' +
      '  "title": "ICP 2.1 Performance IBM Provided 2.5",\n' +
      '  "version": 6\n' +
      '}  ',
    'ICP2.1-Namespaces-Performance.json': '{\n' +
      '  "__inputs": [\n' +
      '    {\n' +
      '      "name": "DS_PROMETHEUS",\n' +
      '      "label": "prometheus",\n' +
      '      "description": "",\n' +
      '      "type": "datasource",\n' +
      '      "pluginId": "prometheus",\n' +
      '      "pluginName": "Prometheus"\n' +
      '    }\n' +
      '  ],\n' +
      '  "__requires": [\n' +
      '    {\n' +
      '      "type": "grafana",\n' +
      '      "id": "grafana",\n' +
      '      "name": "Grafana",\n' +
      '      "version": "4.4.3"\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "panel",\n' +
      '      "id": "graph",\n' +
      '      "name": "Graph",\n' +
      '      "version": ""\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "datasource",\n' +
      '      "id": "prometheus",\n' +
      '      "name": "Prometheus",\n' +
      '      "version": "1.0.0"\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "panel",\n' +
      '      "id": "table",\n' +
      '      "name": "Table",\n' +
      '      "version": ""\n' +
      '    }\n' +
      '  ],\n' +
      '  "annotations": {\n' +
      '    "list": []\n' +
      '  },\n' +
      '  "description": "Monitors Kubernetes cluster using Prometheus. Shows overall cluster CPU / Memory / Filesystem usage as well as individual pod, containers, systemd services statistics. Uses cAdvisor metrics only.",\n' +
      '  "editable": true,\n' +
      '  "gnetId": 315,\n' +
      '  "graphTooltip": 0,\n' +
      '  "hideControls": false,\n' +
      '  "id": null,\n' +
      '  "links": [\n' +
      '    {\n' +
      '      "asDropdown": true,\n' +
      '      "icon": "external link",\n' +
      '      "includeVars": true,\n' +
      '      "keepTime": true,\n' +
      '      "tags": [],\n' +
      '      "targetBlank": true,\n' +
      '      "title": "Dashboards",\n' +
      '      "type": "dashboards"\n' +
      '    }\n' +
      '  ],\n' +
      '  "refresh": false,\n' +
      '  "rows": [\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 250,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "fill": 1,\n' +
      '          "id": 39,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": true,\n' +
      '            "show": true,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "sum(rate(container_cpu_usage_seconds_total{namespace=\\"$namespace\\"}[$interval])) by (pod_name) * 100",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{ pod_name }}",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Namespace \\"$namespace\\"  CPU by pod name",\n' +
      '          "tooltip": {\n' +
      '            "shared": false,\n' +
      '            "sort": 0,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": false,\n' +
      '      "title": "$namespace CPU",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 250,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "aliasColors": {},\n' +
      '          "bars": false,\n' +
      '          "dashLength": 10,\n' +
      '          "dashes": false,\n' +
      '          "datasource": "prometheus",\n' +
      '          "fill": 1,\n' +
      '          "id": 38,\n' +
      '          "legend": {\n' +
      '            "alignAsTable": true,\n' +
      '            "avg": false,\n' +
      '            "current": false,\n' +
      '            "max": false,\n' +
      '            "min": false,\n' +
      '            "rightSide": true,\n' +
      '            "show": true,\n' +
      '            "total": false,\n' +
      '            "values": false\n' +
      '          },\n' +
      '          "lines": true,\n' +
      '          "linewidth": 1,\n' +
      '          "links": [],\n' +
      '          "nullPointMode": "null",\n' +
      '          "percentage": false,\n' +
      '          "pointradius": 5,\n' +
      '          "points": false,\n' +
      '          "renderer": "flot",\n' +
      '          "seriesOverrides": [],\n' +
      '          "spaceLength": 10,\n' +
      '          "span": 12,\n' +
      '          "stack": false,\n' +
      '          "steppedLine": false,\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": " sort_desc(sum(container_memory_usage_bytes{image!=\\"\\", namespace=\\"$namespace\\"}) by (pod_name, image))",\n' +
      '              "format": "time_series",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{ pod_name }}",\n' +
      '              "refId": "A",\n' +
      '              "step": 10\n' +
      '            }\n' +
      '          ],\n' +
      '          "thresholds": [],\n' +
      '          "timeFrom": null,\n' +
      '          "timeShift": null,\n' +
      '          "title": "Namespace  \\"$namespace\\"  Memory by pod name",\n' +
      '          "tooltip": {\n' +
      '            "shared": false,\n' +
      '            "sort": 1,\n' +
      '            "value_type": "individual"\n' +
      '          },\n' +
      '          "type": "graph",\n' +
      '          "xaxis": {\n' +
      '            "buckets": null,\n' +
      '            "mode": "time",\n' +
      '            "name": null,\n' +
      '            "show": true,\n' +
      '            "values": []\n' +
      '          },\n' +
      '          "yaxes": [\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            },\n' +
      '            {\n' +
      '              "format": "short",\n' +
      '              "label": null,\n' +
      '              "logBase": 1,\n' +
      '              "max": null,\n' +
      '              "min": null,\n' +
      '              "show": true\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": false,\n' +
      '      "title": "$namespace Memory",\n' +
      '      "titleSize": "h6"\n' +
      '    },\n' +
      '    {\n' +
      '      "collapse": false,\n' +
      '      "height": 250,\n' +
      '      "panels": [\n' +
      '        {\n' +
      '          "columns": [],\n' +
      '          "fontSize": "100%",\n' +
      '          "id": 40,\n' +
      '          "links": [],\n' +
      '          "pageSize": null,\n' +
      '          "scroll": true,\n' +
      '          "showHeader": true,\n' +
      '          "sort": {\n' +
      '            "col": null,\n' +
      '            "desc": false\n' +
      '          },\n' +
      '          "span": 12,\n' +
      '          "styles": [\n' +
      '            {\n' +
      '              "alias": "Time",\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "pattern": "Time",\n' +
      '              "type": "date"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "app",\n' +
      '              "thresholds": [],\n' +
      '              "type": "hidden",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "chart",\n' +
      '              "thresholds": [],\n' +
      '              "type": "hidden",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "kubernetes_namespace",\n' +
      '              "thresholds": [],\n' +
      '              "type": "hidden",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "kubernetes_name",\n' +
      '              "thresholds": [],\n' +
      '              "type": "hidden",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "job",\n' +
      '              "thresholds": [],\n' +
      '              "type": "hidden",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "release",\n' +
      '              "thresholds": [],\n' +
      '              "type": "hidden",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": "cell",\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": null,\n' +
      '              "pattern": "Value",\n' +
      '              "thresholds": [\n' +
      '                "0",\n' +
      '                "1"\n' +
      '              ],\n' +
      '              "type": "number",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "component",\n' +
      '              "thresholds": [],\n' +
      '              "type": "hidden",\n' +
      '              "unit": "short"\n' +
      '            },\n' +
      '            {\n' +
      '              "alias": "",\n' +
      '              "colorMode": null,\n' +
      '              "colors": [\n' +
      '                "rgba(245, 54, 54, 0.9)",\n' +
      '                "rgba(237, 129, 40, 0.89)",\n' +
      '                "rgba(50, 172, 45, 0.97)"\n' +
      '              ],\n' +
      '              "dateFormat": "YYYY-MM-DD HH:mm:ss",\n' +
      '              "decimals": 2,\n' +
      '              "pattern": "__name__",\n' +
      '              "thresholds": [],\n' +
      '              "type": "hidden",\n' +
      '              "unit": "short"\n' +
      '            }\n' +
      '          ],\n' +
      '          "targets": [\n' +
      '            {\n' +
      '              "expr": "kube_pod_container_status_ready{namespace=\\"$namespace\\"}",\n' +
      '              "format": "table",\n' +
      '              "hide": false,\n' +
      '              "intervalFactor": 2,\n' +
      '              "legendFormat": "{{pod}}",\n' +
      '              "refId": "A",\n' +
      '              "step": 2\n' +
      '            }\n' +
      '          ],\n' +
      '          "timeFrom": "1s",\n' +
      '          "title": "$namespace kube_pod_container_status_ready",\n' +
      '          "transform": "table",\n' +
      '          "transparent": false,\n' +
      '          "type": "table"\n' +
      '        }\n' +
      '      ],\n' +
      '      "repeat": null,\n' +
      '      "repeatIteration": null,\n' +
      '      "repeatRowId": null,\n' +
      '      "showTitle": false,\n' +
      '      "title": "Kube Metrics Status Ready",\n' +
      '      "titleSize": "h6"\n' +
      '    }\n' +
      '  ],\n' +
      '  "schemaVersion": 14,\n' +
      '  "style": "dark",\n' +
      '  "tags": [],\n' +
      '  "templating": {\n' +
      '    "list": [\n' +
      '      {\n' +
      '        "auto": true,\n' +
      '        "auto_count": 50,\n' +
      '        "auto_min": "50s",\n' +
      '        "current": {\n' +
      '          "text": "auto",\n' +
      '          "value": "$__auto_interval"\n' +
      '        },\n' +
      '        "hide": 0,\n' +
      '        "label": "interval",\n' +
      '        "name": "interval",\n' +
      '        "options": [\n' +
      '          {\n' +
      '            "selected": true,\n' +
      '            "text": "auto",\n' +
      '            "value": "$__auto_interval"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "30s",\n' +
      '            "value": "30s"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "1m",\n' +
      '            "value": "1m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "2m",\n' +
      '            "value": "2m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "3m",\n' +
      '            "value": "3m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "5m",\n' +
      '            "value": "5m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "7m",\n' +
      '            "value": "7m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "10m",\n' +
      '            "value": "10m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "30m",\n' +
      '            "value": "30m"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "1h",\n' +
      '            "value": "1h"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "6h",\n' +
      '            "value": "6h"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "12h",\n' +
      '            "value": "12h"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "1d",\n' +
      '            "value": "1d"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "7d",\n' +
      '            "value": "7d"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "14d",\n' +
      '            "value": "14d"\n' +
      '          },\n' +
      '          {\n' +
      '            "selected": false,\n' +
      '            "text": "30d",\n' +
      '            "value": "30d"\n' +
      '          }\n' +
      '        ],\n' +
      '        "query": "30s,1m,2m,3m,5m,7m,10m,30m,1h,6h,12h,1d,7d,14d,30d",\n' +
      '        "refresh": 2,\n' +
      '        "type": "interval"\n' +
      '      },\n' +
      '      {\n' +
      '        "allValue": null,\n' +
      '        "current": {\n' +
      '          "text": "default",\n' +
      '          "value": "default"\n' +
      '        },\n' +
      '        "datasource": "prometheus",\n' +
      '        "hide": 0,\n' +
      '        "includeAll": false,\n' +
      '        "label": "Namespace",\n' +
      '        "multi": false,\n' +
      '        "name": "namespace",\n' +
      '        "options": [],\n' +
      '        "query": "label_values(namespace)",\n' +
      '        "refresh": 1,\n' +
      '        "regex": "",\n' +
      '        "sort": 1,\n' +
      '        "tagValuesQuery": "",\n' +
      '        "tags": [],\n' +
      '        "tagsQuery": "",\n' +
      '        "type": "query",\n' +
      '        "useTags": false\n' +
      '      }\n' +
      '    ]\n' +
      '  },\n' +
      '  "time": {\n' +
      '    "from": "now-3h",\n' +
      '    "to": "now"\n' +
      '  },\n' +
      '  "timepicker": {\n' +
      '    "nowDelay": "",\n' +
      '    "refresh_intervals": [\n' +
      '      "5s",\n' +
      '      "10s",\n' +
      '      "30s",\n' +
      '      "1m",\n' +
      '      "5m",\n' +
      '      "15m",\n' +
      '      "30m",\n' +
      '      "1h",\n' +
      '      "2h",\n' +
      '      "1d"\n' +
      '    ],\n' +
      '    "time_options": [\n' +
      '      "5m",\n' +
      '      "15m",\n' +
      '      "1h",\n' +
      '      "6h",\n' +
      '      "12h",\n' +
      '      "24h",\n' +
      '      "2d",\n' +
      '      "7d",\n' +
      '      "30d"\n' +
      '    ]\n' +
      '  },\n' +
      '  "timezone": "browser",\n' +
      '  "title": "ICP 2.1 Namespaces Performance IBM Provided 2.5",\n' +
      '  "version": 3\n' +
      '}'
  }
})

app.bluecomputeGrafanaEntryConfig_ConfigMap = new solsa.core.v1.ConfigMap({
  metadata: {
    labels: {
      app: 'bluecompute-grafana',
      chart: 'ibm-icpmonitoring-1.1.0',
      release: 'bluecompute',
      heritage: 'Tiller',
      component: 'grafana'
    },
    name: 'bluecompute-grafana-entry-config'
  },
  data: {
    'entrypoint.sh': '#!/bin/sh\n' +
      'mkdir /etc/dashboards\n' +
      'cp -f /tmp/grafana/dashboards/*.json /etc/dashboards/\n' +
      'cp -f /tmp/grafana/config/* /etc/grafana\n' +
      '/run.sh\n'
  }
})

app.bluecomputeGrafanaDsEntryConfig_ConfigMap = new solsa.core.v1.ConfigMap({
  metadata: {
    labels: {
      app: 'bluecompute-grafana',
      chart: 'ibm-icpmonitoring-1.1.0',
      release: 'bluecompute',
      heritage: 'Tiller',
      component: 'grafana'
    },
    name: 'bluecompute-grafana-ds-entry-config'
  },
  data: {
    'entrypoint.sh': '#!/bin/sh\n' +
      'SCHEME=http://${GF_SECURITY_ADMIN_USER}:${GF_SECURITY_ADMIN_PASSWORD}@\n' +
      'curl -X DELETE ${OPTIONS} ${SCHEME}bluecompute-grafana:3000/api/datasources/name/prometheus\n' +
      'rc=$?\n' +
      'if [[ $rc != 0 ]]; then\n' +
      '  exit $rc\n' +
      'fi\n' +
      'request_body=$(cat <<EOF\n' +
      '{\n' +
      '  "name": "prometheus",\n' +
      '  "type": "prometheus",\n' +
      '  "access": "proxy",\n' +
      '  "isDefault": true,\n' +
      '  "url": "http://bluecompute-prometheus:9090"\n' +
      '}\n' +
      'EOF\n' +
      ')\n' +
      'resp=$(curl --write-out "STATUS_CODE:%{http_code}" -X POST ${OPTIONS} -H"Content-Type:application/json" --data-binary "$request_body" ${SCHEME}bluecompute-grafana:3000/api/datasources)\n' +
      'echo $resp\n' +
      'if [[ ${resp##*:} != 200 ]]; then\n' +
      '  exit -1\n' +
      'fi\n'
  }
})

app.bluecomputePrometheus_ConfigMap = new solsa.core.v1.ConfigMap({
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
  data: {
    'prometheus.yml': 'global:\n' +
      '  scrape_interval: 1m\n' +
      '  evaluation_interval: 1m\n' +
      '\n' +
      'alerting:\n' +
      '  alertmanagers:\n' +
      '  - static_configs:\n' +
      '    - targets:\n' +
      "      - 'bluecompute-prometheus-alertmanager:9093'\n" +
      '    scheme: http\n' +
      '\n' +
      'rule_files:\n' +
      '  - /etc/alert-rules/*.rules\n' +
      '  - /etc/alert-rules/*.yml\n' +
      '\n' +
      'scrape_configs:\n' +
      '  - job_name: prometheus\n' +
      '    static_configs:\n' +
      '      - targets:\n' +
      '        - localhost:9090\n' +
      '\n' +
      '  # A scrape configuration for running Prometheus on a Kubernetes cluster.\n' +
      '  # This uses separate scrape configs for cluster components (i.e. API server, node)\n' +
      '  # and services to allow each to use different authentication configs.\n' +
      '  #\n' +
      '  # Kubernetes labels will be added as Prometheus labels on metrics via the\n' +
      '  # `labelmap` relabeling action.\n' +
      '\n' +
      '  # Scrape config for API servers.\n' +
      '  #\n' +
      '  # Kubernetes exposes API servers as endpoints to the default/kubernetes\n' +
      '  # service so this uses `endpoints` role and uses relabelling to only keep\n' +
      '  # the endpoints associated with the default/kubernetes service using the\n' +
      '  # default named port `https`. This works for single API server deployments as\n' +
      '  # well as HA API server deployments.\n' +
      "  - job_name: 'kubernetes-apiservers'\n" +
      '\n' +
      '    kubernetes_sd_configs:\n' +
      '      - role: endpoints\n' +
      '\n' +
      '    # Default to scraping over https. If required, just disable this or change to\n' +
      '    # `http`.\n' +
      '    scheme: https\n' +
      '\n' +
      '    # This TLS & bearer token file config is used to connect to the actual scrape\n' +
      '    # endpoints for cluster components. This is separate to discovery auth\n' +
      '    # configuration because discovery & scraping are two separate concerns in\n' +
      '    # Prometheus. The discovery auth config is automatic if Prometheus runs inside\n' +
      '    # the cluster. Otherwise, more config options have to be provided within the\n' +
      '    # <kubernetes_sd_config>.\n' +
      '    tls_config:\n' +
      '      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt\n' +
      '      # If your node certificates are self-signed or use a different CA to the\n' +
      '      # master CA, then disable certificate verification below. Note that\n' +
      '      # certificate verification is an integral part of a secure infrastructure\n' +
      '      # so this should only be disabled in a controlled environment. You can\n' +
      '      # disable certificate verification by uncommenting the line below.\n' +
      '      #\n' +
      '      insecure_skip_verify: true\n' +
      '    bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token\n' +
      '\n' +
      '    # Keep only the default/kubernetes service endpoints for the https port. This\n' +
      '    # will add targets for each API server which Kubernetes adds an endpoint to\n' +
      '    # the default/kubernetes service.\n' +
      '    relabel_configs:\n' +
      '      - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]\n' +
      '        action: keep\n' +
      '        regex: default;kubernetes;https\n' +
      '\n' +
      "  - job_name: 'kubernetes-nodes'\n" +
      '\n' +
      '    # Default to scraping over https. If required, just disable this or change to\n' +
      '    # `http`.\n' +
      '    scheme: https\n' +
      '\n' +
      '    # This TLS & bearer token file config is used to connect to the actual scrape\n' +
      '    # endpoints for cluster components. This is separate to discovery auth\n' +
      '    # configuration because discovery & scraping are two separate concerns in\n' +
      '    # Prometheus. The discovery auth config is automatic if Prometheus runs inside\n' +
      '    # the cluster. Otherwise, more config options have to be provided within the\n' +
      '    # <kubernetes_sd_config>.\n' +
      '    tls_config:\n' +
      '      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt\n' +
      '      # If your node certificates are self-signed or use a different CA to the\n' +
      '      # master CA, then disable certificate verification below. Note that\n' +
      '      # certificate verification is an integral part of a secure infrastructure\n' +
      '      # so this should only be disabled in a controlled environment. You can\n' +
      '      # disable certificate verification by uncommenting the line below.\n' +
      '      #\n' +
      '      insecure_skip_verify: true\n' +
      '    bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token\n' +
      '\n' +
      '    kubernetes_sd_configs:\n' +
      '      - role: node\n' +
      '\n' +
      '    relabel_configs:\n' +
      '      - action: labelmap\n' +
      '        regex: __meta_kubernetes_node_label_(.+)\n' +
      '      - target_label: __address__\n' +
      '        replacement: kubernetes.default.svc:443\n' +
      '      - source_labels: [__meta_kubernetes_node_name]\n' +
      '        regex: (.+)\n' +
      '        target_label: __metrics_path__\n' +
      '        replacement: /api/v1/nodes/${1}/proxy/metrics\n' +
      '\n' +
      '  # Scrape config for Kubelet cAdvisor.\n' +
      '  #\n' +
      '  # This is required for Kubernetes 1.7.3 and later, where cAdvisor metrics\n' +
      "  # (those whose names begin with 'container_') have been removed from the\n" +
      '  # Kubelet metrics endpoint.  This job scrapes the cAdvisor endpoint to\n' +
      '  # retrieve those metrics.\n' +
      '  #\n' +
      '  # In Kubernetes 1.7.0-1.7.2, these metrics are only exposed on the cAdvisor\n' +
      '  # HTTP endpoint; use "replacement: /api/v1/nodes/${1}:4194/proxy/metrics"\n' +
      "  # in that case (and ensure cAdvisor's HTTP server hasn't been disabled with\n" +
      '  # the --cadvisor-port=0 Kubelet flag).\n' +
      '  #\n' +
      '  # This job is not necessary and should be removed in Kubernetes 1.6 and\n' +
      '  # earlier versions, or it will cause the metrics to be scraped twice.\n' +
      "  - job_name: 'kubernetes-cadvisor'\n" +
      '\n' +
      '    # Default to scraping over https. If required, just disable this or change to\n' +
      '    # `http`.\n' +
      '    scheme: https\n' +
      '\n' +
      '    # This TLS & bearer token file config is used to connect to the actual scrape\n' +
      '    # endpoints for cluster components. This is separate to discovery auth\n' +
      '    # configuration because discovery & scraping are two separate concerns in\n' +
      '    # Prometheus. The discovery auth config is automatic if Prometheus runs inside\n' +
      '    # the cluster. Otherwise, more config options have to be provided within the\n' +
      '    # <kubernetes_sd_config>.\n' +
      '    tls_config:\n' +
      '      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt\n' +
      '    bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token\n' +
      '\n' +
      '    kubernetes_sd_configs:\n' +
      '    - role: node\n' +
      '\n' +
      '    relabel_configs:\n' +
      '    - action: labelmap\n' +
      '      regex: __meta_kubernetes_node_label_(.+)\n' +
      '    - target_label: __address__\n' +
      '      replacement: kubernetes.default.svc:443\n' +
      '    - source_labels: [__meta_kubernetes_node_name]\n' +
      '      regex: (.+)\n' +
      '      target_label: __metrics_path__\n' +
      '      replacement: /api/v1/nodes/${1}/proxy/metrics/cadvisor\n' +
      '\n' +
      '  # Scrape config for service endpoints.\n' +
      '  #\n' +
      '  # The relabeling allows the actual service scrape endpoint to be configured\n' +
      '  # via the following annotations:\n' +
      '  #\n' +
      '  # * `prometheus.io/scrape`: Only scrape services that have a value of `true`\n' +
      '  # * `prometheus.io/scheme`: If the metrics endpoint is secured then you will need\n' +
      '  # to set this to `https` & most likely set the `tls_config` of the scrape config.\n' +
      '  # * `prometheus.io/path`: If the metrics path is not `/metrics` override this.\n' +
      '  # * `prometheus.io/port`: If the metrics are exposed on a different port to the\n' +
      '  # service then set this appropriately.\n' +
      "  - job_name: 'kubernetes-service-endpoints'\n" +
      '\n' +
      '    kubernetes_sd_configs:\n' +
      '      - role: endpoints\n' +
      '\n' +
      '    relabel_configs:\n' +
      '      - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]\n' +
      '        action: keep\n' +
      '        regex: true\n' +
      '      - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scheme]\n' +
      '        action: replace\n' +
      '        target_label: __scheme__\n' +
      '        regex: (https?)\n' +
      '      - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]\n' +
      '        action: replace\n' +
      '        target_label: __metrics_path__\n' +
      '        regex: (.+)\n' +
      '      - source_labels: [__address__, __meta_kubernetes_service_annotation_prometheus_io_port]\n' +
      '        action: replace\n' +
      '        target_label: __address__\n' +
      '        regex: (.+)(?::\\d+);(\\d+)\n' +
      '        replacement: $1:$2\n' +
      '      - action: labelmap\n' +
      '        regex: __meta_kubernetes_service_label_(.+)\n' +
      '      - source_labels: [__meta_kubernetes_namespace]\n' +
      '        action: replace\n' +
      '        target_label: kubernetes_namespace\n' +
      '      - source_labels: [__meta_kubernetes_service_name]\n' +
      '        action: replace\n' +
      '        target_label: kubernetes_name\n' +
      '\n' +
      '  # Example scrape config for probing services via the Blackbox Exporter.\n' +
      '  #\n' +
      '  # The relabeling allows the actual service scrape endpoint to be configured\n' +
      '  # via the following annotations:\n' +
      '  #\n' +
      '  # * `prometheus.io/probe`: Only probe services that have a value of `true`\n' +
      "  - job_name: 'kubernetes-services'\n" +
      '\n' +
      '    metrics_path: /probe\n' +
      '    params:\n' +
      '      module: [http_2xx]\n' +
      '\n' +
      '    kubernetes_sd_configs:\n' +
      '      - role: service\n' +
      '\n' +
      '    relabel_configs:\n' +
      '      - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_probe]\n' +
      '        action: keep\n' +
      '        regex: true\n' +
      '      - source_labels: [__address__]\n' +
      '        target_label: __param_target\n' +
      '      - target_label: __address__\n' +
      '        replacement: blackbox\n' +
      '      - source_labels: [__param_target]\n' +
      '        target_label: instance\n' +
      '      - action: labelmap\n' +
      '        regex: __meta_kubernetes_service_label_(.+)\n' +
      '      - source_labels: [__meta_kubernetes_namespace]\n' +
      '        target_label: kubernetes_namespace\n' +
      '      - source_labels: [__meta_kubernetes_service_name]\n' +
      '        target_label: kubernetes_name\n' +
      '\n' +
      '  # Example scrape config for pods\n' +
      '  #\n' +
      '  # The relabeling allows the actual pod scrape endpoint to be configured via the\n' +
      '  # following annotations:\n' +
      '  #\n' +
      '  # * `prometheus.io/scrape`: Only scrape pods that have a value of `true`\n' +
      '  # * `prometheus.io/path`: If the metrics path is not `/metrics` override this.\n' +
      '  # * `prometheus.io/port`: Scrape the pod on the indicated port instead of the default of `9102`.\n' +
      "  - job_name: 'kubernetes-pods'\n" +
      '\n' +
      '    kubernetes_sd_configs:\n' +
      '      - role: pod\n' +
      '\n' +
      '    relabel_configs:\n' +
      '      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]\n' +
      '        action: keep\n' +
      '        regex: true\n' +
      '      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]\n' +
      '        action: replace\n' +
      '        target_label: __metrics_path__\n' +
      '        regex: (.+)\n' +
      '      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]\n' +
      '        action: replace\n' +
      '        regex: (.+):(?:\\d+);(\\d+)\n' +
      '        replacement: ${1}:${2}\n' +
      '        target_label: __address__\n' +
      '      - action: labelmap\n' +
      '        regex: __meta_kubernetes_pod_label_(.+)\n' +
      '      - source_labels: [__meta_kubernetes_namespace]\n' +
      '        action: replace\n' +
      '        target_label: kubernetes_namespace\n' +
      '      - source_labels: [__meta_kubernetes_pod_name]\n' +
      '        action: replace\n' +
      '        target_label: kubernetes_pod_name\n' +
      '\n' +
      '  # config for Liberty monitoring\n' +
      '  #\n' +
      '\n' +
      "  - job_name: 'blue-compute'\n" +
      "    scheme: 'https'\n" +
      '    basic_auth:\n' +
      "      username: 'admin'\n" +
      "      password: 'password'\n" +
      '    tls_config:\n' +
      '      insecure_skip_verify: true\n' +
      '    kubernetes_sd_configs:\n' +
      '      - role: endpoints\n' +
      '    relabel_configs:\n' +
      '      - source_labels: [__meta_kubernetes_service_annotation_bluecompute]\n' +
      '        action: keep\n' +
      '        regex: true'
  }
})

app.bluecomputeInventoryData_ConfigMap = new solsa.core.v1.ConfigMap({
  metadata: {
    name: 'bluecompute-inventory-data',
    labels: {
      chart: 'bluecompute-inventory-0.0.1',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  },
  data: {
    'mysql_data.sql': 'create database if not exists inventorydb;\n' +
      'use inventorydb;\n' +
      'create table if not exists items (\n' +
      '  id int not null auto_increment primary key,\n' +
      '  stock int not null,\n' +
      '  name varchar(100) not null,\n' +
      '  description varchar(1000) not null,\n' +
      '  price decimal(8,2) not null,\n' +
      '  img_alt varchar(75),\n' +
      '  img varchar(50) not null\n' +
      ');\n' +
      `insert ignore into items ( id, stock, price, img_alt, img, name, description ) values ( 13401, 1000, 4599.99, "Dayton Meat Chopper", "meat-chopper.jpg", "Dayton Meat Chopper", "Punched-card tabulating machines and time clocks were not the only products offered by the young IBM. Seen here in 1930, manufacturing employees of IBM's Dayton Scale Company are assembling Dayton Safety Electric Meat Choppers. These devices, which won the Gold Medal at the 1926 Sesquicentennial International Exposition in Philadelphia, were produced in both counter base and pedestal styles (5000 and 6000 series, respectively). They included one-quarter horsepower models, one-third horsepower machines (Styles 5113, 6113F and 6213F), one-half horsepower types (Styles 5117, 6117F and 6217F) and one horsepower choppers (Styles 5128, 6128F and 6228F). Prices in 1926 varied from admin80 to bluemix-sandbox-dal-9-portal.5.dblayer.com75. Three years after this photograph was taken, the Dayton Scale Company became an IBM division, and was sold to the Hobart Manufacturing Company in 1934." );\n` +
      `insert ignore into items ( id, stock, price, img_alt, img, name, description ) values ( 13402, 1000, 10599.99, "Hollerith Tabulator", "hollerith-tabulator.jpg", "Hollerith Tabulator", "This equipment is representative of the tabulating system invented and built for the U.S. Census Bureau by Herman Hollerith (1860-1929). After observing a train conductor punching railroad tickets to identify passengers, Hollerith conceived and developed the idea of using punched holes to record facts about people. These machines were first used in compiling the 1890 Census. Hollerith's patents were later acquired by the Computing-Tabulating-Recording Co. (which was renamed IBM in 1924) and this work became the basis of the IBM Punched Card System. Hollerith's tabulator used simple clock-like counting devices. When an electrical circuit was closed (through a punched hole in a predetermined position on the card), each counter was actuated by an electromagnet. The unit's pointer (clock hand) moved one step each time the magnet was energized. The circuits to the electromagnets were closed by means of a hand-operated press type card reader. The operator placed each card in the reader, pulled down the lever and removed the card after each punched hole was counted." );\n` +
      `insert ignore into items ( id, stock, price, img_alt, img, name, description ) values ( 13403, 1000, 699.99, "Computing Scale", "computing-scale.jpg",  "Computing Scale", "In 1885 Julius Pitrat of Gallipolis, Ohio, patented the first computing scale. Six years later, Edward Canby and Orange Ozias of Dayton, Ohio, purchased Pitrat's patents and incorporated The Computing Scale Company as the world's first computing scale vendor. And four years after that, The Computing Scale Company introduced the first automatic computing scale, shown here. In 1911, the Computing Scale Company merged with the International Time Recording Company and Tabulating Machine Company to form the Computing-Tabulating-Recording Company, a business that was renamed IBM in 1924." );\n` +
      'insert ignore into items ( id, stock, price, img_alt, img, name, description ) values ( 13404, 1000, 1299.99, "Tape Controlled Card Punch", "tape-controlled-punch.jpg", "Tape Controlled Card Punch", "IBM hired engineer-inventor Charles Doty in 1925, and he first worked as a secretary at the company’s main office at 50 Broad Street in Manhattan before transferring to the engineering laboratory at 225 Varick Street. Doty went on to write the specifications for a tape-to-card converter for engineers in IBM’s development laboratory in Endicott, N.Y. The first such machine consisted of a keypunch to which relays had been added to convert the code of the paper tape to the code of the punched cards, along with an attached paper-tape reading device. The engineering model was delivered and placed into testing on May 12, 1941, just three months after getting the green light for development. During the summer of 1941, the United States Army Air Corps received the first 10 units of the machine seen here, which was then known as the IBM 40 Tape Controlled Card Punch. Following delivery to the Air Corps, the Army’s Quartermaster Department, Signal Corps and other military organizations used the IBM 40, and its counterpart IBM 57 card-to-tape punch, for defense work during World War II. Commercial installations of both machines were also made at the New York, New Haven & Hartford Railroad; RCA; Bethlehem Steel; Vanity Fair; Western Electric; Merrill Lynch; Harris Upsham and others." );\n' +
      'insert ignore into items ( id, stock, price, img_alt, img, name, description ) values ( 13405, 1000, 3899.99, "IBM 77 Electric Punched Card Collator", "electric-card-punch.jpg", "Electric Card Collator", "The IBM 77 electric punched card collator performed many card filing and pulling operations. As a filing machine, the Type 77 fed and compared simultaneously two groups of punched cards: records already in file and records to be filed. These two groups were merged in correct numerical or alphabetical sequence. When operated for the purpose of pulling cards, the Type 77 made it possible for one group of cards to pull corresponding cards from another group. Introduced in 1937, the IBM 77 collator rented for 0 a month. It was capable of handling 240 cards a minute, and was 40.5 inches long and 51 inches high. IBM withdrew the Type 77 from marketing on November 27, 1957." );\n' +
      'insert ignore into items ( id, stock, price, img_alt, img, name, description ) values ( 13406, 1000, 2799.99, "Collator", "collator.jpg", "Collator", "The 85 collator performed many card filing and selection operations. It simultaneously could feed two sets of cards, merging the matched cards and selecting unmatched cards. In addition, the machine could check the sequence of the primary file of cards. It fed up to 120 cards per minute in each feed. IBM withdrew the 85 collator from marketing on September 7, 1978." );\n' +
      'insert ignore into items ( id, stock, price, img_alt, img, name, description ) values ( 13407, 1000, 1899.99, "Summary Punch", "summary-punch.jpg", "Gang Summary Punch", "The IBM 523 gang summary punch made its debut on February 17, 1949. When attached to an IBM 400-series accounting machine, the 523 punched summary cards for various totals at the rate of 100 cards a minute. Gang punching and summary punching operations could be performed simultaneously. The last model of the 523 was withdrawn from marketing on December 1, 1975." );\n' +
      `insert ignore into items ( id, stock, price, img_alt, img, name, description ) values ( 13408, 1000, 5199.99, "608 Calculator", "608-calculator.jpg", "Calculator", "The IBM 608 calculator (shown at left) was the first completely transistorized computer available for commercial installation. Announced in April 1955, the 608 began the transition of IBM's line of small and intermediate electronic calculators from vacuum tube to transistor operation. It contained more than 3,000 transistors -- tiny germanium devices no bigger than a paper clip -- and magnetic cores -- doughnut-shaped objects slightly larger than a pinhead, in the first known use of transistors and cores together in a computer. The magnetic cores could remember information indefinitely and recall it in a few millionths of a second, and made up the machine's internal storage or memory.<br>The 608's transistors made possible a 50 percent reduction in physical size and a 90 percent reduction in power requirements over comparable vacuum tube models. The machine could perform 4,500 additions a second, a computing speed 2.5 times faster than IBM's Type 607 calculator introduced only two years before. It could multiply two 9-digit numbers and derive the 18-digit product in 11 one-thousandths of a second, and divide an 18-digit number by a nine-digit number to produce the nine-digit quotient in just 13 one-thousandths of a second. The associated IBM 535 card read punch (shown at right) was used for both input and output, and was designed to permit a card to be calculated and the results punched while passing through the machine at the rate of 155 cards per minute.<br>In 1957, customers could purchase the 608 for 3,210 (or rent it for admin,760 a month) and the 535 for 228044,838 (or rent it for 15 a month). The 608 was withdrawn from marketing in April 1959." );\n` +
      `insert ignore into items ( id, stock, price, img_alt, img, name, description ) values ( 13409, 1000, 399.99, "803 Proof Machine", "803-proof.jpg", "Proof Machine", "Debuting in July 1949, the IBM 803 Proof Machine was used to sort, list, prove and endorse checks, sales tickets, vouchers and other business documents in a single operation. Containing 32 sorting receptacles, the 803 had a number of compartment adding tapes. A control tape recorded all transactions in the original sequence, with sub and final totals of distributions. The ten-key electrified adding machine keyboard simplified the 803's operation. The machine also had signal lights to indicate the near depletion of the tape supply and other operating conditions. The 803 Proof Machine was withdrawn in December 1981 after more 30 years in the product catalogue." );\n` +
      `insert ignore into items ( id, stock, price, img_alt, img, name, description ) values ( 13410, 1000, 899.99, "Model 01 Electric Typewriter", "01-typewriter.jpg", "Model 01 Typewriter", "In 1933 IBM acquired the tools, patents and production facilities of Electromatic Typewriters, Inc., of Rochester, N.Y. In the year following the acquisition, IBM invested more than admin million to redesign the Electromatic Typewriter, improve the company's research facilities and establish service centers. In 1935, the Model 01 IBM Electric Typewriter, seen here, was introduced. Wide customer acceptance soon made it the first successful electric typewriter in the United States." );\n` +
      `insert ignore into items ( id, stock, price, img_alt, img, name, description ) values ( 13411, 1000, 1199.99, "Model A Standard Electric Typewriter", "a-typewriter.jpg", "Model A Typewriter", "In 1948 IBM introduced the IBM Model A Standard Electric Typewriter. This machine gave typists a new feeling of comfort and control as the carriage return, back space, tabulator and shift were operated with a fingertip touch. The Model A's multiple-copy control ensured legible carbon copies and stencils." );\n` +
      'insert ignore into items ( id, stock, price, img_alt, img, name, description ) values ( 13412, 1000, 2199.99, "Selectric Typewriter", "selectric.jpg", "Selectric Typewriter", "Unveiled in 1961, the revolutionary Selectric typewriter eliminated the need for conventional type bars and movable carriages by using an innovative typing element on a head-and-rocker assembly, which, in turn, was mounted on a small carrier to move from left to right while typing." );'
  }
})

app.bluecomputeMariadb_ConfigMap = new solsa.core.v1.ConfigMap({
  metadata: {
    name: 'bluecompute-mariadb',
    labels: {
      app: 'mariadb',
      component: 'master',
      chart: 'mariadb-5.2.2',
      release: 'bluecompute',
      heritage: 'Tiller'
    }
  },
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

app.bluecomputeMysqlTest_ConfigMap = new solsa.core.v1.ConfigMap({
  metadata: {
    name: 'bluecompute-mysql-test',
    labels: {
      app: 'bluecompute-mysql',
      chart: 'mysql-0.10.2',
      heritage: 'Tiller',
      release: 'bluecompute'
    }
  },
  data: {
    'run.sh': '@test "Testing MySQL Connection" {\n' +
      '  mysql --host=bluecompute-mysql --port=3306 -u root -ppassword\n' +
      '}'
  }
})

app.bluecomputeOrdersData_ConfigMap = new solsa.core.v1.ConfigMap({
  metadata: {
    name: 'bluecompute-orders-data',
    labels: {
      chart: 'bluecompute-orders-0.0.1',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  },
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

app.bluecomputeWebConfig_ConfigMap = new solsa.core.v1.ConfigMap({
  metadata: {
    labels: {
      app: 'bluecompute',
      micro: 'web-bff',
      tier: 'frontend',
      implementation: 'microprofile',
      release: 'bluecompute',
      chart: 'web-0.0.1'
    },
    name: 'bluecompute-web-config',
    namespace: 'bluecompute'
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

app.bluecomputeAuth_Service = new solsa.core.v1.Service({
  metadata: {
    name: 'bluecompute-auth',
    labels: {
      chart: 'bluecompute-auth-0.0.1',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  },
  spec: {
    type: 'NodePort',
    ports: [ { name: 'http', port: 9080 }, { name: 'https', port: 9443 } ],
    selector: {
      app: 'bluecompute',
      micro: 'auth',
      service: 'server',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  }
})

app.bluecomputeCatalog_Service = new solsa.core.v1.Service({
  metadata: {
    annotations: { bluecompute: 'true' },
    name: 'bluecompute-catalog',
    labels: {
      chart: 'bluecompute-catalog-0.0.1',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  },
  spec: {
    type: 'NodePort',
    ports: [ { name: 'http', port: 9080 }, { name: 'https', port: 9443 } ],
    selector: {
      app: 'bluecompute-catalog-selector',
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

app.bluecomputePrometheusAlertmanager_Service = new solsa.core.v1.Service({
  metadata: {
    labels: {
      app: 'bluecompute-prometheus-alertmanager',
      chart: 'ibm-icpmonitoring-1.1.0',
      component: 'alertmanager',
      release: 'bluecompute',
      heritage: 'Tiller'
    },
    name: 'bluecompute-prometheus-alertmanager'
  },
  spec: {
    ports: [ { name: 'web', port: 9093, protocol: 'TCP', targetPort: 9093 } ],
    selector: {
      app: 'bluecompute-prometheus-alertmanager',
      component: 'alertmanager',
      release: 'bluecompute'
    },
    type: 'NodePort'
  }
})

app.bluecomputeGrafana_Service = new solsa.core.v1.Service({
  metadata: {
    labels: {
      app: 'bluecompute-grafana',
      chart: 'ibm-icpmonitoring-1.1.0',
      component: 'grafana',
      release: 'bluecompute',
      heritage: 'Tiller'
    },
    name: 'bluecompute-grafana'
  },
  spec: {
    ports: [ { name: 'web', port: 3000, protocol: 'TCP', targetPort: 3000 } ],
    selector: { app: 'bluecompute-grafana', component: 'grafana', release: 'bluecompute' },
    type: 'NodePort'
  }
})

app.bluecomputePrometheus_Service = new solsa.core.v1.Service({
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
  spec: {
    ports: [ { name: 'http', port: 9090, protocol: 'TCP', targetPort: 9090 } ],
    selector: { app: 'bluecompute-prometheus', component: 'prometheus', release: 'bluecompute' },
    type: 'NodePort'
  }
})

app.bluecomputeCatalogElasticsearch_Service = new solsa.core.v1.Service({
  metadata: {
    name: 'bluecompute-catalog-elasticsearch',
    labels: {
      datastore: 'elasticsearch',
      release: 'bluecompute',
      chart: 'ibmcase-elasticsearch-0.0.1'
    }
  },
  spec: {
    ports: [
      { name: 'http', port: 9200, protocol: 'TCP' },
      { name: 'transport', port: 9300, protocol: 'TCP' }
    ],
    selector: { datastore: 'elasticsearch' }
  }
})

app.bluecomputeInventory_Service = new solsa.core.v1.Service({
  metadata: {
    annotations: { bluecompute: 'true' },
    name: 'bluecompute-inventory',
    labels: {
      chart: 'bluecompute-inventory-0.0.1',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  },
  spec: {
    type: 'NodePort',
    ports: [ { name: 'http', port: 9080 }, { name: 'https', port: 9443 } ],
    selector: {
      app: 'bluecompute-inventory-selector',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  }
})

app.bluecomputeInventorydb_Service = new solsa.core.v1.Service({
  metadata: {
    name: 'bluecompute-inventorydb',
    labels: {
      app: 'bluecompute-inventorydb',
      chart: 'inventorydb-0.0.1',
      release: 'bluecompute',
      heritage: 'Tiller',
      implementation: 'microprofile'
    }
  },
  spec: {
    type: 'ClusterIP',
    ports: [ { name: 'mysql', port: 3306, targetPort: 'mysql' } ],
    selector: { app: 'bluecompute-inventorydb', implementation: 'microprofile' }
  }
})

app.bluecomputeMariadb_Service = new solsa.core.v1.Service({
  metadata: {
    name: 'bluecompute-mariadb',
    labels: {
      app: 'mariadb',
      component: 'master',
      chart: 'mariadb-5.2.2',
      release: 'bluecompute',
      heritage: 'Tiller'
    }
  },
  spec: {
    type: 'ClusterIP',
    ports: [ { name: 'mysql', port: 3307, targetPort: 'mysql' } ],
    selector: { app: 'mariadb', component: 'master', release: 'bluecompute' }
  }
})

app.bluecomputeMysql_Service = new solsa.core.v1.Service({
  metadata: {
    name: 'bluecompute-mysql',
    labels: {
      app: 'bluecompute-mysql',
      chart: 'mysql-0.10.2',
      release: 'bluecompute',
      heritage: 'Tiller'
    }
  },
  spec: {
    type: 'ClusterIP',
    ports: [ { name: 'mysql', port: 3306, targetPort: 'mysql' } ],
    selector: { app: 'bluecompute-mysql' }
  }
})

app.bluecomputeRabbitmq_Service = new solsa.core.v1.Service({
  metadata: {
    name: 'bluecompute-rabbitmq',
    labels: {
      chart: 'bluecompute-orders-0.0.1',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  },
  spec: {
    type: 'NodePort',
    ports: [ { name: 'main', port: 5672 }, { name: 'management', port: 15672 } ],
    selector: {
      micro: 'orders',
      service: 'chat',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  }
})

app.bluecomputeOrders_Service = new solsa.core.v1.Service({
  metadata: {
    name: 'bluecompute-orders',
    labels: {
      chart: 'bluecompute-orders-0.0.1',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  },
  spec: {
    type: 'NodePort',
    ports: [ { name: 'http', port: 9080 }, { name: 'https', port: 9443 } ],
    selector: {
      app: 'bluecompute',
      micro: 'orders',
      service: 'server',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  }
})

app.bluecomputeOrdersdb_Service = new solsa.core.v1.Service({
  metadata: {
    name: 'bluecompute-ordersdb',
    labels: {
      app: 'bluecompute-ordersdb',
      chart: 'bluecompute-ordersdb-0.0.1',
      release: 'bluecompute',
      heritage: 'Tiller',
      implementation: 'microprofile'
    }
  },
  spec: {
    type: 'ClusterIP',
    ports: [ { name: 'mysql', port: 3306, targetPort: 'mysql' } ],
    selector: { app: 'bluecompute-ordersdb', release: 'bluecompute', implementation: 'microprofile' }
  }
})

app.bluecomputeWeb_Service = new solsa.core.v1.Service({
  metadata: {
    name: 'bluecompute-web',
    namespace: 'bluecompute',
    labels: {
      app: 'bluecompute',
      micro: 'web-bff',
      tier: 'frontend',
      implementation: 'microprofile',
      release: 'bluecompute',
      chart: 'web-0.0.1'
    }
  },
  spec: {
    type: 'NodePort',
    ports: [ { name: 'http', protocol: 'TCP', port: 80, targetPort: 8000 } ],
    selector: {
      app: 'bluecompute',
      micro: 'web-bff',
      tier: 'frontend',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  }
})

app.bluecomputeZipkin_Service = new solsa.core.v1.Service({
  metadata: {
    name: 'bluecompute-zipkin',
    labels: {
      release: 'bluecompute',
      heritage: 'Tiller',
      chart: 'bluecompute-zipkin-0.0.1',
      implementation: 'microprofile'
    }
  },
  spec: {
    type: 'NodePort',
    selector: { app: 'bluecompute-zipkin-selector' },
    ports: [ { name: 'zipkin', port: 9411, targetPort: 9411 } ]
  }
})

app.bluecomputeAuth_Deployment = new solsa.extensions.v1beta1.Deployment({
  metadata: {
    name: 'bluecompute-auth',
    labels: {
      app: 'bluecompute',
      micro: 'auth',
      service: 'server',
      tier: 'backend',
      release: 'bluecompute',
      implementation: 'microprofile',
      chart: 'bluecompute-auth-0.0.1'
    }
  },
  spec: {
    replicas: 1,
    template: {
      metadata: {
        labels: {
          app: 'bluecompute',
          micro: 'auth',
          service: 'server',
          tier: 'backend',
          release: 'bluecompute',
          implementation: 'microprofile'
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

app.bluecomputeCatalog_Deployment = new solsa.extensions.v1beta1.Deployment({
  metadata: {
    name: 'bluecompute-catalog',
    labels: {
      chart: 'bluecompute-catalog-0.0.1',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  },
  spec: {
    replicas: 1,
    revisionHistoryLimit: 1,
    template: {
      metadata: {
        labels: {
          app: 'bluecompute-catalog-selector',
          release: 'bluecompute',
          version: 'current',
          implementation: 'microprofile'
        }
      },
      spec: {
        containers: [
          {
            name: 'catalog',
            image: 'ibmcase/catalog-mp:v3.0.0',
            imagePullPolicy: 'IfNotPresent',
            readinessProbe: {
              httpGet: { path: '/', port: 9080 },
              initialDelaySeconds: 60,
              timeoutSeconds: 60
            },
            livenessProbe: {
              httpGet: { path: '/health', port: 9080 },
              initialDelaySeconds: 1500,
              timeoutSeconds: 500
            },
            resources: { requests: { cpu: '200m', memory: '300Mi' } },
            env: [
              {
                name: 'inventory_health',
                value: 'http://bluecompute-inventory:9080/health'
              },
              {
                name: 'elasticsearch_url',
                value: 'http://bluecompute-catalog-elasticsearch:9200'
              },
              { name: 'zipkinHost', value: 'bluecompute-zipkin' },
              { name: 'zipkinPort', value: '9411' },
              { name: 'PORT', value: '9080' },
              { name: 'APPLICATION_NAME', value: 'bluecompute' },
              {
                name: 'IBM_APM_SERVER_URL',
                valueFrom: {
                  secretKeyRef: { name: 'apm-server-config', key: 'ibm_apm_server_url', optional: true }
                }
              },
              {
                name: 'IBM_APM_KEYFILE',
                valueFrom: {
                  secretKeyRef: { name: 'apm-server-config', key: 'ibm_apm_keyfile', optional: true }
                }
              },
              {
                name: 'IBM_APM_KEYFILE_PASSWORD',
                valueFrom: {
                  secretKeyRef: {
                    name: 'apm-server-config',
                    key: 'ibm_apm_keyfile_password',
                    optional: true
                  }
                }
              },
              {
                name: 'IBM_APM_INGRESS_URL',
                valueFrom: {
                  secretKeyRef: { name: 'apm-server-config', key: 'ibm_apm_ingress_url', optional: true }
                }
              },
              {
                name: 'IBM_APM_ACCESS_TOKEN',
                valueFrom: {
                  secretKeyRef: {
                    name: 'apm-server-config',
                    key: 'ibm_apm_access_token',
                    optional: true
                  }
                }
              }
            ],
            volumeMounts: [ { name: 'config-volume', mountPath: '/opt/ibm/wlp/usr/shared' } ]
          }
        ],
        volumes: [ { name: 'config-volume', configMap: { name: 'bluecompute-catalog-config' } } ]
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

app.bluecomputePrometheusAlertmanager_Deployment = new solsa.extensions.v1beta1.Deployment({
  metadata: {
    labels: {
      app: 'bluecompute-prometheus-alertmanager',
      chart: 'ibm-icpmonitoring',
      component: 'alertmanager',
      release: 'bluecompute',
      heritage: 'Tiller'
    },
    name: 'bluecompute-prometheus-alertmanager'
  },
  spec: {
    replicas: 1,
    template: {
      metadata: {
        labels: {
          app: 'bluecompute-prometheus-alertmanager',
          chart: 'ibm-icpmonitoring',
          component: 'alertmanager',
          release: 'bluecompute',
          heritage: 'Tiller'
        },
        annotations: { productName: 'alertmanager', productVersion: '0.13.0', productID: 'none' }
      },
      spec: {
        affinity: {
          nodeAffinity: {
            requiredDuringSchedulingIgnoredDuringExecution: {
              nodeSelectorTerms: [
                {
                  matchExpressions: [
                    {
                      key: 'beta.kubernetes.io/arch',
                      operator: 'In',
                      values: [ 'amd64', 'ppc64le' ]
                    }
                  ]
                }
              ]
            }
          }
        },
        containers: [
          {
            name: 'configmap-reload',
            image: 'ibmcom/configmap-reload:v0.1',
            imagePullPolicy: 'Always',
            args: [ '--volume-dir=/etc/config', '--webhook-url=http://localhost:9093/-/reload' ],
            volumeMounts: [ { name: 'config-volume', mountPath: '/etc/config', readOnly: true } ]
          },
          {
            name: 'alertmanager',
            image: 'ibmcom/alertmanager:v0.13.0',
            imagePullPolicy: 'Always',
            args: [
              '--config.file=/etc/config/alertmanager.yml',
              '--storage.path=/var/lib/alertmanager/data'
            ],
            ports: [ { containerPort: 9093 } ],
            resources: {
              limits: { cpu: '200m', memory: '256Mi' },
              requests: { cpu: '10m', memory: '64Mi' }
            },
            volumeMounts: [
              { name: 'config-volume', mountPath: '/etc/config' },
              { name: 'storage-volume', mountPath: '/var/lib/alertmanager/data' }
            ]
          }
        ],
        volumes: [
          {
            name: 'config-volume',
            configMap: { name: 'bluecompute-prometheus-alertmanager' }
          },
          { name: 'storage-volume', emptyDir: {} }
        ]
      }
    }
  }
})

app.bluecomputeGrafana_Deployment = new solsa.extensions.v1beta1.Deployment({
  metadata: {
    labels: {
      app: 'bluecompute-grafana',
      chart: 'ibm-icpmonitoring',
      component: 'grafana',
      release: 'bluecompute',
      heritage: 'Tiller'
    },
    name: 'bluecompute-grafana'
  },
  spec: {
    replicas: 1,
    template: {
      metadata: {
        labels: {
          app: 'bluecompute-grafana',
          chart: 'ibm-icpmonitoring',
          component: 'grafana',
          release: 'bluecompute',
          heritage: 'Tiller'
        },
        annotations: { productName: 'grafana', productVersion: '4.6.3', productID: 'none' }
      },
      spec: {
        affinity: {
          nodeAffinity: {
            requiredDuringSchedulingIgnoredDuringExecution: {
              nodeSelectorTerms: [
                {
                  matchExpressions: [
                    {
                      key: 'beta.kubernetes.io/arch',
                      operator: 'In',
                      values: [ 'amd64', 'ppc64le' ]
                    }
                  ]
                }
              ]
            }
          }
        },
        containers: [
          {
            name: 'grafana',
            image: 'ibmcom/grafana:4.6.3',
            imagePullPolicy: 'Always',
            command: [ '/opt/entry/entrypoint.sh' ],
            env: [
              {
                name: 'GF_SECURITY_ADMIN_USER',
                valueFrom: { secretKeyRef: { name: 'bluecompute-grafana-secret', key: 'username' } }
              },
              {
                name: 'GF_SECURITY_ADMIN_PASSWORD',
                valueFrom: { secretKeyRef: { name: 'bluecompute-grafana-secret', key: 'password' } }
              }
            ],
            ports: [ { name: 'web', containerPort: 3000 } ],
            resources: {
              limits: { cpu: '500m', memory: '512Mi' },
              requests: { cpu: '100m', memory: '128Mi' }
            },
            volumeMounts: [
              { name: 'grafana-storage', mountPath: '/var/lib/grafana' },
              { name: 'config-volume', mountPath: '/tmp/grafana/config' },
              { name: 'dashboard-volume', mountPath: '/tmp/grafana/dashboards' },
              { mountPath: '/opt/entry', name: 'grafana-entry' }
            ]
          }
        ],
        volumes: [
          { name: 'grafana-storage', emptyDir: {} },
          { name: 'config-volume', configMap: { name: 'bluecompute-grafana' } },
          {
            name: 'dashboard-volume',
            configMap: { name: 'bluecompute-grafana-dashboards' }
          },
          {
            name: 'grafana-entry',
            configMap: { name: 'bluecompute-grafana-entry-config', defaultMode: 484 }
          }
        ]
      }
    }
  }
})

app.bluecomputePrometheus_Deployment = new solsa.extensions.v1beta1.Deployment({
  metadata: {
    labels: {
      app: 'bluecompute-prometheus',
      chart: 'ibm-icpmonitoring',
      component: 'prometheus',
      release: 'bluecompute',
      heritage: 'Tiller'
    },
    name: 'bluecompute-prometheus'
  },
  spec: {
    replicas: 1,
    template: {
      metadata: {
        labels: {
          app: 'bluecompute-prometheus',
          chart: 'ibm-icpmonitoring',
          component: 'prometheus',
          release: 'bluecompute',
          heritage: 'Tiller'
        },
        annotations: { productName: 'prometheus', productVersion: '2.0.0', productID: 'none' }
      },
      spec: {
        affinity: {
          nodeAffinity: {
            requiredDuringSchedulingIgnoredDuringExecution: {
              nodeSelectorTerms: [
                {
                  matchExpressions: [
                    {
                      key: 'beta.kubernetes.io/arch',
                      operator: 'In',
                      values: [ 'amd64', 'ppc64le' ]
                    }
                  ]
                }
              ]
            }
          }
        },
        containers: [
          {
            name: 'configmap-reload',
            image: 'ibmcom/configmap-reload:v0.1',
            imagePullPolicy: 'Always',
            args: [
              '--volume-dir=/etc/config',
              '--volume-dir=/etc/alert-rules',
              '--webhook-url=http://localhost:9090/-/reload'
            ],
            volumeMounts: [
              { name: 'config-volume', mountPath: '/etc/config', readOnly: true },
              { name: 'rules-volume', mountPath: '/etc/alert-rules', readOnly: true }
            ]
          },
          {
            name: 'prometheus',
            image: 'ibmcom/prometheus:v2.0.0',
            imagePullPolicy: 'Always',
            securityContext: { runAsUser: 0 },
            args: [
              '--config.file=/etc/config/prometheus.yml',
              '--web.enable-lifecycle',
              '--web.enable-admin-api',
              '--storage.tsdb.path=/var/lib/prometheus/data',
              '--storage.tsdb.retention=24h'
            ],
            ports: [ { containerPort: 9090 } ],
            resources: {
              limits: { cpu: '500m', memory: '512Mi' },
              requests: { cpu: '100m', memory: '128Mi' }
            },
            volumeMounts: [
              { name: 'config-volume', mountPath: '/etc/config' },
              { name: 'rules-volume', mountPath: '/etc/alert-rules' },
              { name: 'storage-volume', mountPath: '/var/lib/prometheus/data' }
            ]
          }
        ],
        volumes: [
          { name: 'config-volume', configMap: { name: 'bluecompute-prometheus' } },
          {
            name: 'rules-volume',
            configMap: { name: 'bluecompute-prometheus-alertrules' }
          },
          { name: 'storage-volume', emptyDir: {} }
        ]
      }
    }
  }
})

app.bluecomputeDefaultClusterElasticsearch_Deployment = new solsa.extensions.v1beta1.Deployment({
  metadata: {
    name: 'bluecompute-default-cluster-elasticsearch',
    namespace: 'bluecompute',
    labels: {
      datastore: 'elasticsearch',
      release: 'bluecompute',
      chart: 'ibmcase-elasticsearch-0.0.1'
    }
  },
  spec: {
    replicas: 1,
    template: {
      metadata: { labels: { datastore: 'elasticsearch' } },
      spec: {
        volumes: [
          { name: 'storage', hostPath: { path: '/var/lib/elasticsearch-default-cluster' } }
        ],
        containers: [
          {
            name: 'elasticsearch',
            securityContext: { capabilities: { add: [ 'IPC_LOCK' ] } },
            image: 'quay.io/pires/docker-elasticsearch-kubernetes:1.7.1-4',
            imagePullPolicy: 'Always',
            env: [
              {
                name: 'KUBERNETES_CA_CERTIFICATE_FILE',
                value: '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt'
              },
              {
                name: 'NAMESPACE',
                valueFrom: { fieldRef: { fieldPath: 'metadata.namespace' } }
              },
              { name: 'CLUSTER_NAME', value: 'default-cluster' },
              { name: 'DISCOVERY_SERVICE', value: 'bluecompute-catalog-elasticsearch' },
              { name: 'NODE_MASTER', value: 'true' },
              { name: 'NODE_DATA', value: 'true' },
              { name: 'HTTP_ENABLE', value: 'true' },
              { name: 'ES_JAVA_OPTS', value: '-Xms256m -Xmx256m' }
            ],
            volumeMounts: [ { mountPath: '/data', name: 'storage' } ],
            resources: { limits: { memory: '700Mi' }, requests: { memory: '350Mi' } },
            ports: [
              { containerPort: 9200, name: 'http', protocol: 'TCP' },
              { containerPort: 9300, name: 'transport', protocol: 'TCP' }
            ]
          }
        ]
      }
    }
  }
})

app.bluecomputeInventory_Deployment = new solsa.extensions.v1beta1.Deployment({
  metadata: {
    name: 'bluecompute-inventory',
    labels: {
      chart: 'bluecompute-inventory-0.0.1',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  },
  spec: {
    replicas: 1,
    revisionHistoryLimit: 1,
    template: {
      metadata: {
        labels: {
          app: 'bluecompute-inventory-selector',
          version: 'current',
          release: 'bluecompute',
          implementation: 'microprofile'
        }
      },
      spec: {
        containers: [
          {
            name: 'inventory',
            image: 'ibmcase/inventory-mp:v2.0.0',
            imagePullPolicy: 'IfNotPresent',
            readinessProbe: {
              httpGet: { path: '/', port: 9080 },
              initialDelaySeconds: 60,
              timeoutSeconds: 60
            },
            livenessProbe: {
              httpGet: { path: '/health', port: 9080 },
              initialDelaySeconds: 1500,
              timeoutSeconds: 500
            },
            resources: { requests: { cpu: '200m', memory: '300Mi' } },
            env: [
              {
                name: 'jdbcURL',
                value: 'jdbc:mysql://bluecompute-mysql:3306/inventorydb?useSSL=false'
              },
              { name: 'rabbit', value: 'bluecompute-rabbitmq' },
              { name: 'PORT', value: '9080' },
              { name: 'APPLICATION_NAME', value: 'bluecompute' },
              { name: 'zipkinHost', value: 'bluecompute-zipkin' },
              { name: 'zipkinPort', value: '9411' }
            ]
          }
        ]
      }
    }
  }
})

app.bluecomputeInventorydb_Deployment = new solsa.extensions.v1beta1.Deployment({
  metadata: {
    name: 'bluecompute-inventorydb',
    labels: {
      app: 'bluecompute-inventorydb',
      chart: 'inventorydb-0.0.1',
      release: 'bluecompute',
      heritage: 'Tiller',
      implementation: 'microprofile'
    }
  },
  spec: {
    template: {
      metadata: {
        labels: {
          app: 'bluecompute-inventorydb',
          release: 'bluecompute',
          implementation: 'microprofile'
        }
      },
      spec: {
        initContainers: [
          {
            name: 'remove-lost-found',
            image: 'busybox:1.25.0',
            imagePullPolicy: 'Always',
            command: [ 'rm', '-fr', '/var/lib/mysql/lost+found' ],
            volumeMounts: [ { name: 'data', mountPath: '/var/lib/mysql' } ]
          }
        ],
        containers: [
          {
            name: 'bluecompute-inventorydb',
            image: 'ibmcase/bc-inventorydb:v2.0.0',
            imagePullPolicy: 'Always',
            resources: { requests: { cpu: '100m', memory: '256Mi' } },
            env: [
              {
                name: 'MYSQL_ROOT_PASSWORD',
                valueFrom: {
                  secretKeyRef: { name: 'bluecompute-inventorydb', key: 'mysql-root-password' }
                }
              },
              {
                name: 'MYSQL_PASSWORD',
                valueFrom: {
                  secretKeyRef: { name: 'bluecompute-inventorydb', key: 'mysql-password' }
                }
              },
              { name: 'MYSQL_USER', value: '' },
              { name: 'MYSQL_DATABASE', value: '' }
            ],
            ports: [ { name: 'mysql', containerPort: 3306 } ],
            livenessProbe: {
              exec: {
                command: [ 'sh', '-c', 'mysqladmin ping -u root -p${MYSQL_ROOT_PASSWORD}' ]
              },
              initialDelaySeconds: 30,
              periodSeconds: 10,
              timeoutSeconds: 5,
              successThreshold: 1,
              failureThreshold: 3
            },
            readinessProbe: {
              exec: {
                command: [ 'sh', '-c', 'mysqladmin ping -u root -p${MYSQL_ROOT_PASSWORD}' ]
              },
              initialDelaySeconds: 5,
              periodSeconds: 10,
              timeoutSeconds: 1,
              successThreshold: 1,
              failureThreshold: 3
            },
            volumeMounts: [ { name: 'data', mountPath: '/var/lib/mysql' } ]
          }
        ],
        volumes: [ { name: 'data', emptyDir: {} } ]
      }
    }
  }
})

app.bluecomputeMysql_Deployment = new solsa.extensions.v1beta1.Deployment({
  metadata: {
    name: 'bluecompute-mysql',
    labels: {
      app: 'bluecompute-mysql',
      chart: 'mysql-0.10.2',
      release: 'bluecompute',
      heritage: 'Tiller'
    }
  },
  spec: {
    template: {
      metadata: { labels: { app: 'bluecompute-mysql' } },
      spec: {
        initContainers: [
          {
            name: 'remove-lost-found',
            image: 'busybox:1.25.0',
            imagePullPolicy: 'IfNotPresent',
            command: [ 'rm', '-fr', '/var/lib/mysql/lost+found' ],
            volumeMounts: [ { name: 'data', mountPath: '/var/lib/mysql' } ]
          }
        ],
        containers: [
          {
            name: 'bluecompute-mysql',
            image: 'mysql:5.7.14',
            imagePullPolicy: 'IfNotPresent',
            resources: { requests: { cpu: '100m', memory: '256Mi' } },
            env: [
              {
                name: 'MYSQL_ROOT_PASSWORD',
                valueFrom: { secretKeyRef: { name: 'bluecompute-mysql', key: 'mysql-root-password' } }
              },
              {
                name: 'MYSQL_PASSWORD',
                valueFrom: { secretKeyRef: { name: 'bluecompute-mysql', key: 'mysql-password' } }
              },
              { name: 'MYSQL_USER', value: 'dbuser' },
              { name: 'MYSQL_DATABASE', value: 'inventorydb' }
            ],
            ports: [ { name: 'mysql', containerPort: 3306 } ],
            livenessProbe: {
              exec: {
                command: [ 'sh', '-c', 'mysqladmin ping -u root -p${MYSQL_ROOT_PASSWORD}' ]
              },
              initialDelaySeconds: 30,
              periodSeconds: 10,
              timeoutSeconds: 5,
              successThreshold: 1,
              failureThreshold: 3
            },
            readinessProbe: {
              exec: {
                command: [ 'sh', '-c', 'mysqladmin ping -u root -p${MYSQL_ROOT_PASSWORD}' ]
              },
              initialDelaySeconds: 5,
              periodSeconds: 10,
              timeoutSeconds: 1,
              successThreshold: 1,
              failureThreshold: 3
            },
            volumeMounts: [ { name: 'data', mountPath: '/var/lib/mysql' } ]
          }
        ],
        volumes: [ { name: 'data', emptyDir: {} } ]
      }
    }
  }
})

app.bluecomputeRabbitmq_Deployment = new solsa.extensions.v1beta1.Deployment({
  metadata: {
    name: 'bluecompute-rabbitmq',
    labels: {
      app: 'bluecompute',
      micro: 'orders',
      service: 'chat',
      tier: 'backend',
      chart: 'bluecompute-orders-0.0.1',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  },
  spec: {
    replicas: 1,
    template: {
      metadata: {
        labels: {
          app: 'bluecompute',
          micro: 'orders',
          service: 'chat',
          tier: 'backend',
          release: 'bluecompute',
          implementation: 'microprofile'
        }
      },
      spec: {
        containers: [ { name: 'rabbitmq', image: 'rabbitmq', imagePullPolicy: 'Always' } ]
      }
    }
  }
})

app.bluecomputeOrders_Deployment = new solsa.extensions.v1beta1.Deployment({
  metadata: {
    name: 'bluecompute-orders',
    labels: {
      app: 'bluecompute',
      micro: 'orders',
      service: 'server',
      tier: 'backend',
      implementation: 'microprofile',
      release: 'bluecompute',
      chart: 'bluecompute-orders-0.0.1'
    }
  },
  spec: {
    replicas: 1,
    template: {
      metadata: {
        labels: {
          app: 'bluecompute',
          micro: 'orders',
          service: 'server',
          tier: 'backend',
          release: 'bluecompute',
          implementation: 'microprofile'
        }
      },
      spec: {
        containers: [
          {
            name: 'orders',
            image: 'ibmcase/orders-mp:v4.0.0',
            imagePullPolicy: 'IfNotPresent',
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
            resources: { requests: { cpu: '200m', memory: '300Mi' } },
            volumeMounts: [ { name: 'keystorevol', mountPath: '/etc/keystorevol', readOnly: true } ]
          }
        ],
        volumes: [ { name: 'keystorevol', secret: { secretName: 'keystoresecret' } } ]
      }
    }
  }
})

app.bluecomputeOrdersdb_Deployment = new solsa.extensions.v1beta1.Deployment({
  metadata: {
    name: 'bluecompute-ordersdb',
    labels: {
      app: 'bluecompute-ordersdb',
      chart: 'ordersdb-0.0.1',
      release: 'bluecompute',
      heritage: 'Tiller',
      implementation: 'microprofile'
    }
  },
  spec: {
    template: {
      metadata: {
        labels: {
          app: 'bluecompute-ordersdb',
          release: 'bluecompute',
          implementation: 'microprofile'
        }
      },
      spec: {
        initContainers: [
          {
            name: 'remove-lost-found',
            image: 'busybox:1.25.0',
            imagePullPolicy: 'Always',
            command: [ 'rm', '-fr', '/var/lib/mysql/lost+found' ],
            volumeMounts: [ { name: 'data', mountPath: '/var/lib/mysql' } ]
          }
        ],
        containers: [
          {
            name: 'bluecompute-ordersdb',
            image: 'ibmcase/bc-ordersdb:v2.0.0',
            imagePullPolicy: 'Always',
            resources: { requests: { cpu: '100m', memory: '256Mi' } },
            env: [
              {
                name: 'MYSQL_ROOT_PASSWORD',
                valueFrom: {
                  secretKeyRef: { name: 'bluecompute-ordersdb', key: 'mysql-root-password' }
                }
              },
              {
                name: 'MYSQL_PASSWORD',
                valueFrom: { secretKeyRef: { name: 'bluecompute-ordersdb', key: 'mysql-password' } }
              },
              { name: 'MYSQL_USER', value: '' },
              { name: 'MYSQL_DATABASE', value: '' }
            ],
            ports: [ { name: 'mysql', containerPort: 3306 } ],
            livenessProbe: {
              exec: {
                command: [ 'sh', '-c', 'mysqladmin ping -u root -p${MYSQL_ROOT_PASSWORD}' ]
              },
              initialDelaySeconds: 30,
              periodSeconds: 10,
              timeoutSeconds: 5,
              successThreshold: 1,
              failureThreshold: 3
            },
            readinessProbe: {
              exec: {
                command: [ 'sh', '-c', 'mysqladmin ping -u root -p${MYSQL_ROOT_PASSWORD}' ]
              },
              initialDelaySeconds: 5,
              periodSeconds: 10,
              timeoutSeconds: 1,
              successThreshold: 1,
              failureThreshold: 3
            },
            volumeMounts: [ { name: 'data', mountPath: '/var/lib/mysql' } ]
          }
        ],
        volumes: [ { name: 'data', emptyDir: {} } ]
      }
    }
  }
})

app.bluecomputeWeb_Deployment = new solsa.extensions.v1beta1.Deployment({
  metadata: {
    name: 'bluecompute-web',
    labels: {
      app: 'bluecompute',
      micro: 'web-bff',
      tier: 'frontend',
      implementation: 'microprofile',
      release: 'bluecompute',
      chart: 'web-0.0.1'
    }
  },
  spec: {
    replicas: 1,
    template: {
      metadata: {
        labels: {
          app: 'bluecompute',
          micro: 'web-bff',
          tier: 'frontend',
          release: 'bluecompute',
          implementation: 'microprofile'
        }
      },
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

app.bluecomputeZipkin_Deployment = new solsa.extensions.v1beta1.Deployment({
  metadata: {
    name: 'bluecompute-zipkin',
    labels: {
      chart: 'bluecompute-zipkin-0.0.1',
      release: 'bluecompute',
      heritage: 'Tiller',
      implementation: 'microprofile'
    }
  },
  spec: {
    replicas: 1,
    template: {
      metadata: {
        labels: {
          app: 'bluecompute-zipkin-selector',
          release: 'bluecompute',
          implementation: 'microprofile'
        }
      },
      spec: {
        containers: [
          {
            name: 'zipkin',
            image: 'openzipkin/zipkin',
            ports: [ { containerPort: 9411, name: 'zipkin-api' } ],
            readinessProbe: {
              httpGet: { path: '/', port: 9411 },
              initialDelaySeconds: 30,
              timeoutSeconds: 60
            }
          }
        ]
      }
    }
  }
})

app.bluecomputeMariadb_StatefulSet = new solsa.apps.v1beta1.StatefulSet({
  metadata: {
    name: 'bluecompute-mariadb',
    labels: {
      app: 'mariadb',
      chart: 'mariadb-5.2.2',
      component: 'master',
      release: 'bluecompute',
      heritage: 'Tiller'
    }
  },
  spec: {
    selector: { matchLabels: { release: 'bluecompute', component: 'master', app: 'mariadb' } },
    serviceName: 'bluecompute-mariadb',
    replicas: 1,
    updateStrategy: { type: 'RollingUpdate' },
    template: {
      metadata: {
        labels: {
          app: 'mariadb',
          component: 'master',
          release: 'bluecompute',
          chart: 'mariadb-5.2.2'
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
                  labelSelector: { matchLabels: { app: 'mariadb', release: 'bluecompute' } }
                }
              }
            ]
          }
        },
        containers: [
          {
            name: 'mariadb',
            image: 'docker.io/bitnami/mariadb:10.1.36-debian-9',
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

app.bluecomputeGrafanaDs_Job = new solsa.batch.v1.Job({
  metadata: {
    labels: {
      app: 'bluecompute-grafana',
      chart: 'ibm-icpmonitoring-1.1.0',
      component: 'setds',
      release: 'bluecompute',
      heritage: 'Tiller'
    },
    name: 'bluecompute-grafana-ds'
  },
  spec: {
    activeDeadlineSeconds: 1800,
    template: {
      metadata: {
        labels: { app: 'bluecompute-grafana', component: 'setds', release: 'bluecompute' }
      },
      spec: {
        affinity: {
          nodeAffinity: {
            requiredDuringSchedulingIgnoredDuringExecution: {
              nodeSelectorTerms: [
                {
                  matchExpressions: [
                    {
                      key: 'beta.kubernetes.io/arch',
                      operator: 'In',
                      values: [ 'amd64', 'ppc64le' ]
                    }
                  ]
                }
              ]
            }
          }
        },
        containers: [
          {
            name: 'grafana-ds',
            image: 'ibmcom/curl:3.6',
            imagePullPolicy: 'Always',
            command: [ '/opt/entry/entrypoint.sh' ],
            env: [
              {
                name: 'GF_SECURITY_ADMIN_USER',
                valueFrom: { secretKeyRef: { name: 'bluecompute-grafana-secret', key: 'username' } }
              },
              {
                name: 'GF_SECURITY_ADMIN_PASSWORD',
                valueFrom: { secretKeyRef: { name: 'bluecompute-grafana-secret', key: 'password' } }
              }
            ],
            volumeMounts: [ { mountPath: '/opt/entry', name: 'grafana-ds-entry' } ]
          }
        ],
        volumes: [
          {
            name: 'grafana-ds-entry',
            configMap: { name: 'bluecompute-grafana-ds-entry-config', defaultMode: 484 }
          }
        ],
        restartPolicy: 'OnFailure'
      }
    }
  }
})

app.bluecomputeInventoryJob = new solsa.batch.v1.Job({
  metadata: {
    name: 'bluecompute-inventory-job',
    labels: {
      chart: 'bluecompute-inventory-0.0.1',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  },
  spec: {
    template: {
      metadata: {
        name: 'bluecompute-inventory-job',
        labels: {
          chart: 'bluecompute-inventory-0.0.1',
          release: 'bluecompute',
          implementation: 'microprofile'
        }
      },
      spec: {
        restartPolicy: 'Never',
        initContainers: [
          {
            name: 'test-mysql',
            image: 'mysql:5.7.14',
            imagePullPolicy: 'Always',
            command: [
              '/bin/bash',
              '-c',
              'until mysql -h ${MYSQL_HOST} -P ${MYSQL_PORT} -u${MYSQL_USER} -p${MYSQL_PASSWORD} -e status; do echo waiting for mysql; sleep 1; done'
            ],
            env: [
              { name: 'MYSQL_HOST', value: 'bluecompute-mysql' },
              { name: 'MYSQL_PORT', value: '3306' },
              { name: 'MYSQL_DATABASE', value: 'inventorydb' },
              { name: 'MYSQL_USER', value: 'root' },
              {
                name: 'MYSQL_PASSWORD',
                valueFrom: {
                  secretKeyRef: { name: 'bluecompute-inventory-mysql-secret', key: 'mysql-password' }
                }
              }
            ]
          }
        ],
        containers: [
          {
            name: 'populate-mysql',
            image: 'mysql:5.7.14',
            imagePullPolicy: 'Always',
            volumeMounts: [ { mountPath: '/inventory-data', name: 'inventory-data', readOnly: false } ],
            command: [ '/bin/bash', '-c' ],
            args: [
              'cp /inventory-data/mysql_data.sql .; sed -i "s/inventorydb/${MYSQL_DATABASE}/g" mysql_data.sql; until mysql -h ${MYSQL_HOST} -P ${MYSQL_PORT} -u${MYSQL_USER} -p${MYSQL_PASSWORD} <mysql_data.sql; do echo "waiting for mysql"; sleep 1; done; echo "Loaded data into database";'
            ],
            env: [
              { name: 'MYSQL_HOST', value: 'bluecompute-mysql' },
              { name: 'MYSQL_PORT', value: '3306' },
              { name: 'MYSQL_DATABASE', value: 'inventorydb' },
              { name: 'MYSQL_USER', value: 'root' },
              {
                name: 'MYSQL_PASSWORD',
                valueFrom: {
                  secretKeyRef: { name: 'bluecompute-inventory-mysql-secret', key: 'mysql-password' }
                }
              }
            ]
          }
        ],
        volumes: [ { name: 'inventory-data', configMap: { name: 'bluecompute-inventory-data' } } ]
      }
    }
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

app.bluecomputeOrdersJob = new solsa.batch.v1.Job({
  metadata: {
    name: 'bluecompute-orders-job',
    labels: {
      chart: 'bluecompute-orders-0.0.1',
      release: 'bluecompute',
      implementation: 'microprofile'
    }
  },
  spec: {
    template: {
      metadata: {
        name: 'bluecompute-orders-job',
        labels: {
          chart: 'bluecompute-orders-0.0.1',
          release: 'bluecompute',
          implementation: 'microprofile'
        }
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
