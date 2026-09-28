import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { ResourceTaggingTaggedResourceResponseSingle, ResourceTaggingTaggedResourceResponseSingleListMatch, ResourceTaggingTaggedResourceResponseSingleUpdateData } from '../CloudflareAccountManagementTypes';
declare class ResourceTaggingTaggedResourceResponseSingleEntity extends CloudflareAccountManagementEntityBase<ResourceTaggingTaggedResourceResponseSingle> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: ResourceTaggingTaggedResourceResponseSingleEntity): ResourceTaggingTaggedResourceResponseSingleEntity;
    list(this: any, reqmatch?: ResourceTaggingTaggedResourceResponseSingleListMatch, ctrl?: Control): Promise<ResourceTaggingTaggedResourceResponseSingleEntity[]>;
    update(this: any, reqdata?: ResourceTaggingTaggedResourceResponseSingleUpdateData, ctrl?: Control): Promise<ResourceTaggingTaggedResourceResponseSingleEntity>;
}
export { ResourceTaggingTaggedResourceResponseSingleEntity };
