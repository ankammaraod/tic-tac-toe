class Game {
  winningPos;
  players;

  constructor() {
    this.players = [];
    this.winningPos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    this.currentPlayer = null;
    this.isRunning = true;
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
      return 200;
    };

    if (this.isInvalidMove(position)) {
      return 400;
    };

    this.currentPlayer.registerPos(position);

    if (this.isWon()) {
      this.isRunning = false;
      return 201;
    }

    this.nextPlayer();
    return 200;
  }

  isWon() {
    const info = this.currentPlayer.getInfo();
    const { positions } = JSON.parse(info);

    return this.winningPos.some(winPos => {
      return winPos.every((x, i) => x === +positions[i]);
    });
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

