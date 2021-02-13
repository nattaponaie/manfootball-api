import mongoose from 'mongoose';

import groupDBModel, { IGroup } from 'database/models/group';

const findOrCreate = async (groupId: string): Promise<mongoose.model<IGroup>> => {
  let model = await findLatest(groupId);
  console.log('model0', model);
  if (model) {
    return model;
  }

  model = new groupDBModel();
  model.id = groupId;
  console.log('model', model);
  
  return model;
};

const findLatest = async (id: string) => groupDBModel.findOne({
  id
}, {}, {
  sort: {
    'createdAt': -1
  }
});

export default {
  findOrCreate
};