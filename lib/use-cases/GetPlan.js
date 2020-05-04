export default class GetPlan {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({ id }) {
    let plan = await this.planGateway.get(id);

    if (plan === null) {
      plan = await this.planGateway.create(id);
    }

    return {
      id,
      firstName: plan.firstName,
      lastName: plan.lastName
    };
  }
}
