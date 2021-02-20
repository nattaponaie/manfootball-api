import { v4 as uuidv4 } from 'uuid';

import eventDBModel from 'database/models/event';
import { IPlayer } from 'database/models/player';
import { EventDescType, IEvent } from 'database/models/event';

import groupService from 'services/group';
import playerService from 'services/player';

import { getGroupId } from 'utils/line-message';

// const addGroupId = (eventModel, groupId) => {
//   const currentGroupIds = eventModel.getGroupIdList();
//   const isFound = currentGroupIds.find(grId => grId === groupId);
//   if (!isFound) {
//     currentGroupIds.push(groupId);
//     eventModel.setGroupIdList(currentGroupIds);
//   }
// };

const create = async (eventMessageSource, eventMessageText, player: IPlayer): Promise<EventDescType> => {
  const splitedMsg = eventMessageText.split(' ');
  if (splitedMsg.length !== 3) {
    throw new Error('คำสั่งผิดจ้า /สร้าง (สถานที่) (เวลา)');
  }

  const groupId = getGroupId(eventMessageSource);
  if (!groupId) {
    throw new Error('เกิดข้อผิดพลาด ลองใหม่อีกครั้งน้า');
  }

  const groupModel = await groupService.findOrCreate(groupId);
  if (groupModel.hasEvent) {
    throw new Error('มีคนสร้างแล้วน้า บวกได้เลย (พิมพ์ /+1)');
  } else {
    groupModel.hasEvent = true;
    groupModel.save();
  }

  const eventModel = new eventDBModel();
  eventModel.location = splitedMsg[1];
  if (eventModel.location === 'บอย' || eventModel.location === 'บอยท่าพระจันทร์') {
    eventModel.locationUrl = 'https://www.google.com/maps/dir/13.6655812,100.2712304/%E0%B8%AA%E0%B8%99%E0%B8%B2%E0%B8%A1%E0%B8%9F%E0%B8%B8%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5+%E0%B8%9A%E0%B8%AD%E0%B8%A2+%E0%B8%97%E0%B9%88%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B9%8C+FC+230+Thanon+Utthayan,+Thawi+Watthana,+Bangkok+10170/@13.7299381,100.2474323,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x30e296b031be5a9f:0x4cd1f3d397e96cb5!2m2!1d100.3541667!2d13.7769444';
  }
  eventModel.time = splitedMsg[2];

  eventModel.id = uuidv4();
  eventModel.owner = player;
  eventModel.isCreated = true;
  eventModel.save();

  eventModel.groups.push(groupId);

  return getEventDesc(eventModel);
};

const findLatest = async (): Promise<IEvent> => eventDBModel.findOne({
  isCreated: true
}, {}, {
  sort: {
    'createdAt': -1
  }
});

const findOneByGroupId = async (groupId: string): Promise<IEvent> => eventDBModel.findOne({
  isCreated: true,
  groups: groupId
}, {}, {});

const findOneByOwner = async (owner: IPlayer): Promise<IEvent> => eventDBModel.findOne({
  isCreated: true,
  owner: owner
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

const getCurrentEvent = async (eventMessageSource): Promise<IEvent> => {
  const groupId = getGroupId(eventMessageSource);
  if (!groupId) {
    throw new Error('เกิดข้อผิดพลาด ลองใหม่อีกครั้งน้า');
  }
  return await findOneByGroupId(groupId);
};

const cancelEvent = async (userId: string, eventMessageSource) => {
  const player = await playerService.findOneByUserId(userId);
  if (!player) {
    throw new Error('แกไม่มีสิทธิ!!');
  }

  const groupId = getGroupId(eventMessageSource);
  if (!groupId) {
    throw new Error('เกิดข้อผิดพลาด ลองใหม่อีกครั้งน้า');
  }

  const event = await findOneByGroupId(groupId);
  if (!event) {
    throw new Error('ยังไม่มีคนสร้างเลย จะยกเลิกทำไม ><');
  }
  if (event.owner.userId !== userId) {
    throw new Error(`แกไม่มีสิทธิ!! เฉพาะผู้จัดเท่านั้น ถึงจะยกเลิกได้ (${event.owner.displayName})`);
  }

  const groups = event.groups;
  for(let i = 0; i < groups.length; i++) {
    await groupService.findOneAndUpdate({ id: groups[i] }, { hasEvent: false });
  }

  event.isCreated = false;
  event.save();
};

export default {
  // addGroupId,
  cancelEvent,
  create,
  findLatest,
  getEventDesc,
  getCurrentEvent,
};