import findPlansApi from 'pages/api/plans/find';
import { findPlans } from 'lib/dependencies';
import { ArgumentError } from 'lib/domain';

describe('Create Plan Api', () => {
  const firstName = 'James';
  const lastName = 'Bond';
  const systemIds = [{ JigsawId: '15' }];

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
    method: 'GET',
    body: {
      firstName,
      lastName,
      systemIds
    }
  };

  it('can find a plan', async () => {
    const id = '1';
    const expectedResponse = expect.objectContaining({ plans: [id] });

    findPlans.execute = jest.fn(x => {
      return expectedResponse;
    });

    await findPlansApi(req, res);

    expect(findPlans.execute).toHaveBeenCalledWith({
      firstName,
      lastName,
      systemIds
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('handles bad requests', async () => {
    const expectedResponse = { error: 'could not find plans' };

    findPlans.execute = jest.fn(x => {
      throw new ArgumentError('something is missing');
    });

    await findPlansApi(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('handles general errors', async () => {
    const expectedResponse = {
      error: 'could not find plans with firstName=James, lastName=Bond'
    };

    findPlans.execute = jest.fn(x => {
      throw new Error('bang!');
    });

    await findPlansApi(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });
});
