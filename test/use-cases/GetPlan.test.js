import GetPlan from '../../lib/use-cases/GetPlan';

describe('GetPlan', () => {
  it('Creates a new plan if plan does not exist', async () => {
    const firstName = 'Bill';
    const lastName = 'Hohepa';

    const planGateway = {
      createPlan: jest.fn(),
      getPlan: jest.fn(),
    };

    const usecase = GetPlan({ planGateway });

    const result = await usecase({ firstName, lastName });

    expect(planGateway.getPlan).toHaveBeenCalled();
    expect(planGateway.createPlan).toHaveBeenCalled();
    expect(result).toEqual({
      id: 1,
      firstName,
      lastName,
    });
  });
});
