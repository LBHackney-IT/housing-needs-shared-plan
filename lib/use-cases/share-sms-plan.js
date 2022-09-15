import { IsoDateTime } from 'lib/domain/isodate';

export default class SharePlan {
  constructor({ planGateway, smsGateway }) {
    this.planGateway = planGateway;
    this.smsGateway = smsGateway;
  }

  async execute({ planId, collaborator, customerPlanUrl }) {
    const existingPlan = await this.planGateway.get({ id: planId });

    if (collaborator.number) {
      try {
        const smsTemplate = process.env.SMS_TEMPLATE_ID;
        const message = `You've been sent a link to your Shared Plan from Hackney Council. Click here to view: ${customerPlanUrl}`;

        await this.smsGateway.sendSms(
          smsTemplate,
            collaborator.number,
            {
              personalisation: {
                message: message
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
