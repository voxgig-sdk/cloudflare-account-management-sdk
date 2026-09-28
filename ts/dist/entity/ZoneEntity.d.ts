import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { Zone, ZoneLoadMatch, ZoneListMatch, ZoneCreateData, ZoneUpdateData, ZoneRemoveMatch } from '../CloudflareAccountManagementTypes';
declare class ZoneEntity extends CloudflareAccountManagementEntityBase<Zone> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: ZoneEntity): ZoneEntity;
    load(this: any, reqmatch?: ZoneLoadMatch, ctrl?: Control): Promise<ZoneEntity>;
    list(this: any, reqmatch?: ZoneListMatch, ctrl?: Control): Promise<ZoneEntity[]>;
    create(this: any, reqdata?: ZoneCreateData, ctrl?: Control): Promise<ZoneEntity>;
    update(this: any, reqdata?: ZoneUpdateData, ctrl?: Control): Promise<ZoneEntity>;
    remove(this: any, reqmatch?: ZoneRemoveMatch, ctrl?: Control): Promise<ZoneEntity>;
}
export { ZoneEntity };
