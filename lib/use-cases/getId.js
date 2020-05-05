export default class GetPlan {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({ firstName, lastName }) {
    let id = await this.planGateway.getId({ firstName, lastName });

    return id;
  }
}
