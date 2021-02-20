import { IPlayer } from 'database/models/player';
import { EventDescType, IEvent } from 'database/models/event';
declare const _default: {
    cancelEvent: (userId: string, eventMessageSource: any) => Promise<void>;
    create: (eventMessageSource: any, eventMessageText: any, player: IPlayer) => Promise<EventDescType>;
    findLatest: () => Promise<IEvent>;
    getEventDesc: (eventModel: any) => {
        location: any;
        locationUrl: any;
        time: any;
        totalPlayers: any;
    };
    getCurrentEvent: (eventMessageSource: any) => Promise<IEvent>;
};
export default _default;
