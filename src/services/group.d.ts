import { IGroup } from 'database/models/group';
declare const _default: {
    findOrCreate: (groupId: string) => Promise<IGroup>;
    findOneByGroupId: (groupId: string) => Promise<IGroup>;
    findOneAndUpdate: (filter: any, update: any) => Promise<IGroup>;
};
export default _default;
