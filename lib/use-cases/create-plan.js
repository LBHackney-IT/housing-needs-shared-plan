export default class CreatePlan {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({
    firstName,
    lastName,
    systemIds,
    numbers,
    emails,
    initialUseAsPhp
  }) {
    const plan = await this.planGateway.create({
      firstName,
      lastName,
      systemIds,
      emails,
      numbers,
      initialUseAsPhp
    });

    return {
      id: plan.id,
      firstName: plan.firstName,
      lastName: plan.lastName
    };
  }
}
