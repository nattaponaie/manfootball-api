import groupDBModel, { IGroup } from 'database/models/group';

const findOrCreate = async (groupId: string): Promise<IGroup> => {
  let model = await findOneByGroupId(groupId);
  if (model) {
    return model;
  }

  model = new groupDBModel();
  model.id = groupId;
  return model;
};

const findOneByGroupId = async (groupId: string): Promise<IGroup> => groupDBModel.findOne({
  id: groupId
}, {}, {});

const findOneAndUpdate = async (filter, update): Promise<IGroup> => groupDBModel.findOneAndUpdate(filter, update);

export default {
  findOrCreate,
  findOneByGroupId,
  findOneAndUpdate
};