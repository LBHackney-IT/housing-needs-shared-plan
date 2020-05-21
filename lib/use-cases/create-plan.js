export default class CreatePlan {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({ firstName, lastName }) {
    const plan = await this.planGateway.create({ firstName, lastName });

    return {
      id: plan.id,
      firstName: plan.firstName,
      lastName: plan.lastName
    };
  }
}
