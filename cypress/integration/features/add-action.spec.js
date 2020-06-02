describe('Add action', () => {
  describe('Add to plan button', () => {
    it('is disabled until a summary and date is added', () => {
      cy.visit(`http://localhost:3000/plans/1`);
      cy.get('h1').should('have.text', "Bart Simpson's shared plan");

      cy.get('#summary-text.govuk-input')
        .click()
        .type('Summary');
      cy.get('[data-testid=add-action-button-test]')
        .last()
        .should('have.attr', 'disabled');

      cy.get('#due-date-day.govuk-input')
        .click()
        .type('10');
      cy.get('[data-testid=add-action-button-test]')
        .last()
        .should('have.attr', 'disabled');

      cy.get('#due-date-month.govuk-input')
        .click()
        .type('5');
      cy.get('[data-testid=add-action-button-test]')
        .last()
        .should('have.attr', 'disabled');

      cy.get('#due-date-year.govuk-input')
        .click()
        .type('2400');
      cy.get('[data-testid=add-action-button-test]').should(
        'not.have.attr',
        'disabled'
      );
      //cy.get('[data-testid=add-action-button-test]').click();
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
    cy.get('[data-testid=add-action-button-test]')
      .click();
    cy.get('#content > table > tbody > tr:nth-child(1) > td.govuk-table__cell.lbh-actions-list__description > h2')
      .should('contain','Summary');
    //check if it then gets displayed when the action part of the UI is done
  });
});