import { getPlan } from 'lib/dependencies';
import { ArgumentError } from 'lib/domain';

export const endpoint = ({ getPlan }) => async (req, res) => {
  const id = req.url.split('/')[3];

  try {
    const result = await getPlan({ id });

    if (!result) {
      return res.status(404).end();
    }

    return res.status(200).json(result);
  } catch (err) {
    //log error here

    if (err instanceof ArgumentError) {
      return res.status(400).json({ error: `could not get plan` });
    }

    res.status(500).json({ error: `could not get plan with id=${id}` });
  }
};

export default endpoint({ getPlan });
