import { getPlan } from 'lib/dependencies';
import { ArgumentError } from 'lib/domain';

export default async (req, res) => {
  try {
    const result = await getPlan({ id: req.query.id });

    res.status(200).json(result);
  } catch (err) {
    //log error here

    if (err instanceof ArgumentError) {
      return res.status(400).json({ error: `could not get plan` });
    }

    res
      .status(500)
      .json({ error: `could not get plan with id=${req.params.id}` });
  }
};
