const server = require('restana')();
const app = require('next')({ dev: process.env.ENV === 'dev', quiet: false });
const files = require('serve-static');
const path = require('path');
const cookieParser = require('cookie-parser');
const handle = app.getRequestHandler();
const CheckAuth = require('./lib/use-cases/check-auth');

server.use(cookieParser());
server.use(files(path.join(__dirname, 'build')));
server.use(files(path.join(__dirname, 'public')));
server.use(async (req, res, next) => {
  await app.prepare();
  next();
});

server.all('/api/*', (req, res) => handle(req, res));

server.use((req, res, next) => {
  const checkAuth = new CheckAuth({
    allowedGroups: process.env.allowedGroups.split(','),
    jwt: require('jsonwebtoken')
  });
  if (!checkAuth.execute({ token: req.cookies.hackneyToken}) && req.url !== '/loggedout') {
    res.writeHead(302, {'Location': '/loggedout'});
    return res.end();
  }
  next();
});

server.all('*',  (req, res) => handle(req, res));

module.exports.handler = require('serverless-http')(server);