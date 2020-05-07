export default class GetPlan {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({ id }) {
    let plan = await this.planGateway.get(id);

    return {
      id: plan.id,
      firstName: plan.firstName,
      lastName: plan.lastName
    };
  }
}
