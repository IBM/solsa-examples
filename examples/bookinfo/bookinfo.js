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

// An example of deploying existing microservices using SolSA to manage dependencies
// This is the Istio Bookinfo sample application (https://istio.io/docs/examples/bookinfo/)

let solsa = require('solsa')

module.exports = function bookinfo ({ name }) {
  let bundle = new solsa.Bundle()

  bundle.details = new solsa.ContainerizedService({ name: `${name}-details`, image: 'istio/examples-bookinfo-details-v1:1.15.0', port: 9080 })
  bundle.ratings = new solsa.ContainerizedService({ name: `${name}-ratings`, image: 'istio/examples-bookinfo-ratings-v1:1.15.0', port: 9080 })
  bundle.reviews = new solsa.ContainerizedService({ name: `${name}-reviews`, image: 'istio/examples-bookinfo-reviews-v1:1.15.0', port: 9080 })
  bundle.productpage = new solsa.ContainerizedService({ name: `${name}-productpage`, image: 'istio/examples-bookinfo-productpage-v1:1.15.0', port: 9080 })
  bundle.productpage.env = {
    DETAILS_HOSTNAME: bundle.details.name,
    RATINGS_HOSTNAME: bundle.ratings.name,
    REVIEWS_HOSTNAME: bundle.reviews.name
  }
  bundle.entry = new bundle.productpage.Ingress()

  return bundle
}
