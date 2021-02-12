import axios from 'axios';
import {
  get,
} from 'lodash';

import { logError } from 'utils/logger';

const getUserProfile = async (client, source) => {
  const userId = get(source, 'userId');
  if (get(source, 'type') === 'group') {
    const profile = await client.getGroupMemberProfile(get(source, 'groupId'), userId);
    return profile;
  } else if (get(source, 'type') === 'room') {
    const profile = await client.getRoomMemberProfile(get(source, 'roomId'), userId);
    return profile;
  }
  return await client.getProfile(userId);
};


const verifyAccessToken = async (ac: string) => {
  try {
    const url = `https://api.line.me/oauth2/v2.1/verify?access_token=${ac}`;
    return await axios.get(url);
  } catch (error) {
    logError('Error when try to verifyAccessToken');
    throw error;
  }
};

export default {
  getUserProfile,
  verifyAccessToken,
};
