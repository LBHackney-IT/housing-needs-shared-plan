import { Goal, Action, ArgumentError, ActionNotFoundError } from 'lib/domain';

describe('Goal', () => {
  let goal;

  beforeEach(() => {
    goal = new Goal({
      agreedDate: '2020-06-05T08:50:00+0000',
      targetReviewDate: '2020-06-05T08:50:00+0000',
      text: 'World peace',
      actions: [
        new Action({
          id: 'PPBqWA9',
          summary: 'just a test',
          dueDate: '2020-06-05T08:50:00+0000',
          isCompleted: false
        })
      ],
      useAsPhp: false
    });
  });

  describe('addOrReplaceAction', () => {
    it('adds an action to the actions array', () => {
      const action = new Action({
        id: 'dogPzIz8',
        summary: 'Something new and exciting',
        dueDate: '2020-06-05T08:50:00+0000',
        isCompleted: false
      });

      goal.addOrReplaceAction(action);
      expect(goal.actions).toHaveLength(2);
      expect(goal.actions).toStrictEqual(expect.arrayContaining([action]));
    });

    it('replaces the action if it already exists', () => {
      const action = new Action({
        id: 'PPBqWA9',
        summary: 'Replace my existing summary with this',
        dueDate: '2020-06-05T08:50:00+0000',
        isCompleted: true
      });

      goal.addOrReplaceAction(action);
      expect(goal.actions).toHaveLength(1);
      expect(goal.actions).toStrictEqual(expect.arrayContaining([action]));
    });

    it('throws a TypeError adding something other than an Action', () => {
      expect(() => goal.addOrReplaceAction(5)).toThrow(TypeError);
    });
  });

  describe('findActionById', () => {
    it('finds an action, if it exists', () => {
      expect(goal.findActionById('PPBqWA9')).toBe(goal.actions[0]);
    });

    it('throws ActionNotFoundError, if no action is found', () => {
      expect(() => goal.findActionById('NOT_FOUND')).toThrowError(
        ActionNotFoundError
      );
    });
  });

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
