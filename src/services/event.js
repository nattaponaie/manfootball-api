import eventDBModel from 'database/models/event';

// const addGroupId = (eventModel, groupId) => {
//   const currentGroupIds = eventModel.getGroupIdList();
//   const isFound = currentGroupIds.find(grId => grId === groupId);
//   if (!isFound) {
//     currentGroupIds.push(groupId);
//     eventModel.setGroupIdList(currentGroupIds);
//   }
// };

const create = (eventModel, eventMessageText) => {
  const splitedMsg = eventMessageText.split(' ') ;
  if (splitedMsg.length !== 3) {
    throw new Error('คำสั่งผิดจ้า /สร้าง (สถานที่) (เวลา)');
  }

  if (eventModel.isCreated) {
    throw new Error('มีคนสร้างแล้วน้า บวกได้เลย (พิมพ์ /+1)');
  }
  
  eventModel.location = splitedMsg[1];
  eventModel.time = splitedMsg[2];
  eventModel.isCreated = true;
  return getEventDesc(eventModel);
};

const findLatest = async () => {
  try {
    const result = eventDBModel.findOne({}, {}, { sort: { 'createdAt': -1 } });
    return result;
  } catch (error) {
    throw error;
  }
};

const getEventDesc = (eventModel) => {
  if (eventModel.isCreated !== true) {
    throw new Error('ยังไม่มีเตะจ้า อยากเปิดพิพม์ /สร้าง (สถานที่) (เวลา)');
  }
  return {
    location: eventModel.location || 'ไม่มี',
    locationUrl: eventModel.locationUrl || 'ไม่มี',
    time: eventModel.time || 'ไม่มี',
    totalPlayers: eventModel.people.players.length || 0,
  };
};

export default {
  // addGroupId,
  create,
  findLatest,
  getEventDesc,
};
