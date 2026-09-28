# CloudflareAccountManagement Lua SDK Reference

Complete API reference for the CloudflareAccountManagement Lua SDK.


## CloudflareAccountManagementSDK

### Constructor

```lua
local sdk = require("cloudflare-account-management_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Account(data)`

Create a new `Account` entity instance. Pass `nil` for no initial data.

#### `AccountSetting(data)`

Create a new `AccountSetting` entity instance. Pass `nil` for no initial data.

#### `CachePurgeApiResponseSingleId(data)`

Create a new `CachePurgeApiResponseSingleId` entity instance. Pass `nil` for no initial data.

#### `CpsCommunicationPreference(data)`

Create a new `CpsCommunicationPreference` entity instance. Pass `nil` for no initial data.

#### `IamApiResponseSingleId(data)`

Create a new `IamApiResponseSingleId` entity instance. Pass `nil` for no initial data.

#### `IamResponseSingleAccount(data)`

Create a new `IamResponseSingleAccount` entity instance. Pass `nil` for no initial data.

#### `IamSingleUser(data)`

Create a new `IamSingleUser` entity instance. Pass `nil` for no initial data.

#### `KaminoEnvironment(data)`

Create a new `KaminoEnvironment` entity instance. Pass `nil` for no initial data.

#### `Resource(data)`

Create a new `Resource` entity instance. Pass `nil` for no initial data.

#### `ResourceTagging(data)`

Create a new `ResourceTagging` entity instance. Pass `nil` for no initial data.

#### `ResourceTaggingTagKeySummaryResponseCollection(data)`

Create a new `ResourceTaggingTagKeySummaryResponseCollection` entity instance. Pass `nil` for no initial data.

#### `ResourceTaggingTagKeysResponseCollection(data)`

Create a new `ResourceTaggingTagKeysResponseCollection` entity instance. Pass `nil` for no initial data.

#### `ResourceTaggingTagValuesResponseCollection(data)`

Create a new `ResourceTaggingTagValuesResponseCollection` entity instance. Pass `nil` for no initial data.

#### `ResourceTaggingTaggedResourceResponseSingle(data)`

Create a new `ResourceTaggingTaggedResourceResponseSingle` entity instance. Pass `nil` for no initial data.

#### `Zone(data)`

Create a new `Zone` entity instance. Pass `nil` for no initial data.

#### `ZoneHold(data)`

Create a new `ZoneHold` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AccountEntity

```lua
local account = client:Account(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Account():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Account():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccountEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AccountSettingEntity

```lua
local account_setting = client:AccountSetting(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `table` | Yes |  |
| `messages` | `table` | Yes |  |
| `result` | `table` | No | Controls Unique Transformations billing for the account. |
| `success` | `boolean` | Yes | Whether the API call was successful. |
| `value` | `string` | Yes | Enables Unique Transformations billing for the account. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:AccountSetting():list()
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:AccountSetting():update({
  account_id = "account_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccountSettingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CachePurgeApiResponseSingleIdEntity

```lua
local cache_purge_api_response_single_id = client:CachePurgeApiResponseSingleId(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `table` | Yes |  |
| `messages` | `table` | Yes |  |
| `result` | `table` | Yes |  |
| `success` | `boolean` | Yes | Indicates the API call's success or failure. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:CachePurgeApiResponseSingleId():create({
  environment_id = --[[ string ]],
  zone_id = --[[ string ]],
  errors = --[[ table ]],
  messages = --[[ table ]],
  result = --[[ table ]],
  success = --[[ boolean ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CachePurgeApiResponseSingleIdEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CpsCommunicationPreferenceEntity

```lua
local cps_communication_preference = client:CpsCommunicationPreference(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `table` | Yes |  |
| `languagelocale` | `string` | No | The user's preferred language locale for communications. |
| `messages` | `table` | Yes |  |
| `preferences` | `table` | No | Preference keys mapped to subscription states to update. |
| `result` | `table` | Yes | The user's communication preferences. |
| `success` | `boolean` | Yes | Whether the API call was successful. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:CpsCommunicationPreference():list()
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:CpsCommunicationPreference():update({
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CpsCommunicationPreferenceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IamApiResponseSingleIdEntity

```lua
local iam_api_response_single_id = client:IamApiResponseSingleId(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Account name |
| `result` | `table` | No |  |
| `standalone` | `boolean` | No | Set to `true` and omit `unit` to create a standalone Free Account. |
| `type` | `any` | No |  |
| `unit` | `table` | No | Information related to the tenant unit. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:IamApiResponseSingleId():create({
  name = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:IamApiResponseSingleId():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:IamApiResponseSingleId():remove({ account_id = "account_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IamApiResponseSingleIdEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IamResponseSingleAccountEntity

```lua
local iam_response_single_account = client:IamResponseSingleAccount(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `result` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:IamResponseSingleAccount():create({
  account_id = --[[ string ]],
  result = --[[ table ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:IamResponseSingleAccount():load({ id = "iam_response_single_account_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:IamResponseSingleAccount():update({
  id = "iam_response_single_account_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IamResponseSingleAccountEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IamSingleUserEntity

```lua
local iam_single_user = client:IamSingleUser(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | No | The country in which the user lives. |
| `first_name` | `string` | No | User's first name |
| `last_name` | `string` | No | User's last name |
| `result` | `table` | Yes |  |
| `telephone` | `string` | No | User's telephone number |
| `zipcode` | `string` | No | The zipcode or postal code where the user lives. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:IamSingleUser():load()
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:IamSingleUser():update({
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IamSingleUserEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## KaminoEnvironmentEntity

```lua
local kamino_environment = client:KaminoEnvironment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environments` | `table` | Yes |  |
| `errors` | `table` | Yes |  |
| `id` | `string` | No |  |
| `messages` | `table` | Yes |  |
| `result` | `table` | Yes |  |
| `success` | `boolean` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:KaminoEnvironment():create({
  zone_id = --[[ string ]],
  environments = --[[ table ]],
  errors = --[[ table ]],
  messages = --[[ table ]],
  result = --[[ table ]],
  success = --[[ boolean ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:KaminoEnvironment():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:KaminoEnvironment():remove({ id = "id", zone_id = "zone_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:KaminoEnvironment():update({
  zone_id = "zone_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KaminoEnvironmentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ResourceEntity

```lua
local resource = client:Resource(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `table` | Yes |  |
| `messages` | `table` | Yes |  |
| `result` | `table` | No |  |
| `result_info` | `table` | No |  |
| `success` | `boolean` | Yes | Whether the API call was successful. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Resource():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResourceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ResourceTaggingEntity

```lua
local resource_tagging = client:ResourceTagging(nil)
```

### Operations

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:ResourceTagging():remove({ account_id = "account_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResourceTaggingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ResourceTaggingTagKeySummaryResponseCollectionEntity

```lua
local resource_tagging_tag_key_summary_response_collection = client:ResourceTaggingTagKeySummaryResponseCollection(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `table` | Yes |  |
| `messages` | `table` | Yes |  |
| `result` | `table` | No | Contains an array of tag keys with their distinct values. |
| `result_info` | `table` | No |  |
| `success` | `boolean` | Yes | Whether the API call was successful. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ResourceTaggingTagKeySummaryResponseCollection():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResourceTaggingTagKeySummaryResponseCollectionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ResourceTaggingTagKeysResponseCollectionEntity

```lua
local resource_tagging_tag_keys_response_collection = client:ResourceTaggingTagKeysResponseCollection(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `table` | Yes |  |
| `messages` | `table` | Yes |  |
| `result` | `table` | No | Contains an array of distinct tag keys. |
| `result_info` | `table` | No |  |
| `success` | `boolean` | Yes | Whether the API call was successful. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ResourceTaggingTagKeysResponseCollection():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResourceTaggingTagKeysResponseCollectionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ResourceTaggingTagValuesResponseCollectionEntity

```lua
local resource_tagging_tag_values_response_collection = client:ResourceTaggingTagValuesResponseCollection(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `table` | Yes |  |
| `messages` | `table` | Yes |  |
| `result` | `table` | No |  |
| `result_info` | `table` | No |  |
| `success` | `boolean` | Yes | Whether the API call was successful. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ResourceTaggingTagValuesResponseCollection():load({ account_id = "account_id", tag_key = "tag_key" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResourceTaggingTagValuesResponseCollectionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ResourceTaggingTaggedResourceResponseSingleEntity

```lua
local resource_tagging_tagged_resource_response_single = client:ResourceTaggingTaggedResourceResponseSingle(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `table` | Yes |  |
| `messages` | `table` | Yes |  |
| `result` | `table` | No |  |
| `success` | `boolean` | Yes | Whether the API call was successful. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ResourceTaggingTaggedResourceResponseSingle():list()
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:ResourceTaggingTaggedResourceResponseSingle():update({
  account_id = "account_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResourceTaggingTaggedResourceResponseSingleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ZoneEntity

```lua
local zone = client:Zone(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `table` | Yes |  |
| `errors` | `table` | Yes |  |
| `id` | `string` | No |  |
| `messages` | `table` | Yes |  |
| `name` | `string` | Yes | The domain name. |
| `paused` | `boolean` | No | Indicates whether the zone is only using Cloudflare DNS services. |
| `plan` | `table` | No | (Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. |
| `result` | `table` | Yes |  |
| `result_info` | `table` | No |  |
| `success` | `boolean` | Yes | Whether the API call was successful. |
| `type` | `string` | No | A full zone implies that DNS is hosted with Cloudflare. |
| `vanity_name_servers` | `table` | No | An array of domains used for custom name servers. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `account` | - | - | - | - | - |
| `errors` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `messages` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `paused` | - | - | - | - | - |
| `plan` | - | - | - | - | - |
| `result` | - | Yes | - | - | - |
| `result_info` | - | - | - | - | - |
| `success` | - | - | - | - | - |
| `type` | - | - | - | - | - |
| `vanity_name_servers` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Zone():create({
  account = --[[ table ]],
  errors = --[[ table ]],
  messages = --[[ table ]],
  name = --[[ string ]],
  result = --[[ table ]],
  success = --[[ boolean ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Zone():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Zone():load({ id = "zone_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Zone():remove({ id = "zone_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Zone():update({
  id = "zone_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ZoneEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ZoneHoldEntity

```lua
local zone_hold = client:ZoneHold(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `hold` | `boolean` | No | Whether the hostname is currently subject to a zone hold. |
| `hold_after` | `string` | No | The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled. |
| `id` | `string` | No |  |
| `include_subdomains` | `boolean` | No | Whether the hold extends to block subdomains of the held zone. |
| `result` | `table` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:ZoneHold():create({
  id = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ZoneHold():load({ id = "zone_hold_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:ZoneHold():remove({ id = "zone_hold_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:ZoneHold():update({
  id = "zone_hold_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ZoneHoldEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

