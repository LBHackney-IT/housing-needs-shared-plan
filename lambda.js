const server = require('restana')();
const app = require('next')({ dev: process.env.ENV === 'dev' });
const files = require('serve-static');
const path = require('path');
const handle = app.getRequestHandler();

server.use(files(path.join(__dirname, 'build')));
server.use(files(path.join(__dirname, 'public')));
server.use(async (req, res, next) => {
  await app.prepare();
  next();
});

server.get('*', (req, res) => handle(req, res));

module.exports.handler = require('serverless-http')(server);
