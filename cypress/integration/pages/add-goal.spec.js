/// <reference types="cypress" />

context('Add-goal page', async () => {
  before(async () => {
    await cy.createSharedPlan({
      id: '1',
      firstName: 'Bart',
      lastName: 'Simpson',
      queryFirstName: 'bart',
      queryLastName: 'simpson',
      goal: {}
    });
  });

  after(async () => {
    await cy.deleteSharedPlan('1');
  });

  describe('Loads page', () => {
    it('Adds an action to a goal', () => {
      cy.visit(`http://localhost:3000/plans/add-goal/1`);
      cy.get('h1').should('have.text', "Bart Simpson's shared plan");
    });
  });
});
