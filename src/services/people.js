import {
  isEmpty,
} from 'lodash';

const addPlayer = (eventModel, eventMessageText, profile) => {
  if (!eventModel || !eventModel.getIsCreated()) {
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
  const peopleModel = eventModel.getPeople();
  if (isNaN(number)) {
    // if isNan then +1 player
    peopleModel.addPlayer(userId, displayName, pictureUrl);
    number = 1;
          
  } else {
    for (let i = 1; i <= number; i++) {
      peopleModel.addPlayer(userId, displayName, pictureUrl);
    }
  }

  return {
    displayName,
    pictureUrl,
    totalPlayer: peopleModel.getTotalPlayer(),
    addedCount: number,
  };
};

const removePlayer = (eventModel, eventMessageText, profile) => {
  if (!eventModel || !eventModel.getIsCreated()) {
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

  const currentPlayers = eventModel.getPeople().getPlayers();

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
  } else {
    if (number < 1) {
      throw new Error(`${displayName} ลบเล่นทำไม !!`);
    }
    const foundIndexs = [];
    const foundPlayers = currentPlayers.filter((ply, index) => {
      if (ply.userId === userId) {
        foundIndexs.push(index);
        return ply;
      }
    });
    
    if (foundPlayers.length < number) {
      throw new Error(`นาย ${displayName} ยังบวกไม่ถึง ${number} คน (บวกไปแล้ว ${foundPlayers.length})`);
    }

    for(let i = 0; i < number+1; i++) {
      currentPlayers.splice(foundIndexs[i], 1);
    }
  }

  eventModel.getPeople().setPlayers(currentPlayers);

  return {
    displayName,
    pictureUrl,
    totalPlayer: eventModel.getPeople().getTotalPlayer(),
    removedCount: number,
  };
};

export default {
  addPlayer,
  removePlayer,
};
