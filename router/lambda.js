const server = require('restana')();
const app = require('next')({ dev: false });
const files = require('serve-static');
const path = require('path');
const bodyParser = require('body-parser');
const nextRequestHandler = app.getRequestHandler();
const { checkAuth, checkCustomerToken } = require('./dependencies');

server.use(require('cookie-parser')());
server.use(bodyParser.json());
server.use(files(path.join(__dirname, 'build')));
server.use(files(path.join(__dirname, 'public')));

// public routes
server.all('/api/*', (req, res) => nextRequestHandler(req, res)); // auth is handled by the authorizer
server.all('/_next/static/*', (req, res) => nextRequestHandler(req, res)); // next generated js and css
server.all('/js/*', (req, res) => nextRequestHandler(req, res)); // public js
server.all('/assets/*', (req, res) => nextRequestHandler(req, res)); // public assets
server.all('/favicon.ico', (req, res) => nextRequestHandler(req, res)); // favicon

const authoriseCustomerHandler = async (req, res, next) => {
  const id = req.params.id;
  const token = req.url.split('token=')[1] || null;
  const isAuthenticated = await checkCustomerToken.execute({
    id,
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

// private customer routes
server.all(
  '/c/plans/:id',
  (req, res, next) => authoriseCustomerHandler(req, res, next),
  (req, res) => nextRequestHandler(req, res)
);

// private staff routes
server.all(
  '*',
  (req, res, next) => authoriseStaffHandler(req, res, next),
  (req, res) => nextRequestHandler(req, res)
);

if (process.env.ENV === 'dev') {
  server.start(3000).then(s => {});
} else {
  module.exports.handler = require('serverless-http')(server);
}
