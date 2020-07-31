import CreateCustomerUrl from 'lib/use-cases/create-customer-url';
import Plan from 'lib/domain/plan';
import { nanoid } from 'nanoid';
jest.mock('nanoid');

describe('Create Customer Url Use Case', () => {
  nanoid.mockImplementation(() => 'random_string');

  it('creates a url if none exist', async () => {
    const id = 1;

    const planGateway = {
      get: jest.fn(() => {
        return { id, customerTokens: [] };
      }),
      save: jest.fn()
    };

    const createCustomerUrl = new CreateCustomerUrl({ planGateway });

    const result = await createCustomerUrl.execute({ id });

    const expectedRequest = {
      plan: {
        customerTokens: [
          {
            sharedDate: null,
            token: 'random_string',
            previouslySharedOn: []
          }
        ],
        id
      }
    };

    expect(planGateway.save).toHaveBeenCalledWith(expectedRequest);
    expect(result).toEqual({
      customerPlanUrl: `${process.env.NEXT_PUBLIC_URL}/c/plans/${id}?token=random_string`
    });
  });

  it('Creates a new url if the previous one was shared', async () => {
    const id = 1;

    const planGateway = {
      get: jest.fn(() => {
        return {
          id,
          customerTokens: [
            { token: '123', sharedDate: new Date().toISOString() }
          ]
        };
      }),
      save: jest.fn()
    };

    const createCustomerUrl = new CreateCustomerUrl({ planGateway });

    const result = await createCustomerUrl.execute({ id });

    const expectedRequest = {
      plan: {
        customerTokens: [
          {
            sharedDate: expect.anything(),
            token: '123'
          },
          {
            previouslySharedOn: [],
            sharedDate: null,
            token: 'random_string'
          }
        ],
        id
      }
    };

    expect(planGateway.save).toHaveBeenCalledWith(expectedRequest);
    expect(result).toEqual({
      customerPlanUrl: `${process.env.NEXT_PUBLIC_URL}/c/plans/${id}?token=random_string`
    });
  });

  it('Gets an existing url if it has not been shared', async () => {
    const id = 1;

    const planGateway = {
      get: jest.fn(() => {
        return { id, customerTokens: [{ token: 'abc', shared: false }] };
      }),
      save: jest.fn()
    };

    const createCustomerUrl = new CreateCustomerUrl({ planGateway });

    const result = await createCustomerUrl.execute({ id });

    expect(planGateway.save).not.toHaveBeenCalled();
    expect(result).toEqual({
      customerPlanUrl: `${process.env.NEXT_PUBLIC_URL}/c/plans/${id}?token=abc`
    });
  });
});
