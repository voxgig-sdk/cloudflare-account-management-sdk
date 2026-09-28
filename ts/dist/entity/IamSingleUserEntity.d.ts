import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { IamSingleUser, IamSingleUserLoadMatch, IamSingleUserUpdateData } from '../CloudflareAccountManagementTypes';
declare class IamSingleUserEntity extends CloudflareAccountManagementEntityBase<IamSingleUser> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: IamSingleUserEntity): IamSingleUserEntity;
    load(this: any, reqmatch?: IamSingleUserLoadMatch, ctrl?: Control): Promise<IamSingleUserEntity>;
    update(this: any, reqdata?: IamSingleUserUpdateData, ctrl?: Control): Promise<IamSingleUserEntity>;
}
export { IamSingleUserEntity };
