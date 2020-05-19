// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
import { DynamoDB } from 'aws-sdk';

const client = new DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'foo',
  secretAccessKey: 'bar'
});

const TableName = 'plans';

Cypress.Commands.add('createSharedPlan', plan => {
  return client
    .put({
      TableName,
      Item: plan
    })
    .promise();
});

Cypress.Commands.add('deleteSharedPlan', id => {
  return client
    .delete({
      TableName,
      Key: { id }
    })
    .promise();
});
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
