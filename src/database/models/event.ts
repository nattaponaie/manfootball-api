import { Document, Schema, model, Model } from 'mongoose';

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

export type EventDescType = {
  location: string;
  locationUrl: string;
  time: string;
  totalPlayers: number;
}

const EventSchema: IEvent = new Schema({
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

const Event: Model<IEvent> = model('Event', EventSchema);
export default Event;