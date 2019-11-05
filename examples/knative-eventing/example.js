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

// Event Streams instance
let kafka = new solsa.EventStreams({ name: 'kafka', plan: 'standard', serviceClassType: 'CF' })

// Event Streams Topic
let topic = kafka.getTopic({ name: 'topic', topicName: 'MyTopic' })

// Producer (containerized service) interfacing directly with Event Streams
let producer = new solsa.ContainerizedService({ name: 'producer', image: 'kafka-producer', build: path.join(__dirname, '..', '..', 'tutorial', 'kafka-producer') })
producer.env = {
  BROKERS: kafka.getSecret('kafka_brokers_sasl'),
  USER: kafka.getSecret('user'),
  PASSWORD: kafka.getSecret('password'),
  TOPIC: topic.spec.topicName
}

// Consumer (Knative service)
let sink = new solsa.KnativeService({ name: 'sink', image: 'gcr.io/knative-releases/github.com/knative/eventing-sources/cmd/event_display' })

// Knative event source to connect the topic to the consumer
let source = topic.getSource({ name: 'source', sink })

module.exports = new solsa.Bundle({ kafka, topic, producer, sink, source })
