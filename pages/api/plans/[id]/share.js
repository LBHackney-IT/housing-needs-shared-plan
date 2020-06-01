import { sharePlan } from 'lib/dependencies';
import { logger } from 'lib/infrastructure/logging';
import { ArgumentError } from 'lib/domain';

export const endpoint = ({ sharePlan }) => async (req, res) => {
  try {
    const result = await sharePlan.execute({
      planId: req.query.id,
      number: req.body.number,
      auth: req.headers.authorization
    });

    logger.info(`Success`, { result });

    res.status(200).json(result);
  } catch (err) {
    logger.error(err.message, { err });
    if (err instanceof ArgumentError) {
      return res.status(400).json({ error: `could not share a plan` });
    }

    res.status(500).json({
      error: `could not share a plan with plan id=${req.query.id}`
    });
  }
};

export default endpoint({ sharePlan });
