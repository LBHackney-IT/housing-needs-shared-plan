import { createCustomerUrl } from 'lib/dependencies';
import { logger } from 'lib/infrastructure/logging';

export const endpoint = ({ createCustomerUrl }) => async (req, res) => {
  try {
    const result = await createCustomerUrl.execute({
      planId: req.query.id
    });

    res.status(200).json(result);
  } catch (err) {
    logger.error(err.message, { err });

    res.status(500).json({
      error: `could not generate a customer token for resident with id=${req.query.id}`
    });
  }
};

export default endpoint({ createCustomerUrl });
