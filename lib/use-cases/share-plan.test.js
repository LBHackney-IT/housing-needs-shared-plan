import SharePlan from 'lib/use-cases/share-plan';

describe('Share plan', () => {
  const planGateway = {
    save: jest.fn()
  };
  const smsGateway = { sendSms: jest.fn() };

  const authHeader = 'bearer token';

  it('updates the token in the database after sharing it', async () => {
    planGateway.get = jest.fn(() => ({
      customerTokens: [{ token: 'abc', sharedDate: null }]
    }));

    const sharePlan = new SharePlan({ planGateway, smsGateway });
    const collaborator = { number: '123' };

    const expectedResult = {
      sharedDate: expect.any(String),
      token: 'abc'
    };

    await sharePlan.execute({
      collaborator,
      authHeader,
      customerPlanUrl: 'mr_url'
    });

    expect(planGateway.save).toHaveBeenCalledWith(
      expect.objectContaining({
        plan: {
          customerTokens: [expectedResult]
        }
      })
    );
  });

  it('shares a correct link that has not been shared with the customer via sms', async () => {
    process.env.NEXT_PUBLIC_URL = 'PUBLIC_URL';
    process.env.SMS_TEMPLATE_ID = 'SMS_TEMPLATE';
    const planId = 1;
    const authHeader = 'bearer token';
    const firstName = 'Joe';
    const lastName = 'Bloggs';
    const number = '123';

    planGateway.get = jest.fn(() => ({
      firstName,
      lastName,
      id: planId,
      customerTokens: [
        { token: 'abc', sharedDate: new Date(2020, 3, 5), shared: false },
        { token: 'ooo', sharedDate: new Date(2020, 3, 5), shared: true }
      ]
    }));

    const sharePlan = new SharePlan({ planGateway, smsGateway });

    const collaborator = { number };
    await sharePlan.execute({
      planId,
      collaborator,
      authHeader,
      customerPlanUrl: 'mr_url'
    });

    expect(smsGateway.sendSms).toHaveBeenCalledWith(
        'SMS_TEMPLATE',
        number,
        {
          personalisation: {
            message: "You've been sent a link to your Shared Plan from Hackney Council. Click here to view: mr_url"
          }
        });
  });

  it('does not update the token if link could not be shared', async () => {
    process.env.NEXT_PUBLIC_URL = 'PUBLIC_URL';
    process.env.SMS_TEMPLATE_ID = 'SMS_TEMPLATE';
    const planId = 1;
    const authHeader = 'bearer token';
    const number = '123';

    planGateway.get = jest.fn(() => ({
      customerTokens: [
        { token: 'abc', sharedDate: new Date(2020, 3, 5), shared: false },
        { token: 'ooo', sharedDate: new Date(2020, 3, 5), shared: true }
      ]
    }));

    smsGateway.sendSms = jest.fn(() => {
      throw new Error('error');
    });

    const sharePlan = new SharePlan({ planGateway, smsGateway });

    const collaborator = { number };
    await sharePlan.execute({
      planId,
      collaborator,
      authHeader
    });

    expect(planGateway.save).not.toHaveBeenCalled();
  });
});
