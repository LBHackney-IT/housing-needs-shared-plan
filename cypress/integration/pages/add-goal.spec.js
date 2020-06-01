/// <reference types="cypress" />

context('Add-goal page', () => {
  beforeEach(() => {
    cy.task('createPlan', {
      id: '1',
      firstName: 'Bart',
      lastName: 'Simpson',
      queryFirstName: 'bart',
      queryLastName: 'simpson',
      goal: {
        targetReviewDate: '2022-05-29T00:00:00.000Z',
        text: 'some text',
        useAsPhp: false
      }
    });
  });

  afterEach(() => {
    cy.task('deletePlan', '1');
  });

  describe('Add action', () => {
    describe('Add to plan button', () => {
      it('is disabled until a summary and date is added', () => {
        cy.visit(`http://localhost:3000/plans/1`);
        cy.get('h1').should('have.text', "Bart Simpson's shared plan");

        cy.get('#summary-text.govuk-input')
          .click()
          .type('Summary');
        cy.get('button')
          .last()
          .should('have.attr', 'disabled');

        cy.get('#due-date-day.govuk-input')
          .click()
          .type('10');
        cy.get('button')
          .last()
          .should('have.attr', 'disabled');

        cy.get('#due-date-month.govuk-input')
          .click()
          .type('5');
        cy.get('button')
          .last()
          .should('have.attr', 'disabled');

        cy.get('#due-date-year.govuk-input')
          .click()
          .type('2400');
        cy.get('button')
          .last()
          .click();
      });
    });
    it('Adds an action to a goal', () => {
      cy.visit(`http://localhost:3000/plans/1`);
      cy.get('h1').should('have.text', "Bart Simpson's shared plan");

      cy.get('#summary-text.govuk-input')
        .click()
        .type('Summary');

      cy.get('#full-description.govuk-textarea')
        .click()
        .type('Description');

      cy.get('#due-date-day.govuk-input')
        .click()
        .type('10');
      cy.get('#due-date-month.govuk-input')
        .click()
        .type('5');
      cy.get('#due-date-year.govuk-input')
        .click()
        .type('2200');
      cy.get('button')
        .last()
        .click();
      //check if it then gets displayed when the action part of the UI is done
    });
  });
});
