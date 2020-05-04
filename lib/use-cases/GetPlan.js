export default ({ planGateway }) => {
  return async ({ firstName, lastName }) => {
    let plan = planGateway.getPlan();

    plan = planGateway.createPlan();

    return {
      id: 1,
      firstName,
      lastName,
    };
  };
};
