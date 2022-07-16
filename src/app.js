const express = require('express');
const { logRequest } = require('./handlers/logRequest.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { injectCookies } = require('./handlers/injectCookies.js');
const { injectSession } = require('./handlers/injectSession.js');
const { gameHandler } = require('./handlers/gameHandler.js');
const { Game } = require('./handlers/game.js');

const createApp = ({ path }, sessions, logger, game) => {
  const users = [];
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(logRequest(logger));
  app.use(injectCookies);
  app.use(injectSession(sessions));
  app.use(loginHandler(users, sessions, game));
  app.use(express.static(path));

  app.use(express.text());
  app.post('/move', gameHandler(game));

  return app;
};

const config = {
  path: './public',
}

const game = new Game();
const app = createApp(config, {}, console.log, game);

module.exports = { app, createApp };
