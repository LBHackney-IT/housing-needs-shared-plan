const server = require('restana')();
const app = require('next')({ dev: false });
const files = require('serve-static');
const path = require('path');
const nextRequestHandler = app.getRequestHandler();
const CheckAuth = require('./lib/use-cases/check-auth');
const CheckCustomerToken = require('./lib/use-cases/check-customer-token');
const AWS = require('aws-sdk');

server.use(require('cookie-parser')());
server.use(files(path.join(__dirname, 'build')));
server.use(files(path.join(__dirname, 'public')));

// api routes, auth is handled by the authorizer
server.all('/api/*', (req, res) => nextRequestHandler(req, res));

const authorizeCustomerHandler = async (req, res, next) => {
  const dbConfig = {};
  if (process.env.ENV !== 'production' && process.env.ENV !== 'staging') {
    dbConfig.region = 'localhost';
    dbConfig.endpoint = 'http://localhost:8000';
    dbConfig.accessKeyId = 'foo';
    dbConfig.secretAccessKey = 'bar';
  }

  const PlanGateway = require('./lib/gateways/plan-gateway');

  const planGateway = new PlanGateway({
    client: new AWS.DynamoDB.DocumentClient(dbConfig),
    tableName: 'plans' //process.env.PLANS_TABLE_NAME
  });

  const checkCustomerToken = new CheckCustomerToken({ planGateway });

  const planId = req.params.id;
  const token = req.url.split('token=')[1] || null;
  const isAuthenticated = await checkCustomerToken.execute({ planId, token });
  req.isAuthenticatedCustomer = isAuthenticated;
  next();
};

const authoriseHandler = (req, res, next) => {
  if (req.isAuthenticatedCustomer) {
    next();
  }
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
