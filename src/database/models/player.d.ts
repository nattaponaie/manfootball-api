import { Document, Model } from 'mongoose';
import { IGroup } from 'database/models/group';
export interface IPlayer extends Document {
    id: string;
    userId: string;
    displayName: string;
    pictureUrl: string;
    groups: IGroup[];
}
declare const Player: Model<IPlayer>;
export default Player;
