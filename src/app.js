const fs = require('fs');
const { createRouter, notFoundHandler } = require('server');
const { serveStatic } = require('./handlers/serveStatic.js');
const { parseBodyParams } = require('./handlers/parseBodyParams.js');
const { logRequest } = require('./handlers/logRequest.js');
const { receiveBodyParams } = require('./handlers/receiveBodyParams.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { injectCookies } = require('./handlers/injectCookies.js');
const { injectSession } = require('./handlers/injectSession.js');
const { parseSearchParams } = require('./handlers/parseSearchParams.js');

const createApp = ({ path }, sessions, logger) => {
  const users = [];

  return createRouter(
    receiveBodyParams,
    parseBodyParams,
    parseSearchParams,
    logRequest(logger),
    injectCookies,
    injectSession(sessions),
    loginHandler(users, sessions),
    serveStatic(path),
    notFoundHandler
  );
};

const config = {
  path: './public',
}

const app = createApp(config, {}, console.log)

module.exports = { app, createApp };
