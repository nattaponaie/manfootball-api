import { Document } from 'mongoose';
import { PlayerType } from 'models/player';
export interface IEvent extends Document {
    players: PlayerType[];
    isCreated: boolean;
    groups: string[];
    owner: PlayerType;
    location: string;
    locationUrl: string;
    time: string;
    id: string;
}
export declare type EventDescType = {
    location: string;
    locationUrl: string;
    time: string;
    totalPlayers: number;
};
declare const _default: any;
export default _default;
