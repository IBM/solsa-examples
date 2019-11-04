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

let solsa = require('solsa')

module.exports = function bookinfo () {
  let details = new solsa.ContainerizedService({ name: 'details', image: 'istio/examples-bookinfo-details-v1:1.15.0', port: 9080 })
  let ratings = new solsa.ContainerizedService({ name: 'ratings', image: 'istio/examples-bookinfo-ratings-v1:1.15.0', port: 9080 })
  let reviews = new solsa.ContainerizedService({ name: 'reviews', image: 'istio/examples-bookinfo-reviews-v1:1.15.0', port: 9080 })
  let productpage = new solsa.ContainerizedService({ name: 'productpage', image: 'istio/examples-bookinfo-productpage-v1:1.15.0', port: 9080 })
  productpage.env = {
    DETAILS_HOSTNAME: details.name,
    RATINGS_HOSTNAME: ratings.name,
    REVIEWS_HOSTNAME: reviews.name
  }
  let entry = productpage.getIngress({ vhost: 'bookinfo' })

  return new solsa.Bundle({ details, ratings, reviews, productpage, entry })
}
