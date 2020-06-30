import {
  get,
  isEmpty,
  isNil,
} from 'lodash';

const addPlayer = (eventModel, eventMessageText, profile) => {
  if (!eventModel || eventModel.isCreated !== true) {
    throw new Error('ยังไม่มีอีเว้นท์ (หากต้องการสร้าง พิมพ์ /สร้าง)');
  }

  const splitedMsg = eventMessageText.split('/+');
  if (splitedMsg.length !== 2) {
    throw new Error('ฟอร์แมตผิด (/+ หรือ /+1)');
  }

  const {
    userId,
    displayName,
    pictureUrl,
  } = profile;

  // const currentPlayers = eventModel.getPeople().getPlayers();
  // const isDuplicated = currentPlayers.find(currentPlayer => currentPlayer.userId === userId);
  // if (isDuplicated) {
  //   throw new Error(`เอ้ะ ${displayName} บวกไปแล้วนิ!`);
  // }

  let number = parseInt(splitedMsg[1]);
  if (isNaN(number)) {
    // if isNan then +1 player
    eventModel.people.players.push({ userId, displayName, pictureUrl });
    number = 1;
          
  } else {
    if (number > 20) {
      throw new Error(`${displayName} จะบ้าหรอบวกอะไรเยอะแยะ!!`);
    }
    for (let i = 1; i <= number; i++) {
      eventModel.people.players.push({ userId, displayName, pictureUrl });
    }
  }

  return {
    displayName,
    pictureUrl,
    totalPlayer: eventModel.people.players.length,
    addedCount: number,
  };
};

const removePlayer = (eventModel, eventMessageText, profile) => {
  if (!eventModel || eventModel.isCreated !== true) {
    throw new Error('ยังไม่มีอีเว้นท์ (หากต้องการสร้าง พิมพ์ /สร้าง)');
  }

  const splitedMsg = eventMessageText.split('/-');
  if (splitedMsg.length !== 2) {
    throw new Error('ฟอร์แมตผิด (/- หรือ /-1)');
  }

  const {
    displayName,
    pictureUrl,
    userId,
  } = profile;

  const currentPlayers = eventModel.people.players;
  let removedCount = 1;
  let number = parseInt(splitedMsg[1]);
  if (isNaN(number)) {
    const foundPlayer = currentPlayers.find((ply, index) => {
      if (ply.userId === userId) {
        currentPlayers.splice(index, 1);
        return ply;
      }
    });
    if (isEmpty(foundPlayer)) {
      throw new Error(`หื้มม ${displayName} ยังไม่เคยบวกเลย`);
    }
    number = 1;
    eventModel.people.players = currentPlayers;
  } else {
    if (number < 1) {
      throw new Error(`${displayName} ลบเล่นทำไม !!`);
    }
    if (number > 20) {
      throw new Error(`${displayName} จะบ้าหรอลบอะไรเยอะแยะ!!`);
    }
    removedCount = number;

    const removedPlayers = currentPlayers.reduce((acc, item) => {
      if (item.userId === userId && number > 0) {
        number = number -1;
        return acc;
      }
      acc.push(item);
      return acc;
    }, []);
    eventModel.people.players = removedPlayers;
  }

  return {
    displayName,
    pictureUrl,
    totalPlayer: eventModel.people.players.length,
    removedCount,
  };
};

const getCurrentPlayers = (eventModel) => {
  if (eventModel.isCreated !== true) {
    throw new Error('ยังไม่มีเตะจ้า อยากเปิดพิพม์ /สร้าง (สถานที่) (เวลา)');
  }

  const currentPlayers = eventModel.people.players;
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

export default {
  addPlayer,
  getCurrentPlayers,
  removePlayer,
};
