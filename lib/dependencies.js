import GetPlan from './use-cases/get-plan';
import CreatePlan from './use-cases/create-plan';
import PlanGateway from './gateways/plan-gateway';
import { logger, withLogging } from './infrastructure/logging';
import AWS from 'aws-sdk';

const config = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'foo',
  secretAccessKey: 'bar'
};

const planGateway = new PlanGateway({
  client: new AWS.DynamoDB.DocumentClient(config),
  tableName: process.env.PLANS_TABLE_NAME
});

const getPlan = withLogging(new GetPlan({ planGateway, logger }), logger);
const createPlan = withLogging(new CreatePlan({ planGateway, logger }), logger);
export { createPlan, getPlan };
