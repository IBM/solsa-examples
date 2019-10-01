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

const BlueComputeApp = require('./bluecompute-config')
const appConfig = new BlueComputeApp({
  appName: 'bluecompute',
  commonLabels: { app: 'bluecompute', implementation: 'microprofile' },
  valuesFile: 'bluecompute-values.yaml'
})

const solsa = require('solsa')
const app = new solsa.Bundle()
module.exports = app

const bcClusterConfig = require('./bluecompute-cluster')
app.config = bcClusterConfig(appConfig)

const bcAuth = require('./bluecompute-auth')
app.auth = bcAuth(appConfig)

const bcCatalog = require('./bluecompute-catalog')
app.catalog = bcCatalog(appConfig)

const bcCustomer = require('./bluecompute-customer')
app.customer = bcCustomer(appConfig)

const bcOrders = require('./bluecompute-orders')
app.orders = bcOrders(appConfig)

const bcInventory = require('./bluecompute-inventory')
app.inventory = bcInventory(appConfig)

const bcWeb = require('./bluecompute-web')
app.web = bcWeb(appConfig)

app.ingress = app.web.web_Service.getIngress({ vhost: appConfig.appName })
