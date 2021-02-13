import { IGroup } from 'database/models/group';

class Group {
  group: IGroup;

  constructor(groupInput: IGroup) {
    this.group = {
      id: groupInput.id,
      isCreated: groupInput.isCreated,
      eventId: groupInput.eventId
    };
  }
}

export default Group;