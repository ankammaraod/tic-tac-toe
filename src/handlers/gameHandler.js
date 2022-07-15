const gameHandler = (game) => (req, res, next) => {
  const data = req.body;
  const { username } = req.session;

  console.log(data, username);

};


module.exports = { gameHandler };
