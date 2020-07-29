import SendReminder from 'lib/use-cases/send-reminder';
import IsoDate from 'lib/domain/isodate';

describe('Send reminder', () => {
  const planGateway = {};
  const smsGateway = { sendMessage: jest.fn() };

  const authHeader = 'bearer token';

  it('sends a reminder', async () => {
    planGateway.get = jest.fn(() => ({
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
        firstName: 'Alice',
        lastName: 'White',
        numbers: ['123'],
        customerTokens: [
          { token: 'abc', sharedDate: IsoDate.parse(new Date()) }
        ]
      })
    });

    expect(smsGateway.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        authHeader: 'bearer token',
        message: 'Reminder: placeholder/ abc',
        name: 'Alice White',
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

  it('does not send a reminder if the token has not been shared before', async () => {
    planGateway.get = jest.fn(() => ({
      firstName: 'Alice',
      lastName: 'White',
      numbers: ['123'],
      customerTokens: [{ token: 'abc', sharedDate: null }]
    }));
    const sendReminder = new SendReminder({ planGateway, smsGateway });

    await sendReminder.execute({
      planId: '1',
      authHeader: 'doh'
    });

    expect(smsGateway.sendMessage).not.toHaveBeenCalled();
  });
});
