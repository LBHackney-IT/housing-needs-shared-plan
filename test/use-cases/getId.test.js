import GetId from '../../lib/use-cases/getId';

describe('GetId', () => {
  it('returns Id if shared plan exists', async () => {
    const id = 2;
    const planGateway = {
      getId: jest.fn(() => id)
    };
    const getId = new GetId({ planGateway });

    const planId = await getId.execute({ firstName: 'one', lastName: 'two' });

    expect(planGateway.getId).toHaveBeenCalledWith({
      firstName: 'one',
      lastName: 'two'
    });
    expect(planId).toEqual(id);
  });
});
