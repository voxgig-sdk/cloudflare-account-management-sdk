# CloudflareAccountManagement Ruby SDK Reference

Complete API reference for the CloudflareAccountManagement Ruby SDK.


## CloudflareAccountManagementSDK

### Constructor

```ruby
require_relative 'CloudflareAccountManagement_sdk'

client = CloudflareAccountManagementSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CloudflareAccountManagementSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = CloudflareAccountManagementSDK.test
```


### Instance Methods

#### `Account(data = nil)`

Create a new `Account` entity instance. Pass `nil` for no initial data.

#### `AccountSetting(data = nil)`

Create a new `AccountSetting` entity instance. Pass `nil` for no initial data.

#### `CachePurgeApiResponseSingleId(data = nil)`

Create a new `CachePurgeApiResponseSingleId` entity instance. Pass `nil` for no initial data.

#### `CpsCommunicationPreference(data = nil)`

Create a new `CpsCommunicationPreference` entity instance. Pass `nil` for no initial data.

#### `IamApiResponseSingleId(data = nil)`

Create a new `IamApiResponseSingleId` entity instance. Pass `nil` for no initial data.

#### `IamResponseSingleAccount(data = nil)`

Create a new `IamResponseSingleAccount` entity instance. Pass `nil` for no initial data.

#### `IamSingleUser(data = nil)`

Create a new `IamSingleUser` entity instance. Pass `nil` for no initial data.

#### `KaminoEnvironment(data = nil)`

Create a new `KaminoEnvironment` entity instance. Pass `nil` for no initial data.

#### `Resource(data = nil)`

Create a new `Resource` entity instance. Pass `nil` for no initial data.

#### `ResourceTagging(data = nil)`

Create a new `ResourceTagging` entity instance. Pass `nil` for no initial data.

#### `ResourceTaggingTagKeySummaryResponseCollection(data = nil)`

Create a new `ResourceTaggingTagKeySummaryResponseCollection` entity instance. Pass `nil` for no initial data.

#### `ResourceTaggingTagKeysResponseCollection(data = nil)`

Create a new `ResourceTaggingTagKeysResponseCollection` entity instance. Pass `nil` for no initial data.

#### `ResourceTaggingTagValuesResponseCollection(data = nil)`

Create a new `ResourceTaggingTagValuesResponseCollection` entity instance. Pass `nil` for no initial data.

#### `ResourceTaggingTaggedResourceResponseSingle(data = nil)`

Create a new `ResourceTaggingTaggedResourceResponseSingle` entity instance. Pass `nil` for no initial data.

#### `Zone(data = nil)`

Create a new `Zone` entity instance. Pass `nil` for no initial data.

#### `ZoneHold(data = nil)`

Create a new `ZoneHold` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AccountEntity

```ruby
account = client.Account
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Account.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Account.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AccountEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AccountSettingEntity

```ruby
account_setting = client.AccountSetting
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `Array` | Yes |  |
| `messages` | `Array` | Yes |  |
| `result` | `Array` | No | Controls Unique Transformations billing for the account. |
| `success` | `Boolean` | Yes | Whether the API call was successful. |
| `value` | `String` | Yes | Enables Unique Transformations billing for the account. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.AccountSetting.list
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.AccountSetting.update({
  "account_id" => "account_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AccountSettingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CachePurgeApiResponseSingleIdEntity

```ruby
cache_purge_api_response_single_id = client.CachePurgeApiResponseSingleId
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `Array` | Yes |  |
| `messages` | `Array` | Yes |  |
| `result` | `Hash` | Yes |  |
| `success` | `Boolean` | Yes | Indicates the API call's success or failure. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CachePurgeApiResponseSingleId.create({
  "environment_id" => "example_environment_id", # String
  "zone_id" => "example_zone_id", # String
  "errors" => [], # Array
  "messages" => [], # Array
  "result" => {}, # Hash
  "success" => true, # Boolean
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CachePurgeApiResponseSingleIdEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CpsCommunicationPreferenceEntity

```ruby
cps_communication_preference = client.CpsCommunicationPreference
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `Array` | Yes |  |
| `languagelocale` | `String` | No | The user's preferred language locale for communications. |
| `messages` | `Array` | Yes |  |
| `preferences` | `Hash` | No | Preference keys mapped to subscription states to update. |
| `result` | `Hash` | Yes | The user's communication preferences. |
| `success` | `Boolean` | Yes | Whether the API call was successful. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.CpsCommunicationPreference.list
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.CpsCommunicationPreference.update({
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CpsCommunicationPreferenceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IamApiResponseSingleIdEntity

```ruby
iam_api_response_single_id = client.IamApiResponseSingleId
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `String` | Yes | Account name |
| `result` | `Array` | No |  |
| `standalone` | `Boolean` | No | Set to `true` and omit `unit` to create a standalone Free Account. |
| `type` | `Object` | No |  |
| `unit` | `Hash` | No | Information related to the tenant unit. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.IamApiResponseSingleId.create({
  "name" => "example_name", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.IamApiResponseSingleId.list
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.IamApiResponseSingleId.remove({ "account_id" => "account_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IamApiResponseSingleIdEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IamResponseSingleAccountEntity

```ruby
iam_response_single_account = client.IamResponseSingleAccount
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `result` | `Hash` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.IamResponseSingleAccount.create({
  "account_id" => "example_account_id", # String
  "result" => {}, # Hash
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.IamResponseSingleAccount.load({ "id" => "iam_response_single_account_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.IamResponseSingleAccount.update({
  "id" => "iam_response_single_account_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IamResponseSingleAccountEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IamSingleUserEntity

```ruby
iam_single_user = client.IamSingleUser
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `String` | No | The country in which the user lives. |
| `first_name` | `String` | No | User's first name |
| `last_name` | `String` | No | User's last name |
| `result` | `Hash` | Yes |  |
| `telephone` | `String` | No | User's telephone number |
| `zipcode` | `String` | No | The zipcode or postal code where the user lives. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.IamSingleUser.load()
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.IamSingleUser.update({
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IamSingleUserEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## KaminoEnvironmentEntity

```ruby
kamino_environment = client.KaminoEnvironment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environments` | `Array` | Yes |  |
| `errors` | `Array` | Yes |  |
| `id` | `String` | No |  |
| `messages` | `Array` | Yes |  |
| `result` | `Hash` | Yes |  |
| `success` | `Boolean` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.KaminoEnvironment.create({
  "zone_id" => "example_zone_id", # String
  "environments" => [], # Array
  "errors" => [], # Array
  "messages" => [], # Array
  "result" => {}, # Hash
  "success" => true, # Boolean
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.KaminoEnvironment.list
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.KaminoEnvironment.remove({ "id" => "id", "zone_id" => "zone_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.KaminoEnvironment.update({
  "zone_id" => "zone_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `KaminoEnvironmentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ResourceEntity

```ruby
resource = client.Resource
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `Array` | Yes |  |
| `messages` | `Array` | Yes |  |
| `result` | `Array` | No |  |
| `result_info` | `Hash` | No |  |
| `success` | `Boolean` | Yes | Whether the API call was successful. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Resource.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ResourceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ResourceTaggingEntity

```ruby
resource_tagging = client.ResourceTagging
```

### Operations

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.ResourceTagging.remove({ "account_id" => "account_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ResourceTaggingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ResourceTaggingTagKeySummaryResponseCollectionEntity

```ruby
resource_tagging_tag_key_summary_response_collection = client.ResourceTaggingTagKeySummaryResponseCollection
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `Array` | Yes |  |
| `messages` | `Array` | Yes |  |
| `result` | `Array` | No | Contains an array of tag keys with their distinct values. |
| `result_info` | `Hash` | No |  |
| `success` | `Boolean` | Yes | Whether the API call was successful. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ResourceTaggingTagKeySummaryResponseCollection.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ResourceTaggingTagKeySummaryResponseCollectionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ResourceTaggingTagKeysResponseCollectionEntity

```ruby
resource_tagging_tag_keys_response_collection = client.ResourceTaggingTagKeysResponseCollection
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `Array` | Yes |  |
| `messages` | `Array` | Yes |  |
| `result` | `Array` | No | Contains an array of distinct tag keys. |
| `result_info` | `Hash` | No |  |
| `success` | `Boolean` | Yes | Whether the API call was successful. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ResourceTaggingTagKeysResponseCollection.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ResourceTaggingTagKeysResponseCollectionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ResourceTaggingTagValuesResponseCollectionEntity

```ruby
resource_tagging_tag_values_response_collection = client.ResourceTaggingTagValuesResponseCollection
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `Array` | Yes |  |
| `messages` | `Array` | Yes |  |
| `result` | `Array` | No |  |
| `result_info` | `Hash` | No |  |
| `success` | `Boolean` | Yes | Whether the API call was successful. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ResourceTaggingTagValuesResponseCollection.load({ "account_id" => "account_id", "tag_key" => "tag_key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ResourceTaggingTagValuesResponseCollectionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ResourceTaggingTaggedResourceResponseSingleEntity

```ruby
resource_tagging_tagged_resource_response_single = client.ResourceTaggingTaggedResourceResponseSingle
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `Array` | Yes |  |
| `messages` | `Array` | Yes |  |
| `result` | `Hash` | No |  |
| `success` | `Boolean` | Yes | Whether the API call was successful. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ResourceTaggingTaggedResourceResponseSingle.list
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.ResourceTaggingTaggedResourceResponseSingle.update({
  "account_id" => "account_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ResourceTaggingTaggedResourceResponseSingleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ZoneEntity

```ruby
zone = client.Zone
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `Hash` | Yes |  |
| `errors` | `Array` | Yes |  |
| `id` | `String` | No |  |
| `messages` | `Array` | Yes |  |
| `name` | `String` | Yes | The domain name. |
| `paused` | `Boolean` | No | Indicates whether the zone is only using Cloudflare DNS services. |
| `plan` | `Hash` | No | (Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. |
| `result` | `Hash` | Yes |  |
| `result_info` | `Hash` | No |  |
| `success` | `Boolean` | Yes | Whether the API call was successful. |
| `type` | `String` | No | A full zone implies that DNS is hosted with Cloudflare. |
| `vanity_name_servers` | `Array` | No | An array of domains used for custom name servers. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Zone.create({
  "account" => {}, # Hash
  "errors" => [], # Array
  "messages" => [], # Array
  "name" => "example_name", # String
  "result" => {}, # Hash
  "success" => true, # Boolean
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Zone.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Zone.load({ "id" => "zone_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Zone.remove({ "id" => "zone_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Zone.update({
  "id" => "zone_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ZoneEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ZoneHoldEntity

```ruby
zone_hold = client.ZoneHold
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `hold` | `Boolean` | No | Whether the hostname is currently subject to a zone hold. |
| `hold_after` | `String` | No | The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled. |
| `id` | `String` | No |  |
| `include_subdomains` | `Boolean` | No | Whether the hold extends to block subdomains of the held zone. |
| `result` | `Hash` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.ZoneHold.create({
  "id" => "example_id", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ZoneHold.load({ "id" => "zone_hold_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.ZoneHold.remove({ "id" => "zone_hold_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.ZoneHold.update({
  "id" => "zone_hold_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ZoneHoldEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ruby
client = CloudflareAccountManagementSDK.new({
  "feature" => {
    "test" => { "active" => true },
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

