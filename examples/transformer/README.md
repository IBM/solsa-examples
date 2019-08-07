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

# SolSA in Action: Secret Transformation

When combining application building blocks from multiple providers
into a solution, it is often necessary to execute small pieces of
logic to perform various forms of schema alignment.  One common example
is adapting the format or content of `Secret` or `ConfigMap` entries produced
by one Kubernetes Operator into the format expected by another Service or Operator.

Some simple schema alignments are provided as built-in operations by the 
[Composable Operator](https://github.com/IBM/composable). 

SolSA includes a more general `SchemaTransformer` class that can execute
an arbitrary user-provided JavaScript function and produce a new `Secret` or
`ConfigMap` from the function's result.   The inputs to the function are 
typically provided as environment variable bindings. In this self-contained
example, the input values are simply `value` bindings; in a realistic example
they would be `valueFrom` bindings that accessed fields of existing `Secret`
or `ConfigMap` instances.
