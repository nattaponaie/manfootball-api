export declare const getGroupId: (eventMessageSource: any) => string;
export declare enum MessageSourceType {
    User = 0,
    Group = 1,
    Room = 2
}
export declare const getMessageSourceType: (eventMessageSource: any) => MessageSourceType;
export declare const getUserId: (eventMessageSource: any) => string;
