/// <reference types="cypress" />

context('Customer Summary page', () => {
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
        agreedWithName: 'Ami Working',
        actions: [
          {
            summary: 'text',
            description: 'http://localhost:3000',
            dueDate: '2020-08-08'
          }
        ]
      }
    });

    cy.task('createPlan', {
      id: '2',
      firstName: 'Homer',
      lastName: 'Simpson',
      queryFirstName: 'homer',
      queryLastName: 'simpson',
      goal: {
        targetReviewDate: '2022-05-29T00:00:00.000Z',
        text: 'some text',
        useAsPhp: true,
        agreedWithName: 'Ami Working',
        actions: [
          {
            summary: 'text',
            description: 'http://localhost:3000',
            dueDate: '2020-08-08'
          }
        ]
      }
    });
  });

  afterEach(() => {
    cy.task('deletePlan', '1');
    cy.task('deletePlan', '2');
  });

  describe('Loads page', () => {
    it('has shared plan heading', () => {
      cy.visit(`http://localhost:3000/c/plans/1`);
      cy.get('h1').should('have.text', "Bart Simpson's shared plan");
    });
  });

  describe('Legal Text', () => {
    it('Does not display legal text if plan is not used as a PHP', () => {
      cy.visit(`http://localhost:3000/c/plans/1`);

      cy.get('[data-testid=legal-text-test]').should('not.exist');
    });

    it('Displays legal text if plan is used as a PHP', () => {
      cy.visit(`http://localhost:3000/c/plans/2`);

      cy.get('[data-testid=legal-text-test]').should('exist');
    });
  });
});
