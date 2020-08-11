context('Add action form', () => {
  const createAction = (summary, description, day, month, year) => {
    if (summary) {
      cy.get('#summary-text.govuk-input').type(summary);
    }
    if (description) {
      cy.get('#full-description.govuk-textarea').type(description);
    }
    if (day) {
      cy.get('#due-date-day.govuk-input').type(day);
    }
    if (month) {
      cy.get('#due-date-month.govuk-input').type(month);
    }
    if (year) {
      cy.get('#due-date-year.govuk-input').type(year);
    }
  };

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
        actions: [],
        agreedWithName: 'Ami Working'
      }
    });

    cy.setHackneyCookie(true);
    cy.visit(`http://localhost:3000/plans/1`);

    cy.get('[data-testid=add-action-button]').click();
  });

  afterEach(() => {
    cy.task('deletePlan', '1');
  });

  describe('Add action', () => {
    it('Adds an action to a goal', () => {
      cy.get('h1').should('have.text', "Bart Simpson's shared plan");

      createAction(
        'This is the summary',
        'This is the description',
        '10',
        '5',
        '2200'
      );

      cy.get('[data-testid=add-action-button-test]').click();
      cy.get('[data-testid=add-action-button-test]').should('not.exist');

      cy.get('[data-testid=action-details-test]').should(
        'contain',
        'This is the summary'
      );

      cy.get('[data-testid=details-summary]').should('contain', 'Show details');

      // see: https://github.com/cypress-io/cypress/issues/7306
      cy.get('[data-testid=details-summary]').click({ force: true });

      cy.get('[data-testid=action-details-test]').should(
        'contain',
        'This is the description'
      );

      cy.get('[data-testid=due-date-test]').should('contain', '10 May 2200');
    });

    it('Can add 2 different actions', () => {
      createAction(
        'This is the summary of the first action',
        'This is the description of the first action',
        '10',
        '5',
        '2200'
      );
      cy.get('[data-testid=add-action-button-test]').click();
      cy.get('[data-testid=add-action-button-test]').should('not.exist');

      cy.get('[data-testid=add-action-button]').click();
      createAction(
        'This is the summary of the second action',
        'This is the description of the second action',
        '29',
        '2',
        '2024'
      );
      cy.get('[data-testid=add-action-button-test]').click();
      cy.get('[data-testid=add-action-button-test]').should('not.exist');

      cy.get('[data-testid=action-details-test]')
        .eq(0)
        .should('contain', 'This is the summary of the first action');

      cy.get('[data-testid=details-summary]').should('contain', 'Show details');

      // see: https://github.com/cypress-io/cypress/issues/7306
      cy.get('[data-testid=details-summary]')
        .first()
        .click({ force: true });

      cy.get('[data-testid=action-details-test]')
        .eq(0)
        .should('contain', 'This is the description of the first action');

      cy.get('[data-testid=action-details-test]')
        .eq(1)
        .should('contain', 'This is the summary of the second action');

      cy.get('[data-testid=details-summary]')
        .last()
        .click({ force: true });

      cy.get('[data-testid=action-details-test]')
        .eq(1)
        .should('contain', 'This is the description of the second action');
    });

    it('Can add an action with no description', () => {
      createAction('This is the summary', '', '10', '5', '2200');
      cy.get('[data-testid=add-action-button-test]').click();
      cy.get('[data-testid=details-summary]').should('not.exist');
    });

    it('Shows a validation error when the action title text is empty', () => {
      createAction('', 'Action description', '1', '2', '2021');
      cy.get('[data-testid=add-action-button-test]').click();
      cy.get('#summary-text-error').should(
        'contain',
        'The Action title is required'
      );
    });

    it('Shows validation error when the day is empty', () => {
      createAction('Action summary', 'Action description', '', '12', '2025');
      cy.get('[data-testid=add-action-button-test]').click();
      cy.get('#due-date-error').should(
        'contain',
        'The Due date must be valid and in the future'
      );
    });

    it('Shows validation error when the month is empty', () => {
      createAction('Action summary', 'Action description', '3', '', '2025');
      cy.get('[data-testid=add-action-button-test]').click();
      cy.get('#due-date-error').should(
        'contain',
        'The Due date must be valid and in the future'
      );
    });

    it('Shows validation error when the year is empty', () => {
      createAction('Action summary', 'Action description', '3', '12', '');
      cy.get('[data-testid=add-action-button-test]').click();
      cy.get('#due-date-error').should(
        'contain',
        'The Due date must be valid and in the future'
      );
    });

    it('Shows a validation error when the date is not in the future', () => {
      createAction('Action summary', 'Action description', '', '12', '2001');
      cy.get('[data-testid=add-action-button-test]').click();
      cy.get('#due-date-error').should(
        'contain',
        'The Due date must be valid and in the future'
      );
    });

    it('Does not show an error when the date is today', () => {
      const today = new Date(Date.now());
      createAction(
        'Action summary',
        'Action description',
        today.getDate(),
        today.getMonth() + 1,
        today.getFullYear()
      );

      cy.get('[data-testid=add-action-button-test]').click();
      cy.get('#due-date-error').should(
        'not.contain',
        'The Due date must be valid and in the future'
      );
    });

    it('Checks the form is hidden after adding an action', () => {
      createAction('Action summary', 'Action description', '4', '12', '2025');
      cy.get('[data-testid=add-action-button-test]').click();
      cy.get('#full-description').should('not.exist');
    });

    it('Displays who added the action', () => {
      createAction('Action summary', 'Action description', '4', '12', '2025');
      cy.get('[data-testid=add-action-button-test]').click();
      cy.get('[data-testid=action-added-message]').should('contain', 'My name');
    });
  });
});
