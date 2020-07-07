import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  people: {
    players: { type: Array, default: [] },
  },
  groupIdList: { type: Array, default: [] },
  isCreated: { type: Boolean, default: false },
  location: { type: String, default: '' },
  locationUrl: { type: String, default: '' },
  time: { type: String, default: '' },
}, {
  collection: 'Event',
  timestamps: true,
});

const Model = mongoose.model('Event', Schema);

export default Model;

