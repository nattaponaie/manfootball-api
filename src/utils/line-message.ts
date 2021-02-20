import { get } from 'lodash';

export const getGroupId = (eventMessageSource): string => {
  const messageSourceType = get(eventMessageSource, 'type');
  if (!messageSourceType) {
    return;
  }

  let groupId = get(eventMessageSource, 'userId');
  if (messageSourceType === 'room') {
    groupId = get(eventMessageSource, 'roomId');
  } else if (messageSourceType === 'group') {
    groupId = get(eventMessageSource, 'groupId');
  }
  return groupId;
};

export enum MessageSourceType {
  User,
  Group,
  Room,
}
export const getMessageSourceType = (eventMessageSource): MessageSourceType => {
  const messageSourceType = get(eventMessageSource, 'type');
  if (!messageSourceType) {
    return;
  }

  switch (messageSourceType) {
    case 'user':
      return MessageSourceType.User;
    case 'group':
      return MessageSourceType.Group;
    case 'room':
      return MessageSourceType.Room;
    default:
      return MessageSourceType.User;
  }
};

export const getUserId = (eventMessageSource): string => get(eventMessageSource, 'userId');