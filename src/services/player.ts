import { v4 as uuidv4 } from 'uuid';

import playerDBModel, { IPlayer } from 'database/models/player';
import lineService from 'services/line';
import { lineClient } from '../index';

import { getUserId } from 'utils/line-message';

const findOrCreate = async (eventMessageSource): Promise<IPlayer> => {
  const userId = getUserId(eventMessageSource);

  const player = await findOneByUserId(userId);
  if (player) {
    return player;
  }

  const profile = await lineService.getUserProfile(
    lineClient,
    eventMessageSource
  );
  if (!profile) {
    throw new Error('ไม่พบ lineId นี้ในระบบ');
  }

  const playerResult: IPlayer = await playerDBModel.create({
    id: uuidv4(),
    userId,
    displayName: profile.displayName,
    pictureUrl: profile.pictureUrl
  });

  return playerResult;
};

const findOneByUserId = async (userId: string): Promise<IPlayer> => playerDBModel.findOne({
  userId: userId
}, {}, {});

const validateGroupPermission = async () => {

};

export default {
  findOrCreate,
  findOneByUserId,
  validateGroupPermission,
};