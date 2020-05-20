import { nanoid } from 'nanoid';
import { ArgumentError, Plan } from '../domain';
import { normalise } from '../utils/normalise';

function toDynamoModel(plan) {
  return {
    ...plan,
    queryFirstName: normalise(plan.firstName),
    queryLastName: normalise(plan.lastName)
  };
}

function fromDynamoModel(model) {
  return new Plan(model);
}

export default class PlanGateway {
  constructor({ client, tableName }) {
    this.client = client;
    this.tableName = tableName;
  }

  async create({ firstName, lastName, systemIds }) {
    if (!firstName) throw new ArgumentError('first name cannot be null.');
    if (!lastName) throw new ArgumentError('last name cannot be null.');

    const plan = new Plan({
      id: nanoid(20),
      firstName,
      lastName,
      systemIds: systemIds
    });

    const request = {
      TableName: this.tableName,
      Item: toDynamoModel(plan)
    };

    await this.client.put(request).promise();
    return plan;
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
      IndexName: 'NamesIndex',
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

  async save({ plan }) {
    return plan;
  }
}
