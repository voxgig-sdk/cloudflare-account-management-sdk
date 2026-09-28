# CloudflareAccountManagement PHP SDK Reference

Complete API reference for the CloudflareAccountManagement PHP SDK.


## CloudflareAccountManagementSDK

### Constructor

```php
require_once __DIR__ . '/cloudflareaccountmanagement_sdk.php';

$client = new CloudflareAccountManagementSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CloudflareAccountManagementSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = CloudflareAccountManagementSDK::test();
```


### Instance Methods

#### `Account($data = null)`

Create a new `AccountEntity` instance. Pass `null` for no initial data.

#### `AccountSetting($data = null)`

Create a new `AccountSettingEntity` instance. Pass `null` for no initial data.

#### `CachePurgeApiResponseSingleId($data = null)`

Create a new `CachePurgeApiResponseSingleIdEntity` instance. Pass `null` for no initial data.

#### `CpsCommunicationPreference($data = null)`

Create a new `CpsCommunicationPreferenceEntity` instance. Pass `null` for no initial data.

#### `IamApiResponseSingleId($data = null)`

Create a new `IamApiResponseSingleIdEntity` instance. Pass `null` for no initial data.

#### `IamResponseSingleAccount($data = null)`

Create a new `IamResponseSingleAccountEntity` instance. Pass `null` for no initial data.

#### `IamSingleUser($data = null)`

Create a new `IamSingleUserEntity` instance. Pass `null` for no initial data.

#### `KaminoEnvironment($data = null)`

Create a new `KaminoEnvironmentEntity` instance. Pass `null` for no initial data.

#### `Resource($data = null)`

Create a new `ResourceEntity` instance. Pass `null` for no initial data.

#### `ResourceTagging($data = null)`

Create a new `ResourceTaggingEntity` instance. Pass `null` for no initial data.

#### `ResourceTaggingTagKeySummaryResponseCollection($data = null)`

Create a new `ResourceTaggingTagKeySummaryResponseCollectionEntity` instance. Pass `null` for no initial data.

#### `ResourceTaggingTagKeysResponseCollection($data = null)`

Create a new `ResourceTaggingTagKeysResponseCollectionEntity` instance. Pass `null` for no initial data.

#### `ResourceTaggingTagValuesResponseCollection($data = null)`

Create a new `ResourceTaggingTagValuesResponseCollectionEntity` instance. Pass `null` for no initial data.

#### `ResourceTaggingTaggedResourceResponseSingle($data = null)`

Create a new `ResourceTaggingTaggedResourceResponseSingleEntity` instance. Pass `null` for no initial data.

#### `Zone($data = null)`

Create a new `ZoneEntity` instance. Pass `null` for no initial data.

#### `ZoneHold($data = null)`

Create a new `ZoneHoldEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): CloudflareAccountManagementUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AccountEntity

```php
$account = $client->Account();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Account()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Account()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AccountEntity`

Create a new `AccountEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AccountSettingEntity

```php
$account_setting = $client->AccountSetting();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `array` | Yes |  |
| `messages` | `array` | Yes |  |
| `result` | `array` | No | Controls Unique Transformations billing for the account. |
| `success` | `bool` | Yes | Whether the API call was successful. |
| `value` | `string` | Yes | Enables Unique Transformations billing for the account. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->AccountSetting()->list();
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->AccountSetting()->update([
  "account_id" => "account_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AccountSettingEntity`

Create a new `AccountSettingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CachePurgeApiResponseSingleIdEntity

```php
$cache_purge_api_response_single_id = $client->CachePurgeApiResponseSingleId();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `array` | Yes |  |
| `messages` | `array` | Yes |  |
| `result` | `array` | Yes |  |
| `success` | `bool` | Yes | Indicates the API call's success or failure. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CachePurgeApiResponseSingleId()->create([
  "environment_id" => null, // string
  "zone_id" => null, // string
  "errors" => null, // array
  "messages" => null, // array
  "result" => null, // array
  "success" => null, // bool
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CachePurgeApiResponseSingleIdEntity`

Create a new `CachePurgeApiResponseSingleIdEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CpsCommunicationPreferenceEntity

```php
$cps_communication_preference = $client->CpsCommunicationPreference();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `array` | Yes |  |
| `languagelocale` | `string` | No | The user's preferred language locale for communications. |
| `messages` | `array` | Yes |  |
| `preferences` | `array` | No | Preference keys mapped to subscription states to update. |
| `result` | `array` | Yes | The user's communication preferences. |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->CpsCommunicationPreference()->list();
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->CpsCommunicationPreference()->update([
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CpsCommunicationPreferenceEntity`

Create a new `CpsCommunicationPreferenceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IamApiResponseSingleIdEntity

```php
$iam_api_response_single_id = $client->IamApiResponseSingleId();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Account name |
| `result` | `array` | No |  |
| `standalone` | `bool` | No | Set to `true` and omit `unit` to create a standalone Free Account. |
| `type` | `mixed` | No |  |
| `unit` | `array` | No | Information related to the tenant unit. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->IamApiResponseSingleId()->create([
  "name" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->IamApiResponseSingleId()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->IamApiResponseSingleId()->remove(["account_id" => "account_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IamApiResponseSingleIdEntity`

Create a new `IamApiResponseSingleIdEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IamResponseSingleAccountEntity

```php
$iam_response_single_account = $client->IamResponseSingleAccount();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `result` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->IamResponseSingleAccount()->create([
  "account_id" => null, // string
  "result" => null, // array
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->IamResponseSingleAccount()->load(["id" => "iam_response_single_account_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->IamResponseSingleAccount()->update([
  "id" => "iam_response_single_account_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IamResponseSingleAccountEntity`

Create a new `IamResponseSingleAccountEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IamSingleUserEntity

```php
$iam_single_user = $client->IamSingleUser();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | No | The country in which the user lives. |
| `first_name` | `string` | No | User's first name |
| `last_name` | `string` | No | User's last name |
| `result` | `array` | Yes |  |
| `telephone` | `string` | No | User's telephone number |
| `zipcode` | `string` | No | The zipcode or postal code where the user lives. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->IamSingleUser()->load();
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->IamSingleUser()->update([
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IamSingleUserEntity`

Create a new `IamSingleUserEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## KaminoEnvironmentEntity

```php
$kamino_environment = $client->KaminoEnvironment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environments` | `array` | Yes |  |
| `errors` | `array` | Yes |  |
| `id` | `string` | No |  |
| `messages` | `array` | Yes |  |
| `result` | `array` | Yes |  |
| `success` | `bool` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->KaminoEnvironment()->create([
  "zone_id" => null, // string
  "environments" => null, // array
  "errors" => null, // array
  "messages" => null, // array
  "result" => null, // array
  "success" => null, // bool
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->KaminoEnvironment()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->KaminoEnvironment()->remove(["id" => "id", "zone_id" => "zone_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->KaminoEnvironment()->update([
  "zone_id" => "zone_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): KaminoEnvironmentEntity`

Create a new `KaminoEnvironmentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResourceEntity

```php
$resource = $client->Resource();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `array` | Yes |  |
| `messages` | `array` | Yes |  |
| `result` | `array` | No |  |
| `result_info` | `array` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Resource()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResourceEntity`

Create a new `ResourceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResourceTaggingEntity

```php
$resource_tagging = $client->ResourceTagging();
```

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->ResourceTagging()->remove(["account_id" => "account_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResourceTaggingEntity`

Create a new `ResourceTaggingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResourceTaggingTagKeySummaryResponseCollectionEntity

```php
$resource_tagging_tag_key_summary_response_collection = $client->ResourceTaggingTagKeySummaryResponseCollection();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `array` | Yes |  |
| `messages` | `array` | Yes |  |
| `result` | `array` | No | Contains an array of tag keys with their distinct values. |
| `result_info` | `array` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ResourceTaggingTagKeySummaryResponseCollection()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResourceTaggingTagKeySummaryResponseCollectionEntity`

Create a new `ResourceTaggingTagKeySummaryResponseCollectionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResourceTaggingTagKeysResponseCollectionEntity

```php
$resource_tagging_tag_keys_response_collection = $client->ResourceTaggingTagKeysResponseCollection();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `array` | Yes |  |
| `messages` | `array` | Yes |  |
| `result` | `array` | No | Contains an array of distinct tag keys. |
| `result_info` | `array` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ResourceTaggingTagKeysResponseCollection()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResourceTaggingTagKeysResponseCollectionEntity`

Create a new `ResourceTaggingTagKeysResponseCollectionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResourceTaggingTagValuesResponseCollectionEntity

```php
$resource_tagging_tag_values_response_collection = $client->ResourceTaggingTagValuesResponseCollection();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `array` | Yes |  |
| `messages` | `array` | Yes |  |
| `result` | `array` | No |  |
| `result_info` | `array` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ResourceTaggingTagValuesResponseCollection()->load(["account_id" => "account_id", "tag_key" => "tag_key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResourceTaggingTagValuesResponseCollectionEntity`

Create a new `ResourceTaggingTagValuesResponseCollectionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResourceTaggingTaggedResourceResponseSingleEntity

```php
$resource_tagging_tagged_resource_response_single = $client->ResourceTaggingTaggedResourceResponseSingle();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `array` | Yes |  |
| `messages` | `array` | Yes |  |
| `result` | `array` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ResourceTaggingTaggedResourceResponseSingle()->list();
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->ResourceTaggingTaggedResourceResponseSingle()->update([
  "account_id" => "account_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResourceTaggingTaggedResourceResponseSingleEntity`

Create a new `ResourceTaggingTaggedResourceResponseSingleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ZoneEntity

```php
$zone = $client->Zone();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `array` | Yes |  |
| `errors` | `array` | Yes |  |
| `id` | `string` | No |  |
| `messages` | `array` | Yes |  |
| `name` | `string` | Yes | The domain name. |
| `paused` | `bool` | No | Indicates whether the zone is only using Cloudflare DNS services. |
| `plan` | `array` | No | (Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. |
| `result` | `array` | Yes |  |
| `result_info` | `array` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |
| `type` | `string` | No | A full zone implies that DNS is hosted with Cloudflare. |
| `vanity_name_servers` | `array` | No | An array of domains used for custom name servers. |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Zone()->create([
  "account" => null, // array
  "errors" => null, // array
  "messages" => null, // array
  "name" => null, // string
  "result" => null, // array
  "success" => null, // bool
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Zone()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Zone()->load(["id" => "zone_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Zone()->remove(["id" => "zone_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Zone()->update([
  "id" => "zone_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ZoneEntity`

Create a new `ZoneEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ZoneHoldEntity

```php
$zone_hold = $client->ZoneHold();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `hold` | `bool` | No | Whether the hostname is currently subject to a zone hold. |
| `hold_after` | `string` | No | The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled. |
| `id` | `string` | No |  |
| `include_subdomains` | `bool` | No | Whether the hold extends to block subdomains of the held zone. |
| `result` | `array` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ZoneHold()->create([
  "id" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ZoneHold()->load(["id" => "zone_hold_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->ZoneHold()->remove(["id" => "zone_hold_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->ZoneHold()->update([
  "id" => "zone_hold_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ZoneHoldEntity`

Create a new `ZoneHoldEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```php
$client = new CloudflareAccountManagementSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
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

