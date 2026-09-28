# CloudflareAccountManagement Lua SDK



The Lua SDK for the CloudflareAccountManagement API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Account()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`, `patch`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/cloudflare-account-management-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("cloudflare-account-management_sdk")

local client = sdk.new({
  apikey = os.getenv("CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY"),
})
```

### 2. List account records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local accounts, err = client:Account():list()
if err then error(err) end

for _, item in ipairs(accounts) do
  print(item["id"])
end
```

### 3. Load a resourcetaggingtagvaluesresponsecollection

ResourceTaggingTagValuesResponseCollection is nested under account, so provide the `account_id`.

```lua
local resourcetaggingtagvaluesresponsecollection, err = client:ResourceTaggingTagValuesResponseCollection():load({ account_id = "example_account_id", tag_key = "example_tag_key" })
if err then error(err) end
print(resourcetaggingtagvaluesresponsecollection)
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Account():create({  })
if err then error(err) end

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local iamapiresponsesingleids, err = client:IamApiResponseSingleId():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:IamApiResponseSingleId():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE
CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY=<your-key>
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### CloudflareAccountManagementSDK

```lua
local sdk = require("cloudflare-account-management_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CloudflareAccountManagementSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Account` | `(data) -> AccountEntity` | Create an Account entity instance. |
| `AccountSetting` | `(data) -> AccountSettingEntity` | Create an AccountSetting entity instance. |
| `CachePurgeApiResponseSingleId` | `(data) -> CachePurgeApiResponseSingleIdEntity` | Create a CachePurgeApiResponseSingleId entity instance. |
| `CpsCommunicationPreference` | `(data) -> CpsCommunicationPreferenceEntity` | Create a CpsCommunicationPreference entity instance. |
| `IamApiResponseSingleId` | `(data) -> IamApiResponseSingleIdEntity` | Create an IamApiResponseSingleId entity instance. |
| `IamResponseSingleAccount` | `(data) -> IamResponseSingleAccountEntity` | Create an IamResponseSingleAccount entity instance. |
| `IamSingleUser` | `(data) -> IamSingleUserEntity` | Create an IamSingleUser entity instance. |
| `KaminoEnvironment` | `(data) -> KaminoEnvironmentEntity` | Create a KaminoEnvironment entity instance. |
| `Resource` | `(data) -> ResourceEntity` | Create a Resource entity instance. |
| `ResourceTagging` | `(data) -> ResourceTaggingEntity` | Create a ResourceTagging entity instance. |
| `ResourceTaggingTagKeySummaryResponseCollection` | `(data) -> ResourceTaggingTagKeySummaryResponseCollectionEntity` | Create a ResourceTaggingTagKeySummaryResponseCollection entity instance. |
| `ResourceTaggingTagKeysResponseCollection` | `(data) -> ResourceTaggingTagKeysResponseCollectionEntity` | Create a ResourceTaggingTagKeysResponseCollection entity instance. |
| `ResourceTaggingTagValuesResponseCollection` | `(data) -> ResourceTaggingTagValuesResponseCollectionEntity` | Create a ResourceTaggingTagValuesResponseCollection entity instance. |
| `ResourceTaggingTaggedResourceResponseSingle` | `(data) -> ResourceTaggingTaggedResourceResponseSingleEntity` | Create a ResourceTaggingTaggedResourceResponseSingle entity instance. |
| `Zone` | `(data) -> ZoneEntity` | Create a Zone entity instance. |
| `ZoneHold` | `(data) -> ZoneHoldEntity` | Create a ZoneHold entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local iam_response_single_account, err = client:IamResponseSingleAccount():load({ id = "example_id" })
    if err then error(err) end
    -- iam_response_single_account is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Account

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List.

API path: `/accounts/move`

#### AccountSetting

| Field | Description |
| --- | --- |
| `errors` |  |
| `messages` |  |
| `result` | Controls Unique Transformations billing for the account. |
| `success` | Whether the API call was successful. |
| `value` | Enables Unique Transformations billing for the account. |

Operations: List, Update.

API path: `/accounts/{account_id}/settings/transformations`

#### CachePurgeApiResponseSingleId

| Field | Description |
| --- | --- |
| `errors` |  |
| `messages` |  |
| `result` |  |
| `success` | Indicates the API call's success or failure. |

Operations: Create.

API path: `/zones/{zone_id}/environments/{environment_id}/purge_cache`

#### CpsCommunicationPreference

| Field | Description |
| --- | --- |
| `errors` |  |
| `languagelocale` | The user's preferred language locale for communications. |
| `messages` |  |
| `preferences` | Preference keys mapped to subscription states to update. |
| `result` | The user's communication preferences. |
| `success` | Whether the API call was successful. |

Operations: List, Update.

API path: `/user/communication_preferences`

#### IamApiResponseSingleId

| Field | Description |
| --- | --- |
| `name` | Account name |
| `result` |  |
| `standalone` | Set to `true` and omit `unit` to create a standalone Free Account. |
| `type` |  |
| `unit` | Information related to the tenant unit. |

Operations: Create, List, Remove.

API path: `/accounts`

#### IamResponseSingleAccount

| Field | Description |
| --- | --- |
| `id` |  |
| `result` |  |

Operations: Create, Load, Update.

API path: `/accounts/{account_id}/move`

#### IamSingleUser

| Field | Description |
| --- | --- |
| `country` | The country in which the user lives. |
| `first_name` | User's first name |
| `last_name` | User's last name |
| `result` |  |
| `telephone` | User's telephone number |
| `zipcode` | The zipcode or postal code where the user lives. |

Operations: Load, Update.

API path: `/user`

#### KaminoEnvironment

| Field | Description |
| --- | --- |
| `environments` |  |
| `errors` |  |
| `id` |  |
| `messages` |  |
| `result` |  |
| `success` |  |

Operations: Create, List, Patch, Remove, Update.

API path: `/zones/{zone_id}/environments/{environment_id}/rollback`

#### Resource

| Field | Description |
| --- | --- |
| `errors` |  |
| `messages` |  |
| `result` |  |
| `result_info` |  |
| `success` | Whether the API call was successful. |

Operations: List.

API path: `/accounts/{account_id}/tags/resources`

#### ResourceTagging

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/accounts/{account_id}/tags`

#### ResourceTaggingTagKeySummaryResponseCollection

| Field | Description |
| --- | --- |
| `errors` |  |
| `messages` |  |
| `result` | Contains an array of tag keys with their distinct values. |
| `result_info` |  |
| `success` | Whether the API call was successful. |

Operations: List.

API path: `/accounts/{account_id}/tags/summary`

#### ResourceTaggingTagKeysResponseCollection

| Field | Description |
| --- | --- |
| `errors` |  |
| `messages` |  |
| `result` | Contains an array of distinct tag keys. |
| `result_info` |  |
| `success` | Whether the API call was successful. |

Operations: List.

API path: `/accounts/{account_id}/tags/keys`

#### ResourceTaggingTagValuesResponseCollection

| Field | Description |
| --- | --- |
| `errors` |  |
| `messages` |  |
| `result` |  |
| `result_info` |  |
| `success` | Whether the API call was successful. |

Operations: Load.

API path: `/accounts/{account_id}/tags/values/{tag_key}`

#### ResourceTaggingTaggedResourceResponseSingle

| Field | Description |
| --- | --- |
| `errors` |  |
| `messages` |  |
| `result` |  |
| `success` | Whether the API call was successful. |

Operations: List, Update.

API path: `/zones/{zone_id}/tags`

#### Zone

| Field | Description |
| --- | --- |
| `account` |  |
| `errors` |  |
| `id` |  |
| `messages` |  |
| `name` | The domain name. |
| `paused` | Indicates whether the zone is only using Cloudflare DNS services. |
| `plan` | (Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. |
| `result` |  |
| `result_info` |  |
| `success` | Whether the API call was successful. |
| `type` | A full zone implies that DNS is hosted with Cloudflare. |
| `vanity_name_servers` | An array of domains used for custom name servers. |

Operations: Create, List, Load, Remove, Update.

API path: `/zones`

#### ZoneHold

| Field | Description |
| --- | --- |
| `hold` | Whether the hostname is currently subject to a zone hold. |
| `hold_after` | The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled. |
| `id` |  |
| `include_subdomains` | Whether the hold extends to block subdomains of the held zone. |
| `result` |  |

Operations: Create, Load, Remove, Update.

API path: `/zones/{zone_id}/hold`



## Entities


### Account

Create an instance: `local account = client:Account(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```lua
local accounts, err = client:Account():list()
```

#### Example: Create

```lua
local account, err = client:Account():create({
})
```


### AccountSetting

Create an instance: `local account_setting = client:AccountSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `table` |  |
| `messages` | `table` |  |
| `result` | `table` | Controls Unique Transformations billing for the account. |
| `success` | `boolean` | Whether the API call was successful. |
| `value` | `string` | Enables Unique Transformations billing for the account. |

#### Example: List

```lua
local account_settings, err = client:AccountSetting():list()
```


### CachePurgeApiResponseSingleId

Create an instance: `local cache_purge_api_response_single_id = client:CachePurgeApiResponseSingleId(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `table` |  |
| `messages` | `table` |  |
| `result` | `table` |  |
| `success` | `boolean` | Indicates the API call's success or failure. |

#### Example: Create

```lua
local cache_purge_api_response_single_id, err = client:CachePurgeApiResponseSingleId():create({
  environment_id = "example_environment_id", -- string
  zone_id = "example_zone_id", -- string
  errors = {}, -- table
  messages = {}, -- table
  result = {}, -- table
  success = true, -- boolean
})
```


### CpsCommunicationPreference

Create an instance: `local cps_communication_preference = client:CpsCommunicationPreference(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `table` |  |
| `languagelocale` | `string` | The user's preferred language locale for communications. |
| `messages` | `table` |  |
| `preferences` | `table` | Preference keys mapped to subscription states to update. |
| `result` | `table` | The user's communication preferences. |
| `success` | `boolean` | Whether the API call was successful. |

#### Example: List

```lua
local cps_communication_preferences, err = client:CpsCommunicationPreference():list()
```


### IamApiResponseSingleId

Create an instance: `local iam_api_response_single_id = client:IamApiResponseSingleId(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Account name |
| `result` | `table` |  |
| `standalone` | `boolean` | Set to `true` and omit `unit` to create a standalone Free Account. |
| `type` | `any` |  |
| `unit` | `table` | Information related to the tenant unit. |

#### Example: List

```lua
local iam_api_response_single_ids, err = client:IamApiResponseSingleId():list()
```

#### Example: Create

```lua
local iam_api_response_single_id, err = client:IamApiResponseSingleId():create({
  name = "example_name", -- string
})
```


### IamResponseSingleAccount

Create an instance: `local iam_response_single_account = client:IamResponseSingleAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `result` | `table` |  |

#### Example: Load

```lua
local iam_response_single_account, err = client:IamResponseSingleAccount():load({ id = "iam_response_single_account_id" })
```

#### Example: Create

```lua
local iam_response_single_account, err = client:IamResponseSingleAccount():create({
  account_id = "example_account_id", -- string
  result = {}, -- table
})
```


### IamSingleUser

Create an instance: `local iam_single_user = client:IamSingleUser(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `string` | The country in which the user lives. |
| `first_name` | `string` | User's first name |
| `last_name` | `string` | User's last name |
| `result` | `table` |  |
| `telephone` | `string` | User's telephone number |
| `zipcode` | `string` | The zipcode or postal code where the user lives. |

#### Example: Load

```lua
local iam_single_user, err = client:IamSingleUser():load()
```


### KaminoEnvironment

Create an instance: `local kamino_environment = client:KaminoEnvironment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environments` | `table` |  |
| `errors` | `table` |  |
| `id` | `string` |  |
| `messages` | `table` |  |
| `result` | `table` |  |
| `success` | `boolean` |  |

#### Example: List

```lua
local kamino_environments, err = client:KaminoEnvironment():list()
```

#### Example: Create

```lua
local kamino_environment, err = client:KaminoEnvironment():create({
  zone_id = "example_zone_id", -- string
  environments = {}, -- table
  errors = {}, -- table
  messages = {}, -- table
  result = {}, -- table
  success = true, -- boolean
})
```


### Resource

Create an instance: `local resource = client:Resource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `table` |  |
| `messages` | `table` |  |
| `result` | `table` |  |
| `result_info` | `table` |  |
| `success` | `boolean` | Whether the API call was successful. |

#### Example: List

```lua
local resources, err = client:Resource():list()
```


### ResourceTagging

Create an instance: `local resource_tagging = client:ResourceTagging(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ResourceTaggingTagKeySummaryResponseCollection

Create an instance: `local resource_tagging_tag_key_summary_response_collection = client:ResourceTaggingTagKeySummaryResponseCollection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `table` |  |
| `messages` | `table` |  |
| `result` | `table` | Contains an array of tag keys with their distinct values. |
| `result_info` | `table` |  |
| `success` | `boolean` | Whether the API call was successful. |

#### Example: List

```lua
local resource_tagging_tag_key_summary_response_collections, err = client:ResourceTaggingTagKeySummaryResponseCollection():list()
```


### ResourceTaggingTagKeysResponseCollection

Create an instance: `local resource_tagging_tag_keys_response_collection = client:ResourceTaggingTagKeysResponseCollection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `table` |  |
| `messages` | `table` |  |
| `result` | `table` | Contains an array of distinct tag keys. |
| `result_info` | `table` |  |
| `success` | `boolean` | Whether the API call was successful. |

#### Example: List

```lua
local resource_tagging_tag_keys_response_collections, err = client:ResourceTaggingTagKeysResponseCollection():list()
```


### ResourceTaggingTagValuesResponseCollection

Create an instance: `local resource_tagging_tag_values_response_collection = client:ResourceTaggingTagValuesResponseCollection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `table` |  |
| `messages` | `table` |  |
| `result` | `table` |  |
| `result_info` | `table` |  |
| `success` | `boolean` | Whether the API call was successful. |

#### Example: Load

```lua
local resource_tagging_tag_values_response_collection, err = client:ResourceTaggingTagValuesResponseCollection():load({ account_id = "account_id", tag_key = "tag_key" })
```


### ResourceTaggingTaggedResourceResponseSingle

Create an instance: `local resource_tagging_tagged_resource_response_single = client:ResourceTaggingTaggedResourceResponseSingle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `table` |  |
| `messages` | `table` |  |
| `result` | `table` |  |
| `success` | `boolean` | Whether the API call was successful. |

#### Example: List

```lua
local resource_tagging_tagged_resource_response_singles, err = client:ResourceTaggingTaggedResourceResponseSingle():list()
```


### Zone

Create an instance: `local zone = client:Zone(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `table` |  |
| `errors` | `table` |  |
| `id` | `string` |  |
| `messages` | `table` |  |
| `name` | `string` | The domain name. |
| `paused` | `boolean` | Indicates whether the zone is only using Cloudflare DNS services. |
| `plan` | `table` | (Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. |
| `result` | `table` |  |
| `result_info` | `table` |  |
| `success` | `boolean` | Whether the API call was successful. |
| `type` | `string` | A full zone implies that DNS is hosted with Cloudflare. |
| `vanity_name_servers` | `table` | An array of domains used for custom name servers. |

#### Example: Load

```lua
local zone, err = client:Zone():load({ id = "zone_id" })
```

#### Example: List

```lua
local zones, err = client:Zone():list()
```

#### Example: Create

```lua
local zone, err = client:Zone():create({
  account = {}, -- table
  errors = {}, -- table
  messages = {}, -- table
  name = "example_name", -- string
  result = {}, -- table
  success = true, -- boolean
})
```


### ZoneHold

Create an instance: `local zone_hold = client:ZoneHold(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `hold` | `boolean` | Whether the hostname is currently subject to a zone hold. |
| `hold_after` | `string` | The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled. |
| `id` | `string` |  |
| `include_subdomains` | `boolean` | Whether the hold extends to block subdomains of the held zone. |
| `result` | `table` |  |

#### Example: Load

```lua
local zone_hold, err = client:ZoneHold():load({ id = "zone_hold_id" })
```

#### Example: Create

```lua
local zone_hold, err = client:ZoneHold():create({
  id = "example_id", -- string
})
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── cloudflare-account-management_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`cloudflare-account-management_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local iamapiresponsesingleid = client:IamApiResponseSingleId()
iamapiresponsesingleid:list()

-- iamapiresponsesingleid:data_get() now returns the iamapiresponsesingleid data from the last list
-- iamapiresponsesingleid:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
