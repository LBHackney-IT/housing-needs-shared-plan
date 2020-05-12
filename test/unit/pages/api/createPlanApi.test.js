import createPlanApi from '../../../../pages/api/createPlanApi';
import createPlan from '../../../../lib/dependencies';
import { ArgumentError } from '../../../../lib/domain';

describe('CreatePlanApi', () => {
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

  it('can get a plan', async () => {
    const id = '1';
    const expectedResponse = expect.objectContaining({
      id,
      firstName,
      lastName
    });

    createPlan.execute = jest.fn(x => {
      return expectedResponse;
    });

    await createPlanApi(req, res);

    expect(createPlan.execute).toHaveBeenCalledWith({ firstName, lastName });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('handles bad requests', async () => {
    const expectedResponse = { error: 'could not create plan' };

    createPlan.execute = jest.fn(x => {
      throw new ArgumentError('something is missing');
    });

    await createPlanApi(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('handles general errors', async () => {
    const expectedResponse = {
      error: 'could not create plan with firstName=James, lastName=Bond'
    };

    createPlan.execute = jest.fn(x => {
      throw new Error('bang!');
    });

    await createPlanApi(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });
});
