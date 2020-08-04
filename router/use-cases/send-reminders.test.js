const SendReminder = require('./send-reminder');
const IsoDate = require('../domain/isodate');

describe('Send reminder', () => {
  const planGateway = {};
  const smsGateway = { sendMessage: jest.fn() };

  const authHeader = 'bearer token';

  it('sends a reminder', async () => {
    planGateway.get = jest.fn(() => ({
      id: 1,
      firstName: 'Alice',
      lastName: 'White',
      numbers: ['123'],
      customerTokens: [{ token: 'abc', sharedDate: '2020' }]
    }));
    planGateway.save = jest.fn();

    const sendReminder = new SendReminder({ planGateway, smsGateway });

    await sendReminder.execute({
      planId: '1',
      authHeader
    });

    expect(planGateway.save).toHaveBeenCalledWith({
      plan: expect.objectContaining({
        id: 1,
        firstName: 'Alice',
        lastName: 'White',
        numbers: ['123'],
        customerTokens: [
          {
            token: 'abc',
            sharedDate: IsoDate.parse(new Date()),
            previouslySharedOn: ['2020']
          }
        ]
      })
    });

    expect(smsGateway.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        authHeader: 'bearer token',
        message: `This is a reminder that your Shared Plan from Hackney Council has actions due in 2 days: ${process.env.NEXT_PUBLIC_URL}/c/plans/1?token=abc`,
        name: 'Shared Plan Reminder',
        number: '123'
      })
    );
  });

  it('does not send a reminder if there is no plan', async () => {
    planGateway.get = jest.fn(() => ({}));

    const sendReminder = new SendReminder({ planGateway, smsGateway });

    await sendReminder.execute({
      planId: '1',
      authHeader: 'doh'
    });

    expect(smsGateway.sendMessage).not.toHaveBeenCalled();
  });

  it('does not send a reminder if there is no number', async () => {
    planGateway.get = jest.fn(() => ({ firstName: 'Tim', numbers: [] }));

    const sendReminder = new SendReminder({ planGateway, smsGateway });

    await sendReminder.execute({
      planId: '1',
      authHeader: 'doh'
    });

    expect(smsGateway.sendMessage).not.toHaveBeenCalled();
  });
});
