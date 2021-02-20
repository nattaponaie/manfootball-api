import { IPlayer } from 'database/models/player';
declare const _default: {
    assignMissingGroupId: (eventMessageSource: any) => Promise<IPlayer>;
    findOrCreate: (eventMessageSource: any) => Promise<IPlayer>;
    findOneByUserId: (userId: string) => Promise<IPlayer>;
};
export default _default;
