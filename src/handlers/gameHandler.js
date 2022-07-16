const gameHandler = (game) => (req, res, next) => {
  const position = req.body;
  const { username } = req.session;

  const status = game.register(position, username);
  const gameStats = game.getInfo();

  res.status(status);
  res.send(gameStats);
};


module.exports = { gameHandler };
