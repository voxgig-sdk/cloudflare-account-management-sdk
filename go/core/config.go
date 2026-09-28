package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "CloudflareAccountManagement",
			"slug": "cloudflare-account-management",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.cloudflare.com/client/v4",
			"auth": map[string]any{
				"prefix": "",
				"name": "X-Auth-Email",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"account": map[string]any{},
				"account_setting": map[string]any{},
				"cache_purge_api_response_single_id": map[string]any{},
				"cps_communication_preference": map[string]any{},
				"iam_api_response_single_id": map[string]any{},
				"iam_response_single_account": map[string]any{},
				"iam_single_user": map[string]any{},
				"kamino_environment": map[string]any{},
				"resource": map[string]any{},
				"resource_tagging": map[string]any{},
				"resource_tagging_tag_key_summary_response_collection": map[string]any{},
				"resource_tagging_tag_keys_response_collection": map[string]any{},
				"resource_tagging_tag_values_response_collection": map[string]any{},
				"resource_tagging_tagged_resource_response_single": map[string]any{},
				"zone": map[string]any{},
				"zone_hold": map[string]any{},
			},
		},
		"entity": map[string]any{
			"account": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "account",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/accounts/move",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"lit": "move",
									},
								},
								"parts": []any{
									"accounts",
									"move",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "move",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts/{account_id}/profile",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "profile",
									},
								},
								"parts": []any{
									"accounts",
									"{id}",
									"profile",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"account_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "profile",
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"account_setting": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$ARRAY`",
						"short": "Controls Unique Transformations billing for the account.",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the API call was successful.",
					},
					map[string]any{
						"name": "value",
						"title": "Value",
						"type": "`$STRING`",
						"req": true,
						"short": "Enables Unique Transformations billing for the account.",
					},
				},
				"name": "account_setting",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts/{account_id}/settings/transformations",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "settings",
									},
									map[string]any{
										"lit": "transformations",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"settings",
									"transformations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts/{account_id}/settings/ut-billing",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "settings",
									},
									map[string]any{
										"lit": "ut-billing",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"settings",
									"ut-billing",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/accounts/{account_id}/settings/ut-billing",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "settings",
									},
									map[string]any{
										"lit": "ut-billing",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"settings",
									"ut-billing",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.account",
						},
					},
				},
			},
			"cache_purge_api_response_single_id": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Indicates the API call's success or failure.",
					},
				},
				"name": "cache_purge_api_response_single_id",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/zones/{zone_id}/environments/{environment_id}/purge_cache",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "zone_id",
									},
									map[string]any{
										"lit": "environments",
									},
									map[string]any{
										"var": "environment_id",
									},
									map[string]any{
										"lit": "purge_cache",
									},
								},
								"parts": []any{
									"zones",
									"{zone_id}",
									"environments",
									"{environment_id}",
									"purge_cache",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "environment_id",
											"orig": "environment_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
										map[string]any{
											"name": "zone_id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"environment_id",
										"zone_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.zone",
						},
					},
				},
			},
			"cps_communication_preference": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "languagelocale",
						"title": "Languagelocale",
						"type": "`$STRING`",
						"short": "The user's preferred language locale for communications.",
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "preferences",
						"title": "Preferences",
						"type": "`$OBJECT`",
						"short": "Preference keys mapped to subscription states to update.",
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The user's communication preferences.",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the API call was successful.",
					},
				},
				"name": "cps_communication_preference",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/user/communication_preferences",
								"segments": []any{
									map[string]any{
										"lit": "user",
									},
									map[string]any{
										"lit": "communication_preferences",
									},
								},
								"parts": []any{
									"user",
									"communication_preferences",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/user/communication_preferences",
								"segments": []any{
									map[string]any{
										"lit": "user",
									},
									map[string]any{
										"lit": "communication_preferences",
									},
								},
								"parts": []any{
									"user",
									"communication_preferences",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"iam_api_response_single_id": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Account name",
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "standalone",
						"title": "Standalone",
						"type": "`$BOOLEAN`",
						"short": "Set to `true` and omit `unit` to create a standalone Free Account.",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "unit",
						"title": "Unit",
						"type": "`$OBJECT`",
						"short": "Information related to the tenant unit.",
					},
				},
				"name": "iam_api_response_single_id",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/accounts",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
								},
								"parts": []any{
									"accounts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "idempotency_key",
											"type": "`$STRING`",
											"kind": "header",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"idempotency_key",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
								},
								"parts": []any{
									"accounts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "direction",
											"orig": "direction",
											"type": "`$STRING`",
											"kind": "query",
											"example": "desc",
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
											"example": "example.com",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 20,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"direction",
										"name",
										"page",
										"per_page",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/accounts/{account_id}",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.account",
						},
					},
				},
			},
			"iam_response_single_account": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "iam_response_single_account",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/accounts/{account_id}/move",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "move",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"move",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "move",
									"exist": []any{
										"account_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts/{account_id}",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"accounts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"account_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/accounts/{account_id}/profile",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "profile",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"profile",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "profile",
									"exist": []any{
										"account_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/accounts/{account_id}",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"accounts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"account_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.account",
						},
					},
				},
			},
			"iam_single_user": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"short": "The country in which the user lives.",
					},
					map[string]any{
						"name": "first_name",
						"title": "First Name",
						"type": "`$STRING`",
						"short": "User's first name",
					},
					map[string]any{
						"name": "last_name",
						"title": "Last Name",
						"type": "`$STRING`",
						"short": "User's last name",
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "telephone",
						"title": "Telephone",
						"type": "`$STRING`",
						"short": "User's telephone number",
					},
					map[string]any{
						"name": "zipcode",
						"title": "Zipcode",
						"type": "`$STRING`",
						"short": "The zipcode or postal code where the user lives.",
					},
				},
				"name": "iam_single_user",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/user",
								"segments": []any{
									map[string]any{
										"lit": "user",
									},
								},
								"parts": []any{
									"user",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/user",
								"segments": []any{
									map[string]any{
										"lit": "user",
									},
								},
								"parts": []any{
									"user",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"kamino_environment": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "environments",
						"title": "Environments",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "kamino_environment",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/zones/{zone_id}/environments/{environment_id}/rollback",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "zone_id",
									},
									map[string]any{
										"lit": "environments",
									},
									map[string]any{
										"var": "environment_id",
									},
									map[string]any{
										"lit": "rollback",
									},
								},
								"parts": []any{
									"zones",
									"{zone_id}",
									"environments",
									"{environment_id}",
									"rollback",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "environment_id",
											"orig": "environment_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "zone_id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"environment_id",
										"zone_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/zones/{zone_id}/environments",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "zone_id",
									},
									map[string]any{
										"lit": "environments",
									},
								},
								"parts": []any{
									"zones",
									"{zone_id}",
									"environments",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "zone_id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"zone_id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/zones/{zone_id}/environments",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "zone_id",
									},
									map[string]any{
										"lit": "environments",
									},
								},
								"parts": []any{
									"zones",
									"{zone_id}",
									"environments",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "zone_id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"zone_id",
									},
								},
							},
						},
					},
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/zones/{zone_id}/environments",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "zone_id",
									},
									map[string]any{
										"lit": "environments",
									},
								},
								"parts": []any{
									"zones",
									"{zone_id}",
									"environments",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "zone_id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"zone_id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/zones/{zone_id}/environments/{environment_id}",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "zone_id",
									},
									map[string]any{
										"lit": "environments",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"zones",
									"{zone_id}",
									"environments",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"environment_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "environment_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "zone_id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"zone_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/zones/{zone_id}/environments",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "zone_id",
									},
									map[string]any{
										"lit": "environments",
									},
								},
								"parts": []any{
									"zones",
									"{zone_id}",
									"environments",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "zone_id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"zone_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.zone",
						},
						[]any{
							"$.main.kit.entity.zone",
						},
					},
				},
			},
			"resource": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "result_info",
						"title": "Result Info",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the API call was successful.",
					},
				},
				"name": "resource",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts/{account_id}/tags/resources",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "tags",
									},
									map[string]any{
										"lit": "resources",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"tags",
									"resources",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "case_insensitive",
											"orig": "case_insensitive",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ",
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "tag",
											"orig": "tag",
											"type": "`$ARRAY`",
											"kind": "query",
											"example": []any{
												"production",
												"env=prod",
												"env=prod,staging",
												"!archived",
												"region!=us-west-1",
											},
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ARRAY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
										"case_insensitive",
										"cursor",
										"id",
										"name",
										"tag",
										"type",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.account",
						},
					},
				},
			},
			"resource_tagging": map[string]any{
				"fields": []any{},
				"name": "resource_tagging",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/accounts/{account_id}/tags",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"tags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "if_match",
											"orig": "if_match",
											"type": "`$STRING`",
											"kind": "header",
											"example": "\"v1:RBNvo1WzZ4oRRq0W9-hkng\"",
										},
									},
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
										"if_match",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/zones/{zone_id}/tags",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "zone_id",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"zones",
									"{zone_id}",
									"tags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "if_match",
											"orig": "if_match",
											"type": "`$STRING`",
											"kind": "header",
											"example": "\"v1:RBNvo1WzZ4oRRq0W9-hkng\"",
										},
									},
									"params": []any{
										map[string]any{
											"name": "zone_id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"if_match",
										"zone_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.account",
						},
						[]any{
							"$.main.kit.entity.zone",
						},
					},
				},
			},
			"resource_tagging_tag_key_summary_response_collection": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$ARRAY`",
						"short": "Contains an array of tag keys with their distinct values.",
					},
					map[string]any{
						"name": "result_info",
						"title": "Result Info",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the API call was successful.",
					},
				},
				"name": "resource_tagging_tag_key_summary_response_collection",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts/{account_id}/tags/summary",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "tags",
									},
									map[string]any{
										"lit": "summary",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"tags",
									"summary",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
										"cursor",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.account",
						},
					},
				},
			},
			"resource_tagging_tag_keys_response_collection": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$ARRAY`",
						"short": "Contains an array of distinct tag keys.",
					},
					map[string]any{
						"name": "result_info",
						"title": "Result Info",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the API call was successful.",
					},
				},
				"name": "resource_tagging_tag_keys_response_collection",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts/{account_id}/tags/keys",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "tags",
									},
									map[string]any{
										"lit": "keys",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"tags",
									"keys",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
										"cursor",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.account",
						},
					},
				},
			},
			"resource_tagging_tag_values_response_collection": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "result_info",
						"title": "Result Info",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the API call was successful.",
					},
				},
				"name": "resource_tagging_tag_values_response_collection",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts/{account_id}/tags/values/{tag_key}",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "tags",
									},
									map[string]any{
										"lit": "values",
									},
									map[string]any{
										"var": "tag_key",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"tags",
									"values",
									"{tag_key}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "tag_key",
											"orig": "tag_key",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "environment",
										},
									},
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "zone",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
										"cursor",
										"tag_key",
										"type",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.account",
						},
					},
				},
			},
			"resource_tagging_tagged_resource_response_single": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the API call was successful.",
					},
				},
				"name": "resource_tagging_tagged_resource_response_single",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/zones/{zone_id}/tags",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "zone_id",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"zones",
									"{zone_id}",
									"tags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "zone_id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "access_application_id",
											"orig": "access_application_id",
											"type": "`$STRING`",
											"kind": "query",
											"example": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
										},
										map[string]any{
											"name": "resource_id",
											"orig": "resource_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
										map[string]any{
											"name": "resource_type",
											"orig": "resource_type",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "zone",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"access_application_id",
										"resource_id",
										"resource_type",
										"zone_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts/{account_id}/tags",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"tags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "resource_id",
											"orig": "resource_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
										map[string]any{
											"name": "resource_type",
											"orig": "resource_type",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "worker",
										},
										map[string]any{
											"name": "worker_id",
											"orig": "worker_id",
											"type": "`$STRING`",
											"kind": "query",
											"example": "3f72a691-44b3-4c11-8642-c18a88ddaa5e",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
										"resource_id",
										"resource_type",
										"worker_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/accounts/{account_id}/tags",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"tags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "if_match",
											"orig": "if_match",
											"type": "`$STRING`",
											"kind": "header",
											"example": "\"v1:RBNvo1WzZ4oRRq0W9-hkng\"",
										},
									},
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
										"if_match",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/zones/{zone_id}/tags",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "zone_id",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"zones",
									"{zone_id}",
									"tags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "if_match",
											"orig": "if_match",
											"type": "`$STRING`",
											"kind": "header",
											"example": "\"v1:RBNvo1WzZ4oRRq0W9-hkng\"",
										},
									},
									"params": []any{
										map[string]any{
											"name": "zone_id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"if_match",
										"zone_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.account",
						},
						[]any{
							"$.main.kit.entity.zone",
						},
					},
				},
			},
			"zone": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "account",
						"title": "Account",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The domain name.",
					},
					map[string]any{
						"name": "paused",
						"title": "Paused",
						"type": "`$BOOLEAN`",
						"short": "Indicates whether the zone is only using Cloudflare DNS services.",
					},
					map[string]any{
						"name": "plan",
						"title": "Plan",
						"type": "`$OBJECT`",
						"short": "(Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan.",
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$OBJECT`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$ARRAY`",
							},
						},
					},
					map[string]any{
						"name": "result_info",
						"title": "Result Info",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the API call was successful.",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "A full zone implies that DNS is hosted with Cloudflare.",
					},
					map[string]any{
						"name": "vanity_name_servers",
						"title": "Vanity Name Servers",
						"type": "`$ARRAY`",
						"short": "An array of domains used for custom name servers.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "zone",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/zones",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
								},
								"parts": []any{
									"zones",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/zones",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
								},
								"parts": []any{
									"zones",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "account_name",
											"orig": "account_name",
											"type": "`$STRING`",
											"kind": "query",
											"example": "Dev Account",
										},
										map[string]any{
											"name": "direction",
											"orig": "direction",
											"type": "`$STRING`",
											"kind": "query",
											"example": "desc",
										},
										map[string]any{
											"name": "match",
											"orig": "match",
											"type": "`$STRING`",
											"kind": "query",
											"example": "all",
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
											"example": "example.com",
										},
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
											"example": "status",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ARRAY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
										"account_name",
										"direction",
										"match",
										"name",
										"order",
										"page",
										"per_page",
										"status",
										"type",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/zones/{zone_id}",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"zones",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"zone_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/zones/{zone_id}",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"zones",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"zone_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/zones/{zone_id}",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"zones",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"zone_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/zones/{zone_id}/activation_check",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "activation_check",
									},
								},
								"parts": []any{
									"zones",
									"{id}",
									"activation_check",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"zone_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
									},
								},
								"select": map[string]any{
									"$action": "activation_check",
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"zone_hold": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "hold",
						"title": "Hold",
						"type": "`$BOOLEAN`",
						"short": "Whether the hostname is currently subject to a zone hold.",
					},
					map[string]any{
						"name": "hold_after",
						"title": "Hold After",
						"type": "`$STRING`",
						"short": "The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled.",
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "include_subdomains",
						"title": "Include Subdomains",
						"type": "`$BOOLEAN`",
						"short": "Whether the hold extends to block subdomains of the held zone.",
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "zone_hold",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/zones/{zone_id}/hold",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "hold",
									},
								},
								"parts": []any{
									"zones",
									"{id}",
									"hold",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"zone_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
									},
									"query": []any{
										map[string]any{
											"name": "include_subdomain",
											"orig": "include_subdomain",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"include_subdomain",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/zones/{zone_id}/hold/{zone_name}",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "zone_id",
									},
									map[string]any{
										"lit": "hold",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"zones",
									"{zone_id}",
									"hold",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"zone_name": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "zone_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "subdomain.example.com",
										},
										map[string]any{
											"name": "zone_id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"zone_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/zones/{zone_id}/hold",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "hold",
									},
								},
								"parts": []any{
									"zones",
									"{id}",
									"hold",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"zone_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/zones/{zone_id}/hold",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "hold",
									},
								},
								"parts": []any{
									"zones",
									"{id}",
									"hold",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"zone_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
									},
									"query": []any{
										map[string]any{
											"name": "hold_after",
											"orig": "hold_after",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2023-01-31T15:56:36Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"hold_after",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/zones/{zone_id}/hold",
								"segments": []any{
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "hold",
									},
								},
								"parts": []any{
									"zones",
									"{id}",
									"hold",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"zone_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "023e105f4ecef8ad9ca31a8372d0c353",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.zone",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
