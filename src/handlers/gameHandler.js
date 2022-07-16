const gameHandler = (game, sessions) => (req, res, next) => {
  const position = req.body;
  const { username } = req.session;

  const status = game.register(position, username);
  res.status(status);
  res.end();
};


module.exports = { gameHandler };
