export default class Goal {
  constructor({ agreedDate, targetReviewDate, text, useAsPhp }) {
    this.agreedDate = agreedDate ? agreedDate : this.todaysDate();
    this.completedDate = null;
    this.targetReviewDate = this.reviewDate(targetReviewDate);
    this.text = text;
    this.useAsPhp = useAsPhp;
  }

  reviewDate = targetReviewDate => {
    if (typeof targetReviewDate === 'string') return targetReviewDate;
    return new Date(
      targetReviewDate.year,
      targetReviewDate.month - 1,
      targetReviewDate.day
    ).toISOString();
  };

  todaysDate = () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return today.toISOString();
  };
}
