/*Copyright 2019 Evsent

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/
module.exports = {
  instantiate: function() {
    var instantiator = require("json-schema-instantiator");

    var schema = {
      $schema: "http://json-schema.org/draft-04/schema#",
      type: "object",
      properties: {
        meta: {
          type: "object",
          properties: {
            id: {
              type: "string",
              pattern:
                "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"
            },
            type: {
              type: "string",
              enum: ["EiffelArtifactCreatedEvent"]
            },
            version: {
              type: "string",
              enum: ["3.0.0"],
              default: "3.0.0"
            },
            time: {
              type: "integer"
            },
            tags: {
              type: "array",
              items: {
                type: "string"
              }
            },
            source: {
              type: "object",
              properties: {
                domainId: {
                  type: "string"
                },
                host: {
                  type: "string"
                },
                name: {
                  type: "string"
                },
                serializer: {
                  type: "string",
                  pattern: "^pkg:"
                },
                uri: {
                  type: "string"
                }
              },
              additionalProperties: false
            },
            security: {
              type: "object",
              properties: {
                authorIdentity: {
                  type: "string"
                },
                integrityProtection: {
                  type: "object",
                  properties: {
                    signature: {
                      type: "string"
                    },
                    alg: {
                      type: "string",
                      enum: [
                        "HS256",
                        "HS384",
                        "HS512",
                        "RS256",
                        "RS384",
                        "RS512",
                        "ES256",
                        "ES384",
                        "ES512",
                        "PS256",
                        "PS384",
                        "PS512"
                      ]
                    },
                    publicKey: {
                      type: "string"
                    }
                  },
                  required: ["signature", "alg"],
                  additionalProperties: false
                },
                sequenceProtection: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      sequenceName: {
                        type: "string"
                      },
                      position: {
                        type: "integer"
                      }
                    },
                    additionalProperties: false,
                    required: ["sequenceName", "position"]
                  }
                }
              },
              additionalProperties: false,
              required: ["authorIdentity"]
            }
          },
          required: ["id", "type", "version", "time"],
          additionalProperties: false
        },
        data: {
          type: "object",
          properties: {
            identity: {
              type: "string",
              pattern: "^pkg:"
            },
            fileInformation: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string"
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string"
                    }
                  }
                },
                required: ["name"],
                additionalProperties: false
              }
            },
            buildCommand: {
              type: "string"
            },
            requiresImplementation: {
              type: "string",
              enum: ["NONE", "ANY", "EXACTLY_ONE", "AT_LEAST_ONE"]
            },
            dependsOn: {
              type: "array",
              items: {
                type: "string",
                pattern: "^pkg:"
              }
            },
            implements: {
              type: "array",
              items: {
                type: "string",
                pattern: "^pkg:"
              }
            },
            name: {
              type: "string"
            },
            customData: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  key: {
                    type: "string"
                  },
                  value: {}
                },
                required: ["key", "value"],
                additionalProperties: false
              }
            }
          },
          required: ["identity"],
          additionalProperties: false
        },
        links: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: {
                type: "string"
              },
              target: {
                type: "string",
                pattern:
                  "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"
              }
            },
            required: ["type", "target"],
            additionalProperties: false
          }
        }
      },
      required: ["meta", "data", "links"],
      additionalProperties: false
    };
    this.instance = instantiator.instantiate(schema, {
      requiredPropertiesOnly: false
    });
    return this.instance;
  }
};
