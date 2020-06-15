import UpdateAction from './delete-action';
import { Action, Goal, Plan, PlanNotFoundError } from 'lib/domain';

describe('DeleteAction', () => {
  const expectedPlan = new Plan({
    id: 'd6BQiWGGhOrF8mFdPp4T',
    created: '2020-05-04T00:00:00+0000',
    firstName: 'Planella',
    lastName: 'Plansalot',
    goal: new Goal({
      targetReviewDate: '2020-06-04T00:00:00+0000',
      actions: [
        new Action({
          id: 'PPBqWA9',
          summary: 'Do something',
          dueDate: '2020-06-04T00:00:00+0000'
        })
      ]
    })
  });

  const usecase = new UpdateAction({
    getPlan: { execute: jest.fn() },
    planGateway: { save: jest.fn(() => Promise.resolve()) }
  });

  beforeEach(() => {
    usecase.getPlan.execute.mockImplementation(() =>
      Promise.resolve(expectedPlan)
    );
  });

  describe('execute', () => {
    it('throws PlanNotFoundError if a plan is not found', () => {
      usecase.getPlan.execute.mockImplementation(() => Promise.resolve(null));
      expect(
        usecase.execute({
          planId: 'd6BQiWGGhOrF8mFdPp4T',
          actionId: 'PPBqWA9'
        })
      ).rejects.toThrowError(PlanNotFoundError);
    });

    it('saves the updated plan', async () => {
      await usecase.execute({
        planId: 'd6BQiWGGhOrF8mFdPp4T',
        actionId: 'PPBqWA9'
      });

      expect(usecase.planGateway.save).toHaveBeenCalledWith({
        plan: expect.objectContaining({
          goal: expect.objectContaining({ actions: [] })
        })
      });
    });
  });
});
