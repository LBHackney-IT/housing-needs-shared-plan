import { getPlan } from '../../../../lib/dependencies';
import { DynamoDB } from 'aws-sdk';

describe('Create Plan Use Case', () => {
  it('creates a new plan', async () => {
    const client = new DynamoDB.DocumentClient({
      region: process.env.CYPRESS_AWS_REGION,
      endpoint: 'http://localhost:8000',
      accessKeyId: process.env.CYPRESS_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.CYPRESS_AWS_SECRET_ACCESS_KEY
    });

    console.log({
      client,
      CYPRESS_AWS_ACCESS_KEY_ID: process.env.CYPRESS_AWS_ACCESS_KEY_ID,
      CYPRESS_AWS_REGION: process.env.CYPRESS_AWS_REGION,
      CYPRESS_AWS_SECRET_ACCESS_KEY: process.env.CYPRESS_AWS_SECRET_ACCESS_KEY
    });

    const TableName = 'plans';

    client
      .put({
        TableName,
        Item: {
          id: '1',
          firstName: 'Bart',
          lastName: 'Simpson'
        }
      })
      .promise();

    const request = {
      TableName,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': '1'
      }
    };

    const result = await client.query(request).promise();
    expect(result).toEqual({ id: 1 });
  });
});
