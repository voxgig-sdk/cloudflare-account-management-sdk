export interface Account {
    id?: string;
}
export interface AccountListMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface AccountCreateData {
    id?: string;
    $action?: string;
    [action: string]: any;
}
export interface AccountSetting {
    errors: any[];
    messages: any[];
    result?: any[];
    success: boolean;
    value: string;
}
export interface AccountSettingListMatch {
    account_id: string;
}
export interface AccountSettingUpdateData {
    account_id: string;
    errors?: any[];
    messages?: any[];
    result?: any[];
    success?: boolean;
    value?: string;
}
export interface CachePurgeApiResponseSingleId {
    errors: any[];
    messages: any[];
    result: Record<string, any>;
    success: boolean;
}
export interface CachePurgeApiResponseSingleIdCreateData {
    environment_id: string;
    zone_id: string;
    errors: any[];
    messages: any[];
    result: Record<string, any>;
    success: boolean;
}
export interface CpsCommunicationPreference {
    errors: any[];
    languagelocale?: string;
    messages: any[];
    preferences?: Record<string, any>;
    result: Record<string, any>;
    success: boolean;
}
export interface CpsCommunicationPreferenceListMatch {
    errors?: any[];
    languagelocale?: string;
    messages?: any[];
    preferences?: Record<string, any>;
    result?: Record<string, any>;
    success?: boolean;
}
export interface CpsCommunicationPreferenceUpdateData {
    errors?: any[];
    languagelocale?: string;
    messages?: any[];
    preferences?: Record<string, any>;
    result?: Record<string, any>;
    success?: boolean;
}
export interface IamApiResponseSingleId {
    name: string;
    result?: any[];
    standalone?: boolean;
    type?: any;
    unit?: Record<string, any>;
}
export interface IamApiResponseSingleIdListMatch {
    direction?: string;
    name?: string;
    page?: number;
    per_page?: number;
}
export interface IamApiResponseSingleIdCreateData {
    name: string;
    result?: any[];
    standalone?: boolean;
    type?: any;
    unit?: Record<string, any>;
}
export interface IamApiResponseSingleIdRemoveMatch {
    account_id: string;
}
export interface IamResponseSingleAccount {
    id?: string;
    result: Record<string, any>;
}
export interface IamResponseSingleAccountLoadMatch {
    id: string;
}
export interface IamResponseSingleAccountCreateData {
    account_id: string;
    id?: string;
    result: Record<string, any>;
    $action?: string;
    [action: string]: any;
}
export interface IamResponseSingleAccountUpdateData {
    id: string;
    result?: Record<string, any>;
    $action?: string;
    [action: string]: any;
}
export interface IamSingleUser {
    country?: string;
    first_name?: string;
    last_name?: string;
    result: Record<string, any>;
    telephone?: string;
    zipcode?: string;
}
export interface IamSingleUserLoadMatch {
    country?: string;
    first_name?: string;
    last_name?: string;
    result?: Record<string, any>;
    telephone?: string;
    zipcode?: string;
}
export interface IamSingleUserUpdateData {
    country?: string;
    first_name?: string;
    last_name?: string;
    result?: Record<string, any>;
    telephone?: string;
    zipcode?: string;
}
export interface KaminoEnvironment {
    environments: any[];
    errors: any[];
    id?: string;
    messages: any[];
    result: Record<string, any>;
    success: boolean;
}
export interface KaminoEnvironmentListMatch {
    zone_id: string;
}
export interface KaminoEnvironmentCreateData {
    environment_id?: string;
    zone_id: string;
    environments: any[];
    errors: any[];
    id?: string;
    messages: any[];
    result: Record<string, any>;
    success: boolean;
}
export interface KaminoEnvironmentUpdateData {
    zone_id: string;
    environments?: any[];
    errors?: any[];
    id?: string;
    messages?: any[];
    result?: Record<string, any>;
    success?: boolean;
}
export interface KaminoEnvironmentRemoveMatch {
    id: string;
    zone_id: string;
}
export interface Resource {
    errors: any[];
    messages: any[];
    result?: any[];
    result_info?: Record<string, any>;
    success: boolean;
}
export interface ResourceListMatch {
    account_id: string;
    case_insensitive?: boolean;
    cursor?: string;
    id?: any[];
    name?: string;
    tag?: any[];
    type?: any[];
}
export interface ResourceTagging {
}
export interface ResourceTaggingRemoveMatch {
    account_id: string;
}
export interface ResourceTaggingTagKeySummaryResponseCollection {
    errors: any[];
    messages: any[];
    result?: any[];
    result_info?: Record<string, any>;
    success: boolean;
}
export interface ResourceTaggingTagKeySummaryResponseCollectionListMatch {
    account_id: string;
    cursor?: string;
}
export interface ResourceTaggingTagKeysResponseCollection {
    errors: any[];
    messages: any[];
    result?: any[];
    result_info?: Record<string, any>;
    success: boolean;
}
export interface ResourceTaggingTagKeysResponseCollectionListMatch {
    account_id: string;
    cursor?: string;
}
export interface ResourceTaggingTagValuesResponseCollection {
    errors: any[];
    messages: any[];
    result?: any[];
    result_info?: Record<string, any>;
    success: boolean;
}
export interface ResourceTaggingTagValuesResponseCollectionLoadMatch {
    account_id: string;
    tag_key: string;
    cursor?: string;
    type?: string;
}
export interface ResourceTaggingTaggedResourceResponseSingle {
    errors: any[];
    messages: any[];
    result?: Record<string, any>;
    success: boolean;
}
export interface ResourceTaggingTaggedResourceResponseSingleListMatch {
    zone_id?: string;
    access_application_id?: string;
    resource_id: string;
    resource_type: string;
    account_id?: string;
    worker_id?: string;
}
export interface ResourceTaggingTaggedResourceResponseSingleUpdateData {
    account_id: string;
    errors?: any[];
    messages?: any[];
    result?: Record<string, any>;
    success?: boolean;
}
export interface Zone {
    account: Record<string, any>;
    errors: any[];
    id?: string;
    messages: any[];
    name: string;
    paused?: boolean;
    plan?: Record<string, any>;
    result: Record<string, any>;
    result_info?: Record<string, any>;
    success: boolean;
    type?: string;
    vanity_name_servers?: any[];
}
export interface ZoneLoadMatch {
    id: string;
}
export interface ZoneListMatch {
    account_id?: string;
    account_name?: string;
    direction?: string;
    match?: string;
    name?: string;
    order?: string;
    page?: number;
    per_page?: number;
    status?: string;
    type?: any[];
}
export interface ZoneCreateData {
    account: Record<string, any>;
    errors: any[];
    id?: string;
    messages: any[];
    name: string;
    paused?: boolean;
    plan?: Record<string, any>;
    result: Record<string, any>;
    result_info?: Record<string, any>;
    success: boolean;
    type?: string;
    vanity_name_servers?: any[];
}
export interface ZoneUpdateData {
    id: string;
    account?: Record<string, any>;
    errors?: any[];
    messages?: any[];
    name?: string;
    paused?: boolean;
    plan?: Record<string, any>;
    result?: Record<string, any>;
    result_info?: Record<string, any>;
    success?: boolean;
    type?: string;
    vanity_name_servers?: any[];
    $action?: string;
    [action: string]: any;
}
export interface ZoneRemoveMatch {
    id: string;
}
export interface ZoneHold {
    hold?: boolean;
    hold_after?: string;
    id?: string;
    include_subdomains?: boolean;
    result?: Record<string, any>;
}
export interface ZoneHoldLoadMatch {
    id: string;
    zone_id?: string;
}
export interface ZoneHoldCreateData {
    id: string;
    include_subdomain?: boolean;
    hold?: boolean;
    hold_after?: string;
    include_subdomains?: boolean;
    result?: Record<string, any>;
}
export interface ZoneHoldUpdateData {
    id: string;
    hold?: boolean;
    hold_after?: string;
    include_subdomains?: boolean;
    result?: Record<string, any>;
}
export interface ZoneHoldRemoveMatch {
    id: string;
    hold_after?: string;
}
