import { EventSource } from '@line/bot-sdk';
export declare const getGroupId: (eventMessageSource: EventSource) => string;
export declare enum MessageSourceType {
    User = 0,
    Group = 1,
    Room = 2
}
export declare const getMessageSourceType: (eventMessageSource: EventSource) => MessageSourceType;
export declare const getUserId: (eventMessageSource: EventSource) => string;
