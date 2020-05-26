import { Action, ArgumentError } from 'lib/domain';

export default class Goal {
  constructor({ agreedDate, targetReviewDate, text, useAsPhp }) {
    this.agreedDate = agreedDate ? agreedDate : todaysDate();
    this.completedDate = null;
    this.targetReviewDate = reviewDate(targetReviewDate);
    this.text = text;
    this.useAsPhp = useAsPhp;
    this.actions = [];
  }

  addAction(action) {
    if (!(action instanceof Action)) throw new ArgumentError();

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
