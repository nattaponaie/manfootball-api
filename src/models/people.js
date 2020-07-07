class People {
  constructor() {
    this.players = [];
  }

  addPlayer(userId, displayName, pictureUrl) {
    const player = {
      userId,
      displayName,
      pictureUrl,
    };
    this.players.push(player);
  }

  getPlayers() {
    return this.players;
  }

  getTotalPlayer() {
    return this.players.length;
  }

  setPlayers(players) {
    this.players = players;
  }
}

export default People;
