// import { IsoDateTime } from 'lib/domain/isodate';

export default class SendReminder {
  constructor({ planGateway, smsGateway }) {
    this.planGateway = planGateway;
    this.smsGateway = smsGateway;
  }

  async execute({ planId, authHeader }) {
    const existingPlan = await this.planGateway.get({ id: planId });

    if (existingPlan.numbers[0]) {
      //   if (existingPlan.customerTokens.some(x => x.sharedDate))
      const customerPlanUrl = 'placeholder';
      try {
        const message = `Reminder: ${customerPlanUrl}`;

        await this.smsGateway.sendMessage({
          name: `${existingPlan.firstName} ${existingPlan.lastName}`,
          number: existingPlan.numbers[0],
          message,
          authHeader
        });

        // existingPlan.customerTokens.forEach(token => {
        //   if (token.sharedDate === null) {
        //     token.sharedDate = IsoDateTime.now();
        //   }
        // });

        // await this.planGateway.save({ plan: existingPlan });
        return existingPlan;
      } catch (err) {
        console.log(err);
      }
    }
  }
}
