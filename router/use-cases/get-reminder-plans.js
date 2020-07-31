module.exports = class GetReminderPlans {
  constructor({ getPlan, planGateway }) {
    this.getPlan = getPlan;
    this.planGateway = planGateway;
  }

  async execute() {
    return await this.planGateway.getReminderPlans();
  }
};
