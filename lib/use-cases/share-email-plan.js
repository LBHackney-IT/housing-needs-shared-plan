import { IsoDateTime } from 'lib/domain/isodate';

export default class ShareEmailPlan {
  constructor({ planGateway, emailGateway }) {
    this.planGateway = planGateway;
    this.emailGateway = emailGateway;
  }

  async execute({ planId, collaborator, customerPlanUrl }) {
    const existingPlan = await this.planGateway.get({ id: planId });

    if (collaborator.email) {
      try {
        await this.emailGateway.sendEmail(
            process.env.EMAIL_TEMPLATE_ID,
            collaborator.email,
            {
              personalisation: {
                name: `${existingPlan.firstName} ${existingPlan.lastName}`,
                customerPlanUrl: customerPlanUrl
              },
            }
        );

        existingPlan.customerTokens.forEach(token => {
          if (token.sharedDate === null) {
            token.sharedDate = IsoDateTime.now();
          }
        });

        await this.planGateway.save({ plan: existingPlan });

        return existingPlan;
      } catch (err) {
        console.log(err);
      }
    }
  }
}
