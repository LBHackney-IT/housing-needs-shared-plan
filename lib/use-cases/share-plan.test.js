import SharePlan from 'lib/use-cases/share-plan';
import { nanoid } from 'nanoid';
jest.mock('nanoid');

describe('Share plan', () => {
  nanoid.mockImplementation(() => 'random_string');

  const planGateway = {
    save: jest.fn()
  };
  const smsGateway = { sendMessage: jest.fn() };

  const authHeader = 'bearer token';

  it('saves a new customer token', async () => {
    planGateway.get = jest.fn(() => ({
      customerTokens: []
    }));
    const sharePlan = new SharePlan({ planGateway, smsGateway });
    const collaborator = { number: '123' };

    await sharePlan.execute({ planId: 1, collaborator, authHeader });

    expect(planGateway.save).toHaveBeenCalledWith(
      expect.objectContaining({
        plan: {
          customerTokens: [
            { createdDate: expect.anything(), token: 'random_string' }
          ]
        }
      })
    );
  });

  it('shares the plan via sms if number selected', async () => {
    process.env.NEXT_PUBLIC_URL = 'PUBLIC_URL';
    const planId = 1;
    const authHeader = 'bearer token';
    const firstName = 'Joe';
    const lastName = 'Bloggs';
    const number = '123';
    planGateway.get = jest.fn(() => ({
      id: planId,
      firstName,
      lastName,
      customerTokens: []
    }));

    const expectedSmsRequest = {
      authHeader,
      message: expect.stringContaining(
        `${process.env.NEXT_PUBLIC_URL}/plans/${planId}?token=random_string`
      ),
      name: `${firstName} ${lastName}`,
      number
    };

    const sharePlan = new SharePlan({ planGateway, smsGateway });
    const collaborator = { number };
    const result = await sharePlan.execute({
      planId,
      collaborator,
      authHeader
    });

    expect(smsGateway.sendMessage).toHaveBeenCalledWith(expectedSmsRequest);
    //expect(result).toEqual();
  });
});
