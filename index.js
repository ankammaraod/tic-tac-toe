const { startServer } = require('server');
const { app } = require('./src/app.js');

app.listen(9090, () => console.log('Listening on 9090'));

// startServer(9090, app);
