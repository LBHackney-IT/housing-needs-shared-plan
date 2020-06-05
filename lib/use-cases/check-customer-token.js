// const { ArgumentError } = require('../../lib/domain');

class CheckCustomerToken {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({ planId, token }) {
    // if (!token) throw new ArgumentError('token cannot be null');

    const existingPlan = await this.planGateway.get({ id: planId });

    if (!existingPlan) {
      throw new Error('no plan found.');
    }

    let result = false;

    existingPlan.customerTokens.forEach(t => {
      if (t.token === token) result = true;
    });

    return result;
  }
}

module.exports = CheckCustomerToken;
