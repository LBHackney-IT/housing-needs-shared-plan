import createPlan from '../../lib/libDependencies';

export default async (req, res) => {
  try {
    const result = await createPlan.execute({
      firstName: req.params.firstName,
      lastName: req.params.lastName
    });

    res.statusCode = 200;
    res.json(result);
  } catch (err) {
    res.statusCode = 400;
    res.json({ error: err });
  }
};
