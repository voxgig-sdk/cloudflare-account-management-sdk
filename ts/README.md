# CloudflareAccountManagement TypeScript SDK



The TypeScript SDK for the CloudflareAccountManagement API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Account()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`, `patch`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/cloudflare-account-management-sdk/releases](https://github.com/voxgig-sdk/cloudflare-account-management-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { CloudflareAccountManagementSDK } from '@voxgig-sdk/cloudflare-account-management-sdk'

const client = new CloudflareAccountManagementSDK({
  apikey: process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY,
})
```

### 2. List account records

`list()` resolves to an array of Account ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const accounts = await client.Account().list({ id: "example" })

for (const account of accounts) {
  console.log(account)
}
```

### 3. Load a resourcetaggingtagvaluesresponsecollection

ResourceTaggingTagValuesResponseCollection is nested under account, so provide the `account_id`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const resourcetaggingtagvaluesresponsecollection = await client.ResourceTaggingTagValuesResponseCollection().load({
    account_id: 'example_account_id',
    tag_key: 'example_tag_key',
  })
  console.log(resourcetaggingtagvaluesresponsecollection)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Account ENTITY (.data() for the record)
const created = await client.Account().create({})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const iamapiresponsesingleids = await client.IamApiResponseSingleId().list()
  console.log(iamapiresponsesingleids)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = CloudflareAccountManagementSDK.test()

const iamapiresponsesingleid = await client.IamApiResponseSingleId().list()
// iamapiresponsesingleid is the entity, populated with mock response data
// — call iamapiresponsesingleid.data() for the record itself
console.log(iamapiresponsesingleid)
```

You can also use the instance method:

```ts
const client = new CloudflareAccountManagementSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.IamApiResponseSingleId()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new CloudflareAccountManagementSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### CloudflareAccountManagementSDK

#### Constructor

```ts
new CloudflareAccountManagementSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Account(data?)` | `AccountEntity` | Create an Account entity instance. |
| `AccountSetting(data?)` | `AccountSettingEntity` | Create an AccountSetting entity instance. |
| `CachePurgeApiResponseSingleId(data?)` | `CachePurgeApiResponseSingleIdEntity` | Create a CachePurgeApiResponseSingleId entity instance. |
| `CpsCommunicationPreference(data?)` | `CpsCommunicationPreferenceEntity` | Create a CpsCommunicationPreference entity instance. |
| `IamApiResponseSingleId(data?)` | `IamApiResponseSingleIdEntity` | Create an IamApiResponseSingleId entity instance. |
| `IamResponseSingleAccount(data?)` | `IamResponseSingleAccountEntity` | Create an IamResponseSingleAccount entity instance. |
| `IamSingleUser(data?)` | `IamSingleUserEntity` | Create an IamSingleUser entity instance. |
| `KaminoEnvironment(data?)` | `KaminoEnvironmentEntity` | Create a KaminoEnvironment entity instance. |
| `Resource(data?)` | `ResourceEntity` | Create a Resource entity instance. |
| `ResourceTagging(data?)` | `ResourceTaggingEntity` | Create a ResourceTagging entity instance. |
| `ResourceTaggingTagKeySummaryResponseCollection(data?)` | `ResourceTaggingTagKeySummaryResponseCollectionEntity` | Create a ResourceTaggingTagKeySummaryResponseCollection entity instance. |
| `ResourceTaggingTagKeysResponseCollection(data?)` | `ResourceTaggingTagKeysResponseCollectionEntity` | Create a ResourceTaggingTagKeysResponseCollection entity instance. |
| `ResourceTaggingTagValuesResponseCollection(data?)` | `ResourceTaggingTagValuesResponseCollectionEntity` | Create a ResourceTaggingTagValuesResponseCollection entity instance. |
| `ResourceTaggingTaggedResourceResponseSingle(data?)` | `ResourceTaggingTaggedResourceResponseSingleEntity` | Create a ResourceTaggingTaggedResourceResponseSingle entity instance. |
| `Zone(data?)` | `ZoneEntity` | Create a Zone entity instance. |
| `ZoneHold(data?)` | `ZoneHoldEntity` | Create a ZoneHold entity instance. |
| `tester(testopts?, sdkopts?)` | `CloudflareAccountManagementSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `CloudflareAccountManagementSDK.test(testopts?, sdkopts?)` | `CloudflareAccountManagementSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): CloudflareAccountManagementSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Account

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list.

API path: `/accounts/move`

#### AccountSetting

| Field | Description |
| --- | --- |
| `errors` |  |
| `messages` |  |
| `result` | Controls Unique Transformations billing for the account. |
| `success` | Whether the API call was successful. |
| `value` | Enables Unique Transformations billing for the account. |

Operations: list, update.

API path: `/accounts/{account_id}/settings/transformations`

#### CachePurgeApiResponseSingleId

| Field | Description |
| --- | --- |
| `errors` |  |
| `messages` |  |
| `result` |  |
| `success` | Indicates the API call's success or failure. |

Operations: create.

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

Operations: list, update.

API path: `/user/communication_preferences`

#### IamApiResponseSingleId

| Field | Description |
| --- | --- |
| `name` | Account name |
| `result` |  |
| `standalone` | Set to `true` and omit `unit` to create a standalone Free Account. |
| `type` |  |
| `unit` | Information related to the tenant unit. |

Operations: create, list, remove.

API path: `/accounts`

#### IamResponseSingleAccount

| Field | Description |
| --- | --- |
| `id` |  |
| `result` |  |

Operations: create, load, update.

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

Operations: load, update.

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

Operations: create, list, patch, remove, update.

API path: `/zones/{zone_id}/environments/{environment_id}/rollback`

#### Resource

| Field | Description |
| --- | --- |
| `errors` |  |
| `messages` |  |
| `result` |  |
| `result_info` |  |
| `success` | Whether the API call was successful. |

Operations: list.

API path: `/accounts/{account_id}/tags/resources`

#### ResourceTagging

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/accounts/{account_id}/tags`

#### ResourceTaggingTagKeySummaryResponseCollection

| Field | Description |
| --- | --- |
| `errors` |  |
| `messages` |  |
| `result` | Contains an array of tag keys with their distinct values. |
| `result_info` |  |
| `success` | Whether the API call was successful. |

Operations: list.

API path: `/accounts/{account_id}/tags/summary`

#### ResourceTaggingTagKeysResponseCollection

| Field | Description |
| --- | --- |
| `errors` |  |
| `messages` |  |
| `result` | Contains an array of distinct tag keys. |
| `result_info` |  |
| `success` | Whether the API call was successful. |

Operations: list.

API path: `/accounts/{account_id}/tags/keys`

#### ResourceTaggingTagValuesResponseCollection

| Field | Description |
| --- | --- |
| `errors` |  |
| `messages` |  |
| `result` |  |
| `result_info` |  |
| `success` | Whether the API call was successful. |

Operations: load.

API path: `/accounts/{account_id}/tags/values/{tag_key}`

#### ResourceTaggingTaggedResourceResponseSingle

| Field | Description |
| --- | --- |
| `errors` |  |
| `messages` |  |
| `result` |  |
| `success` | Whether the API call was successful. |

Operations: list, update.

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

Operations: create, list, load, remove, update.

API path: `/zones`

#### ZoneHold

| Field | Description |
| --- | --- |
| `hold` | Whether the hostname is currently subject to a zone hold. |
| `hold_after` | The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled. |
| `id` |  |
| `include_subdomains` | Whether the hold extends to block subdomains of the held zone. |
| `result` |  |

Operations: create, load, remove, update.

API path: `/zones/{zone_id}/hold`



## Entities


### Account

Create an instance: `const account = client.Account()`

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

```ts
const accounts = await client.Account().list({ id: "example" })
```

#### Example: Create

```ts
const account = await client.Account().create({
})
```


### AccountSetting

Create an instance: `const account_setting = client.AccountSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `any[]` |  |
| `messages` | `any[]` |  |
| `result` | `any[]` | Controls Unique Transformations billing for the account. |
| `success` | `boolean` | Whether the API call was successful. |
| `value` | `string` | Enables Unique Transformations billing for the account. |

#### Example: List

```ts
const account_settings = await client.AccountSetting().list({ account_id: "example" })
```


### CachePurgeApiResponseSingleId

Create an instance: `const cache_purge_api_response_single_id = client.CachePurgeApiResponseSingleId()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `any[]` |  |
| `messages` | `any[]` |  |
| `result` | `Record<string, any>` |  |
| `success` | `boolean` | Indicates the API call's success or failure. |

#### Example: Create

```ts
const cache_purge_api_response_single_id = await client.CachePurgeApiResponseSingleId().create({
  environment_id: 'example_environment_id',
  zone_id: 'example_zone_id',
  errors: [],
  messages: [],
  result: {},
  success: true,
})
```


### CpsCommunicationPreference

Create an instance: `const cps_communication_preference = client.CpsCommunicationPreference()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `any[]` |  |
| `languagelocale` | `string` | The user's preferred language locale for communications. |
| `messages` | `any[]` |  |
| `preferences` | `Record<string, any>` | Preference keys mapped to subscription states to update. |
| `result` | `Record<string, any>` | The user's communication preferences. |
| `success` | `boolean` | Whether the API call was successful. |

#### Example: List

```ts
const cps_communication_preferences = await client.CpsCommunicationPreference().list()
```


### IamApiResponseSingleId

Create an instance: `const iam_api_response_single_id = client.IamApiResponseSingleId()`

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
| `result` | `any[]` |  |
| `standalone` | `boolean` | Set to `true` and omit `unit` to create a standalone Free Account. |
| `type` | `any` |  |
| `unit` | `Record<string, any>` | Information related to the tenant unit. |

#### Example: List

```ts
const iam_api_response_single_ids = await client.IamApiResponseSingleId().list()
```

#### Example: Create

```ts
const iam_api_response_single_id = await client.IamApiResponseSingleId().create({
  name: 'example_name',
})
```


### IamResponseSingleAccount

Create an instance: `const iam_response_single_account = client.IamResponseSingleAccount()`

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
| `result` | `Record<string, any>` |  |

#### Example: Load

```ts
const iam_response_single_account = await client.IamResponseSingleAccount().load({ id: 'iam_response_single_account_id' })
```

#### Example: Create

```ts
const iam_response_single_account = await client.IamResponseSingleAccount().create({
  account_id: 'example_account_id',
  result: {},
})
```


### IamSingleUser

Create an instance: `const iam_single_user = client.IamSingleUser()`

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
| `result` | `Record<string, any>` |  |
| `telephone` | `string` | User's telephone number |
| `zipcode` | `string` | The zipcode or postal code where the user lives. |

#### Example: Load

```ts
const iam_single_user = await client.IamSingleUser().load()
```


### KaminoEnvironment

Create an instance: `const kamino_environment = client.KaminoEnvironment()`

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
| `environments` | `any[]` |  |
| `errors` | `any[]` |  |
| `id` | `string` |  |
| `messages` | `any[]` |  |
| `result` | `Record<string, any>` |  |
| `success` | `boolean` |  |

#### Example: List

```ts
const kamino_environments = await client.KaminoEnvironment().list({ zone_id: "example" })
```

#### Example: Create

```ts
const kamino_environment = await client.KaminoEnvironment().create({
  zone_id: 'example_zone_id',
  environments: [],
  errors: [],
  messages: [],
  result: {},
  success: true,
})
```


### Resource

Create an instance: `const resource = client.Resource()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `any[]` |  |
| `messages` | `any[]` |  |
| `result` | `any[]` |  |
| `result_info` | `Record<string, any>` |  |
| `success` | `boolean` | Whether the API call was successful. |

#### Example: List

```ts
const resources = await client.Resource().list({ account_id: "example" })
```


### ResourceTagging

Create an instance: `const resource_tagging = client.ResourceTagging()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ResourceTaggingTagKeySummaryResponseCollection

Create an instance: `const resource_tagging_tag_key_summary_response_collection = client.ResourceTaggingTagKeySummaryResponseCollection()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `any[]` |  |
| `messages` | `any[]` |  |
| `result` | `any[]` | Contains an array of tag keys with their distinct values. |
| `result_info` | `Record<string, any>` |  |
| `success` | `boolean` | Whether the API call was successful. |

#### Example: List

```ts
const resource_tagging_tag_key_summary_response_collections = await client.ResourceTaggingTagKeySummaryResponseCollection().list({ account_id: "example" })
```


### ResourceTaggingTagKeysResponseCollection

Create an instance: `const resource_tagging_tag_keys_response_collection = client.ResourceTaggingTagKeysResponseCollection()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `any[]` |  |
| `messages` | `any[]` |  |
| `result` | `any[]` | Contains an array of distinct tag keys. |
| `result_info` | `Record<string, any>` |  |
| `success` | `boolean` | Whether the API call was successful. |

#### Example: List

```ts
const resource_tagging_tag_keys_response_collections = await client.ResourceTaggingTagKeysResponseCollection().list({ account_id: "example" })
```


### ResourceTaggingTagValuesResponseCollection

Create an instance: `const resource_tagging_tag_values_response_collection = client.ResourceTaggingTagValuesResponseCollection()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `any[]` |  |
| `messages` | `any[]` |  |
| `result` | `any[]` |  |
| `result_info` | `Record<string, any>` |  |
| `success` | `boolean` | Whether the API call was successful. |

#### Example: Load

```ts
const resource_tagging_tag_values_response_collection = await client.ResourceTaggingTagValuesResponseCollection().load({ account_id: 'account_id', tag_key: 'tag_key' })
```


### ResourceTaggingTaggedResourceResponseSingle

Create an instance: `const resource_tagging_tagged_resource_response_single = client.ResourceTaggingTaggedResourceResponseSingle()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `any[]` |  |
| `messages` | `any[]` |  |
| `result` | `Record<string, any>` |  |
| `success` | `boolean` | Whether the API call was successful. |

#### Example: List

```ts
const resource_tagging_tagged_resource_response_singles = await client.ResourceTaggingTaggedResourceResponseSingle().list({ resource_id: "example", resource_type: "example" })
```


### Zone

Create an instance: `const zone = client.Zone()`

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
| `account` | `Record<string, any>` |  |
| `errors` | `any[]` |  |
| `id` | `string` |  |
| `messages` | `any[]` |  |
| `name` | `string` | The domain name. |
| `paused` | `boolean` | Indicates whether the zone is only using Cloudflare DNS services. |
| `plan` | `Record<string, any>` | (Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. |
| `result` | `Record<string, any>` |  |
| `result_info` | `Record<string, any>` |  |
| `success` | `boolean` | Whether the API call was successful. |
| `type` | `string` | A full zone implies that DNS is hosted with Cloudflare. |
| `vanity_name_servers` | `any[]` | An array of domains used for custom name servers. |

#### Example: Load

```ts
const zone = await client.Zone().load({ id: 'zone_id' })
```

#### Example: List

```ts
const zones = await client.Zone().list()
```

#### Example: Create

```ts
const zone = await client.Zone().create({
  account: {},
  errors: [],
  messages: [],
  name: 'example_name',
  result: {},
  success: true,
})
```


### ZoneHold

Create an instance: `const zone_hold = client.ZoneHold()`

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
| `result` | `Record<string, any>` |  |

#### Example: Load

```ts
const zone_hold = await client.ZoneHold().load({ id: 'zone_hold_id' })
```

#### Example: Create

```ts
const zone_hold = await client.ZoneHold().create({
  id: 'example_id',
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
cloudflare-account-management/
├── src/
│   ├── CloudflareAccountManagementSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { CloudflareAccountManagementSDK } from '@voxgig-sdk/cloudflare-account-management-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const iamapiresponsesingleid = client.IamApiResponseSingleId()
await iamapiresponsesingleid.list()

// iamapiresponsesingleid.data() now returns the iamapiresponsesingleid data from the last `list`
// iamapiresponsesingleid.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
