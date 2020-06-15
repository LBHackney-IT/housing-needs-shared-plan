import { PlanNotFoundError } from 'lib/domain';

export default class DeleteAction {
  constructor({ getPlan, planGateway }) {
    this.getPlan = getPlan;
    this.planGateway = planGateway;
  }

  async execute({ planId, actionId }) {
    const plan = await this.getPlan.execute({ id: planId });

    if (!plan) {
      throw new PlanNotFoundError(planId);
    }

    const { goal } = plan;
    goal.deleteActionById(actionId);
    await this.planGateway.save({ plan });
  }
}
