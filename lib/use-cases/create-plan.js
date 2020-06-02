export default class CreatePlan {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({ firstName, lastName, systemIds, numbers, emails }) {
    const plan = await this.planGateway.create({
      firstName,
      lastName,
      systemIds,
      emails,
      numbers
    });

    return {
      id: plan.id,
      firstName: plan.firstName,
      lastName: plan.lastName
    };
  }
}
