const server = require('restana')();
const app = require('next')({ dev: process.env.ENV === 'dev', quiet: false });
const files = require('serve-static');
const path = require('path');
const cookieParser = require('cookie-parser');
const handle = app.getRequestHandler();
const jwt = require('jsonwebtoken');

server.use(cookieParser());
server.use(files(path.join(__dirname, 'build')));
server.use(files(path.join(__dirname, 'public')));
server.use(async (req, res, next) => {
  await app.prepare();
  next();
});

const isLoggedIn = function(hackneyToken) {
  if (!hackneyToken) return false;

  const allowedGroups = process.env.allowedGroups.split(",");

  const payload = jwt.decode(hackneyToken);
  return (
    payload &&
    payload.groups &&
    payload.groups.some(g => allowedGroups.includes(g))
  );
};

server.all('/api/*', (req, res) => handle(req, res));

server.use((req, res, next) => {
  if (!isLoggedIn(req.cookies.hackneyToken) && req.url !== '/loggedout') {
    res.writeHead(302, {'Location': '/loggedout'});
    return res.end();
  }
  next();
});

server.all('*',  (req, res) => handle(req, res));

module.exports.handler = require('serverless-http')(server);
