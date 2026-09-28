# CloudflareAccountManagement Python SDK Reference

Complete API reference for the CloudflareAccountManagement Python SDK.


## CloudflareAccountManagementSDK

### Constructor

```python
from cloudflareaccountmanagement_sdk import CloudflareAccountManagementSDK

client = CloudflareAccountManagementSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CloudflareAccountManagementSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = CloudflareAccountManagementSDK.test()
```


### Instance Methods

#### `Account(data=None)`

Create a new `AccountEntity` instance. Pass `None` for no initial data.

#### `AccountSetting(data=None)`

Create a new `AccountSettingEntity` instance. Pass `None` for no initial data.

#### `CachePurgeApiResponseSingleId(data=None)`

Create a new `CachePurgeApiResponseSingleIdEntity` instance. Pass `None` for no initial data.

#### `CpsCommunicationPreference(data=None)`

Create a new `CpsCommunicationPreferenceEntity` instance. Pass `None` for no initial data.

#### `IamApiResponseSingleId(data=None)`

Create a new `IamApiResponseSingleIdEntity` instance. Pass `None` for no initial data.

#### `IamResponseSingleAccount(data=None)`

Create a new `IamResponseSingleAccountEntity` instance. Pass `None` for no initial data.

#### `IamSingleUser(data=None)`

Create a new `IamSingleUserEntity` instance. Pass `None` for no initial data.

#### `KaminoEnvironment(data=None)`

Create a new `KaminoEnvironmentEntity` instance. Pass `None` for no initial data.

#### `Resource(data=None)`

Create a new `ResourceEntity` instance. Pass `None` for no initial data.

#### `ResourceTagging(data=None)`

Create a new `ResourceTaggingEntity` instance. Pass `None` for no initial data.

#### `ResourceTaggingTagKeySummaryResponseCollection(data=None)`

Create a new `ResourceTaggingTagKeySummaryResponseCollectionEntity` instance. Pass `None` for no initial data.

#### `ResourceTaggingTagKeysResponseCollection(data=None)`

Create a new `ResourceTaggingTagKeysResponseCollectionEntity` instance. Pass `None` for no initial data.

#### `ResourceTaggingTagValuesResponseCollection(data=None)`

Create a new `ResourceTaggingTagValuesResponseCollectionEntity` instance. Pass `None` for no initial data.

#### `ResourceTaggingTaggedResourceResponseSingle(data=None)`

Create a new `ResourceTaggingTaggedResourceResponseSingleEntity` instance. Pass `None` for no initial data.

#### `Zone(data=None)`

Create a new `ZoneEntity` instance. Pass `None` for no initial data.

#### `ZoneHold(data=None)`

Create a new `ZoneHoldEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AccountEntity

```python
account = client.Account()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Account().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Account().list({"id": "example"})
for account in results:
    print(account)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccountEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AccountSettingEntity

```python
account_setting = client.AccountSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `list` | Yes |  |
| `messages` | `list` | Yes |  |
| `result` | `list` | No | Controls Unique Transformations billing for the account. |
| `success` | `bool` | Yes | Whether the API call was successful. |
| `value` | `str` | Yes | Enables Unique Transformations billing for the account. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AccountSetting().list({"account_id": "example"})
for account_setting in results:
    print(account_setting)
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.AccountSetting().update({
    "account_id": "account_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccountSettingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CachePurgeApiResponseSingleIdEntity

```python
cache_purge_api_response_single_id = client.CachePurgeApiResponseSingleId()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `list` | Yes |  |
| `messages` | `list` | Yes |  |
| `result` | `dict` | Yes |  |
| `success` | `bool` | Yes | Indicates the API call's success or failure. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.CachePurgeApiResponseSingleId().create({
    "environment_id": "example_environment_id",  # str
    "zone_id": "example_zone_id",  # str
    "errors": [],  # list
    "messages": [],  # list
    "result": {},  # dict
    "success": True,  # bool
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CachePurgeApiResponseSingleIdEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CpsCommunicationPreferenceEntity

```python
cps_communication_preference = client.CpsCommunicationPreference()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `list` | Yes |  |
| `languagelocale` | `str` | No | The user's preferred language locale for communications. |
| `messages` | `list` | Yes |  |
| `preferences` | `dict` | No | Preference keys mapped to subscription states to update. |
| `result` | `dict` | Yes | The user's communication preferences. |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.CpsCommunicationPreference().list()
for cps_communication_preference in results:
    print(cps_communication_preference)
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.CpsCommunicationPreference().update({
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CpsCommunicationPreferenceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IamApiResponseSingleIdEntity

```python
iam_api_response_single_id = client.IamApiResponseSingleId()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `str` | Yes | Account name |
| `result` | `list` | No |  |
| `standalone` | `bool` | No | Set to `true` and omit `unit` to create a standalone Free Account. |
| `type` | `Any` | No |  |
| `unit` | `dict` | No | Information related to the tenant unit. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.IamApiResponseSingleId().create({
    "name": "example_name",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.IamApiResponseSingleId().list()
for iam_api_response_single_id in results:
    print(iam_api_response_single_id)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.IamApiResponseSingleId().remove({"account_id": "account_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IamApiResponseSingleIdEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IamResponseSingleAccountEntity

```python
iam_response_single_account = client.IamResponseSingleAccount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `result` | `dict` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.IamResponseSingleAccount().create({
    "account_id": "example_account_id",  # str
    "result": {},  # dict
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.IamResponseSingleAccount().load({"id": "iam_response_single_account_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.IamResponseSingleAccount().update({
    "id": "iam_response_single_account_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IamResponseSingleAccountEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IamSingleUserEntity

```python
iam_single_user = client.IamSingleUser()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `str` | No | The country in which the user lives. |
| `first_name` | `str` | No | User's first name |
| `last_name` | `str` | No | User's last name |
| `result` | `dict` | Yes |  |
| `telephone` | `str` | No | User's telephone number |
| `zipcode` | `str` | No | The zipcode or postal code where the user lives. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.IamSingleUser().load()
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.IamSingleUser().update({
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IamSingleUserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## KaminoEnvironmentEntity

```python
kamino_environment = client.KaminoEnvironment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environments` | `list` | Yes |  |
| `errors` | `list` | Yes |  |
| `id` | `str` | No |  |
| `messages` | `list` | Yes |  |
| `result` | `dict` | Yes |  |
| `success` | `bool` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.KaminoEnvironment().create({
    "zone_id": "example_zone_id",  # str
    "environments": [],  # list
    "errors": [],  # list
    "messages": [],  # list
    "result": {},  # dict
    "success": True,  # bool
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.KaminoEnvironment().list({"zone_id": "example"})
for kamino_environment in results:
    print(kamino_environment)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.KaminoEnvironment().remove({"id": "id", "zone_id": "zone_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.KaminoEnvironment().update({
    "zone_id": "zone_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KaminoEnvironmentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResourceEntity

```python
resource = client.Resource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `list` | Yes |  |
| `messages` | `list` | Yes |  |
| `result` | `list` | No |  |
| `result_info` | `dict` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Resource().list({"account_id": "example"})
for resource in results:
    print(resource)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResourceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResourceTaggingEntity

```python
resource_tagging = client.ResourceTagging()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ResourceTagging().remove({"account_id": "account_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResourceTaggingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResourceTaggingTagKeySummaryResponseCollectionEntity

```python
resource_tagging_tag_key_summary_response_collection = client.ResourceTaggingTagKeySummaryResponseCollection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `list` | Yes |  |
| `messages` | `list` | Yes |  |
| `result` | `list` | No | Contains an array of tag keys with their distinct values. |
| `result_info` | `dict` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ResourceTaggingTagKeySummaryResponseCollection().list({"account_id": "example"})
for resource_tagging_tag_key_summary_response_collection in results:
    print(resource_tagging_tag_key_summary_response_collection)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResourceTaggingTagKeySummaryResponseCollectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResourceTaggingTagKeysResponseCollectionEntity

```python
resource_tagging_tag_keys_response_collection = client.ResourceTaggingTagKeysResponseCollection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `list` | Yes |  |
| `messages` | `list` | Yes |  |
| `result` | `list` | No | Contains an array of distinct tag keys. |
| `result_info` | `dict` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ResourceTaggingTagKeysResponseCollection().list({"account_id": "example"})
for resource_tagging_tag_keys_response_collection in results:
    print(resource_tagging_tag_keys_response_collection)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResourceTaggingTagKeysResponseCollectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResourceTaggingTagValuesResponseCollectionEntity

```python
resource_tagging_tag_values_response_collection = client.ResourceTaggingTagValuesResponseCollection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `list` | Yes |  |
| `messages` | `list` | Yes |  |
| `result` | `list` | No |  |
| `result_info` | `dict` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ResourceTaggingTagValuesResponseCollection().load({"account_id": "account_id", "tag_key": "tag_key"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResourceTaggingTagValuesResponseCollectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResourceTaggingTaggedResourceResponseSingleEntity

```python
resource_tagging_tagged_resource_response_single = client.ResourceTaggingTaggedResourceResponseSingle()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `list` | Yes |  |
| `messages` | `list` | Yes |  |
| `result` | `dict` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ResourceTaggingTaggedResourceResponseSingle().list({"resource_id": "example", "resource_type": "example"})
for resource_tagging_tagged_resource_response_single in results:
    print(resource_tagging_tagged_resource_response_single)
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ResourceTaggingTaggedResourceResponseSingle().update({
    "account_id": "account_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResourceTaggingTaggedResourceResponseSingleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ZoneEntity

```python
zone = client.Zone()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `dict` | Yes |  |
| `errors` | `list` | Yes |  |
| `id` | `str` | No |  |
| `messages` | `list` | Yes |  |
| `name` | `str` | Yes | The domain name. |
| `paused` | `bool` | No | Indicates whether the zone is only using Cloudflare DNS services. |
| `plan` | `dict` | No | (Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. |
| `result` | `dict` | Yes |  |
| `result_info` | `dict` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |
| `type` | `str` | No | A full zone implies that DNS is hosted with Cloudflare. |
| `vanity_name_servers` | `list` | No | An array of domains used for custom name servers. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Zone().create({
    "account": {},  # dict
    "errors": [],  # list
    "messages": [],  # list
    "name": "example_name",  # str
    "result": {},  # dict
    "success": True,  # bool
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Zone().list()
for zone in results:
    print(zone)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Zone().load({"id": "zone_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Zone().remove({"id": "zone_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Zone().update({
    "id": "zone_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ZoneEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ZoneHoldEntity

```python
zone_hold = client.ZoneHold()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `hold` | `bool` | No | Whether the hostname is currently subject to a zone hold. |
| `hold_after` | `str` | No | The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled. |
| `id` | `str` | No |  |
| `include_subdomains` | `bool` | No | Whether the hold extends to block subdomains of the held zone. |
| `result` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ZoneHold().create({
    "id": "example_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ZoneHold().load({"id": "zone_hold_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ZoneHold().remove({"id": "zone_hold_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ZoneHold().update({
    "id": "zone_hold_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ZoneHoldEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```python
client = CloudflareAccountManagementSDK({
    "feature": {
        "test": {"active": True},
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

