export default class CreatePlan {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({ firstName, lastName, systemIds, numbers, emails, hasPhp }) {
    const plan = await this.planGateway.create({
      firstName,
      lastName,
      systemIds,
      emails,
      numbers,
      hasPhp
    });

    return {
      id: plan.id,
      firstName: plan.firstName,
      lastName: plan.lastName
    };
  }
}
