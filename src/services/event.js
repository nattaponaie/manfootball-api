const create = (eventModel, eventMessageText) => {
  const splitedMsg = eventMessageText.split(' ') ;
  if (splitedMsg.length !== 3) {
    throw new Error('คำสั่งผิดจ้า /สร้าง (สถานที่) (เวลา)');
  }

  if (eventModel.getIsCreated()) {
    throw new Error('มีคนสร้างแล้วน้า บวกได้เลย (พิมพ์ /+1)');
  }
  
  eventModel.setLocation(splitedMsg[1]);
  eventModel.setTime(splitedMsg[2]);
  eventModel.setIsCreated(true);
  return eventModel.getEventDesc();
};

const getEventDesc = (eventModel) => {
  if (!eventModel.getIsCreated()) {
    throw new Error('ยังไม่มีเตะจ้า อยากเปิดพิพม์ /สร้าง (สถานที่) (เวลา)');
  }
  return eventModel.getEventDesc();
};

export default {
  create,
  getEventDesc,
};
