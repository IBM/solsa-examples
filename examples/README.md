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

# SolSA Examples

This folder contains sample SolSA solutions that illustrate different use cases.
* [Bookinfo](bookinfo) shows how an existing microservice based application is
  expressed in SolSA using high-level abstractions such as `ContainerizedService`.
  It also illustrates how to define an application pattern in SolSA that can
  be reused to define a larger enhanced application.
* [BlueCompute](bluecompute) shows how a significantly more sophisticated
  microservice based application can be expressed using SolSA's wrappering
  of standard Kubernetes abstractions such as `Deployment` enhanced with
  additional support for common idioms.
* [Translator](translator) focuses on configuring a single newly-developed
  microservice that relies on an IBM Cloud Service for its core functionality.
* [Knative Eventing](knative-eventing) shows how SolSA can simplify the
  specification of a Knative eventing pattern that connects a Kafka event source
  to a Knative service sink.
* [K-Container](k-container) shows how SolSA can be used to capture an
  event-driven architecture pattern from the IBM Cloud Garage that combines
  multiple microservices with an operator-managed public cloud service.
