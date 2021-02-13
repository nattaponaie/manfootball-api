import { IGroup } from 'database/models/group';

export type PlayerType = {
  userId: string;
  displayName: string;
  pictureUrl: string;
  groups: IGroup[]
}

class Player {
  player: PlayerType;

  constructor(player: PlayerType) {
    this.player = {
      userId: player.userId,
      displayName: player.displayName,
      pictureUrl: player.pictureUrl,
      groups: player.groups
    };
  }

  // addPlayer(userId, displayName, pictureUrl) {
  //   const player = {
  //     userId,
  //     displayName,
  //     pictureUrl,
  //   };
  //   this.players.push(player);
  // }

  // getPlayers() {
  //   return this.players;
  // }

  // getTotalPlayer() {
  //   return this.players.length;
  // }

  // setPlayers(players) {
  //   this.players = players;
  // }
}

export default Player;
