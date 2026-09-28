package voxgigcloudflareaccountmanagementsdk

import (
	"github.com/voxgig-sdk/cloudflare-account-management-sdk/go/core"
	"github.com/voxgig-sdk/cloudflare-account-management-sdk/go/entity"
	"github.com/voxgig-sdk/cloudflare-account-management-sdk/go/feature"
	_ "github.com/voxgig-sdk/cloudflare-account-management-sdk/go/utility"
)

// Type aliases preserve external API.
type CloudflareAccountManagementSDK = core.CloudflareAccountManagementSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CloudflareAccountManagementEntity = core.CloudflareAccountManagementEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CloudflareAccountManagementError = core.CloudflareAccountManagementError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAccountEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewAccountEntity(client, entopts)
	}
	core.NewAccountSettingEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewAccountSettingEntity(client, entopts)
	}
	core.NewCachePurgeApiResponseSingleIdEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewCachePurgeApiResponseSingleIdEntity(client, entopts)
	}
	core.NewCpsCommunicationPreferenceEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewCpsCommunicationPreferenceEntity(client, entopts)
	}
	core.NewIamApiResponseSingleIdEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewIamApiResponseSingleIdEntity(client, entopts)
	}
	core.NewIamResponseSingleAccountEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewIamResponseSingleAccountEntity(client, entopts)
	}
	core.NewIamSingleUserEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewIamSingleUserEntity(client, entopts)
	}
	core.NewKaminoEnvironmentEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewKaminoEnvironmentEntity(client, entopts)
	}
	core.NewResourceEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewResourceEntity(client, entopts)
	}
	core.NewResourceTaggingEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewResourceTaggingEntity(client, entopts)
	}
	core.NewResourceTaggingTagKeySummaryResponseCollectionEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewResourceTaggingTagKeySummaryResponseCollectionEntity(client, entopts)
	}
	core.NewResourceTaggingTagKeysResponseCollectionEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewResourceTaggingTagKeysResponseCollectionEntity(client, entopts)
	}
	core.NewResourceTaggingTagValuesResponseCollectionEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewResourceTaggingTagValuesResponseCollectionEntity(client, entopts)
	}
	core.NewResourceTaggingTaggedResourceResponseSingleEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewResourceTaggingTaggedResourceResponseSingleEntity(client, entopts)
	}
	core.NewZoneEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewZoneEntity(client, entopts)
	}
	core.NewZoneHoldEntityFunc = func(client *core.CloudflareAccountManagementSDK, entopts map[string]any) core.CloudflareAccountManagementEntity {
		return entity.NewZoneHoldEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCloudflareAccountManagementSDK = core.NewCloudflareAccountManagementSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewCloudflareAccountManagementSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *CloudflareAccountManagementSDK  { return NewCloudflareAccountManagementSDK(nil) }
func Test() *CloudflareAccountManagementSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
