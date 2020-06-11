import { Plan, Goal, Action, Token } from 'lib/domain';

export function createPlanFromModel({
  goal,
  customerTokens = [],
  ...planModel
}) {
  return new Plan({
    ...planModel,
    goal: goal && createGoalFromModel(goal),
    customerTokens: customerTokens.map(createTokenFromModel)
  });
}

export function createGoalFromModel({ actions = [], ...goalModel }) {
  return new Goal({
    ...goalModel,
    actions: actions.map(createActionFromModel)
  });
}

export function createActionFromModel(actionModel) {
  return new Action(actionModel);
}

export function createTokenFromModel(tokenModel) {
  return new Token(tokenModel);
}
