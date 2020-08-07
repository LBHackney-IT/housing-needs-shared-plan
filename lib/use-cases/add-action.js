import { Action } from 'lib/domain';
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

    existingPlan.goal.addOrReplaceAction(
      new Action({
        id: nanoid(6),
        created: new Date(Date.now()).toISOString(),
        ...action
      })
    );

    return await this.planGateway.save({ plan: existingPlan });
  }
}
