import { Action, Goal } from 'lib/domain';
import { nanoid } from 'nanoid';

export default class AddAction {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({ planId, action }) {
    const existingPlan = await this.planGateway.get({ id: planId });

    if (!existingPlan) {
      throw new Error('no plan found');
    }

    if (!existingPlan.goal) {
      throw new Error('no goal found');
    }

    existingPlan.goal = new Goal({
      targetReviewDate: existingPlan.goal.targetReviewDate || '',
      text: existingPlan.goal.text || '',
      useAsPhp: existingPlan.goal.useAsPhp || false,
      actions: existingPlan.goal.actions
    });

    existingPlan.goal.addOrReplaceAction(
      new Action({
        id: nanoid(7),
        ...action
      })
    );

    return await this.planGateway.save({ plan: existingPlan });
  }
}
