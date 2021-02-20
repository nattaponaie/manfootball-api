import groupDBModel, { IGroup } from 'database/models/group';

const findOrCreate = async (groupId: string): Promise<IGroup> => {
  let model = await findLatest(groupId);
  if (model) {
    return model;
  }

  model = new groupDBModel();
  model.id = groupId;
};

const findLatest = async (id: string): Promise<IGroup> => groupDBModel.findOne({
  id
}, {}, {
  sort: {
    'createdAt': -1
  }
});

const findOneByGroupId = async (groupId: string): Promise<IGroup> => groupDBModel.findOne({
  id: groupId
}, {}, {});

const findOneAndUpdate = async (filter, update): Promise<IGroup> => groupDBModel.findOneAndUpdate(filter, update);

export default {
  findOrCreate,
  findOneByGroupId,
  findOneAndUpdate
};