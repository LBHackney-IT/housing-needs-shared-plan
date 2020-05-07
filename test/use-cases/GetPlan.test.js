import GetPlan from '../../lib/use-cases/getPlan';

describe('GetPlan', () => {
  it('does not create a plan if one already exists', async () => {
    const id = 1;
    const planGateway = {
      create: jest.fn(),
      get: jest.fn(() => ({ id, firstName: 'Simon', lastName: 'ThePieman' }))
    };
    const getPlan = new GetPlan({ planGateway });

    const result = await getPlan.execute({ id });

    expect(planGateway.get).toHaveBeenCalledWith(id);
    expect(planGateway.create).not.toHaveBeenCalled();
    expect(result).toEqual({ id, firstName: 'Simon', lastName: 'ThePieman' });
  });
});
