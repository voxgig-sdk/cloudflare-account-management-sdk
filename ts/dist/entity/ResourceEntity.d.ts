import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { Resource, ResourceListMatch } from '../CloudflareAccountManagementTypes';
declare class ResourceEntity extends CloudflareAccountManagementEntityBase<Resource> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: ResourceEntity): ResourceEntity;
    list(this: any, reqmatch?: ResourceListMatch, ctrl?: Control): Promise<ResourceEntity[]>;
}
export { ResourceEntity };
