import AddAction from 'lib/use-cases/add-action';
import { Plan, Goal } from 'lib/domain';
import MockDate from 'mockdate';

// xit('re-enable this test suite', () => {
//   expect(1).toEqual(1);
// })
jest.mock('lib/domain/goal', () => {
  return jest.fn().mockImplementation(() => {
    return {
      addOrReplaceAction: jest.fn()
    };
  });
});

describe('Add Action Use Case', () => {
  MockDate.set('2020-01-01T04:00:00.000Z');

  const action = {
    summary: '',
    description: '',
    dueDate: '2020-03-04'
  };

  const expectedAction = {
    id: expect.any(String),
    created: '2020-01-01T04:00:00.000Z',
    summary: '',
    description: '',
    dueDate: '2020-03-04'
  };

  it('adds an action to the correct goal for the plan with id', async () => {
    const id = '1';
    const goal = new Goal({
      agreedDate: 'one',
      targetReviewDate: 'two',
      text: 'three',
      useAsPhp: true
    });
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
    expect(expectedPlan.goal.addOrReplaceAction).toHaveBeenCalledWith(
      expect.objectContaining(expectedAction)
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
      await addAction.execute({}).rejects.toThrow('no plan found.');
    });
  });

  it('handles an error if no goal is found', async () => {
    const expectedPlan = new Plan({ id: '1', lastName: 'one' });
    const planGateway = {
      get: jest.fn(() => Promise.resolve(expectedPlan)),
      save: jest.fn(({ plan }) => Promise.resolve(plan))
    };

    const addAction = new AddAction({ planGateway });

    expect(planGateway.save).not.toHaveBeenCalled();
    await expect(async () => {
      await addAction
        .execute({
          planId: '1',
          action
        })
        .rejects.toThrow('no goal found');
    });
  });
});
