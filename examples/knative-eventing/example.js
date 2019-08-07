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
const bundle = new solsa.Bundle()
module.exports = bundle

// Event Streams instance
bundle.kafka = new solsa.EventStreams({ name: 'kafka', plan: 'standard', serviceClassType: 'CF' })

// Event Streams Topic
bundle.topic = new bundle.kafka.Topic({ name: 'topic', topicName: 'MyTopic' })

// Producer (containerized service) interfacing directly with Event Streams
bundle.producer = new solsa.ContainerizedService({ name: 'producer', image: 'kafka-producer', build: path.join(__dirname, '..', '..', 'tutorial', 'kafka-producer') })
bundle.producer.env = {
  BROKERS: bundle.kafka.getSecret('kafka_brokers_sasl'),
  USER: bundle.kafka.getSecret('user'),
  PASSWORD: bundle.kafka.getSecret('password'),
  TOPIC: bundle.topic.topicName
}

// Consumer (Knative service)
bundle.sink = new solsa.KnativeService({ name: 'sink', image: 'gcr.io/knative-releases/github.com/knative/eventing-sources/cmd/event_display' })

// Knative event source to connect the topic to the consumer
bundle.source = new bundle.topic.Source({ name: 'source', sink: bundle.sink })
