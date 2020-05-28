import { Token } from 'lib/domain';

export default class SharePlan {
  constructor({ planGateway, smsGateway }) {
    this.planGateway = planGateway;
    this.smsGateway = smsGateway;
  }

  async execute(request) {
    const newToken = new Token({
      token: Math.random()
        .toString(36)
        .substring(2, length + 2)
    });

    if (!request.tokens) {
      request.tokens = [newToken];
    } else {
      request.tokens.push(newToken);
    }

    await this.planGateway.save({ plan: request });

    const message = `You’ve been sent a link to your Shared Plan from Hackney Council. Click here to view: ${process.env.SHARED_PLAN_URL}/customers/${request.planId}/plan#token=${newToken.token}`;

    await this.smsGateway.sendMessage({
      name: request.name,
      number: request.number,
      message
    });
  }
}
