import AWS from 'aws-sdk';

export default class DynamoDbClient {
  constructor({ config }) {
    this._client = new AWS.DynamoDB.DocumentClient(config);
  }
}
