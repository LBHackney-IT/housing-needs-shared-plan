/// <reference types="cypress" />

context('Add-goal page', () => {
  beforeEach(() => {
    cy.setHackneyCookie(true);
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

    cy.task('createPlan', {
      id: '2',
      firstName: 'Dwayn',
      lastName: 'Johnson',
      queryFirstName: 'dwayn',
      queryLastName: 'johnson'
      // goal: {
      //   targetReviewDate: 'some date',
      //   text: 'some text',
      //   useAsPhp: false
      // }
    });
  });

  afterEach(() => {
    cy.task('deletePlan', '1');
    cy.task('deletePlan', '2');
  });

  describe('Add goal', () => {
    it('Adds a goal to the plan', () => {
      cy.visit(`http://localhost:3000/plans/2`);
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
      // cy.get(
      //   '#content > div.Panel_lbh-panel__3jZzJ > div > div > div.govuk-grid-column-two-thirds > div:nth-child(1) > p.GoalSummary_data-text__1qf5X'
      // ).should('contain', 'This is the goal');
      cy.get('[data-testid=goal-text-test]').should(
        'contain',
        'This is the goal'
      );
      cy.get('[data-testid=target-review-date-label-test]').should(
        'contain',
        'Target Review Date'
      );
      // cy.get(
      //   '#content > div.Panel_lbh-panel__3jZzJ > div > div > div.govuk-grid-column-two-thirds > div:nth-child(2) > p.GoalSummary_data-text__1qf5X'
      // ).should('contain', '01/02/2025');
      cy.get('[data-testid=target-review-date-input-test]').should(
        'contain',
        '01/02/2025'
      );
    });
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
