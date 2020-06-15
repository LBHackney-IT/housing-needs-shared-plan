import { Token } from 'lib/domain';
import { nanoid } from 'nanoid';

export default class CreateCustomerUrl {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({ planId }) {
    const existingPlan = await this.planGateway.get({ id: planId });

    const currentToken = existingPlan.customerTokens.find(
      token => token.shared === false
    );

    const basePlanUrl = `${process.env.NEXT_PUBLIC_URL}/c/plans/${existingPlan.id}?token=`;
    if (currentToken) {
      return {
        customerPlanUrl: `${basePlanUrl}${currentToken.token}`
      };
    }

    const newToken = new Token({
      token: nanoid(6)
    });

    existingPlan.customerTokens.push(newToken);
    await this.planGateway.save({ plan: existingPlan });

    return {
      customerPlanUrl: `${basePlanUrl}${newToken.token}`
    };
  }
}
