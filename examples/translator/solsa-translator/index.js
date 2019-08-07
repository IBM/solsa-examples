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
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3')

const app = express()

const PORT = process.env.PORT || 8080

const translator = new LanguageTranslatorV3({ version: '2018-05-01', iam_apikey: process.env.WATSON_APIKEY, url: process.env.WATSON_URL })
const target = process.env.LANGUAGE

app.use(express.json())

app.post('/identify', (request, response) => {
  translator.identify(request.body)
    .then(res => response.status(200).send({ language: res.languages[0].language }))
    .catch(err => {
      console.log(err)
      response.status(500).send({ error: (err && err.message) || 'Internal error' })
    })
})

app.post('/translate', (request, response) => {
  translator.identify(request.body)
    .then(res => translator.translate({ text: request.body.text, source: res.languages[0].language, target }))
    .then(res => response.status(200).send({ text: res.translations[0].translation }))
    .catch(err => {
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
