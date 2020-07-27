import { PlanNotFoundError } from '../domain';

export default class UpdatePlan {
  constructor({ getPlan, planGateway }) {
    this.getPlan = getPlan;
    this.planGateway = planGateway;
  }

  async execute({ planId, updateFields }) {
    const plan = await this.getPlan.execute({ id: planId });

    if (!plan) {
      throw new PlanNotFoundError(planId);
    }

    await plan.update(updateFields);
    await this.planGateway.save({ plan });
  }
}
