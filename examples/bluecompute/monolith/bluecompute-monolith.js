/* eslint-disable no-template-curly-in-string */
// @ts-check
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
    'grafana.ini': require('fs').readFileSync('bluecompute-monolith-1-grafana.ini').toString()
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
    'prometheus-monitoring.json': require('fs').readFileSync('bluecompute-monolith-2-prometheus-monitoring.json').toString(),
    'kubernetes-cluster-monitoring.json': require('fs').readFileSync('bluecompute-monolith-3-kubernetes-cluster-monitoring.json').toString(),
    'docker-host-container-monitoring.json': require('fs').readFileSync('bluecompute-monolith-4-docker-host-container-monitoring.json').toString(),
    'ICP2.1-Performance.json': require('fs').readFileSync('bluecompute-monolith-5-ICP2.1-Performance.json').toString(),
    'ICP2.1-Namespaces-Performance.json': require('fs').readFileSync('bluecompute-monolith-6-ICP2.1-Namespaces-Performance.json').toString()
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
    'prometheus.yml': require('fs').readFileSync('bluecompute-monolith-7-prometheus.yml').toString()
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
    'default.json': require('fs').readFileSync('bluecompute-monolith-8-default.json').toString()
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
