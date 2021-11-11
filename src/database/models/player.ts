import { Document, Schema, model, Model } from 'mongoose';
export interface IPlayer extends Document {
  id: string;
  userId: string;
  displayName: string;
  pictureUrl: string;
  groups?: string[];
  save: () => void;
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
