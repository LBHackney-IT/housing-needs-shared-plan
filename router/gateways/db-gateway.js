const IsoDate = require('../domain/isodate');

class DbGateway {
  constructor({ client, tableName }) {
    this.client = client;
    this.tableName = tableName;
  }

  async get({ id }) {
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

  async getReminderPlans() {
    const request = {
      TableName: 'plans',
      IndexName: 'NamesIndex',
      ProjectionExpression: 'queryLastName, queryFirstName, id, goal'
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

    // this.logger.info(`${planIds.length} plans have actions due in 2 days`);
    return { planIds };
  }
}
module.exports = DbGateway;
