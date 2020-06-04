import { ArgumentError } from '../domain';

export default class SmsGateway {
  async sendMessage({ name, number, message, authHeader }) {
    if (!name) throw new ArgumentError('name cannot be null.');
    if (!number) throw new ArgumentError('number cannot be null.');
    if (!message) throw new ArgumentError('message cannot be null.');

    await fetch(`${process.env.SMS_API_URL}/messages`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        number,
        message
      })
    });

    return message;
  }
}
