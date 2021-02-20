import { IPlayer } from 'database/models/player';
import { EventDescType, IEvent } from 'database/models/event';
declare const _default: {
    addPlayer: (eventMessageSource: any, eventMessageText: any, profile: any, player: IPlayer) => Promise<IEvent>;
    cancelEvent: (userId: string, eventMessageSource: any) => Promise<void>;
    create: (eventMessageSource: any, eventMessageText: any, player: IPlayer) => Promise<EventDescType>;
    findLatest: () => Promise<IEvent>;
    getAddPlayerInputNumber: (eventMessageText: any) => number;
    getEventDesc: (eventModel: any) => {
        location: any;
        locationUrl: any;
        time: any;
        totalPlayers: any;
    };
    getCurrentEvent: (eventMessageSource: any) => Promise<IEvent>;
    getCurrentEventPlayers: (eventMessageSource: any) => Promise<IPlayer[]>;
    getCurrentEventPlayerCount: (eventMessageSource: any) => Promise<number>;
    getRemovePlayerInputNumber: (eventMessageText: any) => number;
    removePlayer: (eventMessageSource: any, eventMessageText: any, profile: any) => Promise<IEvent>;
};
export default _default;
