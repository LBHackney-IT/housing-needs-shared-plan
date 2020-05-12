import GetPlan from './use-cases/get-plan';
import CreatePlan from './use-cases/create-plan';
import PlanGateway from './gateways/plan-gateway';
import AWS from 'aws-sdk';

const config = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'foo',
  secretAccessKey: 'bar'
};

const client = new AWS.DynamoDB.DocumentClient({ config });
const planGateway = new PlanGateway({ client });
const getPlan = new GetPlan({ planGateway });
const createPlan = new CreatePlan({ planGateway });

export { createPlan, getPlan };
