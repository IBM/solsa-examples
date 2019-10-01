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

# SolSA in Action: BlueCompute

## Application Overview

[BlueCompute](https://github.com/ibm-cloud-architecture/refarch-cloudnative-kubernetes) was developed by the IBM Cloud Garage as a reference implementation for running a Cloud Native Microprofile Web Application using a Microservices architecture on a Kubernetes cluster. The application is a simple store front shopping application that displays a catalog of antique computing devices, where users can search and buy products.  It has a Web interface, and it relies on BFF (Backend for Frontend) services to interact with the backend data. The logical architecture for this reference implementation is shown in the picture below.

<p align="center">
    <img src="images/bluecompute_ce.png">
</p>

## SolSA Features

We use this application to demonstrate several aspects of SolSA.
1. SolSA's TypeScript/JavaScript binding for the entire Kubernetes API enables significant IDE support for defining resources.  Throughout this application, we use the `Deployment`, `ConfigMap`, `Secret`, etc. class from SolSA's Kubernetes library.
2. SolSA's Kubernetes bindings extends this basic language support with several additional features that
make defining BlueCompute more concise and less error-prone.
   a. All `Service` resources are derived in one-liners from the `Deployments` they are exposing using `getService()`
      methods added by SolSA's library
   b. Similarly, the `Ingress` is defined by using the `getIngress()` method that SolSA has added to `Service`
   c. Redundancy is reduced by using the `propagateLabels` method of `Deployment` to avoid repeating metadata
      multiple times in a single resource.
3. This application also demonstrates one recommended idiom for combining multiple components into a coherent
   application.  Each logical portion of the application is defined in its own function (file). A `BlueComputeConfig`
   class plays a similar role to the `values.yaml` file of a Helm chart. In fact, the bulk of this class is defined
   by a `bluecompute-values.yaml` file that was derived from the `values.yaml` files of the Helm charts originally
   used to deploy the application.
4. SolSA includes importer support that is able to load yaml/json files and convert them to use SolSA's
   JavaScript bindings for Kubernetes.  This importer was used to reduce the effort needed to convert from
   the original Helm Charts to the SolSA definition of the application.  The `importer` subdirectory contains
   the artifacts created during the import process.

## Deployment

Deploy the application with `solsa yaml bluecompute.js | kubectl apply -f -`

After about a minute, you can open the URL of the created ingress
in a web browser.

You can login to the UI using the username `foo` and the password `bar`.

You should be able to browse the catalog, order items, and view your
profile which includes your order history.
