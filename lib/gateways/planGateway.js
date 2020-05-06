export default class PlanGateway {
  constructor({ client }) {
    this.client = client;
  }

  async create({ id, firstName, lastName }) {
    if (!id) throw new Error('id cannot be null.');

    const request = {
      TableName: 'plans',
      Item: {
        id,
        firstName,
        lastName
      }
    };
    return await this.client.put(request).promise();
  }

  async get(id) {
    if (!id) throw new Error('id cannot be null.');
    const params = { id };

    return await this.db.getPlan(params);
  }
}
