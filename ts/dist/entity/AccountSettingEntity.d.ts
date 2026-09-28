import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { AccountSetting, AccountSettingListMatch, AccountSettingUpdateData } from '../CloudflareAccountManagementTypes';
declare class AccountSettingEntity extends CloudflareAccountManagementEntityBase<AccountSetting> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: AccountSettingEntity): AccountSettingEntity;
    list(this: any, reqmatch?: AccountSettingListMatch, ctrl?: Control): Promise<AccountSettingEntity[]>;
    update(this: any, reqdata?: AccountSettingUpdateData, ctrl?: Control): Promise<AccountSettingEntity>;
}
export { AccountSettingEntity };
