import { Token } from 'lib/domain';

export default class SharePlan {
  constructor({ planGateway, smsGateway }) {
    this.planGateway = planGateway;
    this.smsGateway = smsGateway;
  }

  async execute({ planId, number, auth }) {
    const existingPlan = await this.planGateway.get({ id: planId });

    const newToken = new Token({
      token: Math.random()
        .toString(36)
        .substring(2, length + 2)
    });

    if (!existingPlan.tokens) {
      existingPlan.tokens = [newToken];
    } else {
      existingPlan.tokens.push(newToken);
    }

    await this.planGateway.save({ plan: existingPlan });

    const message = `You’ve been sent a link to your Shared Plan from Hackney Council. Click here to view: ${process.env.SHARED_PLAN_URL}/customers/${existingPlan.planId}/plan#token=${newToken.token}`;

    await this.smsGateway.sendMessage({
      name: existingPlan.firstName,
      number,
      message,
      auth
    });
  }
}
