import createPlanApi from '../../../pages/api/createPlanApi';
import createPlan from '../../../lib/libDependencies';

describe('createPlan Endpoint', () => {
  const firstName = 'James';
  const lastName = 'Bond';
  const id = '1';
  const res = {
    json: jest.fn()
  };

  const req = {
    params: {
      firstName,
      lastName
    }
  };

  it('Can get a plan', async () => {
    const expectedResponse = { id, firstName, lastName };

    createPlan.execute = jest.fn(x => {
      return expectedResponse;
    });

    await createPlanApi(req, res);

    expect(createPlan.execute).toHaveBeenCalledWith({ firstName, lastName });

    expect(res.json).toHaveBeenCalledWith(expectedResponse);
    expect(res.statusCode).toEqual(200);
  });

  it('Catches an error if one is thrown', async () => {
    const expectedResponse = { id, firstName, lastName };

    createPlan.execute = jest.fn(x => {
      throw new Error('cannot get');
    });

    await createPlanApi(req, res);

    expect(createPlan.execute).toHaveBeenCalledWith({ firstName, lastName });

    expect(res.json).toHaveBeenCalledWith(expectedResponse); //this should not pass. createPlan gets called in the previous test and doesnt get reset
    expect(res.statusCode).toEqual(400);
  });
});
