/// <reference types="cypress" />

context('Add-goal form', () => {
  const createGoal = (goalText, day, month, year, useAsPhp) => {
    if (goalText) {
      cy.get('#goal-text')
        .click()
        .type(goalText);
    }
    if (day) {
      cy.get('#target-review-date-day')
        .click()
        .type(day);
    }
    if (month) {
      cy.get('#target-review-date-month')
        .click()
        .type(month);
    }
    if (year) {
      cy.get('#target-review-date-year')
        .click()
        .type(year);
    }
    if (useAsPhp) {
      cy.get('#use-as-php').click();
    }
  };

  beforeEach(() => {
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
    cy.task('deletePlan', '2');
  });

  describe('Add goal', () => {
    it('Adds a goal to the plan', () => {
      cy.get('h1').should('have.text', "Dwayn Johnson's shared plan");
      createGoal('This is the goal', '1', '2', '2025', true);
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('[data-testid=goal-label-test]').should('contain', 'Goal');
      cy.get('[data-testid=goal-text-test]').should(
        'contain',
        'This is the goal'
      );
      cy.get('[data-testid=target-review-date-label-test]').should(
        'contain',
        'Target review date'
      );
      cy.get('[data-testid=target-review-date-input-test]').should(
        'contain',
        '01/02/2025'
      );
    });

    it('Shows a validation error when the goal text is empty', () => {
      createGoal('', '8', '11', '2025', false);
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('#goal-text-error').should('contain', 'The Goal is required');
    });

    it('Shows validation error when the day is empty', () => {
      createGoal('This is the goal', '', '11', '2025', false);
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('#target-review-date-error').should(
        'contain',
        'The Target review date must be valid and in the future'
      );
    });

    it('shows a validation error when the month is empty', () => {
      createGoal('This is the goal', '11', '', '2025', false);
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('#target-review-date-error').should(
        'contain',
        'The Target review date must be valid and in the future'
      );
    });

    it('Shows a validation error when the year is empty', () => {
      createGoal('This is the goal', '11', '9', '', true);
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('#target-review-date-error').should(
        'contain',
        'The Target review date must be valid and in the future'
      );
    });

    it('Shows a validation error when the date is not in the future', () => {
      createGoal('This is the goal', '11', '9', '2000', false);
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('#target-review-date-error').should(
        'contain',
        'The Target review date must be valid and in the future'
      );
    });

    it('Checks there are 2 names in "shared with" list', () => {
      createGoal('This is the goal', '1', '2', '2025', true);
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('[data-testid=resident-name-test]').should(
        'contain',
        'Dwayn Johnson'
      );
      cy.get('[data-testid=agreedWith-name-test]').should('contain', 'My name');
    });

    it('Checks the legal text is shown when use as php is ticked', () => {
      createGoal('This is the goal', '1', '2', '2025', true);
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('[data-testid=legal-text-test]').should(
        'contain',
        'About this plan'
      );
    });

    it('Checks the legal text is not shown when use as php is not ticked', () => {
      createGoal('This is the goal', '1', '2', '2025', false);
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('[data-testid=legal-text-test]').should(
        'not.contain',
        'About this plan'
      );
    });

    it('Checks the goal form is not shown after adding a goal', () => {
      createGoal('This is the goal', '1', '2', '2025', true);
      cy.get('[data-testid=add-actions-button-test]').click();
      cy.get('[data-testid=panel-test]').should('be.visible');
      cy.get('[data-testid=use-as-php-test]').should(
        'not.contain',
        'Use as a PHP'
      );
    });
  });
});
