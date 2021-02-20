import { Document, Model } from 'mongoose';
import { IPlayer } from 'database/models/player';
export interface IEvent extends Document {
    players: IPlayer[];
    isCreated: boolean;
    groups: string[];
    owner: IPlayer;
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
