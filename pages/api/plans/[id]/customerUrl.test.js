import { endpoint } from 'pages/api/plans/[id]/customerUrl';

describe('Get customer Url API', () => {
  let json;
  let res;

  beforeEach(() => {
    json = jest.fn();
    res = {
      status: jest.fn(() => {
        return { json };
      })
    };
  });

  const planId = '1';

  const req = {
    method: 'POST',
    query: {
      id: planId
    }
  };

  it('can generate a customer url', async () => {
    const expectedResponse = { customerPlanUrl: 'this_url' };
    const createCustomerUrl = {
      execute: jest.fn(() => {
        return expectedResponse;
      })
    };

    await endpoint({ createCustomerUrl })(req, res);

    expect(createCustomerUrl.execute).toHaveBeenCalledWith({
      planId
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('handles general errors', async () => {
    const expectedResponse = {
      error: 'could not generate a customer token for resident with id=1'
    };
    const createCustomerUrl = {
      execute: jest.fn()
    };
    createCustomerUrl.execute.mockImplementation(() => {
      throw new Error('bang!');
    });

    await endpoint({ createCustomerUrl })(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });
});
