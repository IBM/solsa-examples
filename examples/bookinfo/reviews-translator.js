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

const express = require('express')
const needle = require('needle')
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3')

const app = express()

const PORT = process.env.PORT || 8080

const REVIEWS_HOSTNAME = process.env.REVIEWS_HOSTNAME
const REVIEWS_PORT = process.env.REVIEWS_PORT

const translator = new LanguageTranslatorV3({ version: '2018-05-01', iam_apikey: process.env.WATSON_TRANSLATOR_APIKEY, url: process.env.WATSON_TRANSLATOR_URL })
const target = process.env.LANGUAGE

app.use(express.json())

app.get('/reviews/:product', (request, response) => {
  console.log(request.body)
  console.log(request.params)

  const product = request.params.product
  const url = `http://${REVIEWS_HOSTNAME}:${REVIEWS_PORT}/reviews/${product}`
  console.log(url)
  needle('get', url)
    .then(res => {
      return Promise.all(res.body.reviews.map(oneReview => {
        return translator.identify({ text: oneReview.text })
          .then(res => {
            return translator.translate({ text: [oneReview.text], source: res.languages[0].language, target })
              .then(res => {
                oneReview.text = res.translations[0].translation
                return oneReview
              })
          })
      })).then(reviews => {
        response.status(200).send({ reviews: reviews })
      })
    }).catch(err => {
      console.log(err)
      response.status(500).send({ error: (err && err.message) || 'Internal error' })
    })
})

app.get('/solsa/readinessProbe', (_, response) => {
  response.status(200).send('OK')
})

app.all('/solsa/abort', _ => process.exit(0))

app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`server is listening on ${PORT}`)
  }
})
