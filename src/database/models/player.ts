import { Document, Schema, model, Model } from 'mongoose';

import { IGroup } from 'database/models/group';

export interface IPlayer extends Document {
  id: string;
  userId: string;
  displayName: string;
  pictureUrl: string;
  groups: IGroup[]
}

const PlayerSchema: Schema = new Schema({
  id: {
    type: String,
    default: ''
  },
  userId: {
    type: String,
    default: ''
  },
  displayName: {
    type: String,
    default: ''
  },
  pictureUrl: {
    type: String,
    default: ''
  },
  groups: {
    type: Array,
    default: ''
  },
}, {
  collection: 'Player',
  timestamps: true,
});

const Player: Model<IPlayer> = model('Player', PlayerSchema);
export default Player;
