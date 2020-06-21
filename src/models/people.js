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

  getPlayer() {
    return this.players;
  }

  getTotalPlayer() {
    return this.players.length;
  }
}

export default People;
