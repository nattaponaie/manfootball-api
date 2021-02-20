import { IPlayer } from 'database/models/player';
declare const _default: {
    findOrCreate: (eventMessageSource: any) => Promise<IPlayer>;
    findOneByUserId: (userId: string) => Promise<IPlayer>;
    validateGroupPermission: () => Promise<void>;
};
export default _default;
