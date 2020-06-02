import SharePlan from 'lib/use-cases/share-plan';
import { Token } from 'lib/domain';

describe('Share plan', () => {
  const planId = 10;
  const firstName = 'Jon';
  const number = '00000';
  const auth = 'Bearer token';

  const tokens = [
    new Token({
      token: 'random_string',
      createdDate: expect.stringContaining(
        new Date().toISOString().substring(0, 10)
      )
    })
  ];

  const plan = {
    firstName,
    number,
    planId,
    tokens
  };

  const expectedGatewayRequest = {
    plan
  };

  const oldToken = 'old_token';
  const oldDate = new Date().toISOString();

  const planGateway = {
    save: jest.fn(),
    get: jest.fn(() => {
      return plan;
    })
  };
  const smsGateway = { sendMessage: jest.fn() };

  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue({
      toString: () => {
        return { substring: () => 'random_string' };
      }
    });
  });

  afterEach(() => {
    global.Math.random.mockRestore();
  });

  it('generates a token with date and saves it', async () => {
    const sharePlan = new SharePlan({ planGateway, smsGateway });
    await sharePlan.execute({ planId, number, auth });

    expect(Math.random).toHaveBeenCalled();
    expect(planGateway.save).toHaveBeenCalledWith(expectedGatewayRequest);
  });

  it('adds a new token if one already exists', async () => {
    expectedGatewayRequest.plan.tokens.push({
      token: oldToken,
      createdDate: expect.stringContaining(oldDate.substring(0, 10))
    });
    expectedGatewayRequest.plan.tokens.reverse();

    const sharePlan = new SharePlan({ planGateway, smsGateway });

    await sharePlan.execute({ planId, number });

    expect(Math.random).toHaveBeenCalled();
    expect(planGateway.save).toHaveBeenCalledWith(expectedGatewayRequest);
  });

  it('shares the plan via sms', async () => {
    const expectedSmsRequest = {
      auth: 'Bearer token',
      message: `You’ve been sent a link to your Shared Plan from Hackney Council. Click here to view: ${process.env.SHARED_PLAN_URL}/plans/${planId}?token=random_string`,
      name: firstName,
      number
    };

    const sharePlan = new SharePlan({ planGateway, smsGateway });
    await sharePlan.execute({ planId, number, auth });

    expect(smsGateway.sendMessage).toHaveBeenCalledWith(expectedSmsRequest);
  });
});
