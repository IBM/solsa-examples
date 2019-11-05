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

// This example shows how to extend the Istio Bookinfo sample by
// injecting a SolSA service that does language translation between
// the productpage and reviews services.
//
// Istio Bookinfo sample application: (https://istio.io/docs/examples/bookinfo/)

let solsa = require('solsa')
let bookinfo = require('./bookinfo.js')

module.exports = function translatingBookinfo ({ language }) {
  // Create an instance of the basic Bookinfo application pattern
  let bundle = bookinfo()

  // Extract reviews and productpage resources from bundle
  let reviews = /** @type {solsa.ContainerizedService} */ (bundle.solutions.reviews)
  let productpage = /** @type {solsa.ContainerizedService} */ (bundle.solutions.productpage)

  // Configure a translating review service
  let translator = new solsa.LanguageTranslator({ name: 'bookinfo-watson-translator' })
  let translatedReviews = new solsa.ContainerizedService({ name: 'reviews-translator', image: 'solsa-reviews-translator', build: __dirname, main: 'reviews-translator.js', port: 9080 })

  translatedReviews.env = {
    LANGUAGE: { value: language },
    WATSON_TRANSLATOR_URL: translator.getSecret('url'),
    WATSON_TRANSLATOR_APIKEY: translator.getSecret('apikey'),
    REVIEWS_HOSTNAME: reviews.name,
    REVIEWS_PORT: reviews.port
  }
  translatedReviews.readinessProbe = { httpGet: { path: '/solsa/readinessProbe', port: translatedReviews.port } }

  // Modify the Bookinfo productpage to use the translating review service
  productpage.env.REVIEWS_HOSTNAME = translatedReviews.name

  // Add translator and translatedReviews resources to the bundle
  bundle.solutions.translator = translator
  bundle.solutions.translatedReviews = translatedReviews

  return bundle
}
