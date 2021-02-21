import { EventSource, Profile } from '@line/bot-sdk';
import { IPlayer } from 'database/models/player';
import { EventDescType, IEvent } from 'database/models/event';
declare const _default: {
    addPlayer: (eventMessageSource: EventSource, eventMessageText: string, profile: Profile, player: IPlayer) => Promise<IEvent>;
    cancelEvent: (userId: string, eventMessageSource: EventSource) => Promise<void>;
    create: (eventMessageSource: EventSource, eventMessageText: string, player: IPlayer) => Promise<EventDescType>;
    findLatest: () => Promise<IEvent>;
    getAddPlayerInputNumber: (eventMessageText: string) => number;
    getEventDesc: (eventModel: IEvent) => EventDescType;
    getCurrentEvent: (eventMessageSource: EventSource) => Promise<IEvent>;
    getCurrentEventPlayers: (eventMessageSource: EventSource) => Promise<IPlayer[]>;
    getCurrentEventPlayerCount: (eventMessageSource: EventSource) => Promise<number>;
    getRemovePlayerInputNumber: (eventMessageText: string) => number;
    removePlayer: (eventMessageSource: EventSource, eventMessageText: string, profile: Profile) => Promise<IEvent>;
};
export default _default;
