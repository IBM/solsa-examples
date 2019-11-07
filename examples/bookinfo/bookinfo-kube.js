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

let details = new solsa.apps.v1.Deployment({
  metadata: { name: 'details' },
  spec: {
    selector: { matchLabels: { 'solsa.ibm.com/pod': 'details' } },
    replicas: 1,
    template: {
      spec: {
        containers: [
          {
            name: 'details',
            image: 'istio/examples-bookinfo-details-v1:1.15.0',
            env: [{ name: 'PORT', value: '9080' }],
            ports: [{ containerPort: 9080 }],
            livenessProbe: { tcpSocket: { port: 9080 } },
            readinessProbe: { tcpSocket: { port: 9080 } }
          }
        ]
      }
    }
  }
})
let detailsService = details.getService()

let reviews = new solsa.apps.v1.Deployment({
  metadata: { name: 'reviews' },
  spec: {
    selector: { matchLabels: { 'solsa.ibm.com/pod': 'reviews' } },
    replicas: 1,
    template: {
      spec: {
        containers: [
          {
            name: 'reviews',
            image: 'istio/examples-bookinfo-reviews-v1:1.15.0',
            env: [{ name: 'PORT', value: '9080' }],
            ports: [{ containerPort: 9080 }],
            livenessProbe: { tcpSocket: { port: 9080 } },
            readinessProbe: { tcpSocket: { port: 9080 } }
          }
        ]
      }
    }
  }
})
let reviewsService = reviews.getService()

let ratings = new solsa.apps.v1.Deployment({
  metadata: { name: 'ratings' },
  spec: {
    selector: { matchLabels: { 'solsa.ibm.com/pod': 'ratings' } },
    replicas: 1,
    template: {
      spec: {
        containers: [
          {
            name: 'ratings',
            image: 'istio/examples-bookinfo-ratings-v1:1.15.0',
            env: [{ name: 'PORT', value: '9080' }],
            ports: [{ containerPort: 9080 }],
            livenessProbe: { tcpSocket: { port: 9080 } },
            readinessProbe: { tcpSocket: { port: 9080 } }
          }
        ]
      }
    }
  }
})
let ratingsService = ratings.getService()

let productpage = new solsa.apps.v1.Deployment({
  metadata: { name: 'productpage' },
  spec: {
    selector: { matchLabels: { 'solsa.ibm.com/pod': 'productpage' } },
    replicas: 1,
    template: {
      spec: {
        containers: [
          {
            name: 'productpage',
            image: 'istio/examples-bookinfo-productpage-v1:1.15.0',
            env: [
              { name: 'PORT', value: '9080' },
              { name: 'DETAILS_HOSTNAME', value: details.metadata.name },
              { name: 'RATINGS_HOSTNAME', value: ratings.metadata.name },
              { name: 'REVIEWS_HOSTNAME', value: reviews.metadata.name }
            ],
            ports: [{ containerPort: 9080 }],
            livenessProbe: { tcpSocket: { port: 9080 } },
            readinessProbe: { tcpSocket: { port: 9080 } }
          }
        ]
      }
    }
  }
})
let productpageService = productpage.getService()
let ingress = productpageService.getIngress({ vhost: 'bookinfo' })

module.exports = new solsa.Bundle({ details, detailsService, reviews, reviewsService, ratings, ratingsService, productpage, productpageService, ingress })
