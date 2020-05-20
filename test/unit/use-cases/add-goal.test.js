import AddGoal from '../../../lib/use-cases/add-goal';
import { Goal, Plan } from '../../../lib/domain/plan';

describe('Add Goal Use Case', () => {
  const logger = { info: jest.fn(), error: jest.fn() };

  const planGateway = {
    get: jest.fn(({ id }) => new Plan({ id })),
    save: jest.fn(({ plan }) => plan)
  };

  it('adds a goal to plan with id', async () => {
    const planId = 1;
    const text = 'the goal text';
    const targetReviewDate = {
      day: 12,
      month: 2,
      year: 2030
    };
    const useAsPhp = true;
    const addGoal = new AddGoal({ planGateway, logger });

    const result = await addGoal.execute({
      planId,
      goal: { targetReviewDate, text, useAsPhp }
    });

    expect(planGateway.get).toHaveBeenCalledWith({ id: planId });
    expect(planGateway.save).toHaveBeenCalledWith({
      plan: expect.any(Plan)
    });
    expect(result.id).toEqual(planId);
    expect(result.goal.toString()).toEqual(
      new Goal({ targetReviewDate, text, useAsPhp }).toString()
    );
  });
});
