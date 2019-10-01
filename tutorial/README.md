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

# SolSA Tutorial

In this tutorial, we will demonstrate the use of SolSA to configure and deploy
containerized services, Knative services, and managed cloud service on the IBM
Cloud. We will also use SolSA to build and push a container image for a new
service.

## Example: Containerized Service

In [hello.js](hello.js), we use the SolSA library to configure a containerized
service.
```javascript
const solsa = require('solsa')

module.exports = new solsa.ContainerizedService({ name: 'hello-world', image: 'docker.io/ibmcom/kn-helloworld', port: 8080 })
```
In this code, we load the SolSA library and use the library to construct an
instance of the `ContainerizedService` class, which we export. We specify a few
parameters:
- the intended name of the service (required),
- the name of the container image that implements the service (required),
- the port the container will be listening on (optional).

We synthesize YAML for this example with the SolSA CLI:
```shell
solsa yaml hello.js
```
```yaml
apiVersion: v1
kind: Service
metadata:
  name: hello-world
spec:
  ports:
  - port: 8080
  selector:
    solsa.ibm.com/pod: hello-world
  type: ClusterIP
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-world
spec:
  replicas: 1
  selector:
    matchLabels:
      solsa.ibm.com/pod: hello-world
  template:
    metadata:
      labels:
        solsa.ibm.com/pod: hello-world
    spec:
      containers:
      - env:
        - name: PORT
          value: "8080"
        image: docker.io/ibmcom/kn-helloworld
        livenessProbe:
          tcpSocket:
            port: 8080
        name: hello-world
        ports:
        - containerPort: 8080
        readinessProbe:
          tcpSocket:
            port: 8080
```
This YAML configures the requested `ContainerizedService` making use of the
specified service name, port, and container image name.

SolSA synthesized both a Kubernetes `Deployment` and a `Service` for our
`ContainerizedService`. In addition, SolSA included configuration elements such
as the number of replicas, labels, selectors, environment variables, and a
readiness probe.

Note that in addition to the YAML output, you will also see the following
warnings messages from `sosla`
```shell
Warning: Unable to load solsa configuration file "/.../.solsa.yaml"
Warning: Generating YAML without clutser or context specific layers:
           Unable to generate Ingress
           Unable to generate image name rewriting directives
```
These warnings can be safely ignored for now.  We will cover (a) defining a
`sosla.yaml` configuration file and (b) how `sosla` figures out which of your
Kubernetes clusters it should be targeting [later in this
tutorial](#example-ingress).

While SolSA makes it possible to directly configure resources such as Kubernetes
deployments or services, SolSA encourages developers to use higher-level
abstractions such as the `ContainerizedService` class. These abstractions are
key to shorter, simpler, and more portable cloud-native solutions and patterns.
We will see more examples of such abstractions in subsequent examples.

To deploy this first example, we run:
```shell
solsa yaml hello.js | kubectl apply -f -
```
We will add an ingress for our `ContainerizedService` later. For now, we can
test our deployment by fetching its logs using, e.g., the synthesized label:
```shell
kubectl logs -lsolsa.ibm.com/pod=hello-world
```
```
2019/06/10 12:44:52 Hello world sample started.
```
To undeploy, we run:
```shell
solsa yaml hello.js | kubectl delete -f -
```

## Example: Bundle

In [bundle.js](bundle.js), we introduce the SolSA `Bundle` class.
```javascript
const solsa = require('solsa')
const bundle = new solsa.Bundle()
module.exports = bundle

bundle.service = new solsa.ContainerizedService({ name: 'hello-bundle', image: 'docker.io/ibmcom/kn-helloworld', port: 8080, env: { TARGET: 'Bundle' } })
```
In this code, we first construct an instance of the SolSA `Bundle` class and
export this bundle, then add a `ContainerizedService` to the bundle.

Compared to the previous example, we add one more parameter to
`ContainerizedService` specification. The `env` parameter optionally provides a
list of environment variables set at container initialization time.

We synthesize YAML for this example as before:
```shell
solsa yaml bundle.js
```
```yaml
apiVersion: v1
kind: Service
metadata:
  name: hello-bundle
spec:
  ports:
  - port: 8080
  selector:
    solsa.ibm.com/pod: hello-bundle
  type: ClusterIP
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-bundle
spec:
  replicas: 1
  selector:
    matchLabels:
      solsa.ibm.com/pod: hello-bundle
  template:
    metadata:
      labels:
        solsa.ibm.com/pod: hello-bundle
    spec:
      containers:
      - env:
        - name: PORT
          value: "8080"
        - name: TARGET
          value: Bundle
        image: docker.io/ibmcom/kn-helloworld
        livenessProbe:
          tcpSocket:
            port: 8080
        name: hello-bundle
        ports:
        - containerPort: 8080
        readinessProbe:
          tcpSocket:
            port: 8080
```
We can see the `TARGET` environment variable has been included as requested.

A SolSA solution is either a `Resource` or a `Bundle`. A `ContainerizedService`
is an example of `Resource`. A `Bundle` is a collection of solutions. Bundles
can contain resources as well as nested bundles. To add elements to a `Bundle`,
we simply add fields to the `Bundle` object.

A SolSA source file must export a solution. The `solsa` CLI synthesizes YAML for
this solution by, if necessary, implementing a recursive traversal of the
bundles in the solution.

## Example: Ingress

In [ingress.js](ingress.js), we configure an ingress for our containerized
service.
```javascript
const solsa = require('solsa')
const bundle = new solsa.Bundle()
module.exports = bundle

bundle.service = new solsa.ContainerizedService({ name: 'hello-john', image: 'docker.io/ibmcom/kn-helloworld', port: 8080, env: { TARGET: 'John' } })
bundle.ingress = bundle.service.getIngress()
```
Compared to the previous example, we add an instance of the `Ingress` class to
the bundle.

An `Ingress` instance, like many SolSA resources, can be constructed by invoking
either `new solsa.Ingress(...)` or `resource.getIngress(...)` where `resource`
is an existing SolSA resource from which an ingress can be derived. In the
latter, SolSA automatically derives parameters for the new resource from
parameters of the existing resource, such as the port of the ingress from the
port of the containerized service.

To synthesize YAML for an ingress, SolSA needs to know about the cluster this
ingress is intended for. This information must be provided as part of a SolSA
configuration file. By default, the `sosla` CLI looks for a configuration file
named `.solsa.yaml`  in the user's homedir. A different path can be specified
using either the `--config` flag or the `SOLSA_CONFIG` environment variable. The
content and format of the configuration file is specified in
[solsa/docs/SolSAConfig.md](https://github.com/IBM/solsa/tree/master/docs/SolSAConfig.md).

If you are following along in this tutorial and deploying each example on your
own cluster, you should pause here, consult
[SolSAConfig.md](https://github.com/IBM/solsa/tree/master/docs/SolSAConfig.md)
and define a `$HOME/.solsa.yaml` that defines the ingress characteristics of
your cluster before continuing.

By default the `solsa` CLI targets the cluster for the current Kubernetes
context Under the covers, `sosla` just invokes `kubectl config current-context`
to get this information. Therefore any scheme you have for managing your
Kubernetes environments that works for `kubectl` will also just work for
`sosla`.  However, you can also explictly tell `sosla` to target a different
context using  the `--context` flag, or a different cluster with the `--cluster`
flag.

### Generated Ingress on Kubernetes

For instance, if we use cluster `mycluster` with the configuration file from
https://github.com/IBM/solsa/blob/master/docs/SolSAConfig.md#example, SolSA
synthesizes the ingress:
```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: hello-john
spec:
  rules:
  - host: hello-john.mycluster123.us-east.containers.appdomain.cloud
    http:
      paths:
      - backend:
          serviceName: hello-john
          servicePort: 8080
        path: /
  tls:
  - hosts:
    - mycluster123.us-east.containers.appdomain.cloud
    secretName: mycluster123
```
To deploy this example, we run:
```shell
solsa yaml ingress.js | kubectl apply -f -
```
After a few seconds, we can query the deployed service using command:
```shell
curl $(kubectl get ingress hello-john -o jsonpath={.spec.rules[0].host})
```
```
Hello John!
```
We undeploy with command:
```shell
solsa yaml ingress.js | kubectl delete -f -
```

### Generated Route on OpenShift

The exact same SolSA-level ingress specification will generate Routes when
targeting an OpenShift cluster. For instance, if we use cluster `myrhoscluster`
with the configuration file from
https://github.com/IBM/solsa/blob/master/docs/SolSAConfig.md#example, SolSA
synthesizes the route:
```yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: hello-john
spec:
  host: hello-john.myrhoscluster-0139ae49851705507802c3fbbaa73a82-0001.us-east.containers.appdomain.cloud
  path: /
  port:
    targetPort: 8080
  tls:
    termination: edge
  to:
    kind: Service
    name: hello-john
    weight: 100
  wildcardPolicy: None
```
To deploy this example, we run:
```shell
solsa yaml ingress.js | oc apply -f -
```
After a few seconds, we can query the deployed service using command:
```shell
curl https://$(oc get route hello-john -o jsonpath={.spec.host})
```

When deploying a SolSA solution that includes an ingress to OpenShift, you must
use the `oc` CLI instead of `kubectl`. Some additional OpenShift specific
processing is required to actually create a Route from its YAML specification;
this is handled by the `oc` CLI.

## Example: Knative Service

In [knative.js](knative.js), we deploy the same container image as a Knative
service:
```javascript
const solsa = require('solsa')
const bundle = new solsa.Bundle()
module.exports = bundle

bundle.service = new solsa.KnativeService({ name: 'hello-knative', image: 'docker.io/ibmcom/kn-helloworld', env: { TARGET: 'Knative' } })
bundle.ingress = bundle.service.getIngress()
```
The formula is essentially the same. We replace the `ContainerizedService` class
with the `KnativeService` class. Here we don't need to specify the port, as
Knative can detect it automatically. We also changed the value of the `TARGET`
environment variable to show a different output.

The ingress definition is again a one-liner. But is is handled very differently
under the hood. On IKS (IBM Cloud Kubernetes Service), Knative services are
exposed by default, so no YAML is needed to have an ingress. But, if no ingress
is requested by the solution, a label is added to the generated YAML to disable
the default IKS behavior:
```yaml
  labels:
    serving.knative.dev/visibility: cluster-local
```

The synthesized YAML for this example is:
```shell
solsa yaml knative.js
```
```yaml
apiVersion: serving.knative.dev/v1alpha1
kind: Service
metadata:
  name: hello-knative
spec:
  template:
    spec:
      containers:
      - env:
        - name: TARGET
          value: Knative
        image: docker.io/ibmcom/kn-helloworld
```
To deploy this example, we run:
```shell
solsa yaml knative.js | kubectl apply -f -
```
After a few seconds (wait until `kubectl get service.serving.knative.dev
hello-knative` reports that hello-knative is `Ready`), we can query the deployed
service using command:
```shell
curl $(kubectl get ksvc/hello-knative -o jsonpath={.status.url})
```
```
Hello Knative!
```
We undeploy with command:
```shell
solsa yaml knative.js | kubectl delete -f -
```

## Example: BookInfo

In [bookinfo.js](bookinfo.js), we combine four containerized services to build
one application:
```javascript
bundle.details = new solsa.ContainerizedService({ name: 'details', image: 'istio/examples-bookinfo-details-v1:1.11.0', port: 9080 })
bundle.ratings = new solsa.ContainerizedService({ name: 'ratings', image: 'istio/examples-bookinfo-ratings-v1:1.11.0', port: 9080 })
bundle.reviews = new solsa.ContainerizedService({ name: 'reviews', image: 'istio/examples-bookinfo-reviews-v1:1.11.0', port: 9080 })
bundle.productpage = new solsa.ContainerizedService({ name: 'productpage', image: 'istio/examples-bookinfo-productpage-v1:1.11.0', port: 9080 })
bundle.ingress = bundle.productpage.getIngress()
```
After deployment, the url for the bookinfo application can be obtained as
follows:
```shell
kubectl get ingress productpage
```

## Example: Watson Translator

In [translator.js](translator.js), we configure an instance of the Watson
Translator service on the IBM Cloud.
```javascript
bundle.translator = new solsa.LanguageTranslator({ name: 'translator', plan: 'lite' })
```
This example assumes that the IBM Cloud Operator has been deployed to the
current Kubernetes cluster as discussed in
https://github.com/IBM/solsa#kubernetes-cluster-setup. Here we specify the
desired name for the service instance as well as the plan.

To deploy this example, we run:
```shell
solsa yaml translator.js | kubectl apply -f -
```
The synthesized YAML leverages the IBM Cloud Operator to instantiate the
translator service, obtain credentials for the new instance, and store these
credentials as Kubernetes secrets in the current namespace.

We can use these credentials to access the service for instance as follows:
```shell
APIKEY=$(kubectl get secret translator -o jsonpath='{.data.apikey}' | base64 -D)
URL=$(kubectl get secret translator -o jsonpath='{.data.url}' | base64 -D)
curl -X POST -u "apikey:$APIKEY" -H "Content-Type: application/json" -d '{"text": ["Hello, world! ", "How are you?"], "model_id":"en-es"}' "$URL/v3/translate?version=2018-05-01"
```
As usual, we undeploy with command:
```shell
solsa yaml translator.js | kubectl delete -f -
```

## Example: Event Streams

In [kakfa.js](kafka.js), we configure an Event Streams instance and create a
topic on this instance.
```javascript
bundle.kafka = new solsa.EventStreams({ name: 'kafka', plan: 'standard', serviceClassType: 'CF' })
bundle.topic = bundle.kafka.getTopic({ name: 'topic', topicName: 'MyTopic' })
```
As in the previous example, the credentials for the Event Streams instance are
stored as Kubernetes secrets.

We deploy with command:
```
solsa yaml kafka.js | kubectl apply -f -
```
To test the instance and topic, we provide a Node.js
[kafka-producer](kafka-producer) module that connects to the instance and
publishes a message to the topic every five seconds:
```shell
cd kafka-producer
npm install
BROKERS=$(kubectl get secret kafka -o jsonpath='{.data.kafka_brokers_sasl}' | base64 -D) \
USER=$(kubectl get secret kafka -o jsonpath='{.data.user}' | base64 -D) \
PASSWORD=$(kubectl get secret kafka -o jsonpath='{.data.password}' | base64 -D) \
TOPIC=MyTopic \
node index.js
```
```
connected to kafka
message sent
message sent
message sent
```
Our `kafka-producer` module expects the url (brokers), user name, and password
of the Event Streams instance to be provided as environment variables. We
extract these values from the corresponding Kubernetes secrets.

We will keep this Event Streams instance and topic deployed for the next few
examples.

## Example: Event Streams Producer

In the previous example, we ran a Kafka producer locally to publish messages to
an Event Streams instance. SolSA makes it easy to containerize and run this
producer code as a Kubernetes service on our cluster. In
[producer.js](producer.js), we do exactly that.
```javascript
bundle.kafka = new solsa.EventStreams({ name: 'kafka', plan: 'standard', serviceClassType: 'CF' }).useExisting()
bundle.topic = bundle.kafka.getTopic({ name: 'topic', topicName: 'MyTopic' }).useExisting()

bundle.producer = new solsa.ContainerizedService({ name: 'producer', image: 'kafka-producer', build: path.join(__dirname, 'kafka-producer') })

bundle.producer.env = {
  BROKERS: bundle.kafka.getSecret('kafka_brokers_sasl'),
  USER: bundle.kafka.getSecret('user'),
  PASSWORD: bundle.kafka.getSecret('password'),
  TOPIC: bundle.topic.spec.topicName
}
```
This code first declares the Event Streams instance and topic. This time however
we append `.useExisting()` to these declarations so that we can input the
information we need about the instance and topic but omit them from the
generated YAML.

The `ContainerizedService` configuration is similar to previous examples, except
for the addition of the `build` parameter. This parameter is the absolute path
to the Node.js module we want to containerize. As illustrate here, the absolute
path of the module may be obtained by prefixing the path relative to the current
module with `__dirname`.

The `env` parameter of the `ContainerizedService` instance makes use of the
`getSecret` method of the `EventStreams` SolSA class to obtain the credentials.
```shell
solsa yaml producer.js
```
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: producer
spec:
  replicas: 1
  selector:
    matchLabels:
      solsa.ibm.com/pod: producer
  template:
    metadata:
      labels:
        solsa.ibm.com/pod: producer
    spec:
      containers:
      - env:
        - name: BROKERS
          valueFrom:
            secretKeyRef:
              key: kafka_brokers_sasl
              name: kafka
        - name: USER
          valueFrom:
            secretKeyRef:
              key: user
              name: kafka
        - name: PASSWORD
          valueFrom:
            secretKeyRef:
              key: password
              name: kafka
        - name: TOPIC
          value: MyTopic
        image: us.icr.io/tardieu/kafka-producer
        name: producer
```

To build the container image, we run:
```shell
solsa build producer.js
```
```
Building image "kafka-producer"
Copying files to temporary folder
Running docker build
Sending build context to Docker daemon  899.7kB
Step 1/6 : FROM node:10-alpine
 ---> 56bc3a1ed035
Step 2/6 : ARG MAIN
 ---> Using cache
 ---> 4c37c74f5109
Step 3/6 : ENV MAIN ${MAIN}
 ---> Using cache
 ---> 14750d522512
Step 4/6 : WORKDIR /solsa
 ---> Using cache
 ---> 286cb5aabad2
Step 5/6 : COPY . .
 ---> Using cache
 ---> 9c08f7dfc5af
Step 6/6 : CMD node ${MAIN}
 ---> Using cache
 ---> 1b333522d208
Successfully built 1b333522d208
Successfully tagged kafka-producer:latest
Reclaiming temporary folder
```
To push the container image to the container registry, we run:
```shell
solsa push producer.js
```
```
Tagging image "kafka-producer" with tag "us.icr.io/tardieu/kafka-producer"
Pushing image "us.icr.io/tardieu/kafka-producer"
The push refers to repository [us.icr.io/tardieu/kafka-producer]
6b181c15314a: Layer already exists 
d5d6345b9654: Layer already exists 
28bf756b6f8e: Layer already exists 
4c299e1e70d5: Layer already exists 
f1b5933fe4b5: Layer already exists 
latest: digest: sha256:4417bba9fef771627b93caace375c580dedb3797fb38a1728b69400672dc85bc size: 1367
```
The latter assumes that the SolSA configuration file maps the image name
(`kafka-producer`) to a container registry. See
[solsa/docs/SolSAConfig.md](https://github.com/IBM/solsa/tree/master/docs/SolSAConfig.md)
for details.

Assuming, the Event Streams instance and topic from the previous example are
still deployed, we can deploy our producer using command:
```shell
solsa yaml producer.js | kubectl apply -f -
```
After a few seconds, we can fetch the logs of our producer using command:
```shell
kubectl logs -lsolsa.ibm.com/pod=producer
```
```
connected to kafka
message sent
message sent
message sent
message sent
```

## Example: Event Streams Consumer

In [consumer.js](consumer.js), we use a Knative service to process the messages
on an Event Streams topic.
```javascript
bundle.kafka = new solsa.EventStreams({ name: 'kafka', plan: 'standard', serviceClassType: 'CF' }).useExisting()
bundle.topic = bundle.kafka.getTopic({ name: 'topic', topicName: 'MyTopic' }).useExisting()

bundle.sink = new solsa.KnativeService({ name: 'sink', image: 'gcr.io/knative-releases/github.com/knative/eventing-sources/cmd/event_display' })
bundle.source = bundle.topic.getSource({ name: 'source', sink: bundle.sink })
```
The code first declares the same Event Streams instance and topic as before,
then a Knative service, and finally a Kafka Knative event source that binds the
service to the topic.
```shell
solsa yaml consumer.js | kubectl apply -f -
```
```shell
kubectl logs -lserving.knative.dev/service=sink -c user-container
```
```
  source: MyTopic
  id: partition:0/offset:34
  time: 2019-06-10T14:49:59.528Z
  contenttype: application/json
Extensions,
  key: 
Data,
  {
    "text": "Hello, how are you?"
  }
```
To undeploy the full Event Streams example, we run:
```shell
solsa yaml consumer.js | kubectl delete -f -
solsa yaml producer.js | kubectl delete -f -
solsa yaml kafka.js | kubectl delete -f -
```
