import { PlanNotFoundError, ActionNotFoundError } from 'lib/domain';

const allowedToUpdateFields = [
  'summary',
  'description',
  'dueDate',
  'isCompleted'
];

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

    const updated = Object.assign(
      action,
      Object.fromEntries(
        Object.entries(updateFields).filter(([key]) =>
          allowedToUpdateFields.includes(key)
        )
      )
    );

    goal.addOrReplaceAction(updated);
    await this.planGateway.save(plan);
  }
}
