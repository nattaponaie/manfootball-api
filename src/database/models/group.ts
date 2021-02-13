import mongoose, { Document } from 'mongoose';

export interface IGroup extends Document {
  id: string;
  isCreated: boolean;
  eventId: string;
}

const Schema: IGroup = new mongoose.Schema({
  id: {
    type: String,
    default: ''
  },
  isCreated: {
    type: Boolean,
    default: false
  },
  eventId: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  },
}, {
  collection: 'Group',
  timestamps: true,
});

export default mongoose.model<IGroup>('Group', Schema);