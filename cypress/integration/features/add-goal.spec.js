/// <reference types="cypress" />

context('Add-goal page', () => {
  beforeEach(() => {
    // cy.task('createPlan', {
    //   id: '1',
    //   firstName: 'Bart',
    //   lastName: 'Simpson',
    //   queryFirstName: 'bart',
    //   queryLastName: 'simpson',
    //   goal: {
    //     targetReviewDate: '2022-05-29T00:00:00.000Z',
    //     text: 'some text',
    //     useAsPhp: false
    //   }
    // });

    cy.task('createPlan', {
      id: '2',
      firstName: 'Dwayn',
      lastName: 'Johnson',
      queryFirstName: 'dwayn',
      queryLastName: 'johnson'
    });

    cy.setHackneyCookie(true);
    cy.visit(`http://localhost:3000/plans/2`);
  });

  afterEach(() => {
    //cy.task('deletePlan', '1');
    cy.task('deletePlan', '2');
  });

  describe('Add goal', () => {
    it('Adds a goal to the plan', () => {
      //cy.visit(`http://localhost:3000/plans/2`);
      cy.get('h1').should('have.text', "Dwayn Johnson's shared plan");

      cy.get('#goal-text')
        .click()
        .type('This is the goal');
      cy.get('#target-review-date-day')
        .click()
        .type('1');
      cy.get('#target-review-date-month')
        .click()
        .type('2');
      cy.get('#target-review-date-year')
        .click()
        .type('2025');
      cy.get('#use-as-php').click();

      cy.get('[data-testid=add-actions-button-test]').click();

      cy.get('[data-testid=goal-label-test]').should('contain', 'Goal');
      cy.get('[data-testid=goal-text-test]').should(
        'contain',
        'This is the goal'
      );
      cy.get('[data-testid=target-review-date-label-test]').should(
        'contain',
        'Target Review Date'
      );
      cy.get('[data-testid=target-review-date-input-test]').should(
        'contain',
        '01/02/2025'
      );
    });

    it('Shows a validation error when the goal text is empty', () => {
      // if text empty, can't add goal + the error message is shown
      cy.get('#target-review-date-day')
        .click()
        .type('8');
      cy.get('#target-review-date-month')
        .click()
        .type('11');
      cy.get('#target-review-date-year')
        .click()
        .type('2025');
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('#goal-text-error').should('contain', 'The Goal is required');
    });

    it('Shows validation error when the day is empty', () => {
      cy.get('#goal-text')
        .click()
        .type('This is the goal');
      cy.get('#target-review-date-month')
        .click()
        .type('11');
      cy.get('#target-review-date-year')
        .click()
        .type('2025');
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('#target-review-date-error').should(
        'contain',
        'The Target review date must be valid and in the future'
      );
    });

    it('shows a validation error when the month is empty', () => {
      cy.get('#goal-text')
        .click()
        .type('This is the goal');
      cy.get('#target-review-date-day')
        .click()
        .type('11');
      cy.get('#target-review-date-year')
        .click()
        .type('2025');
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('#target-review-date-error').should(
        'contain',
        'The Target review date must be valid and in the future'
      );
    });

    it('Shows a validation error when the year is empty', () => {
      cy.get('#goal-text')
        .click()
        .type('This is the goal');
      cy.get('#target-review-date-day')
        .click()
        .type('11');
      cy.get('#target-review-date-month')
        .click()
        .type('9');
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('#target-review-date-error').should(
        'contain',
        'The Target review date must be valid and in the future'
      );
    });

    it('Shows a validation error when the date is not in the future', () => {
      cy.get('#goal-text')
        .click()
        .type('This is the goal');
      cy.get('#target-review-date-day')
        .click()
        .type('11');
      cy.get('#target-review-date-month')
        .click()
        .type('9');
      cy.get('#target-review-date-year')
        .click()
        .type('2000');
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('#target-review-date-error').should(
        'contain',
        'The Target review date must be valid and in the future'
      );
    });

    it('Checks there are 2 names in "shared with" list', () => {
      cy.get('#goal-text')
        .click()
        .type('This is the goal');
      cy.get('#target-review-date-day')
        .click()
        .type('1');
      cy.get('#target-review-date-month')
        .click()
        .type('2');
      cy.get('#target-review-date-year')
        .click()
        .type('2025');
      cy.get('#use-as-php').click();

      cy.get('[data-testid=add-actions-button-test]').click();

      cy.get('[data-testid=resident-name-test]').should(
        'contain',
        'Dwayn Johnson'
      );
      cy.get('[data-testid=user-name-test]').should(
        'contain',
        'My name'
      );
    });

    it('Checks the legal text is shown when use as php is ticked', () => {
      cy.get('#goal-text')
        .click()
        .type('This is the goal');
      cy.get('#target-review-date-day')
        .click()
        .type('1');
      cy.get('#target-review-date-month')
        .click()
        .type('2');
      cy.get('#target-review-date-year')
        .click()
        .type('2025');
      cy.get('#use-as-php').click();


      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('[data-testid=legal-text-test]')
        .should('contain','About this plan');
    });

    it ('Checks the legal text is not shown when use as php is not ticked', () => {
      cy.get('#goal-text')
        .click()
        .type('This is the goal');
      cy.get('#target-review-date-day')
        .click()
        .type('1');
      cy.get('#target-review-date-month')
        .click()
        .type('2');
      cy.get('#target-review-date-year')
        .click()
        .type('2025');

      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('[data-testid=legal-text-test]')
        .should('not.contain','About this plan');
    })

    it('Checks the goal form is not shown after adding a goal', () => {
      cy.get('#goal-text')
        .click()
        .type('This is the goal');
      cy.get('#target-review-date-day')
        .click()
        .type('1');
      cy.get('#target-review-date-month')
        .click()
        .type('2');
      cy.get('#target-review-date-year')
        .click()
        .type('2025');
      cy.get('#use-as-php').click();
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('[data-testid=panel-test]')
        .should('be.visible');
      cy.get('#content > div > div.govuk-grid-column-three-quarters > div:nth-child(3) > div > div > label').should('not.contain','Use as a PHP');
    });
  });
});
