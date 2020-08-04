const IsoDate = require('../domain/isodate');

module.exports = class SendReminder {
  constructor({ planGateway, smsGateway }) {
    this.planGateway = planGateway;
    this.smsGateway = smsGateway;
  }

  async execute({ planId, authHeader }) {
    try {
      const existingPlan = await this.planGateway.get({ id: planId });

      if (existingPlan.numbers && existingPlan.numbers[0]) {
        const sortedTokens = existingPlan.customerTokens.sort((a, b) => {
          return Date.parse(b.sharedDate) - Date.parse(a.sharedDate);
        });

        const customerPlanUrl = `${process.env.NEXT_PUBLIC_URL}/c/plans/${existingPlan.id}?token=${sortedTokens[0].token}`;

        const message = `This is a reminder that your Shared Plan from Hackney Council has actions due in 2 days: ${customerPlanUrl}`;

        await this.smsGateway.sendMessage({
          name: `Shared Plan Reminder`,
          number: existingPlan.numbers[0],
          message,
          authHeader
        });

        sortedTokens[0].previouslySharedOn = sortedTokens[0].previouslySharedOn
          ? sortedTokens[0].previouslySharedOn.concat([
              sortedTokens[0].sharedDate
            ])
          : [sortedTokens[0].sharedDate];
        sortedTokens[0].sharedDate = IsoDate.parse(new Date());

        existingPlan.customerTokens = sortedTokens;

        await this.planGateway.save({ plan: existingPlan });
        return existingPlan;
      }
    } catch (err) {
      console.log(err);
    }
  }
};
