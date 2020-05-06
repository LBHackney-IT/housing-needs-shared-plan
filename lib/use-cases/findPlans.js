export default class FindPlans {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute(metadata) {
    const plans = await this.planGateway.find(metadata);
    return [];
  }
}
