import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { Account, AccountListMatch, AccountCreateData } from '../CloudflareAccountManagementTypes';
declare class AccountEntity extends CloudflareAccountManagementEntityBase<Account> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: AccountEntity): AccountEntity;
    list(this: any, reqmatch?: AccountListMatch, ctrl?: Control): Promise<AccountEntity[]>;
    create(this: any, reqdata?: AccountCreateData, ctrl?: Control): Promise<AccountEntity>;
}
export { AccountEntity };
