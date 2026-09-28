package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAccountEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

var NewAccountSettingEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

var NewCachePurgeApiResponseSingleIdEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

var NewCpsCommunicationPreferenceEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

var NewIamApiResponseSingleIdEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

var NewIamResponseSingleAccountEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

var NewIamSingleUserEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

var NewKaminoEnvironmentEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

var NewResourceEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

var NewResourceTaggingEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

var NewResourceTaggingTagKeySummaryResponseCollectionEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

var NewResourceTaggingTagKeysResponseCollectionEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

var NewResourceTaggingTagValuesResponseCollectionEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

var NewResourceTaggingTaggedResourceResponseSingleEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

var NewZoneEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

var NewZoneHoldEntityFunc func(client *CloudflareAccountManagementSDK, entopts map[string]any) CloudflareAccountManagementEntity

