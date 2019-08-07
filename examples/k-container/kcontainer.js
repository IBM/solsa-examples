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

// An instatiation of the k-container application where
// the image mapping function is defined by reading
// a yaml file that specifies the details of an image.
//
// This is intented to illustrate one possible pattern
// for using SolSA in a more complex build environment
// where image details would be provided by an
// externally-generated config file.

const solsa = require('solsa')
const kcontainer = require('./kcontainer-architecture')
const fs = require('fs')
const path = require('path')

let imageConfigFile = path.join(__dirname, 'dgrove-images.yaml')
let imageConfig = solsa.parseYaml(fs.readFileSync(imageConfigFile))

function getImage (shortname) {
  const entry = imageConfig.images.find(({ name }) => name === shortname)
  if (!entry) return shortname
  var res = shortname
  if (entry.registry) {
    res = `${entry.registry}/${shortname}`
  }
  if (entry.tag) {
    res = `${res}:${entry.tag}`
  }
  return res
}

module.exports = kcontainer({ name: 'kcontainer', getImage: getImage })
