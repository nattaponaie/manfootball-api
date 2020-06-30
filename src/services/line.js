import {
  get,
  isNil,
} from 'lodash';

const getUserProfile = async (client, source) => {
  const userId = get(source, 'userId');
  if (!isNil(get(source, 'groupId'))) {
    const profile = await client.getGroupMemberProfile(get(source, 'groupId'), userId);
    return profile;
  } else if (!isNil(get(source, 'roomId'))) {
    const profile = await client.getRoomMemberProfile(get(source, 'roomId'), userId);
    return profile;
  }
  return await client.getProfile(userId);
};

export default {
  getUserProfile,
};
