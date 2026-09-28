# CloudflareAccountManagement Ruby SDK



The Ruby SDK for the CloudflareAccountManagement API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Account` — with named operations (`list`/`load`/`create`/`update`/`remove`/`patch`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/cloudflare-account-management-sdk/releases](https://github.com/voxgig-sdk/cloudflare-account-management-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "CloudflareAccountManagement_sdk"

client = CloudflareAccountManagementSDK.new({
  "apikey" => ENV["CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY"],
})
```

### 2. List account records

```ruby
begin
  # list returns an Array of Account records — iterate directly.
  accounts = client.Account.list
  accounts.each do |item|
    puts "#{item["id"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a resourcetaggingtagvaluesresponsecollection

ResourceTaggingTagValuesResponseCollection is nested under account, so provide the `account_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the ResourceTaggingTagValuesResponseCollection record (raises on error).
  resourcetaggingtagvaluesresponsecollection = client.ResourceTaggingTagValuesResponseCollection.load({ "account_id" => "example_account_id", "tag_key" => "example_tag_key" })
  puts resourcetaggingtagvaluesresponsecollection
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created Account record.
created = client.Account.create({  })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  iamapiresponsesingleids = client.IamApiResponseSingleId.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = CloudflareAccountManagementSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
iamapiresponsesingleid = client.IamApiResponseSingleId.list()
puts iamapiresponsesingleid
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = CloudflareAccountManagementSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### CloudflareAccountManagementSDK

```ruby
require_relative "CloudflareAccountManagement_sdk"
client = CloudflareAccountManagementSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = CloudflareAccountManagementSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CloudflareAccountManagementSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `CloudflareAccountManagementError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `account = client.Account`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Account records (raises on error).
accounts = client.Account.list
```

#### Example: Create

```ruby
account = client.Account.create({
})
```


### AccountSetting

Create an instance: `account_setting = client.AccountSetting`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `Array` |  |
| `messages` | `Array` |  |
| `result` | `Array` | Controls Unique Transformations billing for the account. |
| `success` | `Boolean` | Whether the API call was successful. |
| `value` | `String` | Enables Unique Transformations billing for the account. |

#### Example: List

```ruby
# list returns an Array of AccountSetting records (raises on error).
account_settings = client.AccountSetting.list
```


### CachePurgeApiResponseSingleId

Create an instance: `cache_purge_api_response_single_id = client.CachePurgeApiResponseSingleId`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `Array` |  |
| `messages` | `Array` |  |
| `result` | `Hash` |  |
| `success` | `Boolean` | Indicates the API call's success or failure. |

#### Example: Create

```ruby
cache_purge_api_response_single_id = client.CachePurgeApiResponseSingleId.create({
  "environment_id" => "example_environment_id", # String
  "zone_id" => "example_zone_id", # String
  "errors" => [], # Array
  "messages" => [], # Array
  "result" => {}, # Hash
  "success" => true, # Boolean
})
```


### CpsCommunicationPreference

Create an instance: `cps_communication_preference = client.CpsCommunicationPreference`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `Array` |  |
| `languagelocale` | `String` | The user's preferred language locale for communications. |
| `messages` | `Array` |  |
| `preferences` | `Hash` | Preference keys mapped to subscription states to update. |
| `result` | `Hash` | The user's communication preferences. |
| `success` | `Boolean` | Whether the API call was successful. |

#### Example: List

```ruby
# list returns an Array of CpsCommunicationPreference records (raises on error).
cps_communication_preferences = client.CpsCommunicationPreference.list
```


### IamApiResponseSingleId

Create an instance: `iam_api_response_single_id = client.IamApiResponseSingleId`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `String` | Account name |
| `result` | `Array` |  |
| `standalone` | `Boolean` | Set to `true` and omit `unit` to create a standalone Free Account. |
| `type` | `Object` |  |
| `unit` | `Hash` | Information related to the tenant unit. |

#### Example: List

```ruby
# list returns an Array of IamApiResponseSingleId records (raises on error).
iam_api_response_single_ids = client.IamApiResponseSingleId.list
```

#### Example: Create

```ruby
iam_api_response_single_id = client.IamApiResponseSingleId.create({
  "name" => "example_name", # String
})
```


### IamResponseSingleAccount

Create an instance: `iam_response_single_account = client.IamResponseSingleAccount`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `result` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the IamResponseSingleAccount record (raises on error).
iam_response_single_account = client.IamResponseSingleAccount.load({ "id" => "iam_response_single_account_id" })
```

#### Example: Create

```ruby
iam_response_single_account = client.IamResponseSingleAccount.create({
  "account_id" => "example_account_id", # String
  "result" => {}, # Hash
})
```


### IamSingleUser

Create an instance: `iam_single_user = client.IamSingleUser`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `String` | The country in which the user lives. |
| `first_name` | `String` | User's first name |
| `last_name` | `String` | User's last name |
| `result` | `Hash` |  |
| `telephone` | `String` | User's telephone number |
| `zipcode` | `String` | The zipcode or postal code where the user lives. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the IamSingleUser record (raises on error).
iam_single_user = client.IamSingleUser.load()
```


### KaminoEnvironment

Create an instance: `kamino_environment = client.KaminoEnvironment`

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
| `environments` | `Array` |  |
| `errors` | `Array` |  |
| `id` | `String` |  |
| `messages` | `Array` |  |
| `result` | `Hash` |  |
| `success` | `Boolean` |  |

#### Example: List

```ruby
# list returns an Array of KaminoEnvironment records (raises on error).
kamino_environments = client.KaminoEnvironment.list
```

#### Example: Create

```ruby
kamino_environment = client.KaminoEnvironment.create({
  "zone_id" => "example_zone_id", # String
  "environments" => [], # Array
  "errors" => [], # Array
  "messages" => [], # Array
  "result" => {}, # Hash
  "success" => true, # Boolean
})
```


### Resource

Create an instance: `resource = client.Resource`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `Array` |  |
| `messages` | `Array` |  |
| `result` | `Array` |  |
| `result_info` | `Hash` |  |
| `success` | `Boolean` | Whether the API call was successful. |

#### Example: List

```ruby
# list returns an Array of Resource records (raises on error).
resources = client.Resource.list
```


### ResourceTagging

Create an instance: `resource_tagging = client.ResourceTagging`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ResourceTaggingTagKeySummaryResponseCollection

Create an instance: `resource_tagging_tag_key_summary_response_collection = client.ResourceTaggingTagKeySummaryResponseCollection`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `Array` |  |
| `messages` | `Array` |  |
| `result` | `Array` | Contains an array of tag keys with their distinct values. |
| `result_info` | `Hash` |  |
| `success` | `Boolean` | Whether the API call was successful. |

#### Example: List

```ruby
# list returns an Array of ResourceTaggingTagKeySummaryResponseCollection records (raises on error).
resource_tagging_tag_key_summary_response_collections = client.ResourceTaggingTagKeySummaryResponseCollection.list
```


### ResourceTaggingTagKeysResponseCollection

Create an instance: `resource_tagging_tag_keys_response_collection = client.ResourceTaggingTagKeysResponseCollection`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `Array` |  |
| `messages` | `Array` |  |
| `result` | `Array` | Contains an array of distinct tag keys. |
| `result_info` | `Hash` |  |
| `success` | `Boolean` | Whether the API call was successful. |

#### Example: List

```ruby
# list returns an Array of ResourceTaggingTagKeysResponseCollection records (raises on error).
resource_tagging_tag_keys_response_collections = client.ResourceTaggingTagKeysResponseCollection.list
```


### ResourceTaggingTagValuesResponseCollection

Create an instance: `resource_tagging_tag_values_response_collection = client.ResourceTaggingTagValuesResponseCollection`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `Array` |  |
| `messages` | `Array` |  |
| `result` | `Array` |  |
| `result_info` | `Hash` |  |
| `success` | `Boolean` | Whether the API call was successful. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ResourceTaggingTagValuesResponseCollection record (raises on error).
resource_tagging_tag_values_response_collection = client.ResourceTaggingTagValuesResponseCollection.load({ "account_id" => "account_id", "tag_key" => "tag_key" })
```


### ResourceTaggingTaggedResourceResponseSingle

Create an instance: `resource_tagging_tagged_resource_response_single = client.ResourceTaggingTaggedResourceResponseSingle`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `Array` |  |
| `messages` | `Array` |  |
| `result` | `Hash` |  |
| `success` | `Boolean` | Whether the API call was successful. |

#### Example: List

```ruby
# list returns an Array of ResourceTaggingTaggedResourceResponseSingle records (raises on error).
resource_tagging_tagged_resource_response_singles = client.ResourceTaggingTaggedResourceResponseSingle.list
```


### Zone

Create an instance: `zone = client.Zone`

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
| `account` | `Hash` |  |
| `errors` | `Array` |  |
| `id` | `String` |  |
| `messages` | `Array` |  |
| `name` | `String` | The domain name. |
| `paused` | `Boolean` | Indicates whether the zone is only using Cloudflare DNS services. |
| `plan` | `Hash` | (Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. |
| `result` | `Hash` |  |
| `result_info` | `Hash` |  |
| `success` | `Boolean` | Whether the API call was successful. |
| `type` | `String` | A full zone implies that DNS is hosted with Cloudflare. |
| `vanity_name_servers` | `Array` | An array of domains used for custom name servers. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Zone record (raises on error).
zone = client.Zone.load({ "id" => "zone_id" })
```

#### Example: List

```ruby
# list returns an Array of Zone records (raises on error).
zones = client.Zone.list
```

#### Example: Create

```ruby
zone = client.Zone.create({
  "account" => {}, # Hash
  "errors" => [], # Array
  "messages" => [], # Array
  "name" => "example_name", # String
  "result" => {}, # Hash
  "success" => true, # Boolean
})
```


### ZoneHold

Create an instance: `zone_hold = client.ZoneHold`

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
| `hold` | `Boolean` | Whether the hostname is currently subject to a zone hold. |
| `hold_after` | `String` | The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled. |
| `id` | `String` |  |
| `include_subdomains` | `Boolean` | Whether the hold extends to block subdomains of the held zone. |
| `result` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ZoneHold record (raises on error).
zone_hold = client.ZoneHold.load({ "id" => "zone_hold_id" })
```

#### Example: Create

```ruby
zone_hold = client.ZoneHold.create({
  "id" => "example_id", # String
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── CloudflareAccountManagement_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`CloudflareAccountManagement_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
iamapiresponsesingleid = client.IamApiResponseSingleId
iamapiresponsesingleid.list()

# iamapiresponsesingleid.data_get now returns the iamapiresponsesingleid data from the last list
# iamapiresponsesingleid.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
