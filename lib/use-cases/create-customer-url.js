import { Token } from 'lib/domain';
import { nanoid } from 'nanoid';

export default class CreateCustomerUrl {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({ planId }) {
    const existingPlan = await this.planGateway.get({ id: planId });

    if (!existingPlan.customerTokens) existingPlan.customerTokens = [];

    const sortedTokens = existingPlan.customerTokens.sort((a, b) => {
      return Date.parse(b.createdDate) - Date.parse(a.createdDate);
    });

    let newToken;
    if (existingPlan.customerTokens.length === 0 || sortedTokens[0]?.shared) {
      console.log('here');
      newToken = new Token({
        token: nanoid(10),
        shared: false
      });

      existingPlan.customerTokens.push(newToken);
      await this.planGateway.save({ plan: existingPlan });
    } else {
      newToken = sortedTokens[0];
    }

    const planUrl = `${process.env.NEXT_PUBLIC_URL}/customer/plans/${existingPlan.id}?token=${newToken.token}`;

    return { planUrl };
  }
}
