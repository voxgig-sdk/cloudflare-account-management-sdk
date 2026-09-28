# frozen_string_literal: true

# Typed models for the CloudflareAccountManagement SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Account entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
Account = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Account#list.
#
# @!attribute [rw] id
#   @return [String]
AccountListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Account#create.
#
# @!attribute [rw] id
#   @return [String, nil]
AccountCreateData = Struct.new(
  :id,
  keyword_init: true
)

# AccountSetting entity data model.
#
# @!attribute [rw] errors
#   @return [Array]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] success
#   @return [Boolean]
#
# @!attribute [rw] value
#   @return [String]
AccountSetting = Struct.new(
  :errors,
  :messages,
  :result,
  :success,
  :value,
  keyword_init: true
)

# Request payload for AccountSetting#list.
#
# @!attribute [rw] account_id
#   @return [String]
AccountSettingListMatch = Struct.new(
  :account_id,
  keyword_init: true
)

# Request payload for AccountSetting#update.
#
# @!attribute [rw] account_id
#   @return [String]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] messages
#   @return [Array, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
AccountSettingUpdateData = Struct.new(
  :account_id,
  :errors,
  :messages,
  :result,
  :success,
  :value,
  keyword_init: true
)

# CachePurgeApiResponseSingleId entity data model.
#
# @!attribute [rw] errors
#   @return [Array]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] success
#   @return [Boolean]
CachePurgeApiResponseSingleId = Struct.new(
  :errors,
  :messages,
  :result,
  :success,
  keyword_init: true
)

# Request payload for CachePurgeApiResponseSingleId#create.
#
# @!attribute [rw] environment_id
#   @return [String]
#
# @!attribute [rw] zone_id
#   @return [String]
#
# @!attribute [rw] errors
#   @return [Array]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] success
#   @return [Boolean]
CachePurgeApiResponseSingleIdCreateData = Struct.new(
  :environment_id,
  :zone_id,
  :errors,
  :messages,
  :result,
  :success,
  keyword_init: true
)

# CpsCommunicationPreference entity data model.
#
# @!attribute [rw] errors
#   @return [Array]
#
# @!attribute [rw] languagelocale
#   @return [String, nil]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] preferences
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] success
#   @return [Boolean]
CpsCommunicationPreference = Struct.new(
  :errors,
  :languagelocale,
  :messages,
  :preferences,
  :result,
  :success,
  keyword_init: true
)

# Request payload for CpsCommunicationPreference#list.
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] languagelocale
#   @return [String, nil]
#
# @!attribute [rw] messages
#   @return [Array, nil]
#
# @!attribute [rw] preferences
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
CpsCommunicationPreferenceListMatch = Struct.new(
  :errors,
  :languagelocale,
  :messages,
  :preferences,
  :result,
  :success,
  keyword_init: true
)

# Request payload for CpsCommunicationPreference#update.
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] languagelocale
#   @return [String, nil]
#
# @!attribute [rw] messages
#   @return [Array, nil]
#
# @!attribute [rw] preferences
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
CpsCommunicationPreferenceUpdateData = Struct.new(
  :errors,
  :languagelocale,
  :messages,
  :preferences,
  :result,
  :success,
  keyword_init: true
)

# IamApiResponseSingleId entity data model.
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] standalone
#   @return [Boolean, nil]
#
# @!attribute [rw] type
#   @return [Object, nil]
#
# @!attribute [rw] unit
#   @return [Hash, nil]
IamApiResponseSingleId = Struct.new(
  :name,
  :result,
  :standalone,
  :type,
  :unit,
  keyword_init: true
)

# Request payload for IamApiResponseSingleId#list.
#
# @!attribute [rw] direction
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Float, nil]
#
# @!attribute [rw] per_page
#   @return [Float, nil]
IamApiResponseSingleIdListMatch = Struct.new(
  :direction,
  :name,
  :page,
  :per_page,
  keyword_init: true
)

# Request payload for IamApiResponseSingleId#create.
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] standalone
#   @return [Boolean, nil]
#
# @!attribute [rw] type
#   @return [Object, nil]
#
# @!attribute [rw] unit
#   @return [Hash, nil]
IamApiResponseSingleIdCreateData = Struct.new(
  :name,
  :result,
  :standalone,
  :type,
  :unit,
  keyword_init: true
)

# Request payload for IamApiResponseSingleId#remove.
#
# @!attribute [rw] account_id
#   @return [String]
IamApiResponseSingleIdRemoveMatch = Struct.new(
  :account_id,
  keyword_init: true
)

# IamResponseSingleAccount entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Hash]
IamResponseSingleAccount = Struct.new(
  :id,
  :result,
  keyword_init: true
)

# Request payload for IamResponseSingleAccount#load.
#
# @!attribute [rw] id
#   @return [String]
IamResponseSingleAccountLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for IamResponseSingleAccount#create.
#
# @!attribute [rw] account_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Hash]
IamResponseSingleAccountCreateData = Struct.new(
  :account_id,
  :id,
  :result,
  keyword_init: true
)

# Request payload for IamResponseSingleAccount#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] result
#   @return [Hash, nil]
IamResponseSingleAccountUpdateData = Struct.new(
  :id,
  :result,
  keyword_init: true
)

# IamSingleUser entity data model.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] first_name
#   @return [String, nil]
#
# @!attribute [rw] last_name
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] telephone
#   @return [String, nil]
#
# @!attribute [rw] zipcode
#   @return [String, nil]
IamSingleUser = Struct.new(
  :country,
  :first_name,
  :last_name,
  :result,
  :telephone,
  :zipcode,
  keyword_init: true
)

# Request payload for IamSingleUser#load.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] first_name
#   @return [String, nil]
#
# @!attribute [rw] last_name
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] telephone
#   @return [String, nil]
#
# @!attribute [rw] zipcode
#   @return [String, nil]
IamSingleUserLoadMatch = Struct.new(
  :country,
  :first_name,
  :last_name,
  :result,
  :telephone,
  :zipcode,
  keyword_init: true
)

# Request payload for IamSingleUser#update.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] first_name
#   @return [String, nil]
#
# @!attribute [rw] last_name
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] telephone
#   @return [String, nil]
#
# @!attribute [rw] zipcode
#   @return [String, nil]
IamSingleUserUpdateData = Struct.new(
  :country,
  :first_name,
  :last_name,
  :result,
  :telephone,
  :zipcode,
  keyword_init: true
)

# KaminoEnvironment entity data model.
#
# @!attribute [rw] environments
#   @return [Array]
#
# @!attribute [rw] errors
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] success
#   @return [Boolean]
KaminoEnvironment = Struct.new(
  :environments,
  :errors,
  :id,
  :messages,
  :result,
  :success,
  keyword_init: true
)

# Request payload for KaminoEnvironment#list.
#
# @!attribute [rw] zone_id
#   @return [String]
KaminoEnvironmentListMatch = Struct.new(
  :zone_id,
  keyword_init: true
)

# Request payload for KaminoEnvironment#create.
#
# @!attribute [rw] environment_id
#   @return [String, nil]
#
# @!attribute [rw] zone_id
#   @return [String]
#
# @!attribute [rw] environments
#   @return [Array]
#
# @!attribute [rw] errors
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] success
#   @return [Boolean]
KaminoEnvironmentCreateData = Struct.new(
  :environment_id,
  :zone_id,
  :environments,
  :errors,
  :id,
  :messages,
  :result,
  :success,
  keyword_init: true
)

# Request payload for KaminoEnvironment#update.
#
# @!attribute [rw] zone_id
#   @return [String]
#
# @!attribute [rw] environments
#   @return [Array, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] messages
#   @return [Array, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
KaminoEnvironmentUpdateData = Struct.new(
  :zone_id,
  :environments,
  :errors,
  :id,
  :messages,
  :result,
  :success,
  keyword_init: true
)

# Request payload for KaminoEnvironment#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] zone_id
#   @return [String]
KaminoEnvironmentRemoveMatch = Struct.new(
  :id,
  :zone_id,
  keyword_init: true
)

# Resource entity data model.
#
# @!attribute [rw] errors
#   @return [Array]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] result_info
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean]
Resource = Struct.new(
  :errors,
  :messages,
  :result,
  :result_info,
  :success,
  keyword_init: true
)

# Request payload for Resource#list.
#
# @!attribute [rw] account_id
#   @return [String]
#
# @!attribute [rw] case_insensitive
#   @return [Boolean, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [Array, nil]
ResourceListMatch = Struct.new(
  :account_id,
  :case_insensitive,
  :cursor,
  :id,
  :name,
  :tag,
  :type,
  keyword_init: true
)

# ResourceTagging entity data model.
class ResourceTagging
end

# Request payload for ResourceTagging#remove.
#
# @!attribute [rw] account_id
#   @return [String]
ResourceTaggingRemoveMatch = Struct.new(
  :account_id,
  keyword_init: true
)

# ResourceTaggingTagKeySummaryResponseCollection entity data model.
#
# @!attribute [rw] errors
#   @return [Array]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] result_info
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean]
ResourceTaggingTagKeySummaryResponseCollection = Struct.new(
  :errors,
  :messages,
  :result,
  :result_info,
  :success,
  keyword_init: true
)

# Request payload for ResourceTaggingTagKeySummaryResponseCollection#list.
#
# @!attribute [rw] account_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
ResourceTaggingTagKeySummaryResponseCollectionListMatch = Struct.new(
  :account_id,
  :cursor,
  keyword_init: true
)

# ResourceTaggingTagKeysResponseCollection entity data model.
#
# @!attribute [rw] errors
#   @return [Array]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] result_info
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean]
ResourceTaggingTagKeysResponseCollection = Struct.new(
  :errors,
  :messages,
  :result,
  :result_info,
  :success,
  keyword_init: true
)

# Request payload for ResourceTaggingTagKeysResponseCollection#list.
#
# @!attribute [rw] account_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
ResourceTaggingTagKeysResponseCollectionListMatch = Struct.new(
  :account_id,
  :cursor,
  keyword_init: true
)

# ResourceTaggingTagValuesResponseCollection entity data model.
#
# @!attribute [rw] errors
#   @return [Array]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] result_info
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean]
ResourceTaggingTagValuesResponseCollection = Struct.new(
  :errors,
  :messages,
  :result,
  :result_info,
  :success,
  keyword_init: true
)

# Request payload for ResourceTaggingTagValuesResponseCollection#load.
#
# @!attribute [rw] account_id
#   @return [String]
#
# @!attribute [rw] tag_key
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
ResourceTaggingTagValuesResponseCollectionLoadMatch = Struct.new(
  :account_id,
  :tag_key,
  :cursor,
  :type,
  keyword_init: true
)

# ResourceTaggingTaggedResourceResponseSingle entity data model.
#
# @!attribute [rw] errors
#   @return [Array]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean]
ResourceTaggingTaggedResourceResponseSingle = Struct.new(
  :errors,
  :messages,
  :result,
  :success,
  keyword_init: true
)

# Request payload for ResourceTaggingTaggedResourceResponseSingle#list.
#
# @!attribute [rw] zone_id
#   @return [String, nil]
#
# @!attribute [rw] access_application_id
#   @return [String, nil]
#
# @!attribute [rw] resource_id
#   @return [String]
#
# @!attribute [rw] resource_type
#   @return [String]
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] worker_id
#   @return [String, nil]
ResourceTaggingTaggedResourceResponseSingleListMatch = Struct.new(
  :zone_id,
  :access_application_id,
  :resource_id,
  :resource_type,
  :account_id,
  :worker_id,
  keyword_init: true
)

# Request payload for ResourceTaggingTaggedResourceResponseSingle#update.
#
# @!attribute [rw] account_id
#   @return [String]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] messages
#   @return [Array, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
ResourceTaggingTaggedResourceResponseSingleUpdateData = Struct.new(
  :account_id,
  :errors,
  :messages,
  :result,
  :success,
  keyword_init: true
)

# Zone entity data model.
#
# @!attribute [rw] account
#   @return [Hash]
#
# @!attribute [rw] errors
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] paused
#   @return [Boolean, nil]
#
# @!attribute [rw] plan
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] result_info
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] vanity_name_servers
#   @return [Array, nil]
Zone = Struct.new(
  :account,
  :errors,
  :id,
  :messages,
  :name,
  :paused,
  :plan,
  :result,
  :result_info,
  :success,
  :type,
  :vanity_name_servers,
  keyword_init: true
)

# Request payload for Zone#load.
#
# @!attribute [rw] id
#   @return [String]
ZoneLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Zone#list.
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] account_name
#   @return [String, nil]
#
# @!attribute [rw] direction
#   @return [String, nil]
#
# @!attribute [rw] match
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] order
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Float, nil]
#
# @!attribute [rw] per_page
#   @return [Float, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [Array, nil]
ZoneListMatch = Struct.new(
  :account_id,
  :account_name,
  :direction,
  :match,
  :name,
  :order,
  :page,
  :per_page,
  :status,
  :type,
  keyword_init: true
)

# Request payload for Zone#create.
#
# @!attribute [rw] account
#   @return [Hash]
#
# @!attribute [rw] errors
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] paused
#   @return [Boolean, nil]
#
# @!attribute [rw] plan
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] result_info
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] vanity_name_servers
#   @return [Array, nil]
ZoneCreateData = Struct.new(
  :account,
  :errors,
  :id,
  :messages,
  :name,
  :paused,
  :plan,
  :result,
  :result_info,
  :success,
  :type,
  :vanity_name_servers,
  keyword_init: true
)

# Request payload for Zone#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] account
#   @return [Hash, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] messages
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] paused
#   @return [Boolean, nil]
#
# @!attribute [rw] plan
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] result_info
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] vanity_name_servers
#   @return [Array, nil]
ZoneUpdateData = Struct.new(
  :id,
  :account,
  :errors,
  :messages,
  :name,
  :paused,
  :plan,
  :result,
  :result_info,
  :success,
  :type,
  :vanity_name_servers,
  keyword_init: true
)

# Request payload for Zone#remove.
#
# @!attribute [rw] id
#   @return [String]
ZoneRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# ZoneHold entity data model.
#
# @!attribute [rw] hold
#   @return [Boolean, nil]
#
# @!attribute [rw] hold_after
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] include_subdomains
#   @return [Boolean, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
ZoneHold = Struct.new(
  :hold,
  :hold_after,
  :id,
  :include_subdomains,
  :result,
  keyword_init: true
)

# Request payload for ZoneHold#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] zone_id
#   @return [String, nil]
ZoneHoldLoadMatch = Struct.new(
  :id,
  :zone_id,
  keyword_init: true
)

# Request payload for ZoneHold#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] include_subdomain
#   @return [Boolean, nil]
#
# @!attribute [rw] hold
#   @return [Boolean, nil]
#
# @!attribute [rw] hold_after
#   @return [String, nil]
#
# @!attribute [rw] include_subdomains
#   @return [Boolean, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
ZoneHoldCreateData = Struct.new(
  :id,
  :include_subdomain,
  :hold,
  :hold_after,
  :include_subdomains,
  :result,
  keyword_init: true
)

# Request payload for ZoneHold#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] hold
#   @return [Boolean, nil]
#
# @!attribute [rw] hold_after
#   @return [String, nil]
#
# @!attribute [rw] include_subdomains
#   @return [Boolean, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
ZoneHoldUpdateData = Struct.new(
  :id,
  :hold,
  :hold_after,
  :include_subdomains,
  :result,
  keyword_init: true
)

# Request payload for ZoneHold#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] hold_after
#   @return [String, nil]
ZoneHoldRemoveMatch = Struct.new(
  :id,
  :hold_after,
  keyword_init: true
)

