import UpdateAction from './update-action';
import {
  Action,
  Goal,
  Plan,
  ActionNotFoundError,
  PlanNotFoundError
} from 'lib/domain';

describe('UpdateAction', () => {
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

    describe('missing actions', () => {
      it('throws ActionNotFoundError if an action is not found', () => {
        expect(
          usecase.execute({
            planId: 'd6BQiWGGhOrF8mFdPp4T',
            actionId: 'NOT_FOUND'
          })
        ).rejects.toThrowError(ActionNotFoundError);
      });

      it('throws ActionNotFoundError error if no goal is set', () => {
        usecase.getPlan.execute.mockImplementation(() =>
          Promise.resolve(
            new Plan({
              id: 'd6BQiWGGhOrF8mFdPp4T',
              created: '2020-05-04T00:00:00+0000',
              firstName: 'Planella',
              lastName: 'Plansalot',
              goal: null
            })
          )
        );

        expect(
          usecase.execute({
            planId: 'd6BQiWGGhOrF8mFdPp4T',
            actionId: 'PPBqWA9'
          })
        ).rejects.toThrowError(ActionNotFoundError);
      });
    });

    it('saves the updated plan', async () => {
      await usecase.execute({
        planId: 'd6BQiWGGhOrF8mFdPp4T',
        actionId: 'PPBqWA9',
        updateFields: {
          summary: 'UPDATED_SUMMARY',
          description: 'UPDATED_DESCRIPTION',
          dueDate: '2020-12-25T00:00:00+0000'
        }
      });

      expect(usecase.planGateway.save).toHaveBeenCalledWith({
        plan: expect.objectContaining({
          goal: expect.objectContaining({
            actions: expect.arrayContaining([
              expect.objectContaining({
                summary: 'UPDATED_SUMMARY',
                description: 'UPDATED_DESCRIPTION',
                dueDate: '2020-12-25T00:00:00+0000'
              })
            ])
          })
        })
      });
    });
  });
});
