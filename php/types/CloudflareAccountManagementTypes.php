<?php
declare(strict_types=1);

// Typed models for the CloudflareAccountManagement SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Account entity data model. */
class Account
{
    public ?string $id = null;
}

/** Request payload for Account#list. */
class AccountListMatch
{
    public string $id;
}

/** Request payload for Account#create. */
class AccountCreateData
{
    public ?string $id = null;
}

/** AccountSetting entity data model. */
class AccountSetting
{
    public array $errors;
    public array $messages;
    public ?array $result = null;
    public bool $success;
    public string $value;
}

/** Request payload for AccountSetting#list. */
class AccountSettingListMatch
{
    public string $account_id;
}

/** Request payload for AccountSetting#update. */
class AccountSettingUpdateData
{
    public string $account_id;
    public ?array $errors = null;
    public ?array $messages = null;
    public ?array $result = null;
    public ?bool $success = null;
    public ?string $value = null;
}

/** CachePurgeApiResponseSingleId entity data model. */
class CachePurgeApiResponseSingleId
{
    public array $errors;
    public array $messages;
    public array $result;
    public bool $success;
}

/** Request payload for CachePurgeApiResponseSingleId#create. */
class CachePurgeApiResponseSingleIdCreateData
{
    public string $environment_id;
    public string $zone_id;
    public array $errors;
    public array $messages;
    public array $result;
    public bool $success;
}

/** CpsCommunicationPreference entity data model. */
class CpsCommunicationPreference
{
    public array $errors;
    public ?string $languagelocale = null;
    public array $messages;
    public ?array $preferences = null;
    public array $result;
    public bool $success;
}

/** Request payload for CpsCommunicationPreference#list. */
class CpsCommunicationPreferenceListMatch
{
    public ?array $errors = null;
    public ?string $languagelocale = null;
    public ?array $messages = null;
    public ?array $preferences = null;
    public ?array $result = null;
    public ?bool $success = null;
}

/** Request payload for CpsCommunicationPreference#update. */
class CpsCommunicationPreferenceUpdateData
{
    public ?array $errors = null;
    public ?string $languagelocale = null;
    public ?array $messages = null;
    public ?array $preferences = null;
    public ?array $result = null;
    public ?bool $success = null;
}

/** IamApiResponseSingleId entity data model. */
class IamApiResponseSingleId
{
    public string $name;
    public ?array $result = null;
    public ?bool $standalone = null;
    public mixed $type = null;
    public ?array $unit = null;
}

/** Request payload for IamApiResponseSingleId#list. */
class IamApiResponseSingleIdListMatch
{
    public ?string $direction = null;
    public ?string $name = null;
    public ?float $page = null;
    public ?float $per_page = null;
}

/** Request payload for IamApiResponseSingleId#create. */
class IamApiResponseSingleIdCreateData
{
    public string $name;
    public ?array $result = null;
    public ?bool $standalone = null;
    public mixed $type = null;
    public ?array $unit = null;
}

/** Request payload for IamApiResponseSingleId#remove. */
class IamApiResponseSingleIdRemoveMatch
{
    public string $account_id;
}

/** IamResponseSingleAccount entity data model. */
class IamResponseSingleAccount
{
    public ?string $id = null;
    public array $result;
}

/** Request payload for IamResponseSingleAccount#load. */
class IamResponseSingleAccountLoadMatch
{
    public string $id;
}

/** Request payload for IamResponseSingleAccount#create. */
class IamResponseSingleAccountCreateData
{
    public string $account_id;
    public ?string $id = null;
    public array $result;
}

/** Request payload for IamResponseSingleAccount#update. */
class IamResponseSingleAccountUpdateData
{
    public string $id;
    public ?array $result = null;
}

/** IamSingleUser entity data model. */
class IamSingleUser
{
    public ?string $country = null;
    public ?string $first_name = null;
    public ?string $last_name = null;
    public array $result;
    public ?string $telephone = null;
    public ?string $zipcode = null;
}

/** Request payload for IamSingleUser#load. */
class IamSingleUserLoadMatch
{
    public ?string $country = null;
    public ?string $first_name = null;
    public ?string $last_name = null;
    public ?array $result = null;
    public ?string $telephone = null;
    public ?string $zipcode = null;
}

/** Request payload for IamSingleUser#update. */
class IamSingleUserUpdateData
{
    public ?string $country = null;
    public ?string $first_name = null;
    public ?string $last_name = null;
    public ?array $result = null;
    public ?string $telephone = null;
    public ?string $zipcode = null;
}

/** KaminoEnvironment entity data model. */
class KaminoEnvironment
{
    public array $environments;
    public array $errors;
    public ?string $id = null;
    public array $messages;
    public array $result;
    public bool $success;
}

/** Request payload for KaminoEnvironment#list. */
class KaminoEnvironmentListMatch
{
    public string $zone_id;
}

/** Request payload for KaminoEnvironment#create. */
class KaminoEnvironmentCreateData
{
    public ?string $environment_id = null;
    public string $zone_id;
    public array $environments;
    public array $errors;
    public ?string $id = null;
    public array $messages;
    public array $result;
    public bool $success;
}

/** Request payload for KaminoEnvironment#update. */
class KaminoEnvironmentUpdateData
{
    public string $zone_id;
    public ?array $environments = null;
    public ?array $errors = null;
    public ?string $id = null;
    public ?array $messages = null;
    public ?array $result = null;
    public ?bool $success = null;
}

/** Request payload for KaminoEnvironment#remove. */
class KaminoEnvironmentRemoveMatch
{
    public string $id;
    public string $zone_id;
}

/** Resource entity data model. */
class ResourceType
{
    public array $errors;
    public array $messages;
    public ?array $result = null;
    public ?array $result_info = null;
    public bool $success;
}

/** Request payload for Resource#list. */
class ResourceListMatch
{
    public string $account_id;
    public ?bool $case_insensitive = null;
    public ?string $cursor = null;
    public ?array $id = null;
    public ?string $name = null;
    public ?array $tag = null;
    public ?array $type = null;
}

/** ResourceTagging entity data model. */
class ResourceTagging
{
}

/** Request payload for ResourceTagging#remove. */
class ResourceTaggingRemoveMatch
{
    public string $account_id;
}

/** ResourceTaggingTagKeySummaryResponseCollection entity data model. */
class ResourceTaggingTagKeySummaryResponseCollection
{
    public array $errors;
    public array $messages;
    public ?array $result = null;
    public ?array $result_info = null;
    public bool $success;
}

/** Request payload for ResourceTaggingTagKeySummaryResponseCollection#list. */
class ResourceTaggingTagKeySummaryResponseCollectionListMatch
{
    public string $account_id;
    public ?string $cursor = null;
}

/** ResourceTaggingTagKeysResponseCollection entity data model. */
class ResourceTaggingTagKeysResponseCollection
{
    public array $errors;
    public array $messages;
    public ?array $result = null;
    public ?array $result_info = null;
    public bool $success;
}

/** Request payload for ResourceTaggingTagKeysResponseCollection#list. */
class ResourceTaggingTagKeysResponseCollectionListMatch
{
    public string $account_id;
    public ?string $cursor = null;
}

/** ResourceTaggingTagValuesResponseCollection entity data model. */
class ResourceTaggingTagValuesResponseCollection
{
    public array $errors;
    public array $messages;
    public ?array $result = null;
    public ?array $result_info = null;
    public bool $success;
}

/** Request payload for ResourceTaggingTagValuesResponseCollection#load. */
class ResourceTaggingTagValuesResponseCollectionLoadMatch
{
    public string $account_id;
    public string $tag_key;
    public ?string $cursor = null;
    public ?string $type = null;
}

/** ResourceTaggingTaggedResourceResponseSingle entity data model. */
class ResourceTaggingTaggedResourceResponseSingle
{
    public array $errors;
    public array $messages;
    public ?array $result = null;
    public bool $success;
}

/** Request payload for ResourceTaggingTaggedResourceResponseSingle#list. */
class ResourceTaggingTaggedResourceResponseSingleListMatch
{
    public ?string $zone_id = null;
    public ?string $access_application_id = null;
    public string $resource_id;
    public string $resource_type;
    public ?string $account_id = null;
    public ?string $worker_id = null;
}

/** Request payload for ResourceTaggingTaggedResourceResponseSingle#update. */
class ResourceTaggingTaggedResourceResponseSingleUpdateData
{
    public string $account_id;
    public ?array $errors = null;
    public ?array $messages = null;
    public ?array $result = null;
    public ?bool $success = null;
}

/** Zone entity data model. */
class Zone
{
    public array $account;
    public array $errors;
    public ?string $id = null;
    public array $messages;
    public string $name;
    public ?bool $paused = null;
    public ?array $plan = null;
    public array $result;
    public ?array $result_info = null;
    public bool $success;
    public ?string $type = null;
    public ?array $vanity_name_servers = null;
}

/** Request payload for Zone#load. */
class ZoneLoadMatch
{
    public string $id;
}

/** Request payload for Zone#list. */
class ZoneListMatch
{
    public ?string $account_id = null;
    public ?string $account_name = null;
    public ?string $direction = null;
    public ?string $match = null;
    public ?string $name = null;
    public ?string $order = null;
    public ?float $page = null;
    public ?float $per_page = null;
    public ?string $status = null;
    public ?array $type = null;
}

/** Request payload for Zone#create. */
class ZoneCreateData
{
    public array $account;
    public array $errors;
    public ?string $id = null;
    public array $messages;
    public string $name;
    public ?bool $paused = null;
    public ?array $plan = null;
    public array $result;
    public ?array $result_info = null;
    public bool $success;
    public ?string $type = null;
    public ?array $vanity_name_servers = null;
}

/** Request payload for Zone#update. */
class ZoneUpdateData
{
    public string $id;
    public ?array $account = null;
    public ?array $errors = null;
    public ?array $messages = null;
    public ?string $name = null;
    public ?bool $paused = null;
    public ?array $plan = null;
    public ?array $result = null;
    public ?array $result_info = null;
    public ?bool $success = null;
    public ?string $type = null;
    public ?array $vanity_name_servers = null;
}

/** Request payload for Zone#remove. */
class ZoneRemoveMatch
{
    public string $id;
}

/** ZoneHold entity data model. */
class ZoneHold
{
    public ?bool $hold = null;
    public ?string $hold_after = null;
    public ?string $id = null;
    public ?bool $include_subdomains = null;
    public ?array $result = null;
}

/** Request payload for ZoneHold#load. */
class ZoneHoldLoadMatch
{
    public string $id;
    public ?string $zone_id = null;
}

/** Request payload for ZoneHold#create. */
class ZoneHoldCreateData
{
    public string $id;
    public ?bool $include_subdomain = null;
    public ?bool $hold = null;
    public ?string $hold_after = null;
    public ?bool $include_subdomains = null;
    public ?array $result = null;
}

/** Request payload for ZoneHold#update. */
class ZoneHoldUpdateData
{
    public string $id;
    public ?bool $hold = null;
    public ?string $hold_after = null;
    public ?bool $include_subdomains = null;
    public ?array $result = null;
}

/** Request payload for ZoneHold#remove. */
class ZoneHoldRemoveMatch
{
    public string $id;
    public ?string $hold_after = null;
}

