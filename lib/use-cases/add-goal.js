import Goal from 'lib/domain/goal';
import { createActionFromModel } from 'lib/gateways/models/createPlanFromModel';

export default class AddGoal {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({ planId, goal, currentUserName }) {
    const existingPlan = await this.planGateway.get({ id: planId });

    if (!existingPlan) {
      throw new Error('no plan found.');
    }

    existingPlan.goal = new Goal({
      targetReviewDate: goal.targetReviewDate,
      text: goal.text,
      useAsPhp: goal.useAsPhp,
      actions: goal.actions.map(createActionFromModel),
      agreedWithName: currentUserName
    });

    return await this.planGateway.save({ plan: existingPlan });
  }
}
