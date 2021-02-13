import { get } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import eventDBModel from 'database/models/event';

import groupService from 'services/group';

import { EventDescType } from 'database/models/event';

// const addGroupId = (eventModel, groupId) => {
//   const currentGroupIds = eventModel.getGroupIdList();
//   const isFound = currentGroupIds.find(grId => grId === groupId);
//   if (!isFound) {
//     currentGroupIds.push(groupId);
//     eventModel.setGroupIdList(currentGroupIds);
//   }
// };

const create = async (eventMessageSource, eventMessageText): Promise<EventDescType> => {
  const splitedMsg = eventMessageText.split(' ');
  if (splitedMsg.length !== 3) {
    throw new Error('คำสั่งผิดจ้า /สร้าง (สถานที่) (เวลา)');
  }

  const groupId = getGroupId(eventMessageSource);
  if (!groupId) {
    throw new Error('เกิดข้อผิดพลาด ลองใหม่อีกครั้งน้า');
  }

  const groupModel = await groupService.findOrCreate(groupId);
  console.log('groupModel', groupModel);
  

  if (groupModel.isCreated) {
    throw new Error('มีคนสร้างแล้วน้า บวกได้เลย (พิมพ์ /+1)');
  } else {
    groupModel.isCreated = true;
  }
  console.log('groupModel0');
  
  groupModel.save();
  console.log('groupModel1');
  

  let eventModel = await findOneByGroupId(groupId);
  if (!eventModel) {
    eventModel = new eventDBModel();
  }
  console.log('eventModel', eventModel);
  
  eventModel.location = splitedMsg[1];
  if (eventModel.location === 'บอย' || eventModel.location === 'บอยท่าพระจันทร์') {
    eventModel.locationUrl = 'https://www.google.com/maps/dir/13.6655812,100.2712304/%E0%B8%AA%E0%B8%99%E0%B8%B2%E0%B8%A1%E0%B8%9F%E0%B8%B8%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5+%E0%B8%9A%E0%B8%AD%E0%B8%A2+%E0%B8%97%E0%B9%88%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B9%8C+FC+230+Thanon+Utthayan,+Thawi+Watthana,+Bangkok+10170/@13.7299381,100.2474323,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x30e296b031be5a9f:0x4cd1f3d397e96cb5!2m2!1d100.3541667!2d13.7769444';
  }
  eventModel.time = splitedMsg[2];

  eventModel.id = uuidv4();
  eventModel.save();

  eventModel.groups.push(groupId);

  return getEventDesc(eventModel);
};

const getGroupId = (eventMessageSource): string => {
  const messageSourceType = get(eventMessageSource, 'type');
  if (!messageSourceType) {
    return;
  }

  let groupId = get(eventMessageSource, 'userId');
  if (messageSourceType === 'room') {
    groupId = get(eventMessageSource, 'roomId');
  } else if (messageSourceType === 'room') {
    groupId = get(eventMessageSource, 'roomId');
  } else if (messageSourceType === 'group') {
    groupId = get(eventMessageSource, 'groupId');
  }
  return groupId;
};

const findLatest = async () => eventDBModel.findOne({
  isCreated: true
}, {}, {
  sort: {
    'createdAt': -1
  }
});

const findOneByGroupId = async (groupId: string) => eventDBModel.findOne({
  isCreated: true,
  groups: groupId
}, {}, {});

const getEventDesc = (eventModel) => {
  // if (eventModel.isCreated !== true) {
  //   throw new Error('ยังไม่มีเตะจ้า อยากเปิดพิพม์ /สร้าง (สถานที่) (เวลา)');
  // }
  return {
    location: eventModel.location || 'ไม่มี',
    locationUrl: eventModel.locationUrl || 'ไม่มี',
    time: eventModel.time || 'ไม่มี',
    totalPlayers: eventModel.players.length || 0,
  };
};

export default {
  // addGroupId,
  create,
  findLatest,
  getEventDesc,
};