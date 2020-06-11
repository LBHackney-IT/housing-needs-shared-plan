import { nanoid } from 'nanoid';
import { ArgumentError, Plan } from 'lib/domain';
import {
  createPlanModel,
  createGoalModel,
  createTokenModel,
  createPlanFromModel
} from './models';

class PlanGateway {
  constructor({ client, tableName }) {
    this.client = client;
    this.tableName = tableName;
  }

  async create({
    firstName,
    lastName,
    systemIds,
    emails,
    numbers,
    initialUseAsPhp
  }) {
    if (!firstName) throw new ArgumentError('first name cannot be null.');
    if (!lastName) throw new ArgumentError('last name cannot be null.');

    const plan = new Plan({
      id: nanoid(20),
      firstName,
      lastName,
      systemIds: systemIds,
      emails: emails,
      numbers: numbers,
      initialUseAsPhp: initialUseAsPhp
    });

    const request = {
      TableName: this.tableName,
      Item: createPlanModel(plan)
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
    return createPlanFromModel(result.Items[0]);
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
      Key: { id: plan.id },
      UpdateExpression: ['set goal = :g', 'customerTokens = :t'].join(', '),
      ExpressionAttributeValues: {
        ':g': createGoalModel(plan.goal),
        ':t': plan.customerTokens.map(createTokenModel)
      },
      ReturnValues: 'UPDATED_NEW'
    };

    await this.client.update(request).promise();
    return plan;
  }
}

export default PlanGateway;
