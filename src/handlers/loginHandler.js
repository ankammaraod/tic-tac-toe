const { Player } = require('./player.js');

function createSession(username) {
  const date = new Date();
  const id = date.getTime();
  return { id, username, date };
}

const loginPage = `
<html>
    <head>
      <title>Login</title>
    </head>

    <body>
      <form action="/" method="post">
        <div><label for="username">username : </label>
          <input type="text" name="username" id="username">
        </div><br/>
        <div><input type="submit" value="Login"></div>
      </form>
    </body>
</html>`;

const loginHandler = (users, sessions, game) => {
  const symbols = ['X', 'O'];
  const index = 0;

  return (req, res, next) => {
    const { url } = req;

    if (url !== '/') {
      if (!req.session) {
        res.statusCode = 401;
        res.end('Access Denied !!! Login to access');
        return;
      }
      next();
      return;
    }

    if (req.method === 'GET' && !req.session) {
      res.setHeader('content-type', 'text/html');
      res.end(loginPage);
      return;
    }

    const { username } = req.body;
    if (users.length >= 2) {
      res.statusCode = 429;
      res.end('Max limit exceeded');
      return;
    }

    users.push(username);
    game.addPlayer(new Player(index, username, symbols[index]));

    const session = createSession(username);
    sessions[session.id] = session;

    res.cookie('id', `${session.id}`);
    res.redirect('/index.html');
  };
};

module.exports = { loginHandler };
