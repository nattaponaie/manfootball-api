import mongoose, { Document } from 'mongoose';

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

export type EventDescType = {
  location: string;
  locationUrl: string;
  time: string;
  totalPlayers: number;
}

const Schema: IEvent = new mongoose.Schema({
  players: {
    type: Array,
    default: []
  },
  isCreated: {
    type: Boolean,
    default: false
  },
  groups: {
    type: [String],
    default: []
  },
  owner: {
    type: Object,
    default: {}
  },
  location: {
    type: String,
    default: ''
  },
  locationUrl: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
}, {
  collection: 'Event',
  timestamps: true,
});

export default mongoose.model<IEvent>('Event', Schema);