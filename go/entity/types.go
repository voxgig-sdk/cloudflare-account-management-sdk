// Typed models for the CloudflareAccountManagement SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/cloudflare-account-management-sdk/go/core"
)

// Account is the typed data model for the account entity.
type Account struct {
}

// AccountListMatch is the typed request payload for Account.ListTyped.
type AccountListMatch struct {
	Id string `json:"id"`
}

// AccountCreateData is the typed request payload for Account.CreateTyped.
type AccountCreateData struct {
	Id *string `json:"id,omitempty"`
}

// AccountSetting is the typed data model for the account_setting entity.
type AccountSetting struct {
}

// AccountSettingListMatch is the typed request payload for AccountSetting.ListTyped.
type AccountSettingListMatch struct {
	AccountId string `json:"account_id"`
}

// AccountSettingUpdateData is the typed request payload for AccountSetting.UpdateTyped.
type AccountSettingUpdateData struct {
	AccountId string `json:"account_id"`
	Errors *[]any `json:"errors,omitempty"`
	Messages *[]any `json:"messages,omitempty"`
	Result *[]any `json:"result,omitempty"`
	Success *bool `json:"success,omitempty"`
	Value *string `json:"value,omitempty"`
}

// CachePurgeApiResponseSingleId is the typed data model for the cache_purge_api_response_single_id entity.
type CachePurgeApiResponseSingleId struct {
}

// CachePurgeApiResponseSingleIdCreateData is the typed request payload for CachePurgeApiResponseSingleId.CreateTyped.
type CachePurgeApiResponseSingleIdCreateData struct {
	EnvironmentId string `json:"environment_id"`
	ZoneId string `json:"zone_id"`
	Errors []any `json:"errors"`
	Messages []any `json:"messages"`
	Result map[string]any `json:"result"`
	Success bool `json:"success"`
}

// CpsCommunicationPreference is the typed data model for the cps_communication_preference entity.
type CpsCommunicationPreference struct {
}

// CpsCommunicationPreferenceListMatch is the typed request payload for CpsCommunicationPreference.ListTyped.
type CpsCommunicationPreferenceListMatch struct {
	Errors *[]any `json:"errors,omitempty"`
	Languagelocale *string `json:"languagelocale,omitempty"`
	Messages *[]any `json:"messages,omitempty"`
	Preferences *map[string]any `json:"preferences,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// CpsCommunicationPreferenceUpdateData is the typed request payload for CpsCommunicationPreference.UpdateTyped.
type CpsCommunicationPreferenceUpdateData struct {
	Errors *[]any `json:"errors,omitempty"`
	Languagelocale *string `json:"languagelocale,omitempty"`
	Messages *[]any `json:"messages,omitempty"`
	Preferences *map[string]any `json:"preferences,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// IamApiResponseSingleId is the typed data model for the iam_api_response_single_id entity.
type IamApiResponseSingleId struct {
}

// IamApiResponseSingleIdListMatch is the typed request payload for IamApiResponseSingleId.ListTyped.
type IamApiResponseSingleIdListMatch struct {
	Direction *string `json:"direction,omitempty"`
	Name *string `json:"name,omitempty"`
	Page *float64 `json:"page,omitempty"`
	PerPage *float64 `json:"per_page,omitempty"`
}

// IamApiResponseSingleIdCreateData is the typed request payload for IamApiResponseSingleId.CreateTyped.
type IamApiResponseSingleIdCreateData struct {
	Name string `json:"name"`
	Result *[]any `json:"result,omitempty"`
	Standalone *bool `json:"standalone,omitempty"`
	Type *any `json:"type,omitempty"`
	Unit *map[string]any `json:"unit,omitempty"`
}

// IamApiResponseSingleIdRemoveMatch is the typed request payload for IamApiResponseSingleId.RemoveTyped.
type IamApiResponseSingleIdRemoveMatch struct {
	AccountId string `json:"account_id"`
}

// IamResponseSingleAccount is the typed data model for the iam_response_single_account entity.
type IamResponseSingleAccount struct {
}

// IamResponseSingleAccountLoadMatch is the typed request payload for IamResponseSingleAccount.LoadTyped.
type IamResponseSingleAccountLoadMatch struct {
	Id string `json:"id"`
}

// IamResponseSingleAccountCreateData is the typed request payload for IamResponseSingleAccount.CreateTyped.
type IamResponseSingleAccountCreateData struct {
	AccountId string `json:"account_id"`
	Id *string `json:"id,omitempty"`
	Result map[string]any `json:"result"`
}

// IamResponseSingleAccountUpdateData is the typed request payload for IamResponseSingleAccount.UpdateTyped.
type IamResponseSingleAccountUpdateData struct {
	Id string `json:"id"`
	Result *map[string]any `json:"result,omitempty"`
}

// IamSingleUser is the typed data model for the iam_single_user entity.
type IamSingleUser struct {
}

// IamSingleUserLoadMatch is the typed request payload for IamSingleUser.LoadTyped.
type IamSingleUserLoadMatch struct {
	Country *string `json:"country,omitempty"`
	FirstName *string `json:"first_name,omitempty"`
	LastName *string `json:"last_name,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
	Telephone *string `json:"telephone,omitempty"`
	Zipcode *string `json:"zipcode,omitempty"`
}

// IamSingleUserUpdateData is the typed request payload for IamSingleUser.UpdateTyped.
type IamSingleUserUpdateData struct {
	Country *string `json:"country,omitempty"`
	FirstName *string `json:"first_name,omitempty"`
	LastName *string `json:"last_name,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
	Telephone *string `json:"telephone,omitempty"`
	Zipcode *string `json:"zipcode,omitempty"`
}

// KaminoEnvironment is the typed data model for the kamino_environment entity.
type KaminoEnvironment struct {
}

// KaminoEnvironmentListMatch is the typed request payload for KaminoEnvironment.ListTyped.
type KaminoEnvironmentListMatch struct {
	ZoneId string `json:"zone_id"`
}

// KaminoEnvironmentCreateData is the typed request payload for KaminoEnvironment.CreateTyped.
type KaminoEnvironmentCreateData struct {
	EnvironmentId *string `json:"environment_id,omitempty"`
	ZoneId string `json:"zone_id"`
	Environments []any `json:"environments"`
	Errors []any `json:"errors"`
	Id *string `json:"id,omitempty"`
	Messages []any `json:"messages"`
	Result map[string]any `json:"result"`
	Success bool `json:"success"`
}

// KaminoEnvironmentUpdateData is the typed request payload for KaminoEnvironment.UpdateTyped.
type KaminoEnvironmentUpdateData struct {
	ZoneId string `json:"zone_id"`
	Environments *[]any `json:"environments,omitempty"`
	Errors *[]any `json:"errors,omitempty"`
	Id *string `json:"id,omitempty"`
	Messages *[]any `json:"messages,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// KaminoEnvironmentRemoveMatch is the typed request payload for KaminoEnvironment.RemoveTyped.
type KaminoEnvironmentRemoveMatch struct {
	Id string `json:"id"`
	ZoneId string `json:"zone_id"`
}

// Resource is the typed data model for the resource entity.
type Resource struct {
}

// ResourceListMatch is the typed request payload for Resource.ListTyped.
type ResourceListMatch struct {
	AccountId string `json:"account_id"`
	CaseInsensitive *bool `json:"case_insensitive,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	Id *[]any `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Type *[]any `json:"type,omitempty"`
}

// ResourceTagging is the typed data model for the resource_tagging entity.
type ResourceTagging struct {
}

// ResourceTaggingRemoveMatch is the typed request payload for ResourceTagging.RemoveTyped.
type ResourceTaggingRemoveMatch struct {
	AccountId string `json:"account_id"`
}

// ResourceTaggingTagKeySummaryResponseCollection is the typed data model for the resource_tagging_tag_key_summary_response_collection entity.
type ResourceTaggingTagKeySummaryResponseCollection struct {
}

// ResourceTaggingTagKeySummaryResponseCollectionListMatch is the typed request payload for ResourceTaggingTagKeySummaryResponseCollection.ListTyped.
type ResourceTaggingTagKeySummaryResponseCollectionListMatch struct {
	AccountId string `json:"account_id"`
	Cursor *string `json:"cursor,omitempty"`
}

// ResourceTaggingTagKeysResponseCollection is the typed data model for the resource_tagging_tag_keys_response_collection entity.
type ResourceTaggingTagKeysResponseCollection struct {
}

// ResourceTaggingTagKeysResponseCollectionListMatch is the typed request payload for ResourceTaggingTagKeysResponseCollection.ListTyped.
type ResourceTaggingTagKeysResponseCollectionListMatch struct {
	AccountId string `json:"account_id"`
	Cursor *string `json:"cursor,omitempty"`
}

// ResourceTaggingTagValuesResponseCollection is the typed data model for the resource_tagging_tag_values_response_collection entity.
type ResourceTaggingTagValuesResponseCollection struct {
}

// ResourceTaggingTagValuesResponseCollectionLoadMatch is the typed request payload for ResourceTaggingTagValuesResponseCollection.LoadTyped.
type ResourceTaggingTagValuesResponseCollectionLoadMatch struct {
	AccountId string `json:"account_id"`
	TagKey string `json:"tag_key"`
	Cursor *string `json:"cursor,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ResourceTaggingTaggedResourceResponseSingle is the typed data model for the resource_tagging_tagged_resource_response_single entity.
type ResourceTaggingTaggedResourceResponseSingle struct {
}

// ResourceTaggingTaggedResourceResponseSingleListMatch is the typed request payload for ResourceTaggingTaggedResourceResponseSingle.ListTyped.
type ResourceTaggingTaggedResourceResponseSingleListMatch struct {
	ZoneId *string `json:"zone_id,omitempty"`
	AccessApplicationId *string `json:"access_application_id,omitempty"`
	ResourceId string `json:"resource_id"`
	ResourceType string `json:"resource_type"`
	AccountId *string `json:"account_id,omitempty"`
	WorkerId *string `json:"worker_id,omitempty"`
}

// ResourceTaggingTaggedResourceResponseSingleUpdateData is the typed request payload for ResourceTaggingTaggedResourceResponseSingle.UpdateTyped.
type ResourceTaggingTaggedResourceResponseSingleUpdateData struct {
	AccountId string `json:"account_id"`
	Errors *[]any `json:"errors,omitempty"`
	Messages *[]any `json:"messages,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// Zone is the typed data model for the zone entity.
type Zone struct {
}

// ZoneLoadMatch is the typed request payload for Zone.LoadTyped.
type ZoneLoadMatch struct {
	Id string `json:"id"`
}

// ZoneListMatch is the typed request payload for Zone.ListTyped.
type ZoneListMatch struct {
	AccountId *string `json:"account_id,omitempty"`
	AccountName *string `json:"account_name,omitempty"`
	Direction *string `json:"direction,omitempty"`
	Match *string `json:"match,omitempty"`
	Name *string `json:"name,omitempty"`
	Order *string `json:"order,omitempty"`
	Page *float64 `json:"page,omitempty"`
	PerPage *float64 `json:"per_page,omitempty"`
	Status *string `json:"status,omitempty"`
	Type *[]any `json:"type,omitempty"`
}

// ZoneCreateData is the typed request payload for Zone.CreateTyped.
type ZoneCreateData struct {
	Account map[string]any `json:"account"`
	Errors []any `json:"errors"`
	Id *string `json:"id,omitempty"`
	Messages []any `json:"messages"`
	Name string `json:"name"`
	Paused *bool `json:"paused,omitempty"`
	Plan *map[string]any `json:"plan,omitempty"`
	Result map[string]any `json:"result"`
	ResultInfo *map[string]any `json:"result_info,omitempty"`
	Success bool `json:"success"`
	Type *string `json:"type,omitempty"`
	VanityNameServers *[]any `json:"vanity_name_servers,omitempty"`
}

// ZoneUpdateData is the typed request payload for Zone.UpdateTyped.
type ZoneUpdateData struct {
	Id string `json:"id"`
	Account *map[string]any `json:"account,omitempty"`
	Errors *[]any `json:"errors,omitempty"`
	Messages *[]any `json:"messages,omitempty"`
	Name *string `json:"name,omitempty"`
	Paused *bool `json:"paused,omitempty"`
	Plan *map[string]any `json:"plan,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
	ResultInfo *map[string]any `json:"result_info,omitempty"`
	Success *bool `json:"success,omitempty"`
	Type *string `json:"type,omitempty"`
	VanityNameServers *[]any `json:"vanity_name_servers,omitempty"`
}

// ZoneRemoveMatch is the typed request payload for Zone.RemoveTyped.
type ZoneRemoveMatch struct {
	Id string `json:"id"`
}

// ZoneHold is the typed data model for the zone_hold entity.
type ZoneHold struct {
}

// ZoneHoldLoadMatch is the typed request payload for ZoneHold.LoadTyped.
type ZoneHoldLoadMatch struct {
	Id string `json:"id"`
	ZoneId *string `json:"zone_id,omitempty"`
}

// ZoneHoldCreateData is the typed request payload for ZoneHold.CreateTyped.
type ZoneHoldCreateData struct {
	Id string `json:"id"`
	IncludeSubdomain *bool `json:"include_subdomain,omitempty"`
	Hold *bool `json:"hold,omitempty"`
	HoldAfter *string `json:"hold_after,omitempty"`
	IncludeSubdomains *bool `json:"include_subdomains,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
}

// ZoneHoldUpdateData is the typed request payload for ZoneHold.UpdateTyped.
type ZoneHoldUpdateData struct {
	Id string `json:"id"`
	Hold *bool `json:"hold,omitempty"`
	HoldAfter *string `json:"hold_after,omitempty"`
	IncludeSubdomains *bool `json:"include_subdomains,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
}

// ZoneHoldRemoveMatch is the typed request payload for ZoneHold.RemoveTyped.
type ZoneHoldRemoveMatch struct {
	Id string `json:"id"`
	HoldAfter *string `json:"hold_after,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
