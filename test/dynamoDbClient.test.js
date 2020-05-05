import DynamoDbClient from '../lib/dynamoDbClient';
import AWS from 'aws-sdk';

describe('Dynamo DB Client', () => {
  it('can create a client', () => {
    const config = { region: 'narnia', endpoint: 'wardrobe' };

    AWS.DynamoDB.DocumentClient = jest.fn();

    const dynamoDbClient = new DynamoDbClient({ config });

    expect(AWS.DynamoDB.DocumentClient).toHaveBeenCalledWith(config);
    expect(dynamoDbClient._client).toBeInstanceOf(AWS.DynamoDB.DocumentClient);
  });
});
