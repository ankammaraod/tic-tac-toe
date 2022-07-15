class Game {
  #currentPlayer;
  #winningPos;
  #players;

  constructor(player1, player2) {
    this.#players = [];
    this.#winningPos = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    this.#currentPlayer;
  }

  addPlayer(player) {
    this.#players.push(player);
  }

  register(position) {
    this.#currentPlayer.registerPos(position);
  }

  isWon() {
    const info = this.#currentPlayer.getInfo();
    const { positions } = JSON.parse(info);
    return this.#winningPos.some(pos => pos.includes(positions));
  }
}

module.exports = { Game };

