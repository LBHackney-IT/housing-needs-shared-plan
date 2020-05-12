const server = require('restana')();
const dev = process.env.ENV === 'dev';
const app = require('next')({ dev });
const files = require('serve-static');
const path = require('path');
const handle = app.getRequestHandler();

server.use(files(path.join(__dirname, 'build')));
server.use(files(path.join(__dirname, 'public')));
server.use(async (req, res, next) => {
  await app.prepare();
  next();
});

// api routes defined in pages/api should be prefixed with /api
server.get('*', (req, res) => handle(req, res));

module.exports.handler = require('serverless-http')(server);
