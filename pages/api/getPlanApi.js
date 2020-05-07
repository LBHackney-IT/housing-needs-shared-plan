import getPlan from '../../lib/libDependencies';
import PlanGateway from '../../lib/gateways/planGateway';
import AWS from 'aws-sdk';

export default async (req, res) => {
  //   const config = {
  //     region: 'localhost',
  //     endpoint: 'http://localhost:8000',
  //     accessKeyId: 'foo',
  //     secretAccessKey: 'bar'
  //   };
  //   const client = AWS.DynamoDB.DocumentClient({ config });
  //   const planGateway = new PlanGateway({ client });
  //   const getPlan = new GetPlan({ planGateway });
  const result = await getPlan.execute({ id: req.params.id });

  res.statusCode = 200;
  res.json(result);
};
