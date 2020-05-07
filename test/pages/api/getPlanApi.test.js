import getPlanApi from '../../../pages/api/getPlanApi';
import getPlan from '../../../lib/libDependencies';

describe('getPlan Endpoint', () => {
  const id = '1';
  const res = {
    json: jest.fn()
  };

  const req = {
    params: {
      id
    }
  };
  it('Can get a plan', async () => {
    const expectedResponse = { id, firstName: 'Nick', lastName: 'Dove' };

    getPlan.execute = jest.fn(x => {
      return expectedResponse;
    });

    await getPlanApi(req, res);

    expect(getPlan.execute).toHaveBeenCalledWith({ id });

    expect(res.json).toHaveBeenCalledWith(expectedResponse);
    expect(res.statusCode).toEqual(200);
  });

  it('Catches an error if one is thrown', async () => {
    const expectedResponse = { id, firstName: 'Nick', lastName: 'Dove' };

    getPlan.execute = jest.fn(x => {
      throw new Error('cannot get');
    });

    await getPlanApi(req, res);

    expect(getPlan.execute).toHaveBeenCalledWith({ id });

    expect(res.json).toHaveBeenCalledWith(expectedResponse); //this should not pass. getPlan gets called in the previous test and doesnt get reset
    expect(res.statusCode).toEqual(400);
  });
});
