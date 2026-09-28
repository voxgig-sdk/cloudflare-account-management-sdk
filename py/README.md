# CloudflareAccountManagement Python SDK



The Python SDK for the CloudflareAccountManagement API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Account()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`, `patch`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/cloudflare-account-management-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from cloudflareaccountmanagement_sdk import CloudflareAccountManagementSDK

client = CloudflareAccountManagementSDK({
    "apikey": os.environ.get("CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY"),
})
```

### 2. List account records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    accounts = client.Account().list({"id": "example"})
    for account in accounts:
        print(account)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a resourcetaggingtagvaluesresponsecollection

ResourceTaggingTagValuesResponseCollection is nested under account, so provide the `account_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    resourcetaggingtagvaluesresponsecollection = client.ResourceTaggingTagValuesResponseCollection().load({"account_id": "example_account_id", "tag_key": "example_tag_key"})
    print(resourcetaggingtagvaluesresponsecollection)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Account().create({})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    iamapiresponsesingleids = client.IamApiResponseSingleId().list()
    print(iamapiresponsesingleids)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = CloudflareAccountManagementSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
iamapiresponsesingleid = client.IamApiResponseSingleId().list()
# iamapiresponsesingleid contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = CloudflareAccountManagementSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### CloudflareAccountManagementSDK

```python
from cloudflareaccountmanagement_sdk import CloudflareAccountManagementSDK

client = CloudflareAccountManagementSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = CloudflareAccountManagementSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### CloudflareAccountManagementSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `account = client.Account()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: List

```python
accounts = client.Account().list({"id": "example"})
```

#### Example: Create

```python
account = client.Account().create({
})
```


### AccountSetting

Create an instance: `account_setting = client.AccountSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `list` |  |
| `messages` | `list` |  |
| `result` | `list` | Controls Unique Transformations billing for the account. |
| `success` | `bool` | Whether the API call was successful. |
| `value` | `str` | Enables Unique Transformations billing for the account. |

#### Example: List

```python
account_settings = client.AccountSetting().list({"account_id": "example"})
```


### CachePurgeApiResponseSingleId

Create an instance: `cache_purge_api_response_single_id = client.CachePurgeApiResponseSingleId()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `list` |  |
| `messages` | `list` |  |
| `result` | `dict` |  |
| `success` | `bool` | Indicates the API call's success or failure. |

#### Example: Create

```python
cache_purge_api_response_single_id = client.CachePurgeApiResponseSingleId().create({
    "environment_id": "example_environment_id",  # str
    "zone_id": "example_zone_id",  # str
    "errors": [],  # list
    "messages": [],  # list
    "result": {},  # dict
    "success": True,  # bool
})
```


### CpsCommunicationPreference

Create an instance: `cps_communication_preference = client.CpsCommunicationPreference()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `list` |  |
| `languagelocale` | `str` | The user's preferred language locale for communications. |
| `messages` | `list` |  |
| `preferences` | `dict` | Preference keys mapped to subscription states to update. |
| `result` | `dict` | The user's communication preferences. |
| `success` | `bool` | Whether the API call was successful. |

#### Example: List

```python
cps_communication_preferences = client.CpsCommunicationPreference().list()
```


### IamApiResponseSingleId

Create an instance: `iam_api_response_single_id = client.IamApiResponseSingleId()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `str` | Account name |
| `result` | `list` |  |
| `standalone` | `bool` | Set to `true` and omit `unit` to create a standalone Free Account. |
| `type` | `Any` |  |
| `unit` | `dict` | Information related to the tenant unit. |

#### Example: List

```python
iam_api_response_single_ids = client.IamApiResponseSingleId().list()
```

#### Example: Create

```python
iam_api_response_single_id = client.IamApiResponseSingleId().create({
    "name": "example_name",  # str
})
```


### IamResponseSingleAccount

Create an instance: `iam_response_single_account = client.IamResponseSingleAccount()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `result` | `dict` |  |

#### Example: Load

```python
iam_response_single_account = client.IamResponseSingleAccount().load({"id": "iam_response_single_account_id"})
```

#### Example: Create

```python
iam_response_single_account = client.IamResponseSingleAccount().create({
    "account_id": "example_account_id",  # str
    "result": {},  # dict
})
```


### IamSingleUser

Create an instance: `iam_single_user = client.IamSingleUser()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `str` | The country in which the user lives. |
| `first_name` | `str` | User's first name |
| `last_name` | `str` | User's last name |
| `result` | `dict` |  |
| `telephone` | `str` | User's telephone number |
| `zipcode` | `str` | The zipcode or postal code where the user lives. |

#### Example: Load

```python
iam_single_user = client.IamSingleUser().load()
```


### KaminoEnvironment

Create an instance: `kamino_environment = client.KaminoEnvironment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environments` | `list` |  |
| `errors` | `list` |  |
| `id` | `str` |  |
| `messages` | `list` |  |
| `result` | `dict` |  |
| `success` | `bool` |  |

#### Example: List

```python
kamino_environments = client.KaminoEnvironment().list({"zone_id": "example"})
```

#### Example: Create

```python
kamino_environment = client.KaminoEnvironment().create({
    "zone_id": "example_zone_id",  # str
    "environments": [],  # list
    "errors": [],  # list
    "messages": [],  # list
    "result": {},  # dict
    "success": True,  # bool
})
```


### Resource

Create an instance: `resource = client.Resource()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `list` |  |
| `messages` | `list` |  |
| `result` | `list` |  |
| `result_info` | `dict` |  |
| `success` | `bool` | Whether the API call was successful. |

#### Example: List

```python
resources = client.Resource().list({"account_id": "example"})
```


### ResourceTagging

Create an instance: `resource_tagging = client.ResourceTagging()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ResourceTaggingTagKeySummaryResponseCollection

Create an instance: `resource_tagging_tag_key_summary_response_collection = client.ResourceTaggingTagKeySummaryResponseCollection()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `list` |  |
| `messages` | `list` |  |
| `result` | `list` | Contains an array of tag keys with their distinct values. |
| `result_info` | `dict` |  |
| `success` | `bool` | Whether the API call was successful. |

#### Example: List

```python
resource_tagging_tag_key_summary_response_collections = client.ResourceTaggingTagKeySummaryResponseCollection().list({"account_id": "example"})
```


### ResourceTaggingTagKeysResponseCollection

Create an instance: `resource_tagging_tag_keys_response_collection = client.ResourceTaggingTagKeysResponseCollection()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `list` |  |
| `messages` | `list` |  |
| `result` | `list` | Contains an array of distinct tag keys. |
| `result_info` | `dict` |  |
| `success` | `bool` | Whether the API call was successful. |

#### Example: List

```python
resource_tagging_tag_keys_response_collections = client.ResourceTaggingTagKeysResponseCollection().list({"account_id": "example"})
```


### ResourceTaggingTagValuesResponseCollection

Create an instance: `resource_tagging_tag_values_response_collection = client.ResourceTaggingTagValuesResponseCollection()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `list` |  |
| `messages` | `list` |  |
| `result` | `list` |  |
| `result_info` | `dict` |  |
| `success` | `bool` | Whether the API call was successful. |

#### Example: Load

```python
resource_tagging_tag_values_response_collection = client.ResourceTaggingTagValuesResponseCollection().load({"account_id": "account_id", "tag_key": "tag_key"})
```


### ResourceTaggingTaggedResourceResponseSingle

Create an instance: `resource_tagging_tagged_resource_response_single = client.ResourceTaggingTaggedResourceResponseSingle()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `list` |  |
| `messages` | `list` |  |
| `result` | `dict` |  |
| `success` | `bool` | Whether the API call was successful. |

#### Example: List

```python
resource_tagging_tagged_resource_response_singles = client.ResourceTaggingTaggedResourceResponseSingle().list({"resource_id": "example", "resource_type": "example"})
```


### Zone

Create an instance: `zone = client.Zone()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `dict` |  |
| `errors` | `list` |  |
| `id` | `str` |  |
| `messages` | `list` |  |
| `name` | `str` | The domain name. |
| `paused` | `bool` | Indicates whether the zone is only using Cloudflare DNS services. |
| `plan` | `dict` | (Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. |
| `result` | `dict` |  |
| `result_info` | `dict` |  |
| `success` | `bool` | Whether the API call was successful. |
| `type` | `str` | A full zone implies that DNS is hosted with Cloudflare. |
| `vanity_name_servers` | `list` | An array of domains used for custom name servers. |

#### Example: Load

```python
zone = client.Zone().load({"id": "zone_id"})
```

#### Example: List

```python
zones = client.Zone().list()
```

#### Example: Create

```python
zone = client.Zone().create({
    "account": {},  # dict
    "errors": [],  # list
    "messages": [],  # list
    "name": "example_name",  # str
    "result": {},  # dict
    "success": True,  # bool
})
```


### ZoneHold

Create an instance: `zone_hold = client.ZoneHold()`

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
| `hold_after` | `str` | The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled. |
| `id` | `str` |  |
| `include_subdomains` | `bool` | Whether the hold extends to block subdomains of the held zone. |
| `result` | `dict` |  |

#### Example: Load

```python
zone_hold = client.ZoneHold().load({"id": "zone_hold_id"})
```

#### Example: Create

```python
zone_hold = client.ZoneHold().create({
    "id": "example_id",  # str
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── cloudflareaccountmanagement_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`cloudflareaccountmanagement_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
iamapiresponsesingleid = client.IamApiResponseSingleId()
iamapiresponsesingleid.list()

# iamapiresponsesingleid.data_get() now returns the iamapiresponsesingleid data from the last list
# iamapiresponsesingleid.match_get() returns the last match criteria
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
