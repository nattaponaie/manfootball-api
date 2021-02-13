import * as line from '@line/bot-sdk';
declare const LINE_OA_CONFIG: {
    channelAccessToken: string;
    channelSecret: string;
};
declare const client: line.Client;
export { client, LINE_OA_CONFIG };
