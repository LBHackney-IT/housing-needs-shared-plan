import { findPlans } from '../../../../lib/dependencies';
import { ArgumentError } from '../../../../lib/domain';

export default async (req, res) => {
  try {
    const result = await findPlans.execute({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      systemIds: req.body.systemIds
    });

    res.status(201).json(result);
  } catch (err) {
    //log error here
    if (err instanceof ArgumentError) {
      return res.status(400).json({ error: `could not find plans` });
    }

    res.status(500).json({
      error: `could not find plans with firstName=${req.body.firstName}, lastName=${req.body.lastName}`
    });
  }
};
