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
  // EventStreams configuration
  let es = new solsa.EventStreams({ name: 'kcontainer-es', plan: 'standard' })
  es.addTopic('allocated-orders')
  es.addTopic('bluewaterContainer')
  es.addTopic('bluewaterProblem')
  es.addTopic('bluewaterShip')
  es.addTopic('containers')
  es.addTopic('containerMetrics')
  es.addTopic('errors')
  es.addTopic('orders')
  es.addTopic('rejected-orders')

  // Common environment variables shared across kcontainer microservices
  let commonEnv = {
    APPLICATION_NAME: 'kcontainer',
    KAFKA_ENV: 'IBMCLOUD',
    KAFKA_BROKERS: es.getSecret('kafka_brokers_sasl_flat'),
    KAFKA_APIKEY: es.getSecret('api_key')
  }

  // Internal microservices
  let fleetms = new solsa.ContainerizedService({ name: 'kc-fleetms', image: getImage('fleetms'), port: 9080, env: commonEnv })
  let ordercmdms = new solsa.ContainerizedService({ name: 'kc-ordercmdms', image: getImage('ordercmdms'), port: 9080, env: commonEnv })
  let orderqueryms = new solsa.ContainerizedService({ name: 'kc-orderqueryms', image: getImage('orderqueryms'), port: 9080, env: commonEnv })
  let voyagesms = new solsa.ContainerizedService({ name: 'kc-voyagesms', image: getImage('voyagesms'), port: 3000, env: commonEnv })

  // UI connects with fleet, ordercmd, orderquery, and voyages via names/ports provided in its environment
  let ui = new solsa.ContainerizedService({ name: 'kc-ui', image: getImage('ui'), port: 3010 })
  ui.env = Object.assign({
    FLEETMS_SERVICE_SERVICE_HOST: fleetms.name,
    FLEETMS_SERVICE_SERVICE_PORT: fleetms.port,
    ORDERCOMMANDMS_SERVICE_SERVICE_HOST: ordercmdms.name,
    ORDERCOMMANDMS_SERVICE_SERVICE_PORT_HTTP: ordercmdms.port,
    ORDERQUERYMS_SERVICE_SERVICE_HOST: orderqueryms.name,
    ORDERQUERYMS_SERVICE_SERVICE_PORT_HTTP: orderqueryms.port,
    VOYAGESMS_SERVICE_SERVICE_HOST: voyagesms.name,
    VOYAGESMS_SERVICE_SERVICE_PORT_HTTP: voyagesms.port
  }, commonEnv)

  // expose UI
  let ingress = ui.getIngress({ vhost: 'kcontainer' })

  return new solsa.Bundle({ es, fleetms, ordercmdms, orderqueryms, voyagesms, ui, ingress })
}
