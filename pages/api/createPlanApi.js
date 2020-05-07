import createPlan from '../../lib/libDependencies';

export default async (req, res) => {
  try {
    const result = await createPlan.execute({
      firstName: req.params.firstName,
      lastName: req.params.lastName
    });

    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({
        error: `could not create a plan with first name: ${req.params.firstName}, last name: ${req.params.lastName}`
      });
  }
};
