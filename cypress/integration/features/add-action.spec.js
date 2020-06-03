context('Add action form', () => {

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
        useAsPhp: false,
        actions: []
      }
    });

    cy.setHackneyCookie(true);
    cy.visit(`http://localhost:3000/plans/1`);
  }

  afterEach(() => {
    cy.task('deletePlan', '1');
  });


  describe('Add action', () => {
    describe('Add to plan button', () => {
      it('is disabled until a summary and date is added', () => {
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
      });
    });

    it('Adds an action to a goal', () => {
      cy.get('h1').should('have.text', "Bart Simpson's shared plan");

      cy.get('#summary-text.govuk-input')
        .click()
        .type('This is the summary');

      cy.get('#full-description.govuk-textarea')
        .click()
        .type('This is the description');

      cy.get('#due-date-day.govuk-input')
        .click()
        .type('10');
      cy.get('#due-date-month.govuk-input')
        .click()
        .type('5');
      cy.get('#due-date-year.govuk-input')
        .click()
        .type('2200');
      cy.get('[data-testid=add-action-button-test]').should('not.be.disabled');

      cy.get('[data-testid=add-action-button-test]').click();

      cy.get('#content > table > tbody > tr:nth-child(1) > td.govuk-table__cell.lbh-actions-list__description > h2')
        .should('contain','This is the summary');

      cy.get(
        '[data-testid=text-expand-button]'
      ).should('contain', 'Show details');

      cy.get(
        '[data-testid=text-expand-button]')
        .click();

      cy.get('#content > table > tbody > tr:nth-child(1) > td.govuk-table__cell.lbh-actions-list__description')
        .should('contain','This is the description')
        .and('contain','Hide details');

      cy.get('[data-testid=due-date-test]')
        .should('contain','10 May 2200')
    });

    it ('Can add 2 different actions', () => {
      cy.get('#summary-text.govuk-input')
        .click()
        .type('This is the summary of the first action');

      cy.get('#full-description.govuk-textarea')
        .click()
        .type('This is the description of the first action');

      cy.get('#due-date-day.govuk-input')
        .click()
        .type('10');
      cy.get('#due-date-month.govuk-input')
        .click()
        .type('5');
      cy.get('#due-date-year.govuk-input')
        .click()
        .type('2200');

      cy.get('[data-testid=add-action-button-test]').click();


      cy.get('#summary-text.govuk-input')
        .clear();
      cy.get('#summary-text.govuk-input')
        .click()
        .type('This is the summary of the second action');

      cy.get('#full-description.govuk-textarea')
        .clear();
      cy.get('#full-description.govuk-textarea')
        .click()
        .type('This is the description of the second action');

      cy.get('#due-date-day.govuk-input')
        .clear();
      cy.get('#due-date-day.govuk-input')
        .click()
        .type('29');
      cy.get('#due-date-month.govuk-input')
        .clear();
      cy.get('#due-date-month.govuk-input')
        .click()
        .type('2');
      cy.get('#due-date-year.govuk-input')
        .clear();
      cy.get('#due-date-year.govuk-input')
        .click()
        .type('2024');

      cy.get('[data-testid=add-action-button-test]').click();





      cy.get(
        '[data-testid=text-expand-button]'
      ).should('contain', 'Show details');

      cy.get(
        '[data-testid=text-expand-button]')
        .click();

    })
  });
});
