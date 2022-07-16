const getStats = (game) => (req, res, next) => {
  res.end(game.getInfo());
};

module.exports = { getStats };
