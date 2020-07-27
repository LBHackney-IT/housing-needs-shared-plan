import UpdatePlan from './update-plan';
import { Plan, PlanNotFoundError } from 'lib/domain';

describe('UpdatePlan', () => {
  const plan = new Plan({
    id: 'd6BQiWGGhOrF8mFdPp4T',
    created: '2020-05-04T00:00:00+0000',
    firstName: 'Planella',
    lastName: 'Plansalot',
    numbers: ['number1', 'number2']
  });

  const usecase = new UpdatePlan({
    getPlan: { execute: jest.fn() },
    planGateway: { save: jest.fn(() => Promise.resolve()) }
  });

  beforeEach(() => {
    usecase.getPlan.execute.mockImplementation(() => Promise.resolve(plan));
  });

  describe('execute', () => {
    it('throws PlanNotFoundError if a plan is not found', () => {
      usecase.getPlan.execute.mockImplementation(() => Promise.resolve(null));
      expect(
        usecase.execute({
          planId: 'd6BQiWGGhOrF8mFdPp4T'
        })
      ).rejects.toThrowError(PlanNotFoundError);
    });

    describe('update phone numbers', () => {
      it('updates the phone numbers', async () => {
        await usecase.execute({
          planId: 'd6BQiWGGhOrF8mFdPp4T',
          updateFields: {
            numbers: ['new number', 'number2']
          }
        });
        expect(usecase.planGateway.save).toHaveBeenCalledWith({
          plan: expect.objectContaining({
            numbers: ['new number', 'number2']
          })
        });
      });
    });
  });
});
