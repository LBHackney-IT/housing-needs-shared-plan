const axios = require('axios');

module.exports = class SmsGateway {
  async sendMessage({ name, number, message, authHeader }) {
    const url = `${process.env.SMS_API_URL}/messages`;
    const body = {
      name,
      number,
      message
    };

    const headers = {
        Authorization: authHeader,
        'Content-Type': 'application/json'
      }

    const response = await axios.post(url, body, { headers } );

    if (response.ok) {
      return message;
    } else {
      console.log(`Fetching ${url} failed. ${response.status}`);
    }
  }
};