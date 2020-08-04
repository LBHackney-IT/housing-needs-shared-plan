const IsoDate = require('../domain/isodate');

class DbGateway {
  constructor({ client, tableName }) {
    this.client = client;
    this.tableName = tableName;
  }

  async get({ id }) {
    try {
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
    } catch (err) {
      console.log(`Could not get the plan with id ${id}: ${err}`);
    }
  }

  async getReminderPlans() {
    try {
      const request = {
        TableName: this.tableName,
        ProjectionExpression:
          'queryLastName, queryFirstName, id, goal, customerTokens'
      };

      const { Items } = await this.client.scan(request).promise();

      const actionDueDate = new Date();
      actionDueDate.setDate(actionDueDate.getDate() + 2);

      const sharedPlans = Items.filter(item => {
        return item.customerTokens?.some(token => token.sharedDate);
      });

      const planIds = sharedPlans
        .filter(item => {
          if (!item.goal) return false;
          return item.goal.actions.some(action =>
            action.dueDate.includes(IsoDate.parse(actionDueDate))
          );
        })
        .map(match => match.id);

      console.log(`${planIds.length} plans have actions due in 2 days`);
      return { planIds };
    } catch (err) {
      console.log(`Could not get plans with actions due in 2 days: ${err}`);
    }
  }

  async save({ plan }) {
    const request = {
      TableName: this.tableName,
      Key: { id: plan.id },
      UpdateExpression: 'set customerTokens = :t',
      ExpressionAttributeValues: {
        ':t': plan.customerTokens.map(createTokenModel)
      },
      ReturnValues: 'UPDATED_NEW'
    };

    await this.client.update(request).promise();
    return plan;
  }
}
module.exports = DbGateway;
