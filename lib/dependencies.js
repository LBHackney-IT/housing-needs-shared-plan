import AddGoal from './use-cases/add-goal';
import GetPlan from './use-cases/get-plan';
import CreatePlan from './use-cases/create-plan';
import FindPlans from './use-cases/find-plans';
import PlanGateway from './gateways/plan-gateway';
import { logger, withLogging } from './infrastructure/logging';
import AWS from 'aws-sdk';

const dbConfig = {};
if (process.env.ENV !== 'production' && process.env.ENV !== 'staging') {
  dbConfig.region = 'local';
  dbConfig.endpoint = 'http://localhost:8000';
  dbConfig.accessKeyId = 'foo';
  dbConfig.secretAccessKey = 'bar';
}

const planGateway = new PlanGateway({
  client: new AWS.DynamoDB.DocumentClient(dbConfig),
  tableName: process.env.PLANS_TABLE_NAME
});

const addGoal = withLogging(new AddGoal({ planGateway }), logger);
const getPlan = withLogging(new GetPlan({ planGateway, logger }), logger);
const createPlan = withLogging(new CreatePlan({ planGateway, logger }), logger);
const findPlans = withLogging(new FindPlans({ planGateway, logger }), logger);
export { addGoal, createPlan, getPlan, findPlans };
