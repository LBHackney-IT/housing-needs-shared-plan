import { PlanNotFoundError, ActionNotFoundError } from 'lib/domain';

export default class UpdateAction {
  constructor({ getPlan, planGateway }) {
    this.getPlan = getPlan;
    this.planGateway = planGateway;
  }

  async execute({ planId, actionId, updateFields }) {
    const plan = await this.getPlan({ id: planId });

    if (!plan) {
      throw new PlanNotFoundError(planId);
    }

    const { goal } = plan;
    const action = goal?.findActionById(actionId);

    if (!action) {
      throw new ActionNotFoundError(actionId);
    }

    goal.addOrReplaceAction(action.update(updateFields));
    await this.planGateway.save(plan);
  }
}
