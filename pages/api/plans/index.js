import { createPlan } from 'lib/dependencies';
import { ArgumentError } from 'lib/domain';
import { logger } from 'lib/infrastructure/logging';

export const endpoint = ({ createPlan }) => async (req, res) => {
  if (req.method === 'POST') {
    try {
      logger.info(`request body being received is ${JSON.stringify(req.body)}`)
      const result = await createPlan.execute({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        systemIds: req.body.systemIds,
        numbers: req.body.numbers,
        emails: req.body.emails,
        initialUseAsPhp: req.body.hasPhp
      });
      logger.info(`Success`, { result });

      res.status(201).json(result);
    } catch (err) {
      logger.error(err.message, { err });

      if (err instanceof ArgumentError) {
        return res.status(400).json({ error: `could not create plan` });
      }

      res.status(500).json({
        error: `could not create plan with firstName=${req.body.firstName}, lastName=${req.body.lastName}`
      });
    }
  }
};

export default endpoint({ createPlan });
