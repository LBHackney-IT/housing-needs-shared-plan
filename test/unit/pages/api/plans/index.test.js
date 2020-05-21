import { endpoint } from 'pages/api/plans';
import { ArgumentError } from 'lib/domain';

describe('Create Plan Api', () => {
  const firstName = 'James';
  const lastName = 'Bond';

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

  const req = {
    method: 'POST',
    body: {
      firstName,
      lastName
    }
  };

  it('can create a plan', async () => {
    const id = '1';
    const expectedResponse = expect.objectContaining({
      id,
      firstName,
      lastName
    });

    const createPlan = jest.fn(x => {
      return expectedResponse;
    });

    await endpoint({ createPlan })(req, res);

    expect(createPlan).toHaveBeenCalledWith({ firstName, lastName });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('handles bad requests', async () => {
    const expectedResponse = { error: 'could not create plan' };

    const createPlan = jest.fn(x => {
      throw new ArgumentError('something is missing');
    });

    await endpoint({ createPlan })(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('handles general errors', async () => {
    const expectedResponse = {
      error: 'could not create plan with firstName=James, lastName=Bond'
    };

    const createPlan = jest.fn(x => {
      throw new Error('bang!');
    });

    await endpoint({ createPlan })(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });
});