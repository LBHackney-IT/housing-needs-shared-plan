const server = require('restana')();
const app = require('next')({ dev: false });
const files = require('serve-static');
const path = require('path');
const nextRequestHandler = app.getRequestHandler();
const CheckAuth = require('./lib/use-cases/check-auth');
const { checkCustomerToken } = require('lib/dependencies');

server.use(require('cookie-parser')());
server.use(files(path.join(__dirname, 'build')));
server.use(files(path.join(__dirname, 'public')));

// api routes, auth is handled by the authorizer
server.all('/api/*', (req, res) => nextRequestHandler(req, res));

const authorizeCustomerHandler = (req, res, next) => {
  const planId = req.path.split('/')[1];
  const token = req.queryStringParameters?.token : null;
  if (checkCustomerToken({ planId, token })) {
  }
  next();
};

const authoriseHandler = (req, res, next) => {
  const checkAuth = new CheckAuth({
    allowedGroups: process.env.ALLOWED_GROUPS.split(','),
    jwt: require('jsonwebtoken')
  });
  const isAuthenticated = checkAuth.execute({
    token: req.cookies.hackneyToken
  });
  if (!isAuthenticated && req.url !== '/loggedout') {
    res.writeHead(302, { Location: '/loggedout' });
    return res.end();
  }
  next();
};

server.all(
  '/plans/:id',
  (req, res, next) => authorizeCustomerHandler(req, res, next),
  (req, res, next) => authoriseHandler(req, res, next), // everything else we need to check the cookie,
  (req, res) => nextRequestHandler(req, res)
);

server.all(
  '*',
  (req, res, next) => authoriseHandler(req, res, next), // everything else we need to check the cookie
  (req, res) => nextRequestHandler(req, res)
);

module.exports.handler = require('serverless-http')(server);
