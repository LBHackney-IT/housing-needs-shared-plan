import GetPlan from './use-cases/getPlan';
import PlanGateway from './gateways/planGateway';
import AWS from 'aws-sdk';

const config = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'foo',
  secretAccessKey: 'bar'
};

const client = AWS.DynamoDB.DocumentClient({ config });
const planGateway = new PlanGateway({ client });
const getPlan = new GetPlan({ planGateway });

export default { getPlan };
