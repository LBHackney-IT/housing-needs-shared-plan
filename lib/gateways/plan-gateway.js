import { nanoid } from 'nanoid';
import { ArgumentError, Plan } from '../domain';

function toDynamoModel(plan) {
  return {
    ...plan,
    queryFirstName: plan.firstName.toLowerCase(),
    queryLastName: plan.lastName.toLowerCase()
  };
}

function fromDynamoModel(model) {
  return new Plan(model);
}

export default class PlanGateway {
  constructor({ client }) {
    this.client = client;
    this.tableName = 'plans';
  }

  async create({ firstName, lastName, systemIds }) {
    if (!firstName) throw new ArgumentError('first name cannot be null.');
    if (!lastName) throw new ArgumentError('last name cannot be null.');

    const plan = new Plan({
      id: nanoid(20),
      created: new Date(Date.now()).toISOString(),
      firstName,
      lastName,
      systemIds: systemIds
    });

    const request = {
      TableName: this.tableName,
      Item: toDynamoModel(plan)
    };

    const result = await this.client.put(request).promise();
    return fromDynamoModel(result.Items[0]);
  }

  async get({ id }) {
    if (!id) throw new ArgumentError('id cannot be null.');

    const request = {
      TableName: this.tableName,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id
      }
    };

    const result = await this.client.query(request).promise();
    if (result.Items.length === 0) return null;
    return fromDynamoModel(result.Items[0]);
  }

  async find({ firstName, lastName, systemIds = [] }) {
    if (!firstName) throw new Error('first name cannot be null.');
    if (!lastName) throw new Error('last name cannot be null.');

    const request = {
      TableName: this.tableName,
      IndexName: 'name_idx',
      KeyConditionExpression: 'lastName = :l and firstName = :f',
      ExpressionAttributeValues: {
        ':l': lastName.toLowerCase(),
        ':f': firstName.toLowerCase()
      }
    };

    const { Items } = await this.client.query(request).promise();

    return Promise.all(
      Items.filter(match => {
        if (!match.systemIds || match.systemIds.length === 0) {
          return true;
        }

        return match.systemIds.some(id => systemIds.includes(id));
      }).map(match => this.get(match))
    );
  }
}
