import IsoDate from 'lib/domain/isodate';

export default class SendReminder {
  constructor({ planGateway, smsGateway }) {
    this.planGateway = planGateway;
    this.smsGateway = smsGateway;
  }

  async execute({ planId, authHeader }) {
    const existingPlan = await this.planGateway.get({ id: planId });

    if (existingPlan.numbers && existingPlan.numbers[0]) {
      const sortedTokens = existingPlan.customerTokens.sort((a, b) => {
        return Date.parse(b.sharedDate) - Date.parse(a.sharedDate);
      });

      const customerPlanUrl = `${process.env.NEXT_PUBLIC_URL}/c/plans/${existingPlan.id}?token=${sortedTokens[0].token}`;

      try {
        const message = `Reminder: ${customerPlanUrl}`;

        await this.smsGateway.sendMessage({
          name: `${existingPlan.firstName} ${existingPlan.lastName}`,
          number: existingPlan.numbers[0],
          message,
          authHeader
        });

        sortedTokens[0].sharedDate = IsoDate.parse(new Date());

        existingPlan.customerTokens = sortedTokens;

        await this.planGateway.save({ plan: existingPlan });
        return existingPlan;
      } catch (err) {
        console.log(err);
      }
    }
  }
}
