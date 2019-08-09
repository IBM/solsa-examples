<!--
#
# Copyright 2019 IBM Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
-->

# SolSA in Action: Translation from an Unknown Language to English

This example expands on the [translator example from the
tutorial](../../tutorial#example-watson-translator) to use SolSA to define a
microservice that combines the language identification and language translation
capabilities of IBM Watson Language Translator to enable it to translate from
any language to English.

This example also illustrates how to use SolSA to define not just one monolithic
solution but rather a solution architecture than can be instantiated repeatedly.
Concretely, we are first going to build a translator from an unknown language to
any desired language and then instantiate this solution architecture to obtain a
translator to English.

## Description

The solution architecture is defined in [solution.js](solution.js):
```javascript
const path = require('path')
const solsa = require('solsa')

module.exports = function translator ({ name, language }) {
  let bundle = new solsa.Bundle()

  bundle.watson = new solsa.LanguageTranslator({ name: 'watson-translator-for-' + name })

  bundle.translator = new solsa.ContainerizedService({ name, image: 'solsa-translator', build: path.join(__dirname, 'solsa-translator'), port: 8080 })

  bundle.translator.env = { LANGUAGE: { value: language }, WATSON_URL: bundle.watson.getSecret('url'), WATSON_APIKEY: bundle.watson.getSecret('apikey') }

  bundle.ingress = new bundle.translator.Ingress()

  return bundle
}
```
It consists of three components:
- an instance of the IBM Watson Translator service,
- a containerized microservice,
- an ingress.

This code does not export a bundle but rather a function that builds a bundle
given a couple of parameters:
- the desired name for the solution,
- the target translation language.

The names of the Kubernetes resources in the bundle are derived from the
solution name so that multiple instances of the solution can be deployed
concurrently to the same Kubernetes namespace.

The [solsa-translator](solsa-translator) microservice itself is implemented as a
Node.js module that leverages the IBM Watson SDK for interfacing with the Watson
Translator service and Express for interfacing with REST clients.

The final solution is intantiated in [instance.js](instance.js) as follows:
```javascript
const translator = require('./solution')

module.exports = translator({ name: 'my-translator', language: 'en' })
```

## Deployment

First, use the `solsa` CLI to build and push the container image for the new
microservice:
```shell
solsa build instance.js
solsa push instance.js
```
These commands automatically identify the required microservice images starting
from the instantiated solution architecture.

Next, deploy the solution instance with:
```shell
solsa yaml instance.js | kubectl apply -f -
```
If we use cluster `mycluster` with the configuration file from
https://github.com/IBM/solsa/blob/master/docs/SolSAConfig.md#example, we can
test the deployed solution through its ingress:
```shell
curl -X POST -H "Content-Type: application/json" $(kubectl get ingress my-translator -o jsonpath={.spec.rules[0].host})/translate -d '{ "text": "Hola senor" }'
```
Undeploy with command:
```shell
solsa yaml instance.js | kubectl delete -f -
```
