import getPlanApi from '../../../../pages/api/getPlanApi';
import getPlan from '../../../../lib/dependencies';
import { ArgumentError } from '../../../../lib/domain';

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

  it('handles bad requests', async () => {
    const expectedResponse = { error: 'could not get plan' };

    getPlan.execute = jest.fn(x => {
      throw new ArgumentError('something is missing');
    });

    await getPlanApi(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('handles general errors', async () => {
    const expectedResponse = { error: 'could not get plan with id=1' };

    getPlan.execute = jest.fn(x => {
      throw new Error('bang!');
    });

    await getPlanApi(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });
});
