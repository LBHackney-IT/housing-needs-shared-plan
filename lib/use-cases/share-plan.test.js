import SharePlan from 'lib/use-cases/share-plan';
import { Token } from 'lib/domain';
import { nanoid } from 'nanoid';
jest.mock('nanoid');

describe('Share plan', () => {
  const planId = 10;
  const firstName = 'Jon';
  const number = '00000';
  const collaborator = { number };
  const auth = 'Bearer token';
  nanoid.mockImplementation(() => 'random_string');

  const plan = {
    firstName,
    number,
    planId
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

  it('generates a token with date and saves it', async () => {
    const sharePlan = new SharePlan({ planGateway, smsGateway });
    await sharePlan.execute({ planId, collaborator, auth });

    expect(nanoid).toHaveBeenCalled();
    expect(planGateway.save).toHaveBeenCalledWith(expectedGatewayRequest);
  });

  it('adds a new token if one already exists', async () => {
    expectedGatewayRequest.plan.customerTokens.push({
      token: oldToken,
      createdDate: expect.stringContaining(oldDate.substring(0, 10))
    });

    const sharePlan = new SharePlan({ planGateway, smsGateway });

    await sharePlan.execute({ planId, collaborator });

    expect(nanoid).toHaveBeenCalled();
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
    await sharePlan.execute({ planId, collaborator, auth });

    expect(smsGateway.sendMessage).toHaveBeenCalledWith(expectedSmsRequest);
  });
});
