export default class PlanGateway {
  constructor({ client }) {
    this.client = client;
    this.tableName = 'plans';
  }

  async create({ id, firstName, lastName }) {
    if (!id) throw new Error('id cannot be null.');

    const request = {
      TableName: this.tableName,
      Item: {
        id,
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
