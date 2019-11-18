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
// the image mapping function is defined by accessing
// a values.yaml file that was loaded with the application
// and made available via getSolutionConfig().
//
// This is intented to illustrate one possible pattern
// for using SolSA in a more complex build environment
// where image details are provided by an
// external configuration file.

const solsa = require('solsa')
const kcontainer = require('./kcontainer-architecture')

function getImage (shortname) {
  const entry = solsa.getSolutionConfig()[shortname]
  if (!entry || !entry.image) return shortname
  var res = entry.image.name
  if (entry.image.registry) {
    res = `${entry.image.registry}/${res}`
  }
  if (entry.image.tag) {
    res = `${res}:${entry.image.tag}`
  }
  return res
}

module.exports = kcontainer({ getImage: getImage })
