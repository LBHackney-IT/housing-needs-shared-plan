import { ArgumentError } from '../domain';

export default class SmsGateway {
  async sendMessage({ name, number, message, auth }) {
    if (!name) throw new ArgumentError('name cannot be null.');
    if (!number) throw new ArgumentError('number cannot be null.');
    if (!message) throw new ArgumentError('message cannot be null.');
    console.log('here');

    await fetch(`${process.env.SMS_API_URL}/messages`, {
      method: 'POST',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        number,
        message
      })
    });
    console.log(message);
    return message;
  }
}
