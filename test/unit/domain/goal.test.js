import Goal from '../../../lib/domain/goal';


describe('Goal', () => {
  it('sets the agreed date to todays date', () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const goal = new Goal({
      targetReviewDate: {
        day: 12,
        month: 2,
        year: 2030
      }
    });

    expect(goal.agreedDate).toEqual(today.toISOString());
  });

  it('sets the target review date', () => {
    const targetReviewDate = {
      day: 12,
      month: 2,
      year: 2030
    };

    const goal = new Goal({ targetReviewDate });

    expect(goal.targetReviewDate).toEqual('2030-02-12T00:00:00.000Z');
  });
});