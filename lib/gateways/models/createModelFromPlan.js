import { Plan, Goal, Action, Token } from 'lib/domain';
import { normalise } from 'lib/utils/normalise';

function nullifyEmptyStrings(object) {
  if (!object) {
    return object;
  }

  Object.keys(object).forEach(key => {
    if (typeof object[key] === 'object') {
      object[key] = nullifyEmptyStrings(object[key]);
    } else if (object[key] === '') {
      object[key] = null;
    }
  });

  return object;
}

export function createPlanModel(plan) {
  if (!(plan instanceof Plan)) {
    throw new TypeError(
      `expected type Plan, but got ${plan?.constructor.name}`
    );
  }

  return nullifyEmptyStrings({
    ...plan,
    goal: plan.goal && createGoalModel(plan.goal),
    customerTokens: plan.customerTokens.map(createTokenModel),
    queryFirstName: normalise(plan.firstName),
    queryLastName: normalise(plan.lastName)
  });
}

export function createGoalModel(goal) {
  if (!(goal instanceof Goal)) {
    throw new TypeError(
      `expected type Goal, but got ${goal?.constructor.name}`
    );
  }

  return nullifyEmptyStrings({
    ...goal,
    actions: goal.actions.map(createActionModel)
  });
}

export function createActionModel(action) {
  if (!(action instanceof Action)) {
    throw new TypeError(
      `expected type Action, but got ${action?.constructor.name}`
    );
  }

  // Prevents storing _isCompleted in DynamoDB too.
  const { _isCompleted, ...others } = action;

  return nullifyEmptyStrings({
    ...others,
    isCompleted: action.isCompleted
  });
}

export function createTokenModel(token) {
  if (!(token instanceof Token)) {
    throw new TypeError(
      `expected type Token, but got ${token?.constructor.name}`
    );
  }

  return nullifyEmptyStrings({ ...token });
}
