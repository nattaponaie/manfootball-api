import {
  get,
} from 'lodash';

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

export default {
  getUserProfile,
};