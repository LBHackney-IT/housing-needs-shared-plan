import { nanoid } from 'nanoid';
import { ArgumentError, Plan } from 'lib/domain';
import { normalise } from 'lib/utils/normalise';

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

function nullifyEmptyStrings(object) {
  if (!object) {
    return object;
  }

  /*if (Array.isArray(object)) {
    object.forEach((value, i) => {
      if (typeof value === 'object') {
        object[i] = nullifyEmptyStrings(object[i]);
      }
    });
  }*/

  Object.keys(object).forEach(key => {
    if (typeof object[key] === 'object') {
      object[key] = nullifyEmptyStrings(object[key]);
    } else if (object[key] === '') {
      object[key] = null;
    }
  });

  return object;
}

class PlanGateway {

  constructor({ client, tableName }) {
    this.client = client;
    this.tableName = tableName;
  }

  async create({ firstName, lastName, systemIds, emails, numbers }) {
    if (!firstName) throw new ArgumentError('first name cannot be null.');
    if (!lastName) throw new ArgumentError('last name cannot be null.');

    const plan = new Plan({
      id: nanoid(20),
      firstName,
      lastName,
      systemIds: systemIds,
      emails: emails,
      numbers: numbers
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
    if (!firstName) throw new ArgumentError('first name cannot be null.');
    if (!lastName) throw new ArgumentError('last name cannot be null.');

    const request = {
      TableName: this.tableName,
      IndexName: 'NamesIndex',
      KeyConditionExpression: 'queryLastName = :l and queryFirstName = :f',
      ExpressionAttributeValues: {
        ':l': lastName.toLowerCase(),
        ':f': firstName.toLowerCase()
      }
    };

    const { Items } = await this.client.query(request).promise();

    const planIds = await Promise.all(
      Items.filter(match => {
        if (!match.systemIds || match.systemIds.length === 0) {
          return true;
        }

        return match.systemIds.some(id => systemIds.includes(id));
      }).map(match => match.id)
    );
    return { planIds };
  }

  /** It doesn't save the entire object. */
  async save({ plan }) {
    if (!plan) throw new ArgumentError('plan cannot be null.');
    const request = {
      TableName: this.tableName,
      Key: {
        id: plan.id
      },
      UpdateExpression: 'set goal = :g, customerTokens = :t',
      ExpressionAttributeValues: {
        ':g': nullifyEmptyStrings(plan.goal),
        ':t': nullifyEmptyStrings(plan.customerTokens)
      },
      ReturnValues: 'UPDATED_NEW'
    };

    await this.client.update(request).promise();

    return plan;
  }
}

export default PlanGateway;
