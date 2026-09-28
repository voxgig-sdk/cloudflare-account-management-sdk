# Typed models for the CloudflareAccountManagement SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Account(TypedDict, total=False):
    id: str


class AccountListMatch(TypedDict):
    id: str


class AccountCreateData(TypedDict, total=False):
    id: str


class AccountSettingRequired(TypedDict):
    errors: list
    messages: list
    success: bool
    value: str


class AccountSetting(AccountSettingRequired, total=False):
    result: list


class AccountSettingListMatch(TypedDict):
    account_id: str


class AccountSettingUpdateDataRequired(TypedDict):
    account_id: str


class AccountSettingUpdateData(AccountSettingUpdateDataRequired, total=False):
    errors: list
    messages: list
    result: list
    success: bool
    value: str


class CachePurgeApiResponseSingleId(TypedDict):
    errors: list
    messages: list
    result: dict
    success: bool


class CachePurgeApiResponseSingleIdCreateData(TypedDict):
    environment_id: str
    zone_id: str
    errors: list
    messages: list
    result: dict
    success: bool


class CpsCommunicationPreferenceRequired(TypedDict):
    errors: list
    messages: list
    result: dict
    success: bool


class CpsCommunicationPreference(CpsCommunicationPreferenceRequired, total=False):
    languagelocale: str
    preferences: dict


class CpsCommunicationPreferenceListMatch(TypedDict, total=False):
    errors: list
    languagelocale: str
    messages: list
    preferences: dict
    result: dict
    success: bool


class CpsCommunicationPreferenceUpdateData(TypedDict, total=False):
    errors: list
    languagelocale: str
    messages: list
    preferences: dict
    result: dict
    success: bool


class IamApiResponseSingleIdRequired(TypedDict):
    name: str


class IamApiResponseSingleId(IamApiResponseSingleIdRequired, total=False):
    result: list
    standalone: bool
    type: Any
    unit: dict


class IamApiResponseSingleIdListMatch(TypedDict, total=False):
    direction: str
    name: str
    page: float
    per_page: float


class IamApiResponseSingleIdCreateDataRequired(TypedDict):
    name: str


class IamApiResponseSingleIdCreateData(IamApiResponseSingleIdCreateDataRequired, total=False):
    result: list
    standalone: bool
    type: Any
    unit: dict


class IamApiResponseSingleIdRemoveMatch(TypedDict):
    account_id: str


class IamResponseSingleAccountRequired(TypedDict):
    result: dict


class IamResponseSingleAccount(IamResponseSingleAccountRequired, total=False):
    id: str


class IamResponseSingleAccountLoadMatch(TypedDict):
    id: str


class IamResponseSingleAccountCreateDataRequired(TypedDict):
    account_id: str
    result: dict


class IamResponseSingleAccountCreateData(IamResponseSingleAccountCreateDataRequired, total=False):
    id: str


class IamResponseSingleAccountUpdateDataRequired(TypedDict):
    id: str


class IamResponseSingleAccountUpdateData(IamResponseSingleAccountUpdateDataRequired, total=False):
    result: dict


class IamSingleUserRequired(TypedDict):
    result: dict


class IamSingleUser(IamSingleUserRequired, total=False):
    country: str
    first_name: str
    last_name: str
    telephone: str
    zipcode: str


class IamSingleUserLoadMatch(TypedDict, total=False):
    country: str
    first_name: str
    last_name: str
    result: dict
    telephone: str
    zipcode: str


class IamSingleUserUpdateData(TypedDict, total=False):
    country: str
    first_name: str
    last_name: str
    result: dict
    telephone: str
    zipcode: str


class KaminoEnvironmentRequired(TypedDict):
    environments: list
    errors: list
    messages: list
    result: dict
    success: bool


class KaminoEnvironment(KaminoEnvironmentRequired, total=False):
    id: str


class KaminoEnvironmentListMatch(TypedDict):
    zone_id: str


class KaminoEnvironmentCreateDataRequired(TypedDict):
    zone_id: str
    environments: list
    errors: list
    messages: list
    result: dict
    success: bool


class KaminoEnvironmentCreateData(KaminoEnvironmentCreateDataRequired, total=False):
    environment_id: str
    id: str


class KaminoEnvironmentUpdateDataRequired(TypedDict):
    zone_id: str


class KaminoEnvironmentUpdateData(KaminoEnvironmentUpdateDataRequired, total=False):
    environments: list
    errors: list
    id: str
    messages: list
    result: dict
    success: bool


class KaminoEnvironmentRemoveMatch(TypedDict):
    id: str
    zone_id: str


class ResourceRequired(TypedDict):
    errors: list
    messages: list
    success: bool


class Resource(ResourceRequired, total=False):
    result: list
    result_info: dict


class ResourceListMatchRequired(TypedDict):
    account_id: str


class ResourceListMatch(ResourceListMatchRequired, total=False):
    case_insensitive: bool
    cursor: str
    id: list
    name: str
    tag: list
    type: list


class ResourceTagging(TypedDict):
    pass


class ResourceTaggingRemoveMatch(TypedDict):
    account_id: str


class ResourceTaggingTagKeySummaryResponseCollectionRequired(TypedDict):
    errors: list
    messages: list
    success: bool


class ResourceTaggingTagKeySummaryResponseCollection(ResourceTaggingTagKeySummaryResponseCollectionRequired, total=False):
    result: list
    result_info: dict


class ResourceTaggingTagKeySummaryResponseCollectionListMatchRequired(TypedDict):
    account_id: str


class ResourceTaggingTagKeySummaryResponseCollectionListMatch(ResourceTaggingTagKeySummaryResponseCollectionListMatchRequired, total=False):
    cursor: str


class ResourceTaggingTagKeysResponseCollectionRequired(TypedDict):
    errors: list
    messages: list
    success: bool


class ResourceTaggingTagKeysResponseCollection(ResourceTaggingTagKeysResponseCollectionRequired, total=False):
    result: list
    result_info: dict


class ResourceTaggingTagKeysResponseCollectionListMatchRequired(TypedDict):
    account_id: str


class ResourceTaggingTagKeysResponseCollectionListMatch(ResourceTaggingTagKeysResponseCollectionListMatchRequired, total=False):
    cursor: str


class ResourceTaggingTagValuesResponseCollectionRequired(TypedDict):
    errors: list
    messages: list
    success: bool


class ResourceTaggingTagValuesResponseCollection(ResourceTaggingTagValuesResponseCollectionRequired, total=False):
    result: list
    result_info: dict


class ResourceTaggingTagValuesResponseCollectionLoadMatchRequired(TypedDict):
    account_id: str
    tag_key: str


class ResourceTaggingTagValuesResponseCollectionLoadMatch(ResourceTaggingTagValuesResponseCollectionLoadMatchRequired, total=False):
    cursor: str
    type: str


class ResourceTaggingTaggedResourceResponseSingleRequired(TypedDict):
    errors: list
    messages: list
    success: bool


class ResourceTaggingTaggedResourceResponseSingle(ResourceTaggingTaggedResourceResponseSingleRequired, total=False):
    result: dict


class ResourceTaggingTaggedResourceResponseSingleListMatchRequired(TypedDict):
    resource_id: str
    resource_type: str


class ResourceTaggingTaggedResourceResponseSingleListMatch(ResourceTaggingTaggedResourceResponseSingleListMatchRequired, total=False):
    zone_id: str
    access_application_id: str
    account_id: str
    worker_id: str


class ResourceTaggingTaggedResourceResponseSingleUpdateDataRequired(TypedDict):
    account_id: str


class ResourceTaggingTaggedResourceResponseSingleUpdateData(ResourceTaggingTaggedResourceResponseSingleUpdateDataRequired, total=False):
    errors: list
    messages: list
    result: dict
    success: bool


class ZoneRequired(TypedDict):
    account: dict
    errors: list
    messages: list
    name: str
    result: dict
    success: bool


class Zone(ZoneRequired, total=False):
    id: str
    paused: bool
    plan: dict
    result_info: dict
    type: str
    vanity_name_servers: list


class ZoneLoadMatch(TypedDict):
    id: str


class ZoneListMatch(TypedDict, total=False):
    account_id: str
    account_name: str
    direction: str
    match: str
    name: str
    order: str
    page: float
    per_page: float
    status: str
    type: list


class ZoneCreateDataRequired(TypedDict):
    account: dict
    errors: list
    messages: list
    name: str
    result: dict
    success: bool


class ZoneCreateData(ZoneCreateDataRequired, total=False):
    id: str
    paused: bool
    plan: dict
    result_info: dict
    type: str
    vanity_name_servers: list


class ZoneUpdateDataRequired(TypedDict):
    id: str


class ZoneUpdateData(ZoneUpdateDataRequired, total=False):
    account: dict
    errors: list
    messages: list
    name: str
    paused: bool
    plan: dict
    result: dict
    result_info: dict
    success: bool
    type: str
    vanity_name_servers: list


class ZoneRemoveMatch(TypedDict):
    id: str


class ZoneHold(TypedDict, total=False):
    hold: bool
    hold_after: str
    id: str
    include_subdomains: bool
    result: dict


class ZoneHoldLoadMatchRequired(TypedDict):
    id: str


class ZoneHoldLoadMatch(ZoneHoldLoadMatchRequired, total=False):
    zone_id: str


class ZoneHoldCreateDataRequired(TypedDict):
    id: str


class ZoneHoldCreateData(ZoneHoldCreateDataRequired, total=False):
    include_subdomain: bool
    hold: bool
    hold_after: str
    include_subdomains: bool
    result: dict


class ZoneHoldUpdateDataRequired(TypedDict):
    id: str


class ZoneHoldUpdateData(ZoneHoldUpdateDataRequired, total=False):
    hold: bool
    hold_after: str
    include_subdomains: bool
    result: dict


class ZoneHoldRemoveMatchRequired(TypedDict):
    id: str


class ZoneHoldRemoveMatch(ZoneHoldRemoveMatchRequired, total=False):
    hold_after: str
