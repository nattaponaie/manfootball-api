import { v4 as uuidv4 } from 'uuid';
import { isNil, isEmpty, get } from 'lodash';
import { EventSource, Profile } from '@line/bot-sdk';

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

const getAddPlayerInputNumber = (eventMessageText: string): number => {
  const splitedMsg = eventMessageText.split('/+');
  if (splitedMsg.length !== 2) {
    throw new Error('ฟอร์แมตผิด (/+ หรือ /+1)');
  }

  const number = parseInt(splitedMsg[1]);

  return isNaN(number) ? 1 : number;
};

const getRemovePlayerInputNumber = (eventMessageText: string): number => {
  const splitedMsg = eventMessageText.split('/-');
  if (splitedMsg.length !== 2) {
    throw new Error('ฟอร์แมตผิด (/- หรือ /-1)');
  }

  const number = parseInt(splitedMsg[1]);

  return isNaN(number) ? 1 : number;
};

const addPlayer = async (eventMessageSource: EventSource, eventMessageText: string, profile: Profile, player: IPlayer): Promise<IEvent> => {
  const event = await getCurrentEvent(eventMessageSource);
  if (!event || !event.isCreated) {
    throw new Error('ยังไม่มีอีเว้นท์ (หากต้องการสร้าง พิมพ์ /สร้าง)');
  }

  const number = getAddPlayerInputNumber(eventMessageText);

  if (number > 20) {
    const {
      displayName,
    } = profile;
    throw new Error(`${displayName} จะบ้าหรอบวกอะไรเยอะแยะ!!`);
  }

  for (let i = 1; i <= number; i++) {
    event.players.push(player);
  }

  event.save();
  return event;
};

const create = async (eventMessageSource: EventSource, eventMessageText: string, player: IPlayer): Promise<EventDescType> => {
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

  // eslint-disable-next-line no-warning-comments
  // TODO: implement location feature
  const defaultLocationUrl = 'https://www.google.com/maps/dir/13.6655812,100.2712304/%E0%B8%AA%E0%B8%99%E0%B8%B2%E0%B8%A1%E0%B8%9F%E0%B8%B8%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5+%E0%B8%9A%E0%B8%AD%E0%B8%A2+%E0%B8%97%E0%B9%88%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B9%8C+FC+230+Thanon+Utthayan,+Thawi+Watthana,+Bangkok+10170/@13.7299381,100.2474323,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x30e296b031be5a9f:0x4cd1f3d397e96cb5!2m2!1d100.3541667!2d13.7769444';
  eventModel.locationUrl = defaultLocationUrl;
  
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

const getEventDesc = (eventModel: IEvent): EventDescType => {
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

const getCurrentEvent = async (eventMessageSource: EventSource): Promise<IEvent> => {
  const groupId = getGroupId(eventMessageSource);
  if (!groupId) {
    throw new Error('เกิดข้อผิดพลาด ลองใหม่อีกครั้งน้า');
  }
  return await findOneByGroupId(groupId);
};

const cancelEvent = async (userId: string, eventMessageSource: EventSource): Promise<void> => {
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

const getCurrentEventPlayers = async (eventMessageSource: EventSource): Promise<Array<IPlayer>> => {
  const event = await getCurrentEvent(eventMessageSource);
  if (!event) {
    throw new Error('ยังไม่มีใครสร้างอีเว้นท์เล้ย');
  }
  
  const currentPlayers = event.players;
  if (currentPlayers.length === 0) {
    throw new Error('ยังไม่มีคนบวกเลย :(');
  }

  const allPlayers = [];
  for(const player of currentPlayers) {
    const foundPlayer = allPlayers.find(ply => ply.userId === player.userId);
    if (!foundPlayer) {
      const clonePlayer = {
        ...player,
        quantity: 1,
      };
      allPlayers.push(clonePlayer);
    } else {
      if (isNil(get(foundPlayer, 'quantity'))) {
        foundPlayer.quantity = 0;
      }
      foundPlayer.quantity = foundPlayer.quantity + 1;
    }
  }
  return allPlayers;
};

const getCurrentEventPlayerCount = async (eventMessageSource: EventSource): Promise<number> => {
  const event = await getCurrentEvent(eventMessageSource);
  if (!event) {
    throw new Error('ยังไม่มีใครสร้างอีเว้นท์เล้ย');
  }
  return event.players.length || 0;
};

const removePlayer = async (eventMessageSource: EventSource, eventMessageText: string, profile: Profile): Promise<IEvent> => {
  const event = await getCurrentEvent(eventMessageSource);
  if (!event || !event.isCreated) {
    throw new Error('ยังไม่มีอีเว้นท์ (หากต้องการสร้าง พิมพ์ /สร้าง)');
  }

  const {
    displayName,
    userId,
  } = profile;

  const currentPlayers = event.players;
  let number = getRemovePlayerInputNumber(eventMessageText);

  if (number === 1) {
    const foundPlayer = currentPlayers.find((ply, index) => {
      if (ply.userId === userId) {
        currentPlayers.splice(index, 1);
        return ply;
      }
    });
    if (isEmpty(foundPlayer)) {
      throw new Error(`หื้มม ${displayName} ยังไม่เคยบวกเลย`);
    }
    event.players = currentPlayers;
  } else {
    if (number < 1) {
      throw new Error(`${displayName} ลบเล่นทำไม !!`);
    }
    if (number > 20) {
      throw new Error(`${displayName} จะบ้าหรอลบอะไรเยอะแยะ!!`);
    }

    const removedPlayers = currentPlayers.reduce((acc, item) => {
      if (item.userId === userId && number > 0) {
        number = number -1;
        return acc;
      }
      acc.push(item);
      return acc;
    }, []);

    if (isEmpty(removedPlayers)) {
      throw new Error(`หื้มม ${displayName} ยังไม่เคยบวกเลย`);
    }
    event.players = removedPlayers;
  }

  event.save();
  return event;
};

export default {
  // addGroupId,
  addPlayer,
  cancelEvent,
  create,
  findLatest,
  getAddPlayerInputNumber,
  getEventDesc,
  getCurrentEvent,
  getCurrentEventPlayers,
  getCurrentEventPlayerCount,
  getRemovePlayerInputNumber,
  removePlayer,
};