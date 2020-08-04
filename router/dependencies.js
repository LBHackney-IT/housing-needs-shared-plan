const DbGateway = require('./gateways/db-gateway');
const CheckAuth = require('./use-cases/check-auth');
const CheckCustomerToken = require('./use-cases/check-customer-token');
const AWS = require('aws-sdk');
const GetReminderPlans = require('./use-cases/get-reminder-plans');
const SendReminder = require('./use-cases/send-reminder');
const SmsGateway = require('./gateways/sms-gateway');

const dbConfig = {};
if (process.env.ENV !== 'production' && process.env.ENV !== 'staging') {
  dbConfig.region = 'localhost';
  dbConfig.endpoint = 'http://localhost:8000';
  dbConfig.accessKeyId = 'foo';
  dbConfig.secretAccessKey = 'bar';
}

const dbGateway = new DbGateway({
  client: new AWS.DynamoDB.DocumentClient(dbConfig),
  tableName: process.env.PLANS_TABLE_NAME
});

const checkCustomerToken = new CheckCustomerToken({ dbGateway });
const checkAuth = new CheckAuth({
  allowedGroups: process.env.ALLOWED_GROUPS.split(',')
});

const getReminderPlans = new GetReminderPlans({
  planGateway: dbGateway
});

const smsGateway = new SmsGateway();

const sendReminder = new SendReminder({ planGateway: dbGateway, smsGateway });

module.exports = {
  checkAuth,
  checkCustomerToken,
  getReminderPlans,
  sendReminder
};
