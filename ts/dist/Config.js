"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'CloudflareAccountManagement',
        slug: "cloudflare-account-management",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
    };
    options = {
        base: "https://api.cloudflare.com/client/v4",
        auth: {
            prefix: '',
            name: 'X-Auth-Email',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            account: {},
            account_setting: {},
            cache_purge_api_response_single_id: {},
            cps_communication_preference: {},
            iam_api_response_single_id: {},
            iam_response_single_account: {},
            iam_single_user: {},
            kamino_environment: {},
            resource: {},
            resource_tagging: {},
            resource_tagging_tag_key_summary_response_collection: {},
            resource_tagging_tag_keys_response_collection: {},
            resource_tagging_tag_values_response_collection: {},
            resource_tagging_tagged_resource_response_single: {},
            zone: {},
            zone_hold: {},
        }
    };
    entity = {
        "account": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "account",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/accounts/move",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "lit": "move"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "move"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {
                                "$action": "move"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/accounts/{account_id}/profile",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "profile"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{id}",
                                "profile"
                            ],
                            "rename": {
                                "param": {
                                    "account_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "profile",
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "account_setting": {
            "fields": [
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "messages",
                    "title": "Messages",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$ARRAY`",
                    "short": "Controls Unique Transformations billing for the account."
                },
                {
                    "name": "success",
                    "title": "Success",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the API call was successful."
                },
                {
                    "name": "value",
                    "title": "Value",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Enables Unique Transformations billing for the account."
                }
            ],
            "name": "account_setting",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/accounts/{account_id}/settings/transformations",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "account_id"
                                },
                                {
                                    "lit": "settings"
                                },
                                {
                                    "lit": "transformations"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{account_id}",
                                "settings",
                                "transformations"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "account_id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "account_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/accounts/{account_id}/settings/ut-billing",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "account_id"
                                },
                                {
                                    "lit": "settings"
                                },
                                {
                                    "lit": "ut-billing"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{account_id}",
                                "settings",
                                "ut-billing"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "account_id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "account_id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/accounts/{account_id}/settings/ut-billing",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "account_id"
                                },
                                {
                                    "lit": "settings"
                                },
                                {
                                    "lit": "ut-billing"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{account_id}",
                                "settings",
                                "ut-billing"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "account_id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "account_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.account"
                    ]
                ]
            }
        },
        "cache_purge_api_response_single_id": {
            "fields": [
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "messages",
                    "title": "Messages",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "success",
                    "title": "Success",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Indicates the API call's success or failure."
                }
            ],
            "name": "cache_purge_api_response_single_id",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/zones/{zone_id}/environments/{environment_id}/purge_cache",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "zone_id"
                                },
                                {
                                    "lit": "environments"
                                },
                                {
                                    "var": "environment_id"
                                },
                                {
                                    "lit": "purge_cache"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{zone_id}",
                                "environments",
                                "{environment_id}",
                                "purge_cache"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "environment_id",
                                        "orig": "environment_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    },
                                    {
                                        "name": "zone_id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "environment_id",
                                    "zone_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.zone"
                    ]
                ]
            }
        },
        "cps_communication_preference": {
            "fields": [
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "languagelocale",
                    "title": "Languagelocale",
                    "type": "`$STRING`",
                    "short": "The user's preferred language locale for communications."
                },
                {
                    "name": "messages",
                    "title": "Messages",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "preferences",
                    "title": "Preferences",
                    "type": "`$OBJECT`",
                    "short": "Preference keys mapped to subscription states to update."
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The user's communication preferences."
                },
                {
                    "name": "success",
                    "title": "Success",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the API call was successful."
                }
            ],
            "name": "cps_communication_preference",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/user/communication_preferences",
                            "segments": [
                                {
                                    "lit": "user"
                                },
                                {
                                    "lit": "communication_preferences"
                                }
                            ],
                            "parts": [
                                "user",
                                "communication_preferences"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/user/communication_preferences",
                            "segments": [
                                {
                                    "lit": "user"
                                },
                                {
                                    "lit": "communication_preferences"
                                }
                            ],
                            "parts": [
                                "user",
                                "communication_preferences"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "iam_api_response_single_id": {
            "fields": [
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Account name"
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "standalone",
                    "title": "Standalone",
                    "type": "`$BOOLEAN`",
                    "short": "Set to `true` and omit `unit` to create a standalone Free Account."
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$ANY`"
                },
                {
                    "name": "unit",
                    "title": "Unit",
                    "type": "`$OBJECT`",
                    "short": "Information related to the tenant unit."
                }
            ],
            "name": "iam_api_response_single_id",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/accounts",
                            "segments": [
                                {
                                    "lit": "accounts"
                                }
                            ],
                            "parts": [
                                "accounts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "idempotency_key",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "idempotency_key"
                                ]
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/accounts",
                            "segments": [
                                {
                                    "lit": "accounts"
                                }
                            ],
                            "parts": [
                                "accounts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "direction",
                                        "orig": "direction",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "desc"
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "example.com"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 20
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "direction",
                                    "name",
                                    "page",
                                    "per_page"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/accounts/{account_id}",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "account_id"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{account_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "account_id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "account_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.account"
                    ]
                ]
            }
        },
        "iam_response_single_account": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$OBJECT`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "iam_response_single_account",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/accounts/{account_id}/move",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "account_id"
                                },
                                {
                                    "lit": "move"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{account_id}",
                                "move"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "account_id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "move",
                                "exist": [
                                    "account_id"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/accounts/{account_id}",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "account_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/accounts/{account_id}/profile",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "account_id"
                                },
                                {
                                    "lit": "profile"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{account_id}",
                                "profile"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "account_id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "profile",
                                "exist": [
                                    "account_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/accounts/{account_id}",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "account_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.account"
                    ]
                ]
            }
        },
        "iam_single_user": {
            "fields": [
                {
                    "name": "country",
                    "title": "Country",
                    "type": "`$STRING`",
                    "short": "The country in which the user lives."
                },
                {
                    "name": "first_name",
                    "title": "First Name",
                    "type": "`$STRING`",
                    "short": "User's first name"
                },
                {
                    "name": "last_name",
                    "title": "Last Name",
                    "type": "`$STRING`",
                    "short": "User's last name"
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "telephone",
                    "title": "Telephone",
                    "type": "`$STRING`",
                    "short": "User's telephone number"
                },
                {
                    "name": "zipcode",
                    "title": "Zipcode",
                    "type": "`$STRING`",
                    "short": "The zipcode or postal code where the user lives."
                }
            ],
            "name": "iam_single_user",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/user",
                            "segments": [
                                {
                                    "lit": "user"
                                }
                            ],
                            "parts": [
                                "user"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/user",
                            "segments": [
                                {
                                    "lit": "user"
                                }
                            ],
                            "parts": [
                                "user"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "kamino_environment": {
            "fields": [
                {
                    "name": "environments",
                    "title": "Environments",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "messages",
                    "title": "Messages",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "success",
                    "title": "Success",
                    "type": "`$BOOLEAN`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "kamino_environment",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/zones/{zone_id}/environments/{environment_id}/rollback",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "zone_id"
                                },
                                {
                                    "lit": "environments"
                                },
                                {
                                    "var": "environment_id"
                                },
                                {
                                    "lit": "rollback"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{zone_id}",
                                "environments",
                                "{environment_id}",
                                "rollback"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "environment_id",
                                        "orig": "environment_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "zone_id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "environment_id",
                                    "zone_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/zones/{zone_id}/environments",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "zone_id"
                                },
                                {
                                    "lit": "environments"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{zone_id}",
                                "environments"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "zone_id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "zone_id"
                                ]
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/zones/{zone_id}/environments",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "zone_id"
                                },
                                {
                                    "lit": "environments"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{zone_id}",
                                "environments"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "zone_id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "zone_id"
                                ]
                            }
                        }
                    ]
                },
                "patch": {
                    "input": "data",
                    "name": "patch",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/zones/{zone_id}/environments",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "zone_id"
                                },
                                {
                                    "lit": "environments"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{zone_id}",
                                "environments"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "zone_id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "zone_id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/zones/{zone_id}/environments/{environment_id}",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "zone_id"
                                },
                                {
                                    "lit": "environments"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{zone_id}",
                                "environments",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "environment_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "environment_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "zone_id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "zone_id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/zones/{zone_id}/environments",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "zone_id"
                                },
                                {
                                    "lit": "environments"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{zone_id}",
                                "environments"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "zone_id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "zone_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.zone"
                    ],
                    [
                        "$.main.kit.entity.zone"
                    ]
                ]
            }
        },
        "resource": {
            "fields": [
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "messages",
                    "title": "Messages",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "result_info",
                    "title": "Result Info",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "success",
                    "title": "Success",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the API call was successful."
                }
            ],
            "name": "resource",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/accounts/{account_id}/tags/resources",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "account_id"
                                },
                                {
                                    "lit": "tags"
                                },
                                {
                                    "lit": "resources"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{account_id}",
                                "tags",
                                "resources"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "account_id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "case_insensitive",
                                        "orig": "case_insensitive",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ"
                                    },
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "tag",
                                        "orig": "tag",
                                        "type": "`$ARRAY`",
                                        "kind": "query",
                                        "example": [
                                            "production",
                                            "env=prod",
                                            "env=prod,staging",
                                            "!archived",
                                            "region!=us-west-1"
                                        ]
                                    },
                                    {
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "account_id",
                                    "case_insensitive",
                                    "cursor",
                                    "id",
                                    "name",
                                    "tag",
                                    "type"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.account"
                    ]
                ]
            }
        },
        "resource_tagging": {
            "fields": [],
            "name": "resource_tagging",
            "op": {
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/accounts/{account_id}/tags",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "account_id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{account_id}",
                                "tags"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "if_match",
                                        "orig": "if_match",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "example": "\"v1:RBNvo1WzZ4oRRq0W9-hkng\""
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "account_id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "account_id",
                                    "if_match"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/zones/{zone_id}/tags",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "zone_id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{zone_id}",
                                "tags"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "if_match",
                                        "orig": "if_match",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "example": "\"v1:RBNvo1WzZ4oRRq0W9-hkng\""
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "zone_id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "if_match",
                                    "zone_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.account"
                    ],
                    [
                        "$.main.kit.entity.zone"
                    ]
                ]
            }
        },
        "resource_tagging_tag_key_summary_response_collection": {
            "fields": [
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "messages",
                    "title": "Messages",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$ARRAY`",
                    "short": "Contains an array of tag keys with their distinct values."
                },
                {
                    "name": "result_info",
                    "title": "Result Info",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "success",
                    "title": "Success",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the API call was successful."
                }
            ],
            "name": "resource_tagging_tag_key_summary_response_collection",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/accounts/{account_id}/tags/summary",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "account_id"
                                },
                                {
                                    "lit": "tags"
                                },
                                {
                                    "lit": "summary"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{account_id}",
                                "tags",
                                "summary"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "account_id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "account_id",
                                    "cursor"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.account"
                    ]
                ]
            }
        },
        "resource_tagging_tag_keys_response_collection": {
            "fields": [
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "messages",
                    "title": "Messages",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$ARRAY`",
                    "short": "Contains an array of distinct tag keys."
                },
                {
                    "name": "result_info",
                    "title": "Result Info",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "success",
                    "title": "Success",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the API call was successful."
                }
            ],
            "name": "resource_tagging_tag_keys_response_collection",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/accounts/{account_id}/tags/keys",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "account_id"
                                },
                                {
                                    "lit": "tags"
                                },
                                {
                                    "lit": "keys"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{account_id}",
                                "tags",
                                "keys"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "account_id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "account_id",
                                    "cursor"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.account"
                    ]
                ]
            }
        },
        "resource_tagging_tag_values_response_collection": {
            "fields": [
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "messages",
                    "title": "Messages",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "result_info",
                    "title": "Result Info",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "success",
                    "title": "Success",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the API call was successful."
                }
            ],
            "name": "resource_tagging_tag_values_response_collection",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/accounts/{account_id}/tags/values/{tag_key}",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "account_id"
                                },
                                {
                                    "lit": "tags"
                                },
                                {
                                    "lit": "values"
                                },
                                {
                                    "var": "tag_key"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{account_id}",
                                "tags",
                                "values",
                                "{tag_key}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "account_id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "tag_key",
                                        "orig": "tag_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "environment"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ"
                                    },
                                    {
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "zone"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "account_id",
                                    "cursor",
                                    "tag_key",
                                    "type"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.account"
                    ]
                ]
            }
        },
        "resource_tagging_tagged_resource_response_single": {
            "fields": [
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "messages",
                    "title": "Messages",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "success",
                    "title": "Success",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the API call was successful."
                }
            ],
            "name": "resource_tagging_tagged_resource_response_single",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/zones/{zone_id}/tags",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "zone_id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{zone_id}",
                                "tags"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "zone_id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "access_application_id",
                                        "orig": "access_application_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
                                    },
                                    {
                                        "name": "resource_id",
                                        "orig": "resource_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    },
                                    {
                                        "name": "resource_type",
                                        "orig": "resource_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "zone"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "access_application_id",
                                    "resource_id",
                                    "resource_type",
                                    "zone_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/accounts/{account_id}/tags",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "account_id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{account_id}",
                                "tags"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "account_id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "resource_id",
                                        "orig": "resource_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    },
                                    {
                                        "name": "resource_type",
                                        "orig": "resource_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "worker"
                                    },
                                    {
                                        "name": "worker_id",
                                        "orig": "worker_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "3f72a691-44b3-4c11-8642-c18a88ddaa5e"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "account_id",
                                    "resource_id",
                                    "resource_type",
                                    "worker_id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/accounts/{account_id}/tags",
                            "segments": [
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "account_id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "accounts",
                                "{account_id}",
                                "tags"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "if_match",
                                        "orig": "if_match",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "example": "\"v1:RBNvo1WzZ4oRRq0W9-hkng\""
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "account_id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "account_id",
                                    "if_match"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/zones/{zone_id}/tags",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "zone_id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{zone_id}",
                                "tags"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "if_match",
                                        "orig": "if_match",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "example": "\"v1:RBNvo1WzZ4oRRq0W9-hkng\""
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "zone_id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "if_match",
                                    "zone_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.account"
                    ],
                    [
                        "$.main.kit.entity.zone"
                    ]
                ]
            }
        },
        "zone": {
            "fields": [
                {
                    "name": "account",
                    "title": "Account",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "messages",
                    "title": "Messages",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The domain name."
                },
                {
                    "name": "paused",
                    "title": "Paused",
                    "type": "`$BOOLEAN`",
                    "short": "Indicates whether the zone is only using Cloudflare DNS services."
                },
                {
                    "name": "plan",
                    "title": "Plan",
                    "type": "`$OBJECT`",
                    "short": "(Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan."
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$OBJECT`",
                    "req": true,
                    "op": {
                        "list": {
                            "type": "`$ARRAY`"
                        }
                    }
                },
                {
                    "name": "result_info",
                    "title": "Result Info",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "success",
                    "title": "Success",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the API call was successful."
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "short": "A full zone implies that DNS is hosted with Cloudflare."
                },
                {
                    "name": "vanity_name_servers",
                    "title": "Vanity Name Servers",
                    "type": "`$ARRAY`",
                    "short": "An array of domains used for custom name servers."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "zone",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/zones",
                            "segments": [
                                {
                                    "lit": "zones"
                                }
                            ],
                            "parts": [
                                "zones"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/zones",
                            "segments": [
                                {
                                    "lit": "zones"
                                }
                            ],
                            "parts": [
                                "zones"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "account_id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "account_name",
                                        "orig": "account_name",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "Dev Account"
                                    },
                                    {
                                        "name": "direction",
                                        "orig": "direction",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "desc"
                                    },
                                    {
                                        "name": "match",
                                        "orig": "match",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "all"
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "example.com"
                                    },
                                    {
                                        "name": "order",
                                        "orig": "order",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "status"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 20
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "account_id",
                                    "account_name",
                                    "direction",
                                    "match",
                                    "name",
                                    "order",
                                    "page",
                                    "per_page",
                                    "status",
                                    "type"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/zones/{zone_id}",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "zone_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/zones/{zone_id}",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "zone_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/zones/{zone_id}",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "zone_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/zones/{zone_id}/activation_check",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "activation_check"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{id}",
                                "activation_check"
                            ],
                            "rename": {
                                "param": {
                                    "zone_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "activation_check",
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "zone_hold": {
            "fields": [
                {
                    "name": "hold",
                    "title": "Hold",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the hostname is currently subject to a zone hold."
                },
                {
                    "name": "hold_after",
                    "title": "Hold After",
                    "type": "`$STRING`",
                    "short": "The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled.",
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "include_subdomains",
                    "title": "Include Subdomains",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the hold extends to block subdomains of the held zone."
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$OBJECT`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "zone_hold",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/zones/{zone_id}/hold",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "hold"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{id}",
                                "hold"
                            ],
                            "rename": {
                                "param": {
                                    "zone_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "include_subdomain",
                                        "orig": "include_subdomain",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "include_subdomain"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/zones/{zone_id}/hold/{zone_name}",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "zone_id"
                                },
                                {
                                    "lit": "hold"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{zone_id}",
                                "hold",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "zone_name": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "zone_name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "subdomain.example.com"
                                    },
                                    {
                                        "name": "zone_id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "zone_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/zones/{zone_id}/hold",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "hold"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{id}",
                                "hold"
                            ],
                            "rename": {
                                "param": {
                                    "zone_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/zones/{zone_id}/hold",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "hold"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{id}",
                                "hold"
                            ],
                            "rename": {
                                "param": {
                                    "zone_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "hold_after",
                                        "orig": "hold_after",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "2023-01-31T15:56:36Z"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "hold_after",
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/zones/{zone_id}/hold",
                            "segments": [
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "hold"
                                }
                            ],
                            "parts": [
                                "zones",
                                "{id}",
                                "hold"
                            ],
                            "rename": {
                                "param": {
                                    "zone_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "023e105f4ecef8ad9ca31a8372d0c353"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.zone"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map