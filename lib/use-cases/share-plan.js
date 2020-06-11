export default class SharePlan {
  constructor({ planGateway, smsGateway }) {
    this.planGateway = planGateway;
    this.smsGateway = smsGateway;
  }

  async execute({ planId, collaborator, authHeader, customerPlanUrl }) {
    const existingPlan = await this.planGateway.get({ id: planId });

    if (collaborator.number) {
      try {
        const message = `You've been sent a link to your Shared Plan from Hackney Council. Click here to view: ${customerPlanUrl}`;

        await this.smsGateway.sendMessage({
          name: `${existingPlan.firstName} ${existingPlan.lastName}`,
          number: collaborator.number,
          message,
          authHeader
        });

        existingPlan.customerTokens.forEach(token => {
          token.shared = true;
        });

        await this.planGateway.save({ plan: existingPlan });
        return existingPlan;
      } catch (err) {
        console.log(err);
      }
    }
  }
}
