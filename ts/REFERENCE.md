# CloudflareAccountManagement TypeScript SDK Reference

Complete API reference for the CloudflareAccountManagement TypeScript SDK.


## CloudflareAccountManagementSDK

### Constructor

```ts
new CloudflareAccountManagementSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CloudflareAccountManagementSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CloudflareAccountManagementSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CloudflareAccountManagementSDK` instance in test mode.


### Instance Methods

#### `Account(data?: object)`

Create a new `Account` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AccountEntity` instance.

#### `AccountSetting(data?: object)`

Create a new `AccountSetting` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AccountSettingEntity` instance.

#### `CachePurgeApiResponseSingleId(data?: object)`

Create a new `CachePurgeApiResponseSingleId` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CachePurgeApiResponseSingleIdEntity` instance.

#### `CpsCommunicationPreference(data?: object)`

Create a new `CpsCommunicationPreference` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CpsCommunicationPreferenceEntity` instance.

#### `IamApiResponseSingleId(data?: object)`

Create a new `IamApiResponseSingleId` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IamApiResponseSingleIdEntity` instance.

#### `IamResponseSingleAccount(data?: object)`

Create a new `IamResponseSingleAccount` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IamResponseSingleAccountEntity` instance.

#### `IamSingleUser(data?: object)`

Create a new `IamSingleUser` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IamSingleUserEntity` instance.

#### `KaminoEnvironment(data?: object)`

Create a new `KaminoEnvironment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `KaminoEnvironmentEntity` instance.

#### `Resource(data?: object)`

Create a new `Resource` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResourceEntity` instance.

#### `ResourceTagging(data?: object)`

Create a new `ResourceTagging` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResourceTaggingEntity` instance.

#### `ResourceTaggingTagKeySummaryResponseCollection(data?: object)`

Create a new `ResourceTaggingTagKeySummaryResponseCollection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResourceTaggingTagKeySummaryResponseCollectionEntity` instance.

#### `ResourceTaggingTagKeysResponseCollection(data?: object)`

Create a new `ResourceTaggingTagKeysResponseCollection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResourceTaggingTagKeysResponseCollectionEntity` instance.

#### `ResourceTaggingTagValuesResponseCollection(data?: object)`

Create a new `ResourceTaggingTagValuesResponseCollection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResourceTaggingTagValuesResponseCollectionEntity` instance.

#### `ResourceTaggingTaggedResourceResponseSingle(data?: object)`

Create a new `ResourceTaggingTaggedResourceResponseSingle` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResourceTaggingTaggedResourceResponseSingleEntity` instance.

#### `Zone(data?: object)`

Create a new `Zone` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ZoneEntity` instance.

#### `ZoneHold(data?: object)`

Create a new `ZoneHold` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ZoneHoldEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CloudflareAccountManagementSDK.test()`.

**Returns:** `CloudflareAccountManagementSDK` instance in test mode.


---

## AccountEntity

```ts
const account = client.Account()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `move` | `/accounts/move` | `client.Account().create({ $action: 'move', ... })` |
| `profile` | `/accounts/{account_id}/profile` | `client.Account().list({ $action: 'profile', ... })` |

An action returns that action's OWN response, which is not necessarily a
Account record — check the API definition for its shape.

```ts
const result = await client.Account().create({
  $action: 'move',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Account().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Account().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AccountEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AccountSettingEntity

```ts
const account_setting = client.AccountSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `any[]` | Yes |  |
| `messages` | `any[]` | Yes |  |
| `result` | `any[]` | No | Controls Unique Transformations billing for the account. |
| `success` | `boolean` | Yes | Whether the API call was successful. |
| `value` | `string` | Yes | Enables Unique Transformations billing for the account. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AccountSetting().list({ account_id: "example" })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.AccountSetting().update({
  account_id: 'account_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AccountSettingEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CachePurgeApiResponseSingleIdEntity

```ts
const cache_purge_api_response_single_id = client.CachePurgeApiResponseSingleId()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `any[]` | Yes |  |
| `messages` | `any[]` | Yes |  |
| `result` | `Record<string, any>` | Yes |  |
| `success` | `boolean` | Yes | Indicates the API call's success or failure. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CachePurgeApiResponseSingleId().create({
  environment_id: 'example_environment_id',
  zone_id: 'example_zone_id',
  errors: [],
  messages: [],
  result: {},
  success: true,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CachePurgeApiResponseSingleIdEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CpsCommunicationPreferenceEntity

```ts
const cps_communication_preference = client.CpsCommunicationPreference()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `any[]` | Yes |  |
| `languagelocale` | `string` | No | The user's preferred language locale for communications. |
| `messages` | `any[]` | Yes |  |
| `preferences` | `Record<string, any>` | No | Preference keys mapped to subscription states to update. |
| `result` | `Record<string, any>` | Yes | The user's communication preferences. |
| `success` | `boolean` | Yes | Whether the API call was successful. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.CpsCommunicationPreference().list()
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.CpsCommunicationPreference().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CpsCommunicationPreferenceEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IamApiResponseSingleIdEntity

```ts
const iam_api_response_single_id = client.IamApiResponseSingleId()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Account name |
| `result` | `any[]` | No |  |
| `standalone` | `boolean` | No | Set to `true` and omit `unit` to create a standalone Free Account. |
| `type` | `any` | No |  |
| `unit` | `Record<string, any>` | No | Information related to the tenant unit. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.IamApiResponseSingleId().create({
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.IamApiResponseSingleId().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.IamApiResponseSingleId().remove({ account_id: 'account_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IamApiResponseSingleIdEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IamResponseSingleAccountEntity

```ts
const iam_response_single_account = client.IamResponseSingleAccount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `result` | `Record<string, any>` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `move` | `/accounts/{account_id}/move` | `client.IamResponseSingleAccount().create({ $action: 'move', ... })` |
| `profile` | `/accounts/{account_id}/profile` | `client.IamResponseSingleAccount().update({ $action: 'profile', ... })` |

An action returns that action's OWN response, which is not necessarily a
IamResponseSingleAccount record — check the API definition for its shape.

```ts
const result = await client.IamResponseSingleAccount().create({
  $action: 'move',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.IamResponseSingleAccount().create({
  account_id: 'example_account_id',
  result: {},
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.IamResponseSingleAccount().load({ id: 'iam_response_single_account_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.IamResponseSingleAccount().update({
  id: 'iam_response_single_account_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IamResponseSingleAccountEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IamSingleUserEntity

```ts
const iam_single_user = client.IamSingleUser()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | No | The country in which the user lives. |
| `first_name` | `string` | No | User's first name |
| `last_name` | `string` | No | User's last name |
| `result` | `Record<string, any>` | Yes |  |
| `telephone` | `string` | No | User's telephone number |
| `zipcode` | `string` | No | The zipcode or postal code where the user lives. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.IamSingleUser().load()
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.IamSingleUser().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IamSingleUserEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## KaminoEnvironmentEntity

```ts
const kamino_environment = client.KaminoEnvironment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environments` | `any[]` | Yes |  |
| `errors` | `any[]` | Yes |  |
| `id` | `string` | No |  |
| `messages` | `any[]` | Yes |  |
| `result` | `Record<string, any>` | Yes |  |
| `success` | `boolean` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.KaminoEnvironment().create({
  zone_id: 'example_zone_id',
  environments: [],
  errors: [],
  messages: [],
  result: {},
  success: true,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.KaminoEnvironment().list({ zone_id: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.KaminoEnvironment().remove({ id: 'id', zone_id: 'zone_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.KaminoEnvironment().update({
  zone_id: 'zone_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `KaminoEnvironmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResourceEntity

```ts
const resource = client.Resource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `any[]` | Yes |  |
| `messages` | `any[]` | Yes |  |
| `result` | `any[]` | No |  |
| `result_info` | `Record<string, any>` | No |  |
| `success` | `boolean` | Yes | Whether the API call was successful. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Resource().list({ account_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResourceEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResourceTaggingEntity

```ts
const resource_tagging = client.ResourceTagging()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ResourceTagging().remove({ account_id: 'account_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResourceTaggingEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResourceTaggingTagKeySummaryResponseCollectionEntity

```ts
const resource_tagging_tag_key_summary_response_collection = client.ResourceTaggingTagKeySummaryResponseCollection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `any[]` | Yes |  |
| `messages` | `any[]` | Yes |  |
| `result` | `any[]` | No | Contains an array of tag keys with their distinct values. |
| `result_info` | `Record<string, any>` | No |  |
| `success` | `boolean` | Yes | Whether the API call was successful. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ResourceTaggingTagKeySummaryResponseCollection().list({ account_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResourceTaggingTagKeySummaryResponseCollectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResourceTaggingTagKeysResponseCollectionEntity

```ts
const resource_tagging_tag_keys_response_collection = client.ResourceTaggingTagKeysResponseCollection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `any[]` | Yes |  |
| `messages` | `any[]` | Yes |  |
| `result` | `any[]` | No | Contains an array of distinct tag keys. |
| `result_info` | `Record<string, any>` | No |  |
| `success` | `boolean` | Yes | Whether the API call was successful. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ResourceTaggingTagKeysResponseCollection().list({ account_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResourceTaggingTagKeysResponseCollectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResourceTaggingTagValuesResponseCollectionEntity

```ts
const resource_tagging_tag_values_response_collection = client.ResourceTaggingTagValuesResponseCollection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `any[]` | Yes |  |
| `messages` | `any[]` | Yes |  |
| `result` | `any[]` | No |  |
| `result_info` | `Record<string, any>` | No |  |
| `success` | `boolean` | Yes | Whether the API call was successful. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ResourceTaggingTagValuesResponseCollection().load({ account_id: 'account_id', tag_key: 'tag_key' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResourceTaggingTagValuesResponseCollectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResourceTaggingTaggedResourceResponseSingleEntity

```ts
const resource_tagging_tagged_resource_response_single = client.ResourceTaggingTaggedResourceResponseSingle()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `any[]` | Yes |  |
| `messages` | `any[]` | Yes |  |
| `result` | `Record<string, any>` | No |  |
| `success` | `boolean` | Yes | Whether the API call was successful. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ResourceTaggingTaggedResourceResponseSingle().list({ resource_id: "example", resource_type: "example" })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ResourceTaggingTaggedResourceResponseSingle().update({
  account_id: 'account_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResourceTaggingTaggedResourceResponseSingleEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ZoneEntity

```ts
const zone = client.Zone()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `Record<string, any>` | Yes |  |
| `errors` | `any[]` | Yes |  |
| `id` | `string` | No |  |
| `messages` | `any[]` | Yes |  |
| `name` | `string` | Yes | The domain name. |
| `paused` | `boolean` | No | Indicates whether the zone is only using Cloudflare DNS services. |
| `plan` | `Record<string, any>` | No | (Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. |
| `result` | `Record<string, any>` | Yes |  |
| `result_info` | `Record<string, any>` | No |  |
| `success` | `boolean` | Yes | Whether the API call was successful. |
| `type` | `string` | No | A full zone implies that DNS is hosted with Cloudflare. |
| `vanity_name_servers` | `any[]` | No | An array of domains used for custom name servers. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `activation_check` | `/zones/{zone_id}/activation_check` | `client.Zone().update({ $action: 'activation_check', ... })` |

An action returns that action's OWN response, which is not necessarily a
Zone record — check the API definition for its shape.

```ts
const result = await client.Zone().update({
  $action: 'activation_check',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Zone().create({
  account: {},
  errors: [],
  messages: [],
  name: 'example_name',
  result: {},
  success: true,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Zone().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Zone().load({ id: 'zone_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Zone().remove({ id: 'zone_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Zone().update({
  id: 'zone_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ZoneEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ZoneHoldEntity

```ts
const zone_hold = client.ZoneHold()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `hold` | `boolean` | No | Whether the hostname is currently subject to a zone hold. |
| `hold_after` | `string` | No | The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled. |
| `id` | `string` | No |  |
| `include_subdomains` | `boolean` | No | Whether the hold extends to block subdomains of the held zone. |
| `result` | `Record<string, any>` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ZoneHold().create({
  id: 'example_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ZoneHold().load({ id: 'zone_hold_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ZoneHold().remove({ id: 'zone_hold_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ZoneHold().update({
  id: 'zone_hold_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ZoneHoldEntity` instance with the same client and
options.

#### `client()`

Return the parent `CloudflareAccountManagementSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new CloudflareAccountManagementSDK({
  feature: {
    test: { active: true },
  }
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

