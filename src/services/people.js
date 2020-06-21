const addPlayer = (eventModel, eventMessageText, profile) => {
  if (!eventModel || !eventModel.getIsCreated()) {
    throw new Error('ยังไม่มีอีเว้นท์ (หากต้องการสร้าง พิมพ์ /สร้าง)');
  }

  const splitedMsg = eventMessageText.split('/+');
  if (splitedMsg.length !== 2) {
    throw new Error('ฟอแมตผิด (/+ หรือ /+1)');
  }

  const {
    userId,
    displayName,
    pictureUrl,
  } = profile;

  // const currentPlayers = eventModel.getPeople().getPlayer();
  // const isDuplicated = currentPlayers.find(currentPlayer => currentPlayer.userId === userId);
  // if (isDuplicated) {
  //   throw new Error(`เอ้ะ ${displayName} บวกไปแล้วนิ!`);
  // }

  let number = parseInt(splitedMsg[1]);
  const peopleModel = eventModel.getPeople();
  if (isNaN(number)) {
    // if isNan then +1 player
    peopleModel.addPlayer(userId, displayName, pictureUrl);
    console.log('eventModel.getPeople()', eventModel.getPeople());
    number = 1;
          
  } else {
    for (let i = 1; i <= number; i++) {
      peopleModel.addPlayer(userId, displayName, pictureUrl);
    }
    console.log('eventModel.getPeople()', eventModel.getPeople());
  }

  return {
    displayName,
    pictureUrl,
    totalPlayer: peopleModel.getTotalPlayer(),
    addedCount: number,
  };
};

export default {
  addPlayer,
};
