import SharePlan from 'lib/use-cases/share-plan';
import { Token } from 'lib/domain';

describe('Share plan', () => {
  const planId = 10;
  const name = 'Jon';
  const number = '00000';

  const tokens = [
    new Token({
      token: 'random_string',
      createdDate: expect.stringContaining(
        new Date().toISOString().substring(0, 10)
      )
    })
  ];

  const plan = {
    name,
    number,
    planId,
    tokens
  };

  const sharePlanRequest = {
    planId,
    name,
    number
  };

  const expectedGatewayRequest = {
    plan
  };

  const oldToken = 'old_token';
  const oldDate = new Date().toISOString();

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
    const planGateway = { save: jest.fn() };
    const smsGateway = { sendMessage: jest.fn() };

    const sharePlan = new SharePlan({ planGateway, smsGateway });
    await sharePlan.execute(sharePlanRequest);

    expect(Math.random).toHaveBeenCalled();
    expect(planGateway.save).toHaveBeenCalledWith(expectedGatewayRequest);
  });

  it('adds a new token if one already exists', async () => {
    sharePlanRequest.tokens = [{ token: oldToken, createdDate: oldDate }];

    expectedGatewayRequest.plan.tokens.push({
      token: oldToken,
      createdDate: expect.stringContaining(oldDate.substring(0, 10))
    });
    expectedGatewayRequest.plan.tokens.reverse();

    const planGateway = { save: jest.fn() };
    const smsGateway = { sendMessage: jest.fn() };

    const sharePlan = new SharePlan({ planGateway, smsGateway });

    await sharePlan.execute(sharePlanRequest);

    expect(Math.random).toHaveBeenCalled();
    expect(planGateway.save).toHaveBeenCalledWith(expectedGatewayRequest);
  });

  it('shares the plan via sms', async () => {
    const expectedSmsRequest = {
      plan: {
        message: `You’ve been sent a link to your Shared Plan from Hackney Council. Click here to view: ${process.env.SHARED_PLAN_URL}/customers/${sharePlanRequest.planId}/plan#token=random_string`,
        name: 'Jon',
        number: '0000000'
      }
    };
    const planGateway = { save: jest.fn() };
    const smsGateway = { sendMessage: jest.fn() };

    const sharePlan = new SharePlan({ planGateway, smsGateway });
    await sharePlan.execute(sharePlanRequest);

    expect(smsGateway.sendMessage).toHaveBeenCalledWith(expectedSmsRequest);
  });
});
