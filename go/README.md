# CloudflareAccountManagement Golang SDK



The Golang SDK for the CloudflareAccountManagement API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Account(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`, `Patch`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/cloudflare-account-management-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/cloudflare-account-management-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/cloudflare-account-management-sdk/go=../cloudflare-account-management-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/cloudflare-account-management-sdk/go"
)

func main() {
    client := sdk.NewCloudflareAccountManagementSDK(map[string]any{
        "apikey": os.Getenv("CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY"),
    })

    // List account records — the value is the array of records itself.
    accounts, err := client.Account(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range accounts.([]any) {
        fmt.Println(item)
    }

    // Create a account.
    created, err := client.Account(nil).Create(map[string]any{}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
iamapiresponsesingleids, err := client.IamApiResponseSingleId(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = iamapiresponsesingleids
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

iamApiResponseSingleId, err := client.IamApiResponseSingleId(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(iamApiResponseSingleId) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewCloudflareAccountManagementSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewCloudflareAccountManagementSDK

```go
func NewCloudflareAccountManagementSDK(options map[string]any) *CloudflareAccountManagementSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *CloudflareAccountManagementSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CloudflareAccountManagementSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Account` | `(data map[string]any) CloudflareAccountManagementEntity` | Create an Account entity instance. |
| `AccountSetting` | `(data map[string]any) CloudflareAccountManagementEntity` | Create an AccountSetting entity instance. |
| `CachePurgeApiResponseSingleId` | `(data map[string]any) CloudflareAccountManagementEntity` | Create a CachePurgeApiResponseSingleId entity instance. |
| `CpsCommunicationPreference` | `(data map[string]any) CloudflareAccountManagementEntity` | Create a CpsCommunicationPreference entity instance. |
| `IamApiResponseSingleId` | `(data map[string]any) CloudflareAccountManagementEntity` | Create an IamApiResponseSingleId entity instance. |
| `IamResponseSingleAccount` | `(data map[string]any) CloudflareAccountManagementEntity` | Create an IamResponseSingleAccount entity instance. |
| `IamSingleUser` | `(data map[string]any) CloudflareAccountManagementEntity` | Create an IamSingleUser entity instance. |
| `KaminoEnvironment` | `(data map[string]any) CloudflareAccountManagementEntity` | Create a KaminoEnvironment entity instance. |
| `Resource` | `(data map[string]any) CloudflareAccountManagementEntity` | Create a Resource entity instance. |
| `ResourceTagging` | `(data map[string]any) CloudflareAccountManagementEntity` | Create a ResourceTagging entity instance. |
| `ResourceTaggingTagKeySummaryResponseCollection` | `(data map[string]any) CloudflareAccountManagementEntity` | Create a ResourceTaggingTagKeySummaryResponseCollection entity instance. |
| `ResourceTaggingTagKeysResponseCollection` | `(data map[string]any) CloudflareAccountManagementEntity` | Create a ResourceTaggingTagKeysResponseCollection entity instance. |
| `ResourceTaggingTagValuesResponseCollection` | `(data map[string]any) CloudflareAccountManagementEntity` | Create a ResourceTaggingTagValuesResponseCollection entity instance. |
| `ResourceTaggingTaggedResourceResponseSingle` | `(data map[string]any) CloudflareAccountManagementEntity` | Create a ResourceTaggingTaggedResourceResponseSingle entity instance. |
| `Zone` | `(data map[string]any) CloudflareAccountManagementEntity` | Create a Zone entity instance. |
| `ZoneHold` | `(data map[string]any) CloudflareAccountManagementEntity` | Create a ZoneHold entity instance. |

### Entity interface (CloudflareAccountManagementEntity)

All entities implement the `CloudflareAccountManagementEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    account, err := client.Account(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // account is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Account

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, List.

API path: `/accounts/move`

#### AccountSetting

| Field | Description |
| --- | --- |
| `"errors"` |  |
| `"messages"` |  |
| `"result"` | Controls Unique Transformations billing for the account. |
| `"success"` | Whether the API call was successful. |
| `"value"` | Enables Unique Transformations billing for the account. |

Operations: List, Update.

API path: `/accounts/{account_id}/settings/transformations`

#### CachePurgeApiResponseSingleId

| Field | Description |
| --- | --- |
| `"errors"` |  |
| `"messages"` |  |
| `"result"` |  |
| `"success"` | Indicates the API call's success or failure. |

Operations: Create.

API path: `/zones/{zone_id}/environments/{environment_id}/purge_cache`

#### CpsCommunicationPreference

| Field | Description |
| --- | --- |
| `"errors"` |  |
| `"languagelocale"` | The user's preferred language locale for communications. |
| `"messages"` |  |
| `"preferences"` | Preference keys mapped to subscription states to update. |
| `"result"` | The user's communication preferences. |
| `"success"` | Whether the API call was successful. |

Operations: List, Update.

API path: `/user/communication_preferences`

#### IamApiResponseSingleId

| Field | Description |
| --- | --- |
| `"name"` | Account name |
| `"result"` |  |
| `"standalone"` | Set to `true` and omit `unit` to create a standalone Free Account. |
| `"type"` |  |
| `"unit"` | Information related to the tenant unit. |

Operations: Create, List, Remove.

API path: `/accounts`

#### IamResponseSingleAccount

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"result"` |  |

Operations: Create, Load, Update.

API path: `/accounts/{account_id}/move`

#### IamSingleUser

| Field | Description |
| --- | --- |
| `"country"` | The country in which the user lives. |
| `"first_name"` | User's first name |
| `"last_name"` | User's last name |
| `"result"` |  |
| `"telephone"` | User's telephone number |
| `"zipcode"` | The zipcode or postal code where the user lives. |

Operations: Load, Update.

API path: `/user`

#### KaminoEnvironment

| Field | Description |
| --- | --- |
| `"environments"` |  |
| `"errors"` |  |
| `"id"` |  |
| `"messages"` |  |
| `"result"` |  |
| `"success"` |  |

Operations: Create, List, Patch, Remove, Update.

API path: `/zones/{zone_id}/environments/{environment_id}/rollback`

#### Resource

| Field | Description |
| --- | --- |
| `"errors"` |  |
| `"messages"` |  |
| `"result"` |  |
| `"result_info"` |  |
| `"success"` | Whether the API call was successful. |

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
| `"errors"` |  |
| `"messages"` |  |
| `"result"` | Contains an array of tag keys with their distinct values. |
| `"result_info"` |  |
| `"success"` | Whether the API call was successful. |

Operations: List.

API path: `/accounts/{account_id}/tags/summary`

#### ResourceTaggingTagKeysResponseCollection

| Field | Description |
| --- | --- |
| `"errors"` |  |
| `"messages"` |  |
| `"result"` | Contains an array of distinct tag keys. |
| `"result_info"` |  |
| `"success"` | Whether the API call was successful. |

Operations: List.

API path: `/accounts/{account_id}/tags/keys`

#### ResourceTaggingTagValuesResponseCollection

| Field | Description |
| --- | --- |
| `"errors"` |  |
| `"messages"` |  |
| `"result"` |  |
| `"result_info"` |  |
| `"success"` | Whether the API call was successful. |

Operations: Load.

API path: `/accounts/{account_id}/tags/values/{tag_key}`

#### ResourceTaggingTaggedResourceResponseSingle

| Field | Description |
| --- | --- |
| `"errors"` |  |
| `"messages"` |  |
| `"result"` |  |
| `"success"` | Whether the API call was successful. |

Operations: List, Update.

API path: `/zones/{zone_id}/tags`

#### Zone

| Field | Description |
| --- | --- |
| `"account"` |  |
| `"errors"` |  |
| `"id"` |  |
| `"messages"` |  |
| `"name"` | The domain name. |
| `"paused"` | Indicates whether the zone is only using Cloudflare DNS services. |
| `"plan"` | (Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. |
| `"result"` |  |
| `"result_info"` |  |
| `"success"` | Whether the API call was successful. |
| `"type"` | A full zone implies that DNS is hosted with Cloudflare. |
| `"vanity_name_servers"` | An array of domains used for custom name servers. |

Operations: Create, List, Load, Remove, Update.

API path: `/zones`

#### ZoneHold

| Field | Description |
| --- | --- |
| `"hold"` | Whether the hostname is currently subject to a zone hold. |
| `"hold_after"` | The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled. |
| `"id"` |  |
| `"include_subdomains"` | Whether the hold extends to block subdomains of the held zone. |
| `"result"` |  |

Operations: Create, Load, Remove, Update.

API path: `/zones/{zone_id}/hold`



## Entities


### Account

Create an instance: `account := client.Account(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```go
accounts, err := client.Account(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(accounts) // the array of records
```

#### Example: Create

```go
result, err := client.Account(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### AccountSetting

Create an instance: `accountSetting := client.AccountSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `[]any` |  |
| `messages` | `[]any` |  |
| `result` | `[]any` | Controls Unique Transformations billing for the account. |
| `success` | `bool` | Whether the API call was successful. |
| `value` | `string` | Enables Unique Transformations billing for the account. |

#### Example: List

```go
accountSettings, err := client.AccountSetting(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(accountSettings) // the array of records
```


### CachePurgeApiResponseSingleId

Create an instance: `cachePurgeApiResponseSingleId := client.CachePurgeApiResponseSingleId(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `[]any` |  |
| `messages` | `[]any` |  |
| `result` | `map[string]any` |  |
| `success` | `bool` | Indicates the API call's success or failure. |

#### Example: Create

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


### CpsCommunicationPreference

Create an instance: `cpsCommunicationPreference := client.CpsCommunicationPreference(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `[]any` |  |
| `languagelocale` | `string` | The user's preferred language locale for communications. |
| `messages` | `[]any` |  |
| `preferences` | `map[string]any` | Preference keys mapped to subscription states to update. |
| `result` | `map[string]any` | The user's communication preferences. |
| `success` | `bool` | Whether the API call was successful. |

#### Example: List

```go
cpsCommunicationPreferences, err := client.CpsCommunicationPreference(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cpsCommunicationPreferences) // the array of records
```


### IamApiResponseSingleId

Create an instance: `iamApiResponseSingleId := client.IamApiResponseSingleId(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Account name |
| `result` | `[]any` |  |
| `standalone` | `bool` | Set to `true` and omit `unit` to create a standalone Free Account. |
| `type` | `any` |  |
| `unit` | `map[string]any` | Information related to the tenant unit. |

#### Example: List

```go
iamApiResponseSingleIds, err := client.IamApiResponseSingleId(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(iamApiResponseSingleIds) // the array of records
```

#### Example: Create

```go
result, err := client.IamApiResponseSingleId(nil).Create(map[string]any{
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### IamResponseSingleAccount

Create an instance: `iamResponseSingleAccount := client.IamResponseSingleAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `result` | `map[string]any` |  |

#### Example: Load

```go
iamResponseSingleAccount, err := client.IamResponseSingleAccount(nil).Load(map[string]any{"id": "iam_response_single_account_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(iamResponseSingleAccount) // the loaded record
```

#### Example: Create

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


### IamSingleUser

Create an instance: `iamSingleUser := client.IamSingleUser(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `string` | The country in which the user lives. |
| `first_name` | `string` | User's first name |
| `last_name` | `string` | User's last name |
| `result` | `map[string]any` |  |
| `telephone` | `string` | User's telephone number |
| `zipcode` | `string` | The zipcode or postal code where the user lives. |

#### Example: Load

```go
iamSingleUser, err := client.IamSingleUser(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(iamSingleUser) // the loaded record
```


### KaminoEnvironment

Create an instance: `kaminoEnvironment := client.KaminoEnvironment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environments` | `[]any` |  |
| `errors` | `[]any` |  |
| `id` | `string` |  |
| `messages` | `[]any` |  |
| `result` | `map[string]any` |  |
| `success` | `bool` |  |

#### Example: List

```go
kaminoEnvironments, err := client.KaminoEnvironment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(kaminoEnvironments) // the array of records
```

#### Example: Create

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


### Resource

Create an instance: `resource := client.Resource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `[]any` |  |
| `messages` | `[]any` |  |
| `result` | `[]any` |  |
| `result_info` | `map[string]any` |  |
| `success` | `bool` | Whether the API call was successful. |

#### Example: List

```go
resources, err := client.Resource(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(resources) // the array of records
```


### ResourceTagging

Create an instance: `resourceTagging := client.ResourceTagging(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |


### ResourceTaggingTagKeySummaryResponseCollection

Create an instance: `resourceTaggingTagKeySummaryResponseCollection := client.ResourceTaggingTagKeySummaryResponseCollection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `[]any` |  |
| `messages` | `[]any` |  |
| `result` | `[]any` | Contains an array of tag keys with their distinct values. |
| `result_info` | `map[string]any` |  |
| `success` | `bool` | Whether the API call was successful. |

#### Example: List

```go
resourceTaggingTagKeySummaryResponseCollections, err := client.ResourceTaggingTagKeySummaryResponseCollection(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(resourceTaggingTagKeySummaryResponseCollections) // the array of records
```


### ResourceTaggingTagKeysResponseCollection

Create an instance: `resourceTaggingTagKeysResponseCollection := client.ResourceTaggingTagKeysResponseCollection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `[]any` |  |
| `messages` | `[]any` |  |
| `result` | `[]any` | Contains an array of distinct tag keys. |
| `result_info` | `map[string]any` |  |
| `success` | `bool` | Whether the API call was successful. |

#### Example: List

```go
resourceTaggingTagKeysResponseCollections, err := client.ResourceTaggingTagKeysResponseCollection(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(resourceTaggingTagKeysResponseCollections) // the array of records
```


### ResourceTaggingTagValuesResponseCollection

Create an instance: `resourceTaggingTagValuesResponseCollection := client.ResourceTaggingTagValuesResponseCollection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `[]any` |  |
| `messages` | `[]any` |  |
| `result` | `[]any` |  |
| `result_info` | `map[string]any` |  |
| `success` | `bool` | Whether the API call was successful. |

#### Example: Load

```go
resourceTaggingTagValuesResponseCollection, err := client.ResourceTaggingTagValuesResponseCollection(nil).Load(map[string]any{"account_id": "account_id", "tag_key": "tag_key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(resourceTaggingTagValuesResponseCollection) // the loaded record
```


### ResourceTaggingTaggedResourceResponseSingle

Create an instance: `resourceTaggingTaggedResourceResponseSingle := client.ResourceTaggingTaggedResourceResponseSingle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `[]any` |  |
| `messages` | `[]any` |  |
| `result` | `map[string]any` |  |
| `success` | `bool` | Whether the API call was successful. |

#### Example: List

```go
resourceTaggingTaggedResourceResponseSingles, err := client.ResourceTaggingTaggedResourceResponseSingle(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(resourceTaggingTaggedResourceResponseSingles) // the array of records
```


### Zone

Create an instance: `zone := client.Zone(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `map[string]any` |  |
| `errors` | `[]any` |  |
| `id` | `string` |  |
| `messages` | `[]any` |  |
| `name` | `string` | The domain name. |
| `paused` | `bool` | Indicates whether the zone is only using Cloudflare DNS services. |
| `plan` | `map[string]any` | (Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. |
| `result` | `map[string]any` |  |
| `result_info` | `map[string]any` |  |
| `success` | `bool` | Whether the API call was successful. |
| `type` | `string` | A full zone implies that DNS is hosted with Cloudflare. |
| `vanity_name_servers` | `[]any` | An array of domains used for custom name servers. |

#### Example: Load

```go
zone, err := client.Zone(nil).Load(map[string]any{"id": "zone_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(zone) // the loaded record
```

#### Example: List

```go
zones, err := client.Zone(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(zones) // the array of records
```

#### Example: Create

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


### ZoneHold

Create an instance: `zoneHold := client.ZoneHold(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `hold` | `bool` | Whether the hostname is currently subject to a zone hold. |
| `hold_after` | `string` | The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled. |
| `id` | `string` |  |
| `include_subdomains` | `bool` | Whether the hold extends to block subdomains of the held zone. |
| `result` | `map[string]any` |  |

#### Example: Load

```go
zoneHold, err := client.ZoneHold(nil).Load(map[string]any{"id": "zone_hold_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(zoneHold) // the loaded record
```

#### Example: Create

```go
result, err := client.ZoneHold(nil).Create(map[string]any{
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/cloudflare-account-management-sdk/go/
├── cloudflare-account-management.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/cloudflare-account-management-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
iamapiresponsesingleid := client.IamApiResponseSingleId(nil)
iamapiresponsesingleid.List(nil, nil)

// iamapiresponsesingleid.Data() now returns the iamapiresponsesingleid data from the last list
// iamapiresponsesingleid.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
