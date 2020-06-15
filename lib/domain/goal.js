import { Action, ActionNotFoundError } from 'lib/domain';

const findActionById = actionId => action => action.id === actionId;

export default class Goal {
  constructor({
    agreedDate,
    targetReviewDate,
    text,
    useAsPhp,
    actions,
    agreedWithName
  }) {
    this.agreedDate = agreedDate ? agreedDate : todaysDate();
    this.completedDate = null;
    this.targetReviewDate = reviewDate(targetReviewDate);
    this.text = text;
    this.useAsPhp = useAsPhp;
    this.actions = actions || [];
    this.agreedWithName = agreedWithName || null;
  }

  findActionById(actionId) {
    const match = this.actions.find(findActionById(actionId));

    if (match) {
      return match;
    }

    throw new ActionNotFoundError(actionId);
  }

  deleteActionById(actionId) {
    const existing = this.actions.findIndex(findActionById(actionId));

    if (existing >= 0) {
      this.actions.splice(existing, 1);
    }
  }

  addOrReplaceAction(action) {
    if (!(action instanceof Action)) {
      throw new TypeError(
        `expected type Action, but got ${action?.constructor.name}`
      );
    }

    const existing = this.actions.findIndex(findActionById(action.id));

    if (existing >= 0) {
      this.actions[existing] = action;
      return;
    }

    this.actions.push(action);
  }
}

const reviewDate = targetReviewDate => {
  if (typeof targetReviewDate === 'string') return targetReviewDate;
  return new Date(
    targetReviewDate.year,
    targetReviewDate.month - 1,
    targetReviewDate.day
  ).toISOString();
};

const todaysDate = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};
