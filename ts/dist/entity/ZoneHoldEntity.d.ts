import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { ZoneHold, ZoneHoldLoadMatch, ZoneHoldCreateData, ZoneHoldUpdateData, ZoneHoldRemoveMatch } from '../CloudflareAccountManagementTypes';
declare class ZoneHoldEntity extends CloudflareAccountManagementEntityBase<ZoneHold> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: ZoneHoldEntity): ZoneHoldEntity;
    load(this: any, reqmatch?: ZoneHoldLoadMatch, ctrl?: Control): Promise<ZoneHoldEntity>;
    create(this: any, reqdata?: ZoneHoldCreateData, ctrl?: Control): Promise<ZoneHoldEntity>;
    update(this: any, reqdata?: ZoneHoldUpdateData, ctrl?: Control): Promise<ZoneHoldEntity>;
    remove(this: any, reqmatch?: ZoneHoldRemoveMatch, ctrl?: Control): Promise<ZoneHoldEntity>;
}
export { ZoneHoldEntity };
