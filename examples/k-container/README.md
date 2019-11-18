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

# SolSA in Action: Event Driven Architectures

## Overview

The IBM Cloud Garage [Event Driven Architecture](https://www.ibm.com/cloud/garage/architectures/eventDrivenArchitecture/reference-architecture)
[K Container Shipping use case](https://github.com/ibm-cloud-architecture/refarch-kc)
illustrates the deployment of real time analytics on event streams in the context of container shipment in an event driven architecture with event backbone, functions as service, and event-driven microservices, and aims to illustrate the different event driven patterns like event sourcing, CQRS and Saga.

From a SolSA perspective, this solution illustrates the creation of an architectural pattern
that combines existing containerized microservices that execute in a Kubernetes cluster with
externally deployed IBM EventStreams instance.  Multiple Kubernetes Operators
are leveraged "under the covers" by SolSA to actually create and configure the
EventStreams instance and adapt its binding secrets to the format expected by the
K Container microservices.

The architectural pattern is defined in [kcontainer.js](./kcontainer.js),
which exports a function that maps an application context derived from the
configuration information provided in [values.yaml](./values.yaml) returns a SolSA `Bundle`
instantiating the pattern.  Of interest in the architecture specification is the concise
declaration of the `EventStreams` instance and its associated topics, and the connection of the
various microservices to that instance and each other through their respective `env` bindings.

## Deployment

Deploy the application with `solsa yaml kcontainer.js | kubectl apply -f -`

After about a minute, you can open the URL of the created ingress
in a web browser.

You can login to the UI using bobbuilder@email.com and passw0rd.

You should be able to initiate orders, inspect the state of the fleet,
and inspect pending shipments. Note that not all components of the
application itself are actually implemented.

There is an incomplete Streaming Analytics portion of the K-Continaer
application which is not currently deployed by SolSA.
