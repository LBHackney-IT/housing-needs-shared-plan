/// <reference types="cypress" />

context('Summary page', () => {
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
  });

  afterEach(() => {
    cy.task('deletePlan', '1');
  });

  describe('Loads page', () => {
    it('has shared plan heading', () => {
      cy.visit(`http://localhost:3000/plans/1`);
      cy.get('h1').should('have.text', "Bart Simpson's shared plan");
    });

    it('throws 404 if shared plan does not exist', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/plans/999',
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.equal(404);
      });
    });

    it('can find the correct record', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/api/plans/find',
        failOnStatusCode: false,
        body: { firstName: 'Bart', lastName: 'Simpson' }
      }).then(response => {
        cy.visit(`http://localhost:3000/plans/${response.body.planIds[0]}`);
        cy.get('h1').should('have.text', "Bart Simpson's shared plan");
      });
    });
  });

  describe('Action list', () => {
    it('Can render a clickable link in action description', () => {
      cy.get('[data-testid=details-summary]').click({ force: true });

      cy.get('[data-testid=action-details-test] > details > div > p >  a')
        .should('contain', 'http://localhost:3000')
        .click();
      cy.get('h1').should('contain', 'Welcome to Shared Plan!');
    });
  });
});
