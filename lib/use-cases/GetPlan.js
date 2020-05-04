export default ({ planGateway }) => {
  return async ({ id }) => {
    let plan = planGateway.get(id);

    if (plan === null) {
      plan = planGateway.create(id);
    }

    return {
      id,
      firstName: plan.firstName,
      lastName: plan.lastName
    };
  };
};
