import { Plan, Goal, Action, Token } from 'lib/domain';

export function createPlanModel(plan) {
  if (!(plan instanceof Plan)) {
    throw new TypeError(
      `expected type Plan, but got ${plan?.constructor.name}`
    );
  }

  return {
    ...plan,
    goal: plan.goal && createGoalModel(plan.goal),
    customerTokens: plan.customerTokens.map(createTokenModel)
  };
}

export function createGoalModel(goal) {
  if (!(goal instanceof Goal)) {
    throw new TypeError(
      `expected type Goal, but got ${goal?.constructor.name}`
    );
  }

  return {
    ...goal,
    actions: goal.actions.map(createActionModel)
  };
}

export function createActionModel(action) {
  if (!(action instanceof Action)) {
    throw new TypeError(
      `expected type Action, but got ${action?.constructor.name}`
    );
  }

  return {
    id: action.id,
    created: action.created,
    summary: action.summary,
    description: action.description,
    dueDate: action.dueDate,
    isCompleted: action.isCompleted,
    completedAt: action.completedAt,
    addedBy: action.addedBy,
    completedBy: action.completedBy,
    completedDate: action.completedDate
  };
}

export function createTokenModel(token) {
  if (!(token instanceof Token)) {
    throw new TypeError(
      `expected type Token, but got ${token?.constructor.name}`
    );
  }

  return { ...token };
}
