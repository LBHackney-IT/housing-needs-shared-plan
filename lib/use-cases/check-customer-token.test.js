import CheckCustomerToken from 'lib/use-cases/check-customer-token';
import Plan from 'lib/domain/plan';
import { ArgumentError } from 'lib/domain';

describe('Check Customer Token', () => {
  it('returns false if customer token does not exist for the cutomer', async () => {
    const planId = '1';
    const token = 'abc';
    const planGateway = {
      get: jest.fn(
        () =>
          new Plan({
            customerTokens: []
          })
      )
    };
    const checkCustomerToken = new CheckCustomerToken({ planGateway });

    const result = await checkCustomerToken.execute({ planId, token });
    expect(planGateway.get).toHaveBeenCalledWith({ id: planId });
    expect(result).toBe(false);
  });

  it('returns true if customer token exists for the cutomer', async () => {
    const planId = '1';
    const token = 'abc';
    const planGateway = {
      get: jest.fn(
        () =>
          new Plan({
            customerTokens: [{ token: '123' }, { token: 'abc' }]
          })
      )
    };
    const checkCustomerToken = new CheckCustomerToken({ planGateway });

    const result = await checkCustomerToken.execute({ planId, token });
    expect(planGateway.get).toHaveBeenCalledWith({ id: planId });
    expect(result).toBe(true);
  });

  it('throws an error if plan does not exist', async () => {
    const planId = '1';
    const token = 'abc';
    const planGateway = { get: jest.fn() };
    const checkCustomerToken = new CheckCustomerToken({ planGateway });

    await expect(async () => {
      await checkCustomerToken.execute({ planId, token });
    }).rejects.toThrow(new Error('no plan found.'));
  });

  it('throws an error if token is missing', async () => {
    const planGateway = { get: jest.fn() };
    const checkCustomerToken = new CheckCustomerToken({ planGateway });

    await expect(async () => {
      await checkCustomerToken.execute({ planId: 1 });
    }).rejects.toThrow(new ArgumentError('token cannot be null'));
  });
});
