import getPlanApi from '../../../../pages/api/getPlanApi';
import getPlan from '../../../../lib/dependencies';

describe('GetPlanApi', () => {
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
    params: {
      id: 1
    }
  };

  it('can get a plan', async () => {
    const expectedResponse = expect.objectContaining({
      id: req.params.id,
      firstName: 'Nick',
      lastName: 'Dove'
    });

    getPlan.execute = jest.fn(x => {
      return expectedResponse;
    });

    await getPlanApi(req, res);

    expect(getPlan.execute).toHaveBeenCalledWith({ id: req.params.id });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('handles error if one is thrown', async () => {
    const expectedResponse = { error: 'could not get plan with id: 1' };

    getPlan.execute = jest.fn(x => {
      throw new Error('cannot get');
    });

    await getPlanApi(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });
});
