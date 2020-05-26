import Goal from 'lib/domain/goal';

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

  it('does not set the review date if previously set', () => {
    const agreedDate = '2030-02-12T00:00:00.000Z';
    const targetReviewDate = '2040-02-12T00:00:00.000Z';
    const goal = new Goal({ agreedDate, targetReviewDate });

    expect(goal.agreedDate).toEqual('2030-02-12T00:00:00.000Z');
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

  it('does not set the target review date if previously set', () => {
    const targetReviewDate = '2030-02-12T00:00:00.000Z';
    const goal = new Goal({ targetReviewDate });

    expect(goal.targetReviewDate).toEqual('2030-02-12T00:00:00.000Z');
  });
});
