import { createCustomerUrl } from 'lib/dependencies';
import { ArgumentError } from 'lib/domain';
import { logger } from 'lib/infrastructure/logging';

export const endpoint = ({ createCustomerUrl }) => async (req, res) => {
  try {
    const result = await createCustomerUrl.execute({
      planId: req.query.id
    });

    res.status(200).json(result);
  } catch (err) {
    logger.error(err.message, { err });
    if (err instanceof ArgumentError) {
      return res.status(400).json({ error: `could not add goal to plan` });
    }

    res.status(500).json({
      error: `could not add goal to plan with id=${req.query.id}`
    });
  }
};

export default endpoint({ createCustomerUrl });
