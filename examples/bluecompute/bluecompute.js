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

const solsa = require('solsa')

module.exports = function (values) {
  const appConfig = new BlueComputeApp(values)

  return new solsa.Bundle({
    config: require('./bluecompute-cluster')(appConfig),
    auth: require('./bluecompute-auth')(appConfig),
    catalog: require('./bluecompute-catalog')(appConfig),
    customer: require('./bluecompute-customer')(appConfig),
    orders: require('./bluecompute-orders')(appConfig),
    inventory: require('./bluecompute-inventory')(appConfig),
    web: require('./bluecompute-web')(appConfig)
  })
}

/**
 * Add some application-specific helper methods around the
 * data contained in values.yaml to capture repeated access patterns.
 */
class BlueComputeApp {
  constructor (values) {
    this.appName = values.bluecompute.appName
    this.values = values
  }

  /**
   * Map a logical name to the instance specific name
   * @param {string} name The logical name of the desired resource
   * @returns The instance-specific name for the resource
   */
  getInstanceName (name) {
    return `${this.appName}-${name}`
  }

  /**
   * add this.values.bluecompute.commonLabels to the argument label dictionary and return it
   */
  addCommonLabelsTo (labels) {
    return Object.assign(labels, this.values.bluecompute.commonLabels)
  }
}
