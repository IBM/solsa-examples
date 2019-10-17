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

// An example of deploying an application that combines containerized existing microservices
// and IBM Cloud Services using SolSA to manage dependencies and orchestrate the deployment.
//
// This is the IBM Cloud Garage Event Driven Architecture K Container Shipping use case from:
//   https://github.com/ibm-cloud-architecture/refarch-kc
//   https://www.ibm.com/cloud/garage/architectures/eventDrivenArchitecture/reference-architecture

let solsa = require('solsa')

/**
 * Instantiate an instance of the kcontainer application.
 * @param getImage a function mapping from logical image names to concrete image names
 * @returns a SolSA bundle containing the k-container instance
 */
module.exports = function kcontainer ({ getImage }) {
  let bundle = new solsa.Bundle()

  // EventStreams configuration
  bundle.es = new solsa.EventStreams({ name: 'kcontainer-es', plan: 'standard' })
  bundle.es.addTopic('allocated-orders')
  bundle.es.addTopic('bluewaterContainer')
  bundle.es.addTopic('bluewaterProblem')
  bundle.es.addTopic('bluewaterShip')
  bundle.es.addTopic('containers')
  bundle.es.addTopic('containerMetrics')
  bundle.es.addTopic('errors')
  bundle.es.addTopic('orders')
  bundle.es.addTopic('rejected-orders')

  // Common environment variables shared across kcontainer microservices
  let commonEnv = {
    APPLICATION_NAME: 'kcontainer',
    KAFKA_ENV: 'IBMCLOUD',
    KAFKA_BROKERS: bundle.es.getSecret('kafka_brokers_sasl_flat'),
    KAFKA_APIKEY: bundle.es.getSecret('api_key')
  }

  // Internal microservices
  bundle.fleetms = new solsa.ContainerizedService({ name: 'kc-fleetms', image: getImage('kc-fleetms'), port: 9080, env: commonEnv })
  bundle.ordercmdms = new solsa.ContainerizedService({ name: 'kc-ordercmdms', image: getImage('kc-ordercmdms'), port: 9080, env: commonEnv })
  bundle.orderqueryms = new solsa.ContainerizedService({ name: 'kc-orderqueryms', image: getImage('kc-orderqueryms'), port: 9080, env: commonEnv })
  bundle.voyagesms = new solsa.ContainerizedService({ name: 'kc-voyagesms', image: getImage('kc-voyagesms'), port: 3000, env: commonEnv })

  // UI connects with fleet, ordercmd, orderquery, and voyages via names/ports provided in its environment
  bundle.ui = new solsa.ContainerizedService({ name: 'kc-ui', image: getImage('kc-ui'), port: 3010 })
  bundle.ui.env = Object.assign({
    FLEETMS_SERVICE_SERVICE_HOST: bundle.fleetms.name,
    FLEETMS_SERVICE_SERVICE_PORT: bundle.fleetms.port,
    ORDERCOMMANDMS_SERVICE_SERVICE_HOST: bundle.ordercmdms.name,
    ORDERCOMMANDMS_SERVICE_SERVICE_PORT_HTTP: bundle.ordercmdms.port,
    ORDERQUERYMS_SERVICE_SERVICE_HOST: bundle.orderqueryms.name,
    ORDERQUERYMS_SERVICE_SERVICE_PORT_HTTP: bundle.orderqueryms.port,
    VOYAGESMS_SERVICE_SERVICE_HOST: bundle.voyagesms.name,
    VOYAGESMS_SERVICE_SERVICE_PORT_HTTP: bundle.voyagesms.port
  }, commonEnv)

  // expose UI
  bundle.ingress = bundle.ui.getIngress()

  return bundle
}
