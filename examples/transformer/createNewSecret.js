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

// An example showing how to use the SchemaTransformer to
// create a new Secret that contains dynamically computed values

let solsa = require('solsa')

let bundle = new solsa.Bundle()

bundle.task = new solsa.SchemaTransformer({
  name: 'plugh',
  code: function () {
    const x = process.env.v1
    const y = process.env.v2
    const z = process.env.v3
    return { k1: x.toLocaleUpperCase(), k2: y.toLocaleLowerCase(), k12: `${x}#${y}#${z}` }
  },
  outputSecret: 'd1',
  useExistingOutput: false,
  env: {
    v1: 'xyzzy',
    v2: 'Shazzam',
    v3: 'mellon'
  }
})

module.exports = bundle
