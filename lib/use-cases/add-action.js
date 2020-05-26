import { Action } from 'lib/domain';

export default class AddAction {
  constructor({ planGateway }) {
    this.planGateway = planGateway;
  }

  async execute({ planId, action }) {
    const existingPlan = await this.planGateway.get({ id: planId });

    if (!existingPlan) {
      throw new Error('no plan found');
    }

    existingPlan.goal.addAction(new Action(action));
    return await this.planGateway.save({ plan: existingPlan });
  }
}
