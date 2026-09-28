# CloudflareAccountManagement Golang SDK Reference

Complete API reference for the CloudflareAccountManagement Golang SDK.


## CloudflareAccountManagementSDK

### Constructor

```go
func NewCloudflareAccountManagementSDK(options map[string]any) *CloudflareAccountManagementSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *CloudflareAccountManagementSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *CloudflareAccountManagementSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Account(data map[string]any) CloudflareAccountManagementEntity`

Create a new `Account` entity instance. Pass `nil` for no initial data.

#### `AccountSetting(data map[string]any) CloudflareAccountManagementEntity`

Create a new `AccountSetting` entity instance. Pass `nil` for no initial data.

#### `CachePurgeApiResponseSingleId(data map[string]any) CloudflareAccountManagementEntity`

Create a new `CachePurgeApiResponseSingleId` entity instance. Pass `nil` for no initial data.

#### `CpsCommunicationPreference(data map[string]any) CloudflareAccountManagementEntity`

Create a new `CpsCommunicationPreference` entity instance. Pass `nil` for no initial data.

#### `IamApiResponseSingleId(data map[string]any) CloudflareAccountManagementEntity`

Create a new `IamApiResponseSingleId` entity instance. Pass `nil` for no initial data.

#### `IamResponseSingleAccount(data map[string]any) CloudflareAccountManagementEntity`

Create a new `IamResponseSingleAccount` entity instance. Pass `nil` for no initial data.

#### `IamSingleUser(data map[string]any) CloudflareAccountManagementEntity`

Create a new `IamSingleUser` entity instance. Pass `nil` for no initial data.

#### `KaminoEnvironment(data map[string]any) CloudflareAccountManagementEntity`

Create a new `KaminoEnvironment` entity instance. Pass `nil` for no initial data.

#### `Resource(data map[string]any) CloudflareAccountManagementEntity`

Create a new `Resource` entity instance. Pass `nil` for no initial data.

#### `ResourceTagging(data map[string]any) CloudflareAccountManagementEntity`

Create a new `ResourceTagging` entity instance. Pass `nil` for no initial data.

#### `ResourceTaggingTagKeySummaryResponseCollection(data map[string]any) CloudflareAccountManagementEntity`

Create a new `ResourceTaggingTagKeySummaryResponseCollection` entity instance. Pass `nil` for no initial data.

#### `ResourceTaggingTagKeysResponseCollection(data map[string]any) CloudflareAccountManagementEntity`

Create a new `ResourceTaggingTagKeysResponseCollection` entity instance. Pass `nil` for no initial data.

#### `ResourceTaggingTagValuesResponseCollection(data map[string]any) CloudflareAccountManagementEntity`

Create a new `ResourceTaggingTagValuesResponseCollection` entity instance. Pass `nil` for no initial data.

#### `ResourceTaggingTaggedResourceResponseSingle(data map[string]any) CloudflareAccountManagementEntity`

Create a new `ResourceTaggingTaggedResourceResponseSingle` entity instance. Pass `nil` for no initial data.

#### `Zone(data map[string]any) CloudflareAccountManagementEntity`

Create a new `Zone` entity instance. Pass `nil` for no initial data.

#### `ZoneHold(data map[string]any) CloudflareAccountManagementEntity`

Create a new `ZoneHold` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AccountEntity

```go
account := client.Account(nil)
fmt.Println(account.GetName()) // "account"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Account(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Account(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AccountEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AccountSettingEntity

```go
accountSetting := client.AccountSetting(nil)
fmt.Println(accountSetting.GetName()) // "account_setting"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `[]any` | Yes |  |
| `messages` | `[]any` | Yes |  |
| `result` | `[]any` | No | Controls Unique Transformations billing for the account. |
| `success` | `bool` | Yes | Whether the API call was successful. |
| `value` | `string` | Yes | Enables Unique Transformations billing for the account. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.AccountSetting(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.AccountSetting(nil).Update(map[string]any{
    "account_id": "account_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AccountSettingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CachePurgeApiResponseSingleIdEntity

```go
cachePurgeApiResponseSingleId := client.CachePurgeApiResponseSingleId(nil)
fmt.Println(cachePurgeApiResponseSingleId.GetName()) // "cache_purge_api_response_single_id"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `[]any` | Yes |  |
| `messages` | `[]any` | Yes |  |
| `result` | `map[string]any` | Yes |  |
| `success` | `bool` | Yes | Indicates the API call's success or failure. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.CachePurgeApiResponseSingleId(nil).Create(map[string]any{
    "environment_id": "example_environment_id",
    "zone_id": "example_zone_id",
    "errors": []any{},
    "messages": []any{},
    "result": map[string]any{},
    "success": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CachePurgeApiResponseSingleIdEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CpsCommunicationPreferenceEntity

```go
cpsCommunicationPreference := client.CpsCommunicationPreference(nil)
fmt.Println(cpsCommunicationPreference.GetName()) // "cps_communication_preference"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `[]any` | Yes |  |
| `languagelocale` | `string` | No | The user's preferred language locale for communications. |
| `messages` | `[]any` | Yes |  |
| `preferences` | `map[string]any` | No | Preference keys mapped to subscription states to update. |
| `result` | `map[string]any` | Yes | The user's communication preferences. |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.CpsCommunicationPreference(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.CpsCommunicationPreference(nil).Update(map[string]any{
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CpsCommunicationPreferenceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IamApiResponseSingleIdEntity

```go
iamApiResponseSingleId := client.IamApiResponseSingleId(nil)
fmt.Println(iamApiResponseSingleId.GetName()) // "iam_api_response_single_id"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Account name |
| `result` | `[]any` | No |  |
| `standalone` | `bool` | No | Set to `true` and omit `unit` to create a standalone Free Account. |
| `type` | `any` | No |  |
| `unit` | `map[string]any` | No | Information related to the tenant unit. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.IamApiResponseSingleId(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.IamApiResponseSingleId(nil).Create(map[string]any{
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.IamApiResponseSingleId(nil).Remove(map[string]any{"account_id": "account_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IamApiResponseSingleIdEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IamResponseSingleAccountEntity

```go
iamResponseSingleAccount := client.IamResponseSingleAccount(nil)
fmt.Println(iamResponseSingleAccount.GetName()) // "iam_response_single_account"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `result` | `map[string]any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.IamResponseSingleAccount(nil).Load(map[string]any{"id": "iam_response_single_account_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.IamResponseSingleAccount(nil).Create(map[string]any{
    "account_id": "example_account_id",
    "result": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.IamResponseSingleAccount(nil).Update(map[string]any{
    "id": "iam_response_single_account_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IamResponseSingleAccountEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IamSingleUserEntity

```go
iamSingleUser := client.IamSingleUser(nil)
fmt.Println(iamSingleUser.GetName()) // "iam_single_user"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | No | The country in which the user lives. |
| `first_name` | `string` | No | User's first name |
| `last_name` | `string` | No | User's last name |
| `result` | `map[string]any` | Yes |  |
| `telephone` | `string` | No | User's telephone number |
| `zipcode` | `string` | No | The zipcode or postal code where the user lives. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.IamSingleUser(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.IamSingleUser(nil).Update(map[string]any{
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IamSingleUserEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## KaminoEnvironmentEntity

```go
kaminoEnvironment := client.KaminoEnvironment(nil)
fmt.Println(kaminoEnvironment.GetName()) // "kamino_environment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environments` | `[]any` | Yes |  |
| `errors` | `[]any` | Yes |  |
| `id` | `string` | No |  |
| `messages` | `[]any` | Yes |  |
| `result` | `map[string]any` | Yes |  |
| `success` | `bool` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.KaminoEnvironment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.KaminoEnvironment(nil).Create(map[string]any{
    "zone_id": "example_zone_id",
    "environments": []any{},
    "errors": []any{},
    "messages": []any{},
    "result": map[string]any{},
    "success": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.KaminoEnvironment(nil).Update(map[string]any{
    "zone_id": "zone_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.KaminoEnvironment(nil).Remove(map[string]any{"id": "id", "zone_id": "zone_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `KaminoEnvironmentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ResourceEntity

```go
resource := client.Resource(nil)
fmt.Println(resource.GetName()) // "resource"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `[]any` | Yes |  |
| `messages` | `[]any` | Yes |  |
| `result` | `[]any` | No |  |
| `result_info` | `map[string]any` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Resource(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ResourceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ResourceTaggingEntity

```go
resourceTagging := client.ResourceTagging(nil)
fmt.Println(resourceTagging.GetName()) // "resource_tagging"
```

### Operations

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.ResourceTagging(nil).Remove(map[string]any{"account_id": "account_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ResourceTaggingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ResourceTaggingTagKeySummaryResponseCollectionEntity

```go
resourceTaggingTagKeySummaryResponseCollection := client.ResourceTaggingTagKeySummaryResponseCollection(nil)
fmt.Println(resourceTaggingTagKeySummaryResponseCollection.GetName()) // "resource_tagging_tag_key_summary_response_collection"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `[]any` | Yes |  |
| `messages` | `[]any` | Yes |  |
| `result` | `[]any` | No | Contains an array of tag keys with their distinct values. |
| `result_info` | `map[string]any` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ResourceTaggingTagKeySummaryResponseCollection(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ResourceTaggingTagKeySummaryResponseCollectionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ResourceTaggingTagKeysResponseCollectionEntity

```go
resourceTaggingTagKeysResponseCollection := client.ResourceTaggingTagKeysResponseCollection(nil)
fmt.Println(resourceTaggingTagKeysResponseCollection.GetName()) // "resource_tagging_tag_keys_response_collection"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `[]any` | Yes |  |
| `messages` | `[]any` | Yes |  |
| `result` | `[]any` | No | Contains an array of distinct tag keys. |
| `result_info` | `map[string]any` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ResourceTaggingTagKeysResponseCollection(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ResourceTaggingTagKeysResponseCollectionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ResourceTaggingTagValuesResponseCollectionEntity

```go
resourceTaggingTagValuesResponseCollection := client.ResourceTaggingTagValuesResponseCollection(nil)
fmt.Println(resourceTaggingTagValuesResponseCollection.GetName()) // "resource_tagging_tag_values_response_collection"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `[]any` | Yes |  |
| `messages` | `[]any` | Yes |  |
| `result` | `[]any` | No |  |
| `result_info` | `map[string]any` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ResourceTaggingTagValuesResponseCollection(nil).Load(map[string]any{"account_id": "account_id", "tag_key": "tag_key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ResourceTaggingTagValuesResponseCollectionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ResourceTaggingTaggedResourceResponseSingleEntity

```go
resourceTaggingTaggedResourceResponseSingle := client.ResourceTaggingTaggedResourceResponseSingle(nil)
fmt.Println(resourceTaggingTaggedResourceResponseSingle.GetName()) // "resource_tagging_tagged_resource_response_single"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `[]any` | Yes |  |
| `messages` | `[]any` | Yes |  |
| `result` | `map[string]any` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ResourceTaggingTaggedResourceResponseSingle(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.ResourceTaggingTaggedResourceResponseSingle(nil).Update(map[string]any{
    "account_id": "account_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ResourceTaggingTaggedResourceResponseSingleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ZoneEntity

```go
zone := client.Zone(nil)
fmt.Println(zone.GetName()) // "zone"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `map[string]any` | Yes |  |
| `errors` | `[]any` | Yes |  |
| `id` | `string` | No |  |
| `messages` | `[]any` | Yes |  |
| `name` | `string` | Yes | The domain name. |
| `paused` | `bool` | No | Indicates whether the zone is only using Cloudflare DNS services. |
| `plan` | `map[string]any` | No | (Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. |
| `result` | `map[string]any` | Yes |  |
| `result_info` | `map[string]any` | No |  |
| `success` | `bool` | Yes | Whether the API call was successful. |
| `type` | `string` | No | A full zone implies that DNS is hosted with Cloudflare. |
| `vanity_name_servers` | `[]any` | No | An array of domains used for custom name servers. |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Zone(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Zone(nil).Load(map[string]any{"id": "zone_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Zone(nil).Create(map[string]any{
    "account": map[string]any{},
    "errors": []any{},
    "messages": []any{},
    "name": "example_name",
    "result": map[string]any{},
    "success": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Zone(nil).Update(map[string]any{
    "id": "zone_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Zone(nil).Remove(map[string]any{"id": "zone_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ZoneEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ZoneHoldEntity

```go
zoneHold := client.ZoneHold(nil)
fmt.Println(zoneHold.GetName()) // "zone_hold"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `hold` | `bool` | No | Whether the hostname is currently subject to a zone hold. |
| `hold_after` | `string` | No | The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled. |
| `id` | `string` | No |  |
| `include_subdomains` | `bool` | No | Whether the hold extends to block subdomains of the held zone. |
| `result` | `map[string]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ZoneHold(nil).Load(map[string]any{"id": "zone_hold_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.ZoneHold(nil).Create(map[string]any{
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.ZoneHold(nil).Update(map[string]any{
    "id": "zone_hold_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.ZoneHold(nil).Remove(map[string]any{"id": "zone_hold_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ZoneHoldEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```go
client := sdk.NewCloudflareAccountManagementSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
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

