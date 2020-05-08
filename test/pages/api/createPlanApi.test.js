import createPlanApi from '../../../pages/api/createPlanApi';
import createPlan from '../../../lib/dependencies';

describe('CreatePlanApi', () => {
  const firstName = 'James';
  const lastName = 'Bond';
  const id = '1';

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

  it('handles error if one is thrown', async () => {
    const expectedResponse = {
      error: 'could not create a plan with first name: James, last name: Bond'
    };

    createPlan.execute = jest.fn(x => {
      throw new Error('cannot get');
    });

    await createPlanApi(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });
});
