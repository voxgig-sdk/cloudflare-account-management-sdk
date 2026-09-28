import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { ResourceTaggingTagKeySummaryResponseCollection, ResourceTaggingTagKeySummaryResponseCollectionListMatch } from '../CloudflareAccountManagementTypes';
declare class ResourceTaggingTagKeySummaryResponseCollectionEntity extends CloudflareAccountManagementEntityBase<ResourceTaggingTagKeySummaryResponseCollection> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: ResourceTaggingTagKeySummaryResponseCollectionEntity): ResourceTaggingTagKeySummaryResponseCollectionEntity;
    list(this: any, reqmatch?: ResourceTaggingTagKeySummaryResponseCollectionListMatch, ctrl?: Control): Promise<ResourceTaggingTagKeySummaryResponseCollectionEntity[]>;
}
export { ResourceTaggingTagKeySummaryResponseCollectionEntity };
