import { Token } from 'lib/domain';
import { nanoid } from 'nanoid';

export default class SharePlan {
  constructor({ planGateway, smsGateway }) {
    this.planGateway = planGateway;
    this.smsGateway = smsGateway;
  }

  async execute({ planId, collaborator, authHeader }) {
    const existingPlan = await this.planGateway.get({ id: planId });

    const newToken = new Token({
      token: nanoid(6)
    });

    if (!existingPlan.customerTokens) existingPlan.customerTokens = [];
    existingPlan.customerTokens.push(newToken);

    const planUrl = `${process.env.NEXT_PUBLIC_URL}/c/plans/${existingPlan.id}?token=${newToken.token}`;

    if (collaborator.number) {
      const message = `You've been sent a link to your Shared Plan from Hackney Council. Click here to view: ${planUrl}`;

      await this.smsGateway.sendMessage({
        name: `${existingPlan.firstName} ${existingPlan.lastName}`,
        number: collaborator.number,
        message,
        authHeader
      });

      await this.planGateway.save({ plan: existingPlan });
    }

    return newToken;
  }
}
