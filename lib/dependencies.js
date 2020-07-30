import AddGoal from './use-cases/add-goal';
import AddAction from './use-cases/add-action';
import GetPlan from './use-cases/get-plan';
import CreatePlan from './use-cases/create-plan';
import FindPlans from './use-cases/find-plans';
import UpdatePlan from './use-cases/update-plan';
import SharePlan from './use-cases/share-plan';
import UpdateAction from './use-cases/update-action';
import DeleteAction from './use-cases/delete-action';
import PlanGateway from './gateways/plan-gateway';
import SmsGateway from './gateways/sms-gateway';
import CreateCustomerUrl from './use-cases/create-customer-url';
import { logger, withLogging } from './infrastructure/logging';
import AWS from 'aws-sdk';

const dbConfig = {};
if (process.env.ENV !== 'production' && process.env.ENV !== 'staging') {
  dbConfig.region = 'localhost';
  dbConfig.endpoint = 'http://localhost:8000';
  dbConfig.accessKeyId = 'foo';
  dbConfig.secretAccessKey = 'bar';
}

const planGateway = new PlanGateway({
  client: new AWS.DynamoDB.DocumentClient(dbConfig),
  tableName: process.env.PLANS_TABLE_NAME
});
const smsGateway = new SmsGateway();

const addGoal = withLogging(new AddGoal({ planGateway }), logger);
const addAction = withLogging(new AddAction({ planGateway, logger }), logger);
const createPlan = withLogging(new CreatePlan({ planGateway, logger }), logger);
const findPlans = withLogging(new FindPlans({ planGateway, logger }), logger);
const getPlan = withLogging(new GetPlan({ planGateway, logger }), logger);
const sharePlan = withLogging(
  new SharePlan({ planGateway, smsGateway, logger }),
  logger
);
const createCustomerUrl = withLogging(
  new CreateCustomerUrl({ planGateway, logger }),
  logger
);
const updatePlan = withLogging(
  new UpdatePlan({ getPlan, planGateway, logger }),
  logger
);
const updateAction = withLogging(
  new UpdateAction({ getPlan, planGateway }),
  logger
);
const deleteAction = withLogging(
  new DeleteAction({ getPlan, planGateway }),
  logger
);

export {
  addGoal,
  createPlan,
  getPlan,
  findPlans,
  updatePlan,
  addAction,
  sharePlan,
  createCustomerUrl,
  updateAction,
  deleteAction
};
