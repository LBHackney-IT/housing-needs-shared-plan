import { addGoal } from 'lib/dependencies';
import { ArgumentError } from 'lib/domain';
import { logger } from 'lib/infrastructure/logging';
import { getUsername, getToken } from 'lib/utils/token';

export const endpoint = ({ addGoal }) => async (req, res) => {
  try {
    const result = await addGoal.execute({
      planId: req.query.id,
      goal: req.body,
      currentUserName: getUsername(getToken(req))
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

export default endpoint({ addGoal });
