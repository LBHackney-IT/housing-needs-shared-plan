import ShareEmailPlan from 'lib/use-cases/share-email-plan';

describe('Email Share plan', () => {
  const planGateway = {
    save: jest.fn()
  };
  const emailGateway = { sendEmail: jest.fn() };

  it('updates the token in the database after sharing it', async () => {
    planGateway.get = jest.fn(() => ({
      customerTokens: [{ token: 'abc', sharedDate: null }]
    }));

    const sharePlan = new ShareEmailPlan({ planGateway, emailGateway });
    const collaborator = { email: 'test@email.com' };

    const expectedResult = {
      sharedDate: expect.any(String),
      token: 'abc'
    };

    await sharePlan.execute({
      collaborator,
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
    const emailTemplate = 'email-template-1234';
    process.env.EMAIL_TEMPLATE_ID = emailTemplate;
    const planId = 1;
    const firstName = 'Joe';
    const lastName = 'Bloggs';
    const email = 'test@email.com';
    const customerPlanUrl = 'mr_url';

    planGateway.get = jest.fn(() => ({
      firstName,
      lastName,
      id: planId,
      customerTokens: [
        { token: 'abc', sharedDate: new Date(2020, 3, 5), shared: false },
        { token: 'ooo', sharedDate: new Date(2020, 3, 5), shared: true }
      ]
    }));

    const sharePlan = new ShareEmailPlan({ planGateway, emailGateway });

    const collaborator = { email };
    await sharePlan.execute({
      planId,
      collaborator,
      customerPlanUrl
    });

    expect(emailGateway.sendEmail).toHaveBeenCalledWith(emailTemplate, email, {"personalisation": {"customerPlanUrl": customerPlanUrl, "name": `${firstName} ${lastName}`}});
  });

  it('does not update the token if link could not be shared', async () => {
    process.env.NEXT_PUBLIC_URL = 'PUBLIC_URL';
    const planId = 1;
    const email = 'test@email.com';

    planGateway.get = jest.fn(() => ({
      customerTokens: [
        { token: 'abc', sharedDate: new Date(2020, 3, 5), shared: false },
        { token: 'ooo', sharedDate: new Date(2020, 3, 5), shared: true }
      ]
    }));

    emailGateway.sendEmail = jest.fn(() => {
      throw new Error('error');
    });

    const sharePlan = new ShareEmailPlan({ planGateway, emailGateway });

    const collaborator = { email };
    await sharePlan.execute({
      planId,
      collaborator
    });

    expect(planGateway.save).not.toHaveBeenCalled();
  });
});
