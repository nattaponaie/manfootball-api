import * as line from '@line/bot-sdk';
declare const LINE_OA_CONFIG: {
    channelAccessToken: string;
    channelSecret: string;
};
declare const lineClient: line.Client;
export { lineClient, LINE_OA_CONFIG };
