import { Document, Model } from 'mongoose';
export interface IPlayer extends Document {
    id: string;
    userId: string;
    displayName: string;
    pictureUrl: string;
    groups?: string[];
    save: () => void;
}
declare const Player: Model<IPlayer>;
export default Player;
