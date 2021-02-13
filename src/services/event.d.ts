import { EventDescType } from 'database/models/event';
declare const _default: {
    create: (eventMessageSource: any, eventMessageText: any) => Promise<EventDescType>;
    findLatest: () => Promise<any>;
    getEventDesc: (eventModel: any) => {
        location: any;
        locationUrl: any;
        time: any;
        totalPlayers: any;
    };
};
export default _default;
