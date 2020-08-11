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
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  );

  cy.task('table', violationData);
}

import jwt from 'jsonwebtoken';

const setHackneyCookie = (isValidGroup, name) => {
  const group = isValidGroup
    ? 'housingneeds-singleview-beta'
    : 'some-other-group';
  const token = jwt.sign(
    { name: name || 'My name', groups: [group] },
    'a-secure-signature'
  );
  cy.setCookie('hackneyToken', token, {
    url: 'http://localhost:3000',
    domain: 'localhost'
  });
};

Cypress.Commands.add('terminalLog', terminalLog);
Cypress.Commands.add('setHackneyCookie', setHackneyCookie);
