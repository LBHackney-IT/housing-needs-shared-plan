const fetch = require('node-fetch');

module.exports = class SmsGateway {
  async sendMessage({ name, number, message, authHeader }) {
    const url = `${process.env.SMS_API_URL}/messages`;
    const body = {
      name,
      number,
      message
    };

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
      console.log(`Fetching ${url} failed. ${response.status}`);
    }
  }
};