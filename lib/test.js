const AWS = require('aws-sdk');

const dbConfig = {};
dbConfig.region = 'localhost';
dbConfig.endpoint = 'http://localhost:8000';
dbConfig.accessKeyId = 'foo';
dbConfig.secretAccessKey = 'bar';
const client = new AWS.DynamoDB.DocumentClient(dbConfig);
const table = 'plans';
// const request = {
//   TableName: table,
//   // IndexName: 'NamesIndex',
//   FilterExpression: 'contains(goal.actions[0].dueDate, :date )',
//   ExpressionAttributeValues: {
//     ':date': '2918-04-01T23:00:00.000Z'
//   }
// };

// const request = {
//   TableName: table,
//   IndexName: 'NamesIndex',
//   KeyConditionExpression: 'queryLastName = :l and queryFirstName = :f',
//   ExpressionAttributeValues: {
//     ':l': 'salton',
//     ':f': 'miriam'
//   }
// };

const request = {
  TableName: 'plans',
  IndexName: 'NamesIndex',
  ALL_ATTRIBUTES: true,
  ProjectionExpression: 'queryLastName, queryFirstName, id, goal'
};

const Items = client.scan(request, (err, resp) => {
  // console.log(resp);

  let newArr;

  const items = resp.Items;
  // console.log(items[0]);
  newArr = items
    .filter(item => {
      if (!item.goal) return false;
      return item.goal.actions.some(action => action.dueDate.includes('2099'));
    })
    .map(i => i.id);

  console.log(newArr);
  const thi = resp.Items.filter(match => {
    if (!match.goal || match.goal.length === 0) {
      return false;
    }
    return match.goal.actions.map(action => {
      // console.log(action.dueDate);

      return action.dueDate.includes('2918-04-01T23:00:00.000Z');
    });
  }).map(match => match);
  // console.log(thi[2].goal.actions);
});

// console.log(Items);

// const planIds = Promise.all(
//   Items.filter(match => {
//     if (!match.systemIds || match.systemIds.length === 0) {
//       return true;
//     }

//     return match.systemIds.some(id => systemIds.includes(id));
//   }).map(match => match.id)
// );

// console.log(planIds);
