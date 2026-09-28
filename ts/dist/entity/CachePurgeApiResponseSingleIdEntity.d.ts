import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { CachePurgeApiResponseSingleId, CachePurgeApiResponseSingleIdCreateData } from '../CloudflareAccountManagementTypes';
declare class CachePurgeApiResponseSingleIdEntity extends CloudflareAccountManagementEntityBase<CachePurgeApiResponseSingleId> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: CachePurgeApiResponseSingleIdEntity): CachePurgeApiResponseSingleIdEntity;
    create(this: any, reqdata?: CachePurgeApiResponseSingleIdCreateData, ctrl?: Control): Promise<CachePurgeApiResponseSingleIdEntity>;
}
export { CachePurgeApiResponseSingleIdEntity };
