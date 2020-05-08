import { nanoid } from 'nanoid';

export default class PlanGateway {
  constructor({ client }) {
    this.client = client;
    this.tableName = 'plans';
  }

  async create({ firstName, lastName }) {
    if (!firstName) throw new Error('first name cannot be null.');
    if (!lastName) throw new Error('last name cannot be null.');

    const id = nanoid(20);

    const request = {
      TableName: this.tableName,
      Item: {
        id,
        created: new Date(Date.now()).toISOString(),
        firstName,
        lastName
      }
    };

    const result = await this.client.put(request).promise();
    return result.Items[0];
  }

  async get({ id }) {
    if (!id) throw new Error('id cannot be null.');

    const request = {
      TableName: this.tableName,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id
      }
    };

    const result = await this.client.query(request).promise();
    if (result.Items.length === 0) return null;
    return result.Items[0];
  }
}
