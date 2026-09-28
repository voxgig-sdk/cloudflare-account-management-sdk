# CloudflareAccountManagement PHP SDK



The PHP SDK for the CloudflareAccountManagement API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Account()` — with named operations (`list`/`load`/`create`/`update`/`remove`/`patch`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/cloudflare-account-management-sdk/releases](https://github.com/voxgig-sdk/cloudflare-account-management-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'cloudflareaccountmanagement_sdk.php';

$client = new CloudflareAccountManagementSDK([
    "apikey" => getenv("CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY"),
]);
```

### 2. List account records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $accounts = $client->Account()->list();
    foreach ($accounts as $record) {
        $item = $record->data_get();
        echo $item["id"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a resourcetaggingtagvaluesresponsecollection

ResourceTaggingTagValuesResponseCollection is nested under account, so provide the `account_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the ResourceTaggingTagValuesResponseCollection record (throws on error).
    $resourcetaggingtagvaluesresponsecollection = $client->ResourceTaggingTagValuesResponseCollection()->load(["account_id" => "example_account_id", "tag_key" => "example_tag_key"]);
    print_r($resourcetaggingtagvaluesresponsecollection->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Account record.
$created = $client->Account()->create([]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $iamapiresponsesingleids = $client->IamApiResponseSingleId()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = CloudflareAccountManagementSDK::test([
    "entity" => ["zonehold" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$zonehold = $client->ZoneHold()->load(["id" => "test01"]);
print_r($zonehold->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new CloudflareAccountManagementSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE
CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### CloudflareAccountManagementSDK

```php
require_once 'cloudflareaccountmanagement_sdk.php';
$client = new CloudflareAccountManagementSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = CloudflareAccountManagementSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### CloudflareAccountManagementSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Account` | `($data): AccountEntity` | Create an Account entity instance. |
| `AccountSetting` | `($data): AccountSettingEntity` | Create an AccountSetting entity instance. |
| `CachePurgeApiResponseSingleId` | `($data): CachePurgeApiResponseSingleIdEntity` | Create a CachePurgeApiResponseSingleId entity instance. |
| `CpsCommunicationPreference` | `($data): CpsCommunicationPreferenceEntity` | Create a CpsCommunicationPreference entity instance. |
| `IamApiResponseSingleId` | `($data): IamApiResponseSingleIdEntity` | Create an IamApiResponseSingleId entity instance. |
| `IamResponseSingleAccount` | `($data): IamResponseSingleAccountEntity` | Create an IamResponseSingleAccount entity instance. |
| `IamSingleUser` | `($data): IamSingleUserEntity` | Create an IamSingleUser entity instance. |
| `KaminoEnvironment` | `($data): KaminoEnvironmentEntity` | Create a KaminoEnvironment entity instance. |
| `Resource` | `($data): ResourceEntity` | Create a Resource entity instance. |
| `ResourceTagging` | `($data): ResourceTaggingEntity` | Create a ResourceTagging entity instance. |
| `ResourceTaggingTagKeySummaryResponseCollection` | `($data): ResourceTaggingTagKeySummaryResponseCollectionEntity` | Create a ResourceTaggingTagKeySummaryResponseCollection entity instance. |
| `ResourceTaggingTagKeysResponseCollection` | `($data): ResourceTaggingTagKeysResponseCollectionEntity` | Create a ResourceTaggingTagKeysResponseCollection entity instance. |
| `ResourceTaggingTagValuesResponseCollection` | `($data): ResourceTaggingTagValuesResponseCollectionEntity` | Create a ResourceTaggingTagValuesResponseCollection entity instance. |
| `ResourceTaggingTaggedResourceResponseSingle` | `($data): ResourceTaggingTaggedResourceResponseSingleEntity` | Create a ResourceTaggingTaggedResourceResponseSingle entity instance. |
| `Zone` | `($data): ZoneEntity` | Create a Zone entity instance. |
| `ZoneHold` | `($data): ZoneHoldEntity` | Create a ZoneHold entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$account = $client->Account();`

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

```php
// list() returns an array of Account records (throws on error).
$accounts = $client->Account()->list();
```

#### Example: Create

```php
$account = $client->Account()->create([
]);
```


### AccountSetting

Create an instance: `$account_setting = $client->AccountSetting();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `array` |  |
| `messages` | `array` |  |
| `result` | `array` | Controls Unique Transformations billing for the account. |
| `success` | `bool` | Whether the API call was successful. |
| `value` | `string` | Enables Unique Transformations billing for the account. |

#### Example: List

```php
// list() returns an array of AccountSetting records (throws on error).
$account_settings = $client->AccountSetting()->list();
```


### CachePurgeApiResponseSingleId

Create an instance: `$cache_purge_api_response_single_id = $client->CachePurgeApiResponseSingleId();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `array` |  |
| `messages` | `array` |  |
| `result` | `array` |  |
| `success` | `bool` | Indicates the API call's success or failure. |

#### Example: Create

```php
$cache_purge_api_response_single_id = $client->CachePurgeApiResponseSingleId()->create([
    "environment_id" => null, // string
    "zone_id" => null, // string
    "errors" => null, // array
    "messages" => null, // array
    "result" => null, // array
    "success" => null, // bool
]);
```


### CpsCommunicationPreference

Create an instance: `$cps_communication_preference = $client->CpsCommunicationPreference();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `array` |  |
| `languagelocale` | `string` | The user's preferred language locale for communications. |
| `messages` | `array` |  |
| `preferences` | `array` | Preference keys mapped to subscription states to update. |
| `result` | `array` | The user's communication preferences. |
| `success` | `bool` | Whether the API call was successful. |

#### Example: List

```php
// list() returns an array of CpsCommunicationPreference records (throws on error).
$cps_communication_preferences = $client->CpsCommunicationPreference()->list();
```


### IamApiResponseSingleId

Create an instance: `$iam_api_response_single_id = $client->IamApiResponseSingleId();`

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
| `result` | `array` |  |
| `standalone` | `bool` | Set to `true` and omit `unit` to create a standalone Free Account. |
| `type` | `mixed` |  |
| `unit` | `array` | Information related to the tenant unit. |

#### Example: List

```php
// list() returns an array of IamApiResponseSingleId records (throws on error).
$iam_api_response_single_ids = $client->IamApiResponseSingleId()->list();
```

#### Example: Create

```php
$iam_api_response_single_id = $client->IamApiResponseSingleId()->create([
    "name" => null, // string
]);
```


### IamResponseSingleAccount

Create an instance: `$iam_response_single_account = $client->IamResponseSingleAccount();`

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
| `result` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the IamResponseSingleAccount record (throws on error).
$iam_response_single_account = $client->IamResponseSingleAccount()->load(["id" => "iam_response_single_account_id"]);
```

#### Example: Create

```php
$iam_response_single_account = $client->IamResponseSingleAccount()->create([
    "account_id" => null, // string
    "result" => null, // array
]);
```


### IamSingleUser

Create an instance: `$iam_single_user = $client->IamSingleUser();`

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
| `result` | `array` |  |
| `telephone` | `string` | User's telephone number |
| `zipcode` | `string` | The zipcode or postal code where the user lives. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the IamSingleUser record (throws on error).
$iam_single_user = $client->IamSingleUser()->load();
```


### KaminoEnvironment

Create an instance: `$kamino_environment = $client->KaminoEnvironment();`

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
| `environments` | `array` |  |
| `errors` | `array` |  |
| `id` | `string` |  |
| `messages` | `array` |  |
| `result` | `array` |  |
| `success` | `bool` |  |

#### Example: List

```php
// list() returns an array of KaminoEnvironment records (throws on error).
$kamino_environments = $client->KaminoEnvironment()->list();
```

#### Example: Create

```php
$kamino_environment = $client->KaminoEnvironment()->create([
    "zone_id" => null, // string
    "environments" => null, // array
    "errors" => null, // array
    "messages" => null, // array
    "result" => null, // array
    "success" => null, // bool
]);
```


### Resource

Create an instance: `$resource = $client->Resource();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `array` |  |
| `messages` | `array` |  |
| `result` | `array` |  |
| `result_info` | `array` |  |
| `success` | `bool` | Whether the API call was successful. |

#### Example: List

```php
// list() returns an array of Resource records (throws on error).
$resources = $client->Resource()->list();
```


### ResourceTagging

Create an instance: `$resource_tagging = $client->ResourceTagging();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ResourceTaggingTagKeySummaryResponseCollection

Create an instance: `$resource_tagging_tag_key_summary_response_collection = $client->ResourceTaggingTagKeySummaryResponseCollection();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `array` |  |
| `messages` | `array` |  |
| `result` | `array` | Contains an array of tag keys with their distinct values. |
| `result_info` | `array` |  |
| `success` | `bool` | Whether the API call was successful. |

#### Example: List

```php
// list() returns an array of ResourceTaggingTagKeySummaryResponseCollection records (throws on error).
$resource_tagging_tag_key_summary_response_collections = $client->ResourceTaggingTagKeySummaryResponseCollection()->list();
```


### ResourceTaggingTagKeysResponseCollection

Create an instance: `$resource_tagging_tag_keys_response_collection = $client->ResourceTaggingTagKeysResponseCollection();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `array` |  |
| `messages` | `array` |  |
| `result` | `array` | Contains an array of distinct tag keys. |
| `result_info` | `array` |  |
| `success` | `bool` | Whether the API call was successful. |

#### Example: List

```php
// list() returns an array of ResourceTaggingTagKeysResponseCollection records (throws on error).
$resource_tagging_tag_keys_response_collections = $client->ResourceTaggingTagKeysResponseCollection()->list();
```


### ResourceTaggingTagValuesResponseCollection

Create an instance: `$resource_tagging_tag_values_response_collection = $client->ResourceTaggingTagValuesResponseCollection();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `array` |  |
| `messages` | `array` |  |
| `result` | `array` |  |
| `result_info` | `array` |  |
| `success` | `bool` | Whether the API call was successful. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ResourceTaggingTagValuesResponseCollection record (throws on error).
$resource_tagging_tag_values_response_collection = $client->ResourceTaggingTagValuesResponseCollection()->load(["account_id" => "account_id", "tag_key" => "tag_key"]);
```


### ResourceTaggingTaggedResourceResponseSingle

Create an instance: `$resource_tagging_tagged_resource_response_single = $client->ResourceTaggingTaggedResourceResponseSingle();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `array` |  |
| `messages` | `array` |  |
| `result` | `array` |  |
| `success` | `bool` | Whether the API call was successful. |

#### Example: List

```php
// list() returns an array of ResourceTaggingTaggedResourceResponseSingle records (throws on error).
$resource_tagging_tagged_resource_response_singles = $client->ResourceTaggingTaggedResourceResponseSingle()->list();
```


### Zone

Create an instance: `$zone = $client->Zone();`

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
| `account` | `array` |  |
| `errors` | `array` |  |
| `id` | `string` |  |
| `messages` | `array` |  |
| `name` | `string` | The domain name. |
| `paused` | `bool` | Indicates whether the zone is only using Cloudflare DNS services. |
| `plan` | `array` | (Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. |
| `result` | `array` |  |
| `result_info` | `array` |  |
| `success` | `bool` | Whether the API call was successful. |
| `type` | `string` | A full zone implies that DNS is hosted with Cloudflare. |
| `vanity_name_servers` | `array` | An array of domains used for custom name servers. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Zone record (throws on error).
$zone = $client->Zone()->load(["id" => "zone_id"]);
```

#### Example: List

```php
// list() returns an array of Zone records (throws on error).
$zones = $client->Zone()->list();
```

#### Example: Create

```php
$zone = $client->Zone()->create([
    "account" => null, // array
    "errors" => null, // array
    "messages" => null, // array
    "name" => null, // string
    "result" => null, // array
    "success" => null, // bool
]);
```


### ZoneHold

Create an instance: `$zone_hold = $client->ZoneHold();`

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
| `hold` | `bool` | Whether the hostname is currently subject to a zone hold. |
| `hold_after` | `string` | The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled. |
| `id` | `string` |  |
| `include_subdomains` | `bool` | Whether the hold extends to block subdomains of the held zone. |
| `result` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ZoneHold record (throws on error).
$zone_hold = $client->ZoneHold()->load(["id" => "zone_hold_id"]);
```

#### Example: Create

```php
$zone_hold = $client->ZoneHold()->create([
    "id" => null, // string
]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── cloudflareaccountmanagement_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`cloudflareaccountmanagement_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$iamapiresponsesingleid = $client->IamApiResponseSingleId();
$iamapiresponsesingleid->list();

// $iamapiresponsesingleid->data_get() now returns the iamapiresponsesingleid data from the last list
// $iamapiresponsesingleid->match_get() returns the last match criteria
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
