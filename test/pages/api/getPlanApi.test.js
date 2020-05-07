import getPlanApi from '../../../pages/api/getPlanApi';
import getPlan from '../../../lib/libDependencies';

describe('getPlan Endpoint', () => {
  const id = '1';
  let json;
  let res;

  const req = {
    params: {
      id
    }
  };

  beforeEach(() => {
    json = jest.fn();
    res = {
      status: jest.fn(() => {
        return { json };
      })
    };
  });
  it('Can get a plan', async () => {
    const expectedResponse = { id, firstName: 'Nick', lastName: 'Dove' };

    getPlan.execute = jest.fn(x => {
      return expectedResponse;
    });

    await getPlanApi(req, res);

    expect(getPlan.execute).toHaveBeenCalledWith({ id });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('Catches an error if one is thrown', async () => {
    const expectedResponse = { error: 'could not get plan with id: 1' };

    getPlan.execute = jest.fn(x => {
      throw new Error('cannot get');
    });

    await getPlanApi(req, res);

    expect(getPlan.execute).toHaveBeenCalledWith({ id });

    expect(json).toHaveBeenCalledWith(expectedResponse);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
