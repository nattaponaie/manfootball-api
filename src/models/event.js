import People from 'models/people';

class Event {
  constructor() {
    this.people = new People();
    this.isCreated = false;
    this.groupIdList = [];
  }

  getEventDesc() {
    return {
      location: this.location || 'ไม่มี',
      locationUrl: this.locationUrl || 'ไม่มี',
      time: this.time || 'ไม่มี',
      totalPlayers: this.people.getTotalPlayer() || 0,
    };
  }

  getGroupIdList() {
    return this.groupIdList;
  }

  getIsCreated() {
    return this.isCreated;
  }

  getLocation() {
    return this.location;
  }

  getLocationUrl() {
    return this.locationUrl;
  }

  getPeople() {
    return this.people;
  }

  getTime() {
    return this.time;
  }

  setGroupIdList(groupId) {
    this.groupIdList = groupId;
  }

  setLocation(location) {
    this.location = location;
    if (this.location === 'บอย' || this.location === 'บอยท่าพระจันทร์') {
      this.locationUrl = 'https://www.google.com/maps/dir/13.6655812,100.2712304/%E0%B8%AA%E0%B8%99%E0%B8%B2%E0%B8%A1%E0%B8%9F%E0%B8%B8%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5+%E0%B8%9A%E0%B8%AD%E0%B8%A2+%E0%B8%97%E0%B9%88%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B9%8C+FC+230+Thanon+Utthayan,+Thawi+Watthana,+Bangkok+10170/@13.7299381,100.2474323,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x30e296b031be5a9f:0x4cd1f3d397e96cb5!2m2!1d100.3541667!2d13.7769444';
    }
  }

  setLocationUrl(locationUrl) {
    this.locationUrl = locationUrl;
  }

  setTime(time) {
    this.time = time;
  }

  setIsCreated(flag) {
    this.isCreated = flag;
  }
}

export default Event;
