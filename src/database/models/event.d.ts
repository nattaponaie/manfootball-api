import { Document, Model } from 'mongoose';
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
    save: () => void;
}
export declare type EventDescType = {
    location: string;
    locationUrl: string;
    time: string;
    totalPlayers: number;
};
declare const Event: Model<IEvent>;
export default Event;
