module.exports = class GetReminderPlans {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute() {
    return await this.planGateway.getReminderPlans();
  }
};
