import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { ResourceTaggingTagValuesResponseCollection, ResourceTaggingTagValuesResponseCollectionLoadMatch } from '../CloudflareAccountManagementTypes';
declare class ResourceTaggingTagValuesResponseCollectionEntity extends CloudflareAccountManagementEntityBase<ResourceTaggingTagValuesResponseCollection> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: ResourceTaggingTagValuesResponseCollectionEntity): ResourceTaggingTagValuesResponseCollectionEntity;
    load(this: any, reqmatch?: ResourceTaggingTagValuesResponseCollectionLoadMatch, ctrl?: Control): Promise<ResourceTaggingTagValuesResponseCollectionEntity>;
}
export { ResourceTaggingTagValuesResponseCollectionEntity };
