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

const path = require('path')
const solsa = require('solsa')

module.exports = function translator ({ name, language }) {
  let watson = new solsa.LanguageTranslator({ name: 'watson-translator-for-' + name })

  let translator = new solsa.ContainerizedService({ name, image: 'solsa-translator', build: path.join(__dirname, 'solsa-translator'), port: 8080 })

  translator.env = { LANGUAGE: { value: language }, WATSON_URL: watson.getSecret('url'), WATSON_APIKEY: watson.getSecret('apikey') }

  let ingress = translator.getIngress()

  return new solsa.Bundle({ watson, translator, ingress })
}
