# Cloudflare Account &amp; Zone Management

Cloudflare account and zone administration: profiles, settings, tags, activation, holds, environments, and communication preferences.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 16 entities and 44 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Account](docs/api/account.html)

Results: The request has succeeded.

SDK operations: `create`, `list`.

### [AccountSetting](docs/api/account_setting.html)

Results: List Image Resizing configurations response.; Get Unique Transformations billing setting response.; Change Unique Transformations billing setting response.

SDK operations: `list`, `update`.

Key fields to recognise:

- `result`: Controls Unique Transformations billing for the account.
- `success`: Whether the API call was successful.
- `value`: Current value of the feature setting.

### [CachePurgeApiResponseSingleId](docs/api/cache_purge_api_response_single_id.html)

Results: Request to purge cached content successful.

SDK operations: `create`.

Key fields to recognise:

- `success`: Indicates the API call&#39;s success or failure.

### [CpsCommunicationPreference](docs/api/cps_communication_preference.html)

Results: Successfully retrieved communication preferences.; Successfully updated communication preferences.

SDK operations: `list`, `update`.

Key fields to recognise:

- `languagelocale`: The user&#39;s preferred language locale for communications.
- `preferences`: Preference keys mapped to subscription states. Keys use human-readable slugs (for example &quot;product_news&quot;, &quot;marketing&quot;).
- `result`: The user&#39;s communication preferences.
- `success`: Whether the API call was successful.

### [IamApiResponseSingleId](docs/api/iam_api_response_single_id.html)

Results: Account Creation Success Response; List Accounts response; Account Deletion Success Response.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `name`: Account name
- `standalone`: Set to `true` and omit `unit` to create a standalone Free Account.
- `unit`: Information related to the tenant unit.

### [IamResponseSingleAccount](docs/api/iam_response_single_account.html)

Results: The request has succeeded.; Account Details response; There is no content to send for this request, but the headers may be useful.; Update Account response.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `id`: Identifier

### [IamSingleUser](docs/api/iam_single_user.html)

Results: User Details response; Edit User response.

SDK operations: `load`, `update`.

Key fields to recognise:

- `country`: The country in which the user lives.
- `first_name`: User&#39;s first name
- `last_name`: User&#39;s last name
- `telephone`: User&#39;s telephone number
- `zipcode`: The zipcode or postal code where the user lives.

### [KaminoEnvironment](docs/api/kamino_environment.html)

Results: Successfully rolled back zone environment.; Successfully created zone environments.; Successfully listed zone environments.; Successfully updated zone environments.; Successfully deleted zone environment.; Successfully upserted zone environments.

SDK operations: `create`, `list`, `patch`, `remove`, `update`.

### [Resource](docs/api/resource.html)

Results: List tagged resources response.

SDK operations: `list`.

Key fields to recognise:

- `success`: Whether the API call was successful.

### [ResourceTagging](docs/api/resource_tagging.html)

Results: Tags successfully deleted (no content).

SDK operations: `remove`.

### [ResourceTaggingTagKeySummaryResponseCollection](docs/api/resource_tagging_tag_key_summary_response_collection.html)

Results: List tag key summary response.

SDK operations: `list`.

Key fields to recognise:

- `result`: Contains an array of tag keys with their distinct values.
- `success`: Whether the API call was successful.

### [ResourceTaggingTagKeysResponseCollection](docs/api/resource_tagging_tag_keys_response_collection.html)

Results: List tag keys response.

SDK operations: `list`.

Key fields to recognise:

- `result`: Contains an array of distinct tag keys.
- `success`: Whether the API call was successful.

### [ResourceTaggingTagValuesResponseCollection](docs/api/resource_tagging_tag_values_response_collection.html)

Results: List tag values response.

SDK operations: `load`.

Key fields to recognise:

- `success`: Whether the API call was successful.

### [ResourceTaggingTaggedResourceResponseSingle](docs/api/resource_tagging_tagged_resource_response_single.html)

Results: Get tags for single resource response.; Set tags response.

SDK operations: `list`, `update`.

Key fields to recognise:

- `success`: Whether the API call was successful.

### [Zone](docs/api/zone.html)

Results: Create Zone response.; List Zones response.; Zone Details response.; Delete Zone response.; Edit Zone response.; Successful Response.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `account`: The account the zone belongs to.
- `id`: Identifier
- `name`: The domain name. Per [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4) the overall zone name can be up to 253 characters, with each segment (&quot;label&quot;) not exceeding 63 characters.
- `paused`: Indicates whether the zone is only using Cloudflare DNS services. A true value means the zone will not receive security or performance benefits.
- `plan`: A Zones subscription information.

### [ZoneHold](docs/api/zone_hold.html)

Results: Successful Response.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `hold`: Whether the hostname is currently subject to a zone hold.
- `hold_after`: The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled. Null if the hold is permanently enabled or not set.
- `include_subdomains`: Whether the hold extends to block subdomains of the held zone.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Account](docs/api/account.html) | `create` | `POST /accounts/move` | Required |
| [Account](docs/api/account.html) | `list` | `GET /accounts/{account_id}/profile` | Required |
| [AccountSetting](docs/api/account_setting.html) | `list` | `GET /accounts/{account_id}/settings/transformations` | Required |
| [AccountSetting](docs/api/account_setting.html) | `list` | `GET /accounts/{account_id}/settings/ut-billing` | Required |
| [AccountSetting](docs/api/account_setting.html) | `update` | `PATCH /accounts/{account_id}/settings/ut-billing` | Required |
| [CachePurgeApiResponseSingleId](docs/api/cache_purge_api_response_single_id.html) | `create` | `POST /zones/{zone_id}/environments/{environment_id}/purge_cache` | Required |
| [CpsCommunicationPreference](docs/api/cps_communication_preference.html) | `list` | `GET /user/communication_preferences` | Required |
| [CpsCommunicationPreference](docs/api/cps_communication_preference.html) | `update` | `PUT /user/communication_preferences` | Required |
| [IamApiResponseSingleId](docs/api/iam_api_response_single_id.html) | `create` | `POST /accounts` | Required |
| [IamApiResponseSingleId](docs/api/iam_api_response_single_id.html) | `list` | `GET /accounts` | Required |
| [IamApiResponseSingleId](docs/api/iam_api_response_single_id.html) | `remove` | `DELETE /accounts/{account_id}` | Required |
| [IamResponseSingleAccount](docs/api/iam_response_single_account.html) | `create` | `POST /accounts/{account_id}/move` | Required |
| [IamResponseSingleAccount](docs/api/iam_response_single_account.html) | `load` | `GET /accounts/{account_id}` | Required |
| [IamResponseSingleAccount](docs/api/iam_response_single_account.html) | `update` | `PUT /accounts/{account_id}/profile` | Required |
| [IamResponseSingleAccount](docs/api/iam_response_single_account.html) | `update` | `PUT /accounts/{account_id}` | Required |
| [IamSingleUser](docs/api/iam_single_user.html) | `load` | `GET /user` | Required |
| [IamSingleUser](docs/api/iam_single_user.html) | `update` | `PATCH /user` | Required |
| [KaminoEnvironment](docs/api/kamino_environment.html) | `create` | `POST /zones/{zone_id}/environments/{environment_id}/rollback` | Required |
| [KaminoEnvironment](docs/api/kamino_environment.html) | `create` | `POST /zones/{zone_id}/environments` | Required |
| [KaminoEnvironment](docs/api/kamino_environment.html) | `list` | `GET /zones/{zone_id}/environments` | Required |
| [KaminoEnvironment](docs/api/kamino_environment.html) | `patch` | `PATCH /zones/{zone_id}/environments` | Required |
| [KaminoEnvironment](docs/api/kamino_environment.html) | `remove` | `DELETE /zones/{zone_id}/environments/{environment_id}` | Required |
| [KaminoEnvironment](docs/api/kamino_environment.html) | `update` | `PUT /zones/{zone_id}/environments` | Required |
| [Resource](docs/api/resource.html) | `list` | `GET /accounts/{account_id}/tags/resources` | Required |
| [ResourceTagging](docs/api/resource_tagging.html) | `remove` | `DELETE /accounts/{account_id}/tags` | Required |
| [ResourceTagging](docs/api/resource_tagging.html) | `remove` | `DELETE /zones/{zone_id}/tags` | Required |
| [ResourceTaggingTagKeySummaryResponseCollection](docs/api/resource_tagging_tag_key_summary_response_collection.html) | `list` | `GET /accounts/{account_id}/tags/summary` | Required |
| [ResourceTaggingTagKeysResponseCollection](docs/api/resource_tagging_tag_keys_response_collection.html) | `list` | `GET /accounts/{account_id}/tags/keys` | Required |
| [ResourceTaggingTagValuesResponseCollection](docs/api/resource_tagging_tag_values_response_collection.html) | `load` | `GET /accounts/{account_id}/tags/values/{tag_key}` | Required |
| [ResourceTaggingTaggedResourceResponseSingle](docs/api/resource_tagging_tagged_resource_response_single.html) | `list` | `GET /zones/{zone_id}/tags` | Required |
| [ResourceTaggingTaggedResourceResponseSingle](docs/api/resource_tagging_tagged_resource_response_single.html) | `list` | `GET /accounts/{account_id}/tags` | Required |
| [ResourceTaggingTaggedResourceResponseSingle](docs/api/resource_tagging_tagged_resource_response_single.html) | `update` | `PUT /accounts/{account_id}/tags` | Required |
| [ResourceTaggingTaggedResourceResponseSingle](docs/api/resource_tagging_tagged_resource_response_single.html) | `update` | `PUT /zones/{zone_id}/tags` | Required |
| [Zone](docs/api/zone.html) | `create` | `POST /zones` | Required |
| [Zone](docs/api/zone.html) | `list` | `GET /zones` | Required |
| [Zone](docs/api/zone.html) | `load` | `GET /zones/{zone_id}` | Required |
| [Zone](docs/api/zone.html) | `remove` | `DELETE /zones/{zone_id}` | Required |
| [Zone](docs/api/zone.html) | `update` | `PATCH /zones/{zone_id}` | Required |
| [Zone](docs/api/zone.html) | `update` | `PUT /zones/{zone_id}/activation_check` | Required |
| [ZoneHold](docs/api/zone_hold.html) | `create` | `POST /zones/{zone_id}/hold` | Required |
| [ZoneHold](docs/api/zone_hold.html) | `load` | `GET /zones/{zone_id}/hold/{zone_name}` | Not required |
| [ZoneHold](docs/api/zone_hold.html) | `load` | `GET /zones/{zone_id}/hold` | Required |
| [ZoneHold](docs/api/zone_hold.html) | `remove` | `DELETE /zones/{zone_id}/hold` | Required |
| [ZoneHold](docs/api/zone_hold.html) | `update` | `PATCH /zones/{zone_id}/hold` | Required |

## Connect to the API

- Client API: `https://api.cloudflare.com/client/v4`

The default credential is sent in the `X-Auth-Email` header.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [Ruby](docs/sdks/rb.html) | `rb/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `cloudflare-account-management_list`: List records for an entity. Supported entities: `account`, `account_setting`, `cps_communication_preference`, `iam_api_response_single_id`, `kamino_environment`, `resource`, `resource_tagging_tag_key_summary_response_collection`, `resource_tagging_tag_keys_response_collection`, `resource_tagging_tagged_resource_response_single`, `zone`.
- `cloudflare-account-management_load`: Load one record for an entity. Supported entities: `iam_response_single_account`, `iam_single_user`, `resource_tagging_tag_values_response_collection`, `zone`, `zone_hold`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

