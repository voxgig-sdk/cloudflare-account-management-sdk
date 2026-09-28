import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { KaminoEnvironment, KaminoEnvironmentListMatch, KaminoEnvironmentCreateData, KaminoEnvironmentUpdateData, KaminoEnvironmentRemoveMatch } from '../CloudflareAccountManagementTypes';
declare class KaminoEnvironmentEntity extends CloudflareAccountManagementEntityBase<KaminoEnvironment> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: KaminoEnvironmentEntity): KaminoEnvironmentEntity;
    list(this: any, reqmatch?: KaminoEnvironmentListMatch, ctrl?: Control): Promise<KaminoEnvironmentEntity[]>;
    create(this: any, reqdata?: KaminoEnvironmentCreateData, ctrl?: Control): Promise<KaminoEnvironmentEntity>;
    update(this: any, reqdata?: KaminoEnvironmentUpdateData, ctrl?: Control): Promise<KaminoEnvironmentEntity>;
    remove(this: any, reqmatch?: KaminoEnvironmentRemoveMatch, ctrl?: Control): Promise<KaminoEnvironmentEntity>;
}
export { KaminoEnvironmentEntity };
