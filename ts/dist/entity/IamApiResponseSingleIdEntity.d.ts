import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { IamApiResponseSingleId, IamApiResponseSingleIdListMatch, IamApiResponseSingleIdCreateData, IamApiResponseSingleIdRemoveMatch } from '../CloudflareAccountManagementTypes';
declare class IamApiResponseSingleIdEntity extends CloudflareAccountManagementEntityBase<IamApiResponseSingleId> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: IamApiResponseSingleIdEntity): IamApiResponseSingleIdEntity;
    list(this: any, reqmatch?: IamApiResponseSingleIdListMatch, ctrl?: Control): Promise<IamApiResponseSingleIdEntity[]>;
    create(this: any, reqdata?: IamApiResponseSingleIdCreateData, ctrl?: Control): Promise<IamApiResponseSingleIdEntity>;
    remove(this: any, reqmatch?: IamApiResponseSingleIdRemoveMatch, ctrl?: Control): Promise<IamApiResponseSingleIdEntity>;
}
export { IamApiResponseSingleIdEntity };
