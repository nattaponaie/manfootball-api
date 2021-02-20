import { v4 as uuidv4 } from 'uuid';

import playerDBModel, { IPlayer } from 'database/models/player';
import lineService from 'services/line';
import { lineClient } from '../index';

import { getGroupId, getUserId } from 'utils/line-message';

const assignMissingGroupId = async (eventMessageSource): Promise<IPlayer> => {
  const groupId = getGroupId(eventMessageSource);

  const player = await findOrCreate(eventMessageSource);

  const playerSet = new Set(player.groups);
  playerSet.add(groupId);

  player.groups = Array.from(playerSet);
  player.save();
  return player;
};

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

export default {
  assignMissingGroupId,
  findOrCreate,
  findOneByUserId,
};