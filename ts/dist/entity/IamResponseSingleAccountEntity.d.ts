import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { IamResponseSingleAccount, IamResponseSingleAccountLoadMatch, IamResponseSingleAccountCreateData, IamResponseSingleAccountUpdateData } from '../CloudflareAccountManagementTypes';
declare class IamResponseSingleAccountEntity extends CloudflareAccountManagementEntityBase<IamResponseSingleAccount> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: IamResponseSingleAccountEntity): IamResponseSingleAccountEntity;
    load(this: any, reqmatch?: IamResponseSingleAccountLoadMatch, ctrl?: Control): Promise<IamResponseSingleAccountEntity>;
    create(this: any, reqdata?: IamResponseSingleAccountCreateData, ctrl?: Control): Promise<IamResponseSingleAccountEntity>;
    update(this: any, reqdata?: IamResponseSingleAccountUpdateData, ctrl?: Control): Promise<IamResponseSingleAccountEntity>;
}
export { IamResponseSingleAccountEntity };
