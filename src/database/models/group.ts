import { Document, Schema, model, Model } from 'mongoose';

export interface IGroup extends Document {
  id: string;
  hasEvent: boolean;
  eventId: string;
  time: string;
  save: () => void;
}

const GroupSchema: IGroup = new Schema({
  id: {
    type: String,
    default: ''
  },
  hasEvent: {
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

const Group: Model<IGroup> = model('Group', GroupSchema);
export default Group;