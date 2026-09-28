-- Typed models for the CloudflareAccountManagement SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Account
---@field id? string

---@class AccountListMatch
---@field id string

---@class AccountCreateData
---@field id? string

---@class AccountSetting
---@field errors table
---@field messages table
---@field result? table
---@field success boolean
---@field value string

---@class AccountSettingListMatch
---@field account_id string

---@class AccountSettingUpdateData
---@field account_id string
---@field errors? table
---@field messages? table
---@field result? table
---@field success? boolean
---@field value? string

---@class CachePurgeApiResponseSingleId
---@field errors table
---@field messages table
---@field result table
---@field success boolean

---@class CachePurgeApiResponseSingleIdCreateData
---@field environment_id string
---@field zone_id string
---@field errors table
---@field messages table
---@field result table
---@field success boolean

---@class CpsCommunicationPreference
---@field errors table
---@field languagelocale? string
---@field messages table
---@field preferences? table
---@field result table
---@field success boolean

---@class CpsCommunicationPreferenceListMatch
---@field errors? table
---@field languagelocale? string
---@field messages? table
---@field preferences? table
---@field result? table
---@field success? boolean

---@class CpsCommunicationPreferenceUpdateData
---@field errors? table
---@field languagelocale? string
---@field messages? table
---@field preferences? table
---@field result? table
---@field success? boolean

---@class IamApiResponseSingleId
---@field name string
---@field result? table
---@field standalone? boolean
---@field type? any
---@field unit? table

---@class IamApiResponseSingleIdListMatch
---@field direction? string
---@field name? string
---@field page? number
---@field per_page? number

---@class IamApiResponseSingleIdCreateData
---@field name string
---@field result? table
---@field standalone? boolean
---@field type? any
---@field unit? table

---@class IamApiResponseSingleIdRemoveMatch
---@field account_id string

---@class IamResponseSingleAccount
---@field id? string
---@field result table

---@class IamResponseSingleAccountLoadMatch
---@field id string

---@class IamResponseSingleAccountCreateData
---@field account_id string
---@field id? string
---@field result table

---@class IamResponseSingleAccountUpdateData
---@field id string
---@field result? table

---@class IamSingleUser
---@field country? string
---@field first_name? string
---@field last_name? string
---@field result table
---@field telephone? string
---@field zipcode? string

---@class IamSingleUserLoadMatch
---@field country? string
---@field first_name? string
---@field last_name? string
---@field result? table
---@field telephone? string
---@field zipcode? string

---@class IamSingleUserUpdateData
---@field country? string
---@field first_name? string
---@field last_name? string
---@field result? table
---@field telephone? string
---@field zipcode? string

---@class KaminoEnvironment
---@field environments table
---@field errors table
---@field id? string
---@field messages table
---@field result table
---@field success boolean

---@class KaminoEnvironmentListMatch
---@field zone_id string

---@class KaminoEnvironmentCreateData
---@field environment_id? string
---@field zone_id string
---@field environments table
---@field errors table
---@field id? string
---@field messages table
---@field result table
---@field success boolean

---@class KaminoEnvironmentUpdateData
---@field zone_id string
---@field environments? table
---@field errors? table
---@field id? string
---@field messages? table
---@field result? table
---@field success? boolean

---@class KaminoEnvironmentRemoveMatch
---@field id string
---@field zone_id string

---@class Resource
---@field errors table
---@field messages table
---@field result? table
---@field result_info? table
---@field success boolean

---@class ResourceListMatch
---@field account_id string
---@field case_insensitive? boolean
---@field cursor? string
---@field id? table
---@field name? string
---@field tag? table
---@field type? table

---@class ResourceTagging

---@class ResourceTaggingRemoveMatch
---@field account_id string

---@class ResourceTaggingTagKeySummaryResponseCollection
---@field errors table
---@field messages table
---@field result? table
---@field result_info? table
---@field success boolean

---@class ResourceTaggingTagKeySummaryResponseCollectionListMatch
---@field account_id string
---@field cursor? string

---@class ResourceTaggingTagKeysResponseCollection
---@field errors table
---@field messages table
---@field result? table
---@field result_info? table
---@field success boolean

---@class ResourceTaggingTagKeysResponseCollectionListMatch
---@field account_id string
---@field cursor? string

---@class ResourceTaggingTagValuesResponseCollection
---@field errors table
---@field messages table
---@field result? table
---@field result_info? table
---@field success boolean

---@class ResourceTaggingTagValuesResponseCollectionLoadMatch
---@field account_id string
---@field tag_key string
---@field cursor? string
---@field type? string

---@class ResourceTaggingTaggedResourceResponseSingle
---@field errors table
---@field messages table
---@field result? table
---@field success boolean

---@class ResourceTaggingTaggedResourceResponseSingleListMatch
---@field zone_id? string
---@field access_application_id? string
---@field resource_id string
---@field resource_type string
---@field account_id? string
---@field worker_id? string

---@class ResourceTaggingTaggedResourceResponseSingleUpdateData
---@field account_id string
---@field errors? table
---@field messages? table
---@field result? table
---@field success? boolean

---@class Zone
---@field account table
---@field errors table
---@field id? string
---@field messages table
---@field name string
---@field paused? boolean
---@field plan? table
---@field result table
---@field result_info? table
---@field success boolean
---@field type? string
---@field vanity_name_servers? table

---@class ZoneLoadMatch
---@field id string

---@class ZoneListMatch
---@field account_id? string
---@field account_name? string
---@field direction? string
---@field match? string
---@field name? string
---@field order? string
---@field page? number
---@field per_page? number
---@field status? string
---@field type? table

---@class ZoneCreateData
---@field account table
---@field errors table
---@field id? string
---@field messages table
---@field name string
---@field paused? boolean
---@field plan? table
---@field result table
---@field result_info? table
---@field success boolean
---@field type? string
---@field vanity_name_servers? table

---@class ZoneUpdateData
---@field id string
---@field account? table
---@field errors? table
---@field messages? table
---@field name? string
---@field paused? boolean
---@field plan? table
---@field result? table
---@field result_info? table
---@field success? boolean
---@field type? string
---@field vanity_name_servers? table

---@class ZoneRemoveMatch
---@field id string

---@class ZoneHold
---@field hold? boolean
---@field hold_after? string
---@field id? string
---@field include_subdomains? boolean
---@field result? table

---@class ZoneHoldLoadMatch
---@field id string
---@field zone_id? string

---@class ZoneHoldCreateData
---@field id string
---@field include_subdomain? boolean
---@field hold? boolean
---@field hold_after? string
---@field include_subdomains? boolean
---@field result? table

---@class ZoneHoldUpdateData
---@field id string
---@field hold? boolean
---@field hold_after? string
---@field include_subdomains? boolean
---@field result? table

---@class ZoneHoldRemoveMatch
---@field id string
---@field hold_after? string

local M = {}

return M
