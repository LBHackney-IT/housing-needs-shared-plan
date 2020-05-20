import { Goal } from '../domain/plan';

export default class AddGoal {
  constructor({ logger, planGateway }) {
    this.logger = logger;
    this.planGateway = planGateway;
  }

  async execute({ planId, goal }) {
    const existingPlan = this.planGateway.get({ id: planId });

    if (!existingPlan) {
      this.logger.info('No plan found', { id: planId });
      return null;
    }

    existingPlan.goal = new Goal({
      targetReviewDate: goal.targetReviewDate,
      text: goal.text,
      useAsPhp: goal.useAsPhp
    });

    return await this.planGateway.save({ plan: existingPlan });
  }
}
