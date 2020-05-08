import createPlan from '../../lib/dependencies';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const result = await createPlan.execute({
        firstName: req.body.firstName,
        lastName: req.body.lastName
      });

      res.status(200).json(result);
    } catch (err) {
      //log error here
      res.status(500).json({
        error: `could not create a plan with first name: ${req.body.firstName}, last name: ${req.body.lastName}`
      });
    }
  }
};
