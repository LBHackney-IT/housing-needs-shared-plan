/// <reference types="cypress" />

context('Summary page', async () => {
  before(async () => {
    await cy.createSharedPlan({
      id: '1',
      firstName: 'Bart',
      lastName: 'Simpson'
    });
  });

  after(async () => {
    await cy.deleteSharedPlan('1');
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
  });
});
