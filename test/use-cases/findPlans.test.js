import FindPlans from '../../lib/use-cases/findPlans';

describe('FindPlans', () => {
  it('can find matching plans', async () => {
    const planGateway = {
      find: jest.fn()
    };
    const findPlans = new FindPlans({ planGateway });
    const metadata = { firstName: 'Joe', lastName: 'Bro', systemId: '123' };

    await findPlans.execute(metadata);

    expect(planGateway.find).toHaveBeenCalledWith(metadata);
  });
});
