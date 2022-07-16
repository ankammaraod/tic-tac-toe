class Game {
  winningPos;
  players;

  constructor() {
    this.players = [];
    this.winningPos = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    this.currentPlayer = null;
  }

  addPlayer(player) {
    this.players.push(player);
    this.currentPlayer = player;
  }

  isInvalidMove(position) {
    return this.players.some(player => player.positions.includes(position));
  }

  register(position, username) {
    if (this.currentPlayer.name !== username) {
      return 400;
    }

    if (this.isInvalidMove(position)) {
      return 400;
    }

    this.currentPlayer.registerPos(position);
    console.log(this.currentPlayer);
    this.nextPlayer();
    return 200;
  }

  isWon() {
    const info = this.currentPlayer.getInfo();
    const { positions } = JSON.parse(info);
    return this.winningPos.some(pos => pos.includes(positions));
  }

  nextPlayer() {
    const player1 = this.players[0];
    const player2 = this.players[1];

    this.currentPlayer = this.currentPlayer === player1 ? player2 : player1;
  }

  getInfo() {
    return JSON.stringify(this);
  }
}

module.exports = { Game };

