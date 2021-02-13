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
  const splitedMsg = eventMessageText.split(' ');
  if (splitedMsg.length !== 3) {
    throw new Error('คำสั่งผิดจ้า /สร้าง (สถานที่) (เวลา)');
  }

  if (eventModel.isCreated) {
    throw new Error('มีคนสร้างแล้วน้า บวกได้เลย (พิมพ์ /+1)');
  }

  eventModel.location = splitedMsg[1];
  if (eventModel.location === 'บอย' || eventModel.location === 'บอยท่าพระจันทร์') {
    eventModel.locationUrl = 'https://www.google.com/maps/dir/13.6655812,100.2712304/%E0%B8%AA%E0%B8%99%E0%B8%B2%E0%B8%A1%E0%B8%9F%E0%B8%B8%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5+%E0%B8%9A%E0%B8%AD%E0%B8%A2+%E0%B8%97%E0%B9%88%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B9%8C+FC+230+Thanon+Utthayan,+Thawi+Watthana,+Bangkok+10170/@13.7299381,100.2474323,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x30e296b031be5a9f:0x4cd1f3d397e96cb5!2m2!1d100.3541667!2d13.7769444';
  }
  eventModel.time = splitedMsg[2];
  eventModel.isCreated = true;
  return getEventDesc(eventModel);
};

const findLatest = async () => eventDBModel.findOne({
  isCreated: true
}, {}, {
  sort: {
    'createdAt': -1
  }
});

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