const { startServer } = require('server');
const { app } = require('./src/app.js');


startServer(9090, app);
