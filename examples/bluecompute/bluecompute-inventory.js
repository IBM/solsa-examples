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

module.exports = function bcInventory (appConfig) {
  let inventoryMysqlSecret = new solsa.core.v1.Secret({
    metadata: {
      name: appConfig.getInstanceName('inventory-mysql-secret'),
      labels: appConfig.addCommonLabelsTo({ micro: 'inventory', tier: 'backend' })
    },
    type: 'Opaque',
    data: { 'mysql-password': solsa.base64Encode(appConfig.values.mysql.db.mysqlPassword) }
  })

  let mysqlSecret = new solsa.core.v1.Secret({
    metadata: {
      name: appConfig.getInstanceName('mysql'),
      labels: appConfig.addCommonLabelsTo({ micro: 'inventory', tier: 'backend' })
    },
    type: 'Opaque',
    data: {
      'mysql-root-password': solsa.base64Encode(appConfig.values.mysql.db.mysqlRootPassword),
      'mysql-password': solsa.base64Encode(appConfig.values.mysql.db.mysqlPassword)
    }
  })

  let inventoryDataConfigMap = new solsa.core.v1.ConfigMap({
    metadata: {
      name: appConfig.getInstanceName('inventory-data'),
      labels: appConfig.addCommonLabelsTo({ micro: 'inventory', tier: 'backend' })
    },
    data: {
      'mysql_data.sql': `create database if not exists ${appConfig.values.mysql.db.mysqlDatabase};\n` +
        `use ${appConfig.values.mysql.db.mysqlDatabase};\n` +
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

  let mysqlPVC = new solsa.core.v1.PersistentVolumeClaim({
    metadata: {
      name: appConfig.getInstanceName('mysql'),
      labels: appConfig.addCommonLabelsTo({ micro: 'inventory', tier: 'backend' })
    },
    spec: {
      accessModes: [ `${appConfig.values.mysql.persistence.accessMode}` ],
      resources: { requests: { storage: `${appConfig.values.mysql.persistence.size}` } }
    }
  })

  let mysqlDeployment = new solsa.apps.v1.Deployment({
    metadata: {
      name: appConfig.getInstanceName('mysql'),
      labels: appConfig.addCommonLabelsTo({ micro: 'inventory', tier: 'backend', service: 'mysql' })
    },
    spec: {
      selector: { matchLabels: { 'solsa.ibm.com/pod': appConfig.getInstanceName('mysql') } },
      template: {
        spec: {
          volumes: [{ name: 'data', emptyDir: {} }],
          initContainers: [
            {
              name: 'remove-lost-found',
              image: 'docker.io/library/busybox:1.25.0',
              imagePullPolicy: 'IfNotPresent',
              command: ['rm', '-fr', '/var/lib/mysql/lost+found'],
              volumeMounts: [{ name: 'data', mountPath: '/var/lib/mysql' }]
            }
          ],
          containers: [
            {
              name: 'mysql',
              image: `${appConfig.values.mysql.image.repository}:${appConfig.values.mysql.image.tag}`,
              resources: appConfig.values.mysql.resources,
              env: [
                mysqlSecret.getEnvVar({ name: 'MYSQL_ROOT_PASSWORD', key: 'mysql-root-password' }),
                mysqlSecret.getEnvVar({ name: 'MYSQL_PASSWORD', key: 'mysql-password' }),
                { name: 'MYSQL_USER', value: `${appConfig.values.mysql.db.mysqlUser}` },
                { name: 'MYSQL_DATABASE', value: `${appConfig.values.mysql.db.mysqlDatabase}` }
              ],
              ports: [{ name: 'mysql', containerPort: appConfig.values.mysql.ports.sql }],
              livenessProbe: {
                exec: {
                  command: ['sh', '-c', 'mysqladmin ping -u root -p${MYSQL_ROOT_PASSWORD}']
                },
                initialDelaySeconds: 30,
                periodSeconds: 10,
                timeoutSeconds: 5,
                successThreshold: 1,
                failureThreshold: 3
              },
              readinessProbe: {
                exec: {
                  command: ['sh', '-c', 'mysqladmin ping -u root -p${MYSQL_ROOT_PASSWORD}']
                },
                initialDelaySeconds: 5,
                periodSeconds: 10,
                timeoutSeconds: 1,
                successThreshold: 1,
                failureThreshold: 3
              },
              volumeMounts: [{ name: 'data', mountPath: '/var/lib/mysql' }]
            }
          ]
        }
      }
    }
  })
  mysqlDeployment.propogateLabels()
  let mysqlService = mysqlDeployment.getService()

  let inventoryDeployment = new solsa.apps.v1.Deployment({
    metadata: {
      name: appConfig.getInstanceName('inventory'),
      labels: appConfig.addCommonLabelsTo({ micro: 'inventory', tier: 'backend', service: 'inventory' })
    },
    spec: {
      selector: { matchLabels: { 'solsa.ibm.com/pod': appConfig.getInstanceName('inventory') } },
      replicas: appConfig.values.inventory.replicaCount,
      template: {
        spec: {
          containers: [
            {
              name: 'inventory',
              image: `${appConfig.values.inventory.image.repository}:${appConfig.values.inventory.image.tag}`,
              ports: [
                { name: 'http', containerPort: appConfig.values.inventory.ports.http },
                { name: 'https', containerPort: appConfig.values.inventory.ports.https }
              ],
              readinessProbe: {
                httpGet: { path: '/', port: appConfig.values.inventory.ports.http },
                initialDelaySeconds: 60,
                timeoutSeconds: 60
              },
              livenessProbe: {
                httpGet: { path: '/health', port: appConfig.values.inventory.ports.http },
                initialDelaySeconds: 1500,
                timeoutSeconds: 500
              },
              resources: appConfig.values.inventory.resources,
              env: [
                {
                  name: 'jdbcURL',
                  value: `jdbc:mysql://${mysqlService.metadata.name}:${appConfig.values.mysql.ports.sql}/${appConfig.values.mysql.db.mysqlDatabase}?useSSL=false`
                },
                { name: 'rabbit', value: `${appConfig.getInstanceName('rabbitmq')}` },
                { name: 'PORT', value: `${appConfig.values.inventory.ports.http}` },
                { name: 'APPLICATION_NAME', value: appConfig.appName },
                { name: 'zipkinHost', value: `${appConfig.getInstanceName('zipkin')}` },
                { name: 'zipkinPort', value: `${appConfig.values.zipkin.ports.zipkin}` }
              ]
            }
          ]
        }
      }
    }
  })
  inventoryDeployment.propogateLabels()
  let inventoryService = inventoryDeployment.getService()

  const jobEnv = [
    { name: 'MYSQL_HOST', value: mysqlService.metadata.name },
    { name: 'MYSQL_PORT', value: `${appConfig.values.mysql.ports.sql}` },
    { name: 'MYSQL_DATABASE', value: `${appConfig.values.mysql.db.mysqlDatabase}` },
    { name: 'MYSQL_USER', value: 'root' },
    inventoryMysqlSecret.getEnvVar({ name: 'MYSQL_PASSWORD', key: 'mysql-password' })
  ]
  let inventoryJob = new solsa.batch.v1.Job({
    metadata: {
      name: appConfig.getInstanceName('inventory-job'),
      labels: appConfig.addCommonLabelsTo({ micro: 'inventory', tier: 'backend' })
    },
    spec: {
      template: {
        spec: {
          restartPolicy: 'Never',
          volumes: [{ name: 'inventory-data', configMap: { name: inventoryDataConfigMap.metadata.name } }],
          initContainers: [
            {
              name: 'wait-for-mysql',
              image: `${appConfig.values.mysql.image.repository}:${appConfig.values.mysql.image.tag}`,
              command: [
                '/bin/bash',
                '-c',
                'until mysql -h ${MYSQL_HOST} -P ${MYSQL_PORT} -u${MYSQL_USER} -p${MYSQL_PASSWORD} -e status; do echo waiting for mysql; sleep 1; done'
              ],
              env: jobEnv
            }
          ],
          containers: [
            {
              name: 'populate-mysql',
              image: `${appConfig.values.mysql.image.repository}:${appConfig.values.mysql.image.tag}`,
              volumeMounts: [{ mountPath: '/inventory-data', name: 'inventory-data', readOnly: false }],
              command: ['/bin/bash', '-c'],
              args: [
                'cp /inventory-data/mysql_data.sql .; sed -i "s/' + `${appConfig.values.mysql.db.mysqlDatabase}` + '/${MYSQL_DATABASE}/g" mysql_data.sql; until mysql -h ${MYSQL_HOST} -P ${MYSQL_PORT} -u${MYSQL_USER} -p${MYSQL_PASSWORD} <mysql_data.sql; do echo "waiting for mysql"; sleep 1; done; echo "Loaded data into database";'
              ],
              env: jobEnv
            }
          ]
        }
      }
    }
  })

  return new solsa.Bundle({ inventoryMysqlSecret, mysqlSecret, inventoryDataConfigMap, mysqlPVC, mysqlDeployment, mysqlService, inventoryDeployment, inventoryService, inventoryJob })
}
