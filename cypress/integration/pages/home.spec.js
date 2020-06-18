/// <reference types="cypress" />
context('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.injectAxe();
  });

  describe('Loads page', () => {
    it('has shared plan heading', () => {
      cy.get('h1').should('have.text', 'Welcome to Shared Plan!');
      cy.checkA11y('#content > h1', null, cy.terminalLog);
    });
  });

  describe('Cookie banner', () => {
    it('checks cookie banner appears on first visit', () => {
      cy.getCookie('cookies-accepted').should('not.exist');
      cy.get('#global-cookie-message').should(
        'contain',
        'Tell us whether you accept cookies'
      );
    });

    it('checks the cookie is correctly set when user chooses yes',() => {
      cy.get('[data-testid=cookies-yes-button-test]').click();
      cy.getCookie('cookies-accepted').should('have.property', 'value', 'true');
      cy.get('#global-cookie-message').should('not.exist');
    });

    it('checks the cookie is correctly set when user chooses no',() => {
      cy.get('[data-testid=cookies-no-button-test]').click();
      cy.getCookie('cookies-accepted').should('have.property', 'value', 'false');
      cy.get('#global-cookie-message').should('not.exist');
    });
  });
});
