import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { ResourceTagging, ResourceTaggingRemoveMatch } from '../CloudflareAccountManagementTypes';
declare class ResourceTaggingEntity extends CloudflareAccountManagementEntityBase<ResourceTagging> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: ResourceTaggingEntity): ResourceTaggingEntity;
    remove(this: any, reqmatch?: ResourceTaggingRemoveMatch, ctrl?: Control): Promise<ResourceTaggingEntity>;
}
export { ResourceTaggingEntity };
