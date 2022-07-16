class Player {
  constructor(id, name, symbol) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.positions = [];
  }

  registerPos(position) {
    this.positions.push(position);
  }

  getInfo() {
    return JSON.stringify(this);
  }
}

module.exports = { Player };
