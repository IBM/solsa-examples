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

module.exports = function (values) {
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
              image: values.details.image,
              env: [{ name: 'PORT', value: `${values.details.port}` }],
              ports: [{ containerPort: 9080 }],
              livenessProbe: { tcpSocket: { port: values.details.port } },
              readinessProbe: { tcpSocket: { port: values.details.port } }
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
              image: values.reviews.image,
              env: [{ name: 'PORT', value: `${values.reviews.port}` }],
              ports: [{ containerPort: values.reviews.port }],
              livenessProbe: { tcpSocket: { port: values.reviews.port } },
              readinessProbe: { tcpSocket: { port: values.reviews.port } }
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
              image: values.ratings.image,
              env: [{ name: 'PORT', value: `${values.ratings.port}` }],
              ports: [{ containerPort: values.ratings.port }],
              livenessProbe: { tcpSocket: { port: values.ratings.port } },
              readinessProbe: { tcpSocket: { port: values.ratings.port } }
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
              image: values.productpage.image,
              env: [
                { name: 'PORT', value: `${values.productpage.port}` },
                { name: 'DETAILS_HOSTNAME', value: details.metadata.name },
                { name: 'RATINGS_HOSTNAME', value: ratings.metadata.name },
                { name: 'REVIEWS_HOSTNAME', value: reviews.metadata.name }
              ],
              ports: [{ containerPort: values.productpage.port }],
              livenessProbe: { tcpSocket: { port: values.productpage.port } },
              readinessProbe: { tcpSocket: { port: values.productpage.port } }
            }
          ]
        }
      }
    }
  })
  let productpageService = productpage.getService()
  let ingress = productpageService.getIngress({ vhost: 'bookinfo' })

  return new solsa.Bundle({ details, detailsService, reviews, reviewsService, ratings, ratingsService, productpage, productpageService, ingress })
}
