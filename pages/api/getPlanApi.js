import getPlan from '../../lib/dependencies';

export default async (req, res) => {
  try {
    const result = await getPlan.execute({ id: req.params.id });

    res.status(200).json(result);
  } catch (err) {
    //log error here
    res
      .status(500)
      .json({ error: `could not get plan with id: ${req.params.id}` });
  }
};
