export default class GetPlan {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({ id }) {
    const plan = await this.planGateway.get({ id });
    if (!plan) return null;
    return {
      id: plan.id,
      firstName: plan.firstName,
      lastName: plan.lastName
    };
  }
}
