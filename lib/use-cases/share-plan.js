import { Token } from 'lib/domain';
import { nanoid } from 'nanoid';

export default class SharePlan {
  constructor({ planGateway, smsGateway }) {
    this.planGateway = planGateway;
    this.smsGateway = smsGateway;
  }

  async execute({ planId, collaborator, authHeader }) {
    const existingPlan = await this.planGateway.get({ id: planId });

    const sortedTokens = existingPlan.customerTokens.sort((a, b) => {
      return Date.parse(b.createdDate) - Date.parse(a.createdDate);
    });

    let recentToken;
    sortedTokens.forEach(token => {
      if (!token.shared) {
        recentToken = token;
        return;
      }
    });

    const planUrl = `${process.env.NEXT_PUBLIC_URL}/customer/plans/${existingPlan.id}?token=${recentToken.token}`;

    if (collaborator.number) {
      try {
        const message = `You've been sent a link to your Shared Plan from Hackney Council. Click here to view: ${planUrl}`;

        await this.smsGateway.sendMessage({
          name: `${existingPlan.firstName} ${existingPlan.lastName}`,
          number: collaborator.number,
          message,
          authHeader
        });

        existingPlan.customerTokens.forEach(token => {
          if (token.token === recentToken.token) token.shared = true;
        });

        await this.planGateway.save({ plan: existingPlan });

        return recentToken;
      } catch (err) {
        console.log(err);
      }
    }
  }
}
