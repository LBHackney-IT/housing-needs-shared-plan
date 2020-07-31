// const logger = require('../logging/logger');
// const { HttpStatusError } = require('api/HttpStatusError');
// const { ArgumentError } = require('../domain');

module.exports = class SmsGateway {
  async sendMessage({ name, number, message, authHeader }) {
    // if (!name) throw new ArgumentError('name cannot be null.');
    // if (!number) throw new ArgumentError('number cannot be null.');
    // if (!message) throw new ArgumentError('message cannot be null.');

    const url = `${process.env.SMS_API_URL}/messages`;
    const body = {
      name,
      number,
      message
    };
    console.log(`Fetching ${url}`, body);
    // logger.info(`Fetching ${url}`, body);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      return message;
    } else {
      console.log(`Fetching ${url} failed`, response.status);
      // logger.error(`Fetching ${url} failed`, response.status);
      // throw new HttpStatusError(response.status);
    }
  }
};
