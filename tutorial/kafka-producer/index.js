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

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'guest',
  brokers: JSON.parse(process.env.BROKERS),
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: process.env.USER,
    password: process.env.PASSWORD
  }
})

const producer = kafka.producer()

async function main () {
  await producer.connect()
  console.log('connected to kafka')
  for (; ;) {
    await producer.send({ topic: process.env.TOPIC, messages: [{ value: JSON.stringify({ text: 'Hello, how are you?' }) }] })
    console.log('message sent')
    await new Promise(resolve => setTimeout(resolve, 5000))
  }
}

main()

/*
Try:

BROKERS=$(kubectl get secret kafka -o jsonpath='{.data.kafka_brokers_sasl}' | base64 -D) \
USER=$(kubectl get secret kafka -o jsonpath='{.data.user}' | base64 -D) \
PASSWORD=$(kubectl get secret kafka -o jsonpath='{.data.password}' | base64 -D) \
TOPIC=MyTopic \
node index.js
*/
