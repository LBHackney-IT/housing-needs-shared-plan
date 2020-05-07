import getPlan from '../../lib/libDependencies';

export default async (req, res) => {
  try {
    const result = await getPlan.execute({ id: req.params.id });

    res.statusCode = 200;
    res.json(result);
  } catch (err) {
    res.statusCode = 400;
    res.json({ error: err });
  }
};
