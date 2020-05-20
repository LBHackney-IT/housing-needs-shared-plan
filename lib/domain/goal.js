export default class Goal {
  constructor({ targetReviewDate, text, useAsPhp }) {
    this.agreedDate = this.todaysDate();
    this.completedDate = null;
    this.targetReviewDate = this.reviewDate(targetReviewDate);
    this.text = text;
    this.useAsPhp = useAsPhp;
  }

  reviewDate = date => {
    return new Date(date.year, date.month - 1, date.day).toISOString();
  };

  todaysDate = () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return today.toISOString();
  };
}
