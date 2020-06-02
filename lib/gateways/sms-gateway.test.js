import SmsGateway from 'lib/gateways/sms-gateway';
import { ArgumentError } from 'lib/domain';
import { enableFetchMocks } from 'jest-fetch-mock';

describe('SMS Gateway', () => {
  it('throws an error if name, number or message are not provided for sending message', async () => {
    const smsGateway = new SmsGateway();

    await expect(async () => {
      await smsGateway.sendMessage({});
    }).rejects.toThrow(new ArgumentError('name cannot be null.'));

    await expect(async () => {
      await smsGateway.sendMessage({ name: 'dude' });
    }).rejects.toThrow(new ArgumentError('number cannot be null.'));

    await expect(async () => {
      await smsGateway.sendMessage({ name: 'dude', number: 1 });
    }).rejects.toThrow(new ArgumentError('message cannot be null.'));
  });

  it('sends correct api call to SMS', async () => {
    const expectedRequest = {
      body: JSON.stringify({
        name: 'dude',
        number: 1,
        message: 'message text'
      }),
      headers: {
        Authorization: 'blah blah',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };

    enableFetchMocks();
    fetch.mockResponse(JSON.stringify({}));

    const smsGateway = new SmsGateway();
    smsGateway.sendMessage({
      name: 'dude',
      number: 1,
      message: 'message text',
      auth: 'blah blah'
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/messages'),
      expectedRequest
    );
  });
});
