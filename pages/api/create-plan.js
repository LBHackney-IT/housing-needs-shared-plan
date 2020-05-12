import { createPlan } from '../../lib/dependencies';
import { ArgumentError } from '../../lib/domain';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const result = await createPlan.execute({
        firstName: req.body.firstName,
        lastName: req.body.lastName
      });

      res.status(200).json(result);
    } catch (err) {
      //log error here

      if (err instanceof ArgumentError) {
        return res.status(400).json({ error: `could not create plan` });
      }

      res.status(500).json({
        error: `could not create plan with firstName=${req.body.firstName}, lastName=${req.body.lastName}`
      });
    }
  }
};
