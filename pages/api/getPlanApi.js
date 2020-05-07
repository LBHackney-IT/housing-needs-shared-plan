import getPlan from '../../lib/libDependencies';
import PlanGateway from '../../lib/gateways/planGateway';
import AWS from 'aws-sdk';

export default async (req, res) => {
  const result = await getPlan.execute({ id: req.params.id });

  res.statusCode = 200;
  res.json(result);
};
