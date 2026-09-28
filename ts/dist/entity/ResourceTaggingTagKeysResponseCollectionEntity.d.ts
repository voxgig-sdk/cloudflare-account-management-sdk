import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { ResourceTaggingTagKeysResponseCollection, ResourceTaggingTagKeysResponseCollectionListMatch } from '../CloudflareAccountManagementTypes';
declare class ResourceTaggingTagKeysResponseCollectionEntity extends CloudflareAccountManagementEntityBase<ResourceTaggingTagKeysResponseCollection> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: ResourceTaggingTagKeysResponseCollectionEntity): ResourceTaggingTagKeysResponseCollectionEntity;
    list(this: any, reqmatch?: ResourceTaggingTagKeysResponseCollectionListMatch, ctrl?: Control): Promise<ResourceTaggingTagKeysResponseCollectionEntity[]>;
}
export { ResourceTaggingTagKeysResponseCollectionEntity };
