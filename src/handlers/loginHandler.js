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

const loginHandler = (users, sessions) => {
  return (req, res, next) => {
    const { pathname } = req.url;

    if (pathname !== '/') {
      if (!req.session) {
        res.statusCode = 401;
        res.end('Access Denied !!! Login to access the flower-catalog');
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

    const { bodyParams: { username } } = req;

    users.push(users);
    const session = createSession(username);
    sessions[session.id] = session;

    res.setHeader('Set-Cookie', `id=${session.id}`);
    res.setHeader('Location', '/index.html');
    res.statusCode = 302;
    res.end();
  };
};

module.exports = { loginHandler };
