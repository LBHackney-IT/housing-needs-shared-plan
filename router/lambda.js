const server = require('restana')();
const app = require('next')({ dev: false });
const files = require('serve-static');
const path = require('path');
const nextRequestHandler = app.getRequestHandler();
const { checkAuth, checkCustomerToken } = require('./dependencies');

server.use(require('cookie-parser')());
server.use(files(path.join(__dirname, 'build')));
server.use(files(path.join(__dirname, 'public')));

// api routes, auth is handled by the authorizer
server.all('/api/*', (req, res) => nextRequestHandler(req, res));

const authoriseCustomerHandler = async (req, res, next) => {
  const planId = req.params.id;
  const token = req.url.split('token=')[1] || null;
  const isAuthenticated = await checkCustomerToken.execute({
    planId,
    token
  });
  if (!isAuthenticated) {
    res.writeHead(404);
    return res.end();
  }
  next();
};

const authoriseStaffHandler = (req, res, next) => {
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
  '/customer/plans/:id',
  (req, res, next) => authoriseCustomerHandler(req, res, next),
  (req, res) => nextRequestHandler(req, res)
);

server.all(
  '*',
  (req, res, next) => authoriseStaffHandler(req, res, next), // everything else we need to check the cookie
  (req, res) => nextRequestHandler(req, res)
);

module.exports.handler = require('serverless-http')(server);
