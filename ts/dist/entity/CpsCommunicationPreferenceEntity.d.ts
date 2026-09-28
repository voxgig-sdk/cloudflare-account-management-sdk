import { CloudflareAccountManagementEntityBase } from '../CloudflareAccountManagementEntityBase';
import type { CloudflareAccountManagementSDK } from '../CloudflareAccountManagementSDK';
import type { Control } from '../types';
import type { CpsCommunicationPreference, CpsCommunicationPreferenceListMatch, CpsCommunicationPreferenceUpdateData } from '../CloudflareAccountManagementTypes';
declare class CpsCommunicationPreferenceEntity extends CloudflareAccountManagementEntityBase<CpsCommunicationPreference> {
    constructor(client: CloudflareAccountManagementSDK, entopts: any);
    make(this: CpsCommunicationPreferenceEntity): CpsCommunicationPreferenceEntity;
    list(this: any, reqmatch?: CpsCommunicationPreferenceListMatch, ctrl?: Control): Promise<CpsCommunicationPreferenceEntity[]>;
    update(this: any, reqdata?: CpsCommunicationPreferenceUpdateData, ctrl?: Control): Promise<CpsCommunicationPreferenceEntity>;
}
export { CpsCommunicationPreferenceEntity };
