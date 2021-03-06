import { endpoint } from 'pages/api/plans/[id]/goals';
import { ArgumentError } from 'lib/domain';
import { getUsername } from 'lib/utils/token';
jest.mock('lib/utils/token');

describe('Add goal API', () => {
  let json;
  let res;

  beforeEach(() => {
    json = jest.fn();
    res = {
      status: jest.fn(() => {
        return { json };
      })
    };
    getUsername.mockReturnValue('Ami Working');
  });

  const planId = '1';
  const goal = {
    text: 'this is the goal'
  };

  const req = {
    method: 'POST',
    query: {
      id: planId
    },
    body: goal
  };

  it('can add a goal to a plan', async () => {
    const expectedResponse = { id: planId, goal };
    const addGoal = {
      execute: jest.fn(() => {
        return expectedResponse;
      })
    };

    await endpoint({ addGoal })(req, res);

    expect(addGoal.execute).toHaveBeenCalledWith({
      planId,
      goal,
      currentUserName: 'Ami Working'
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('handles bad requests', async () => {
    const expectedResponse = { error: 'could not add goal to plan' };
    const addGoal = {
      execute: jest.fn()
    };
    addGoal.execute.mockImplementation(() => {
      throw new ArgumentError('something is missing');
    });

    await endpoint({ addGoal })(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('handles general errors', async () => {
    const expectedResponse = {
      error: 'could not add goal to plan with id=1'
    };
    const addGoal = {
      execute: jest.fn()
    };
    addGoal.execute.mockImplementation(() => {
      throw new Error('bang!');
    });

    await endpoint({ addGoal })(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });
});
