import GetPlan from '../../lib/use-cases/getPlan';

describe('GetPlan', () => {
  const createGateway = planExists => {
    const plans = [
      { firstName: 'Nate', lastName: 'Tate', id: 1 },
      { firstName: 'Simon', lastName: 'ThePieman', id: 2 }
    ];
    return {
      create: jest.fn(id => {
        return { id, firstName: 'new', lastName: 'name' };
      }),
      get: jest.fn(id => {
        return planExists ? plans.filter(x => x.id === id)[0] : null;
      })
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a new plan if plan does not exist', async () => {
    const id = 1;
    const planGateway = createGateway(false);
    const getPlan = new GetPlan({ planGateway });

    const result = await getPlan.execute({ id });

    expect(planGateway.get).toHaveBeenCalledWith(id);
    expect(planGateway.create).toHaveBeenCalledWith(id);
    expect(result.id).toEqual(id);
  });

  it('does not create a plan if one already exists', async () => {
    const id = 2;
    const planGateway = createGateway(true);
    const getPlan = new GetPlan({ planGateway });

    const result = await getPlan.execute({ id });

    expect(planGateway.get).toHaveBeenCalledWith(id);
    expect(planGateway.create).not.toHaveBeenCalled();
    expect(result).toEqual({
      id,
      firstName: 'Simon',
      lastName: 'ThePieman'
    });
  });
});
