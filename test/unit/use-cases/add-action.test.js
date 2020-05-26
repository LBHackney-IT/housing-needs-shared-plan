import AddAction from '../../../lib/use-cases/add-action';
import { Plan } from 'lib/domain';
jest.mock('lib/domain/goal', () => {
  return jest.fn().mockImplementation(() => {
    return {
      addAction: jest.fn()
    };
  });
});

describe('Add Action Use Case', () => {
  const action = {
    summary: '',
    description: '',
    dueDate: new Date(Date.now())
  };

  it('adds an action to the correct goal for the plan with id', async () => {
    const id = '1';
    const goal = {
      agreedDate: 'one',
      targetReviewDate: 'two',
      text: 'three',
      useAsPhp: true
    };
    const expectedPlan = new Plan({ id, goal });
    const planGateway = {
      get: jest.fn(() => Promise.resolve(expectedPlan)),
      save: jest.fn(({ plan }) => Promise.resolve(plan))
    };
    const addAction = new AddAction({ planGateway });

    const result = await addAction.execute({
      planId: id,
      action
    });

    expect(planGateway.get).toHaveBeenCalledWith({ id });
    expect(expectedPlan.goal.addAction).toHaveBeenCalledWith(
      expect.objectContaining(action)
    );
    expect(planGateway.save).toHaveBeenCalledWith({ plan: expectedPlan });
    expect(result).toBe(expectedPlan);
  });

  it('handles an error if no plan is found', async () => {
    const planGateway = {
      get: jest.fn(() => null),
      save: jest.fn(({ plan }) => Promise.resolve(plan))
    };
    const addAction = new AddAction({ planGateway });

    await expect(async () => {
      await await addAction.execute({}).rejects.toThrow('no plan found.');
    });
  });
});
