import { sharePlan } from 'lib/dependencies';
import { logger } from 'lib/infrastructure/logging';
import { ArgumentError } from 'lib/domain';

export const endpoint = ({ sharePlan }) => async (req, res) => {
  try {
    const result = await sharePlan.execute({
      planId: req.body.planId,
      tokens: req.body.tokens,
      name: req.body.name,
      number: req.body.number
    });

    logger.info(`Success`, { result });

    res.status(200).json(result);
  } catch (err) {
    logger.error(err.message, { err });
    if (err instanceof ArgumentError) {
      return res.status(400).json({ error: `could not share a plan` });
    }

    res.status(500).json({
      error: `could not share a plan with plan id=${req.body.planId}`
    });
  }
};

export default endpoint({ sharePlan });
