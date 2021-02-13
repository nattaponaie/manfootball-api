// import { IGroup } from 'database/models/group';
// import { PlayerType } from './player';

// export type EventDescType = {
//   location: string;
//   locationUrl: string;
//   time: string;
//   totalPlayers: number;
// }

// class Event {
//   people: PlayerType[];
//   isCreated: boolean;
//   groups: IGroup[];
//   owner: PlayerType;
//   location: string;
//   locationUrl: string;
//   time: string;
//   id: string;

//   constructor() {
//     this.people = [];
//     this.isCreated = false;
//     this.groups = [];
//   }

//   getEventDesc(): EventDescType {
//     return {
//       location: this.location || 'ไม่มี',
//       locationUrl: this.locationUrl || 'ไม่มี',
//       time: this.time || 'ไม่มี',
//       totalPlayers: this.people.length || 0,
//     };
//   }

//   // getGroupIdList() {
//   //   return this.groupIdList;
//   // }

//   getIsCreated(): boolean {
//     return this.isCreated;
//   }

//   getLocation(): string {
//     return this.location;
//   }

//   getLocationUrl(): string {
//     return this.locationUrl;
//   }

//   getPeople(): PlayerType[] {
//     return this.people;
//   }

//   getTime(): string {
//     return this.time;
//   }

//   // setGroupIdList(groupId): void {
//   //   this.groupIdList = groupId;
//   // }

//   setLocation(location: string): void {
//     this.location = location;
//     if (this.location === 'บอย' || this.location === 'บอยท่าพระจันทร์') {
//       this.locationUrl = 'https://www.google.com/maps/dir/13.6655812,100.2712304/%E0%B8%AA%E0%B8%99%E0%B8%B2%E0%B8%A1%E0%B8%9F%E0%B8%B8%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5+%E0%B8%9A%E0%B8%AD%E0%B8%A2+%E0%B8%97%E0%B9%88%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B9%8C+FC+230+Thanon+Utthayan,+Thawi+Watthana,+Bangkok+10170/@13.7299381,100.2474323,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x30e296b031be5a9f:0x4cd1f3d397e96cb5!2m2!1d100.3541667!2d13.7769444';
//     }
//   }

//   setLocationUrl(locationUrl: string): void {
//     this.locationUrl = locationUrl;
//   }

//   setTime(time: string): void {
//     this.time = time;
//   }

//   setIsCreated(flag: boolean): void {
//     this.isCreated = flag;
//   }
// }

// export default Event;