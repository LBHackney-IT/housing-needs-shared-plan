import { Goal, Plan } from '../../../lib/domain/plan';

describe('Plan', () => {
  it('sets the created date to the current date/time', async () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() =>
        new Date('2020-05-14T12:01:58.000Z').valueOf()
      );

    const plan = new Plan({});

    expect(plan.created).toEqual('2020-05-14T12:01:58.000Z');
  });
});

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
