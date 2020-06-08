context('Share the plan with collaborator', () => {
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
      },
      numbers: ["070000000"],
      emails: ["example@plan.com"],
      customerTokens: []
    });

    cy.setHackneyCookie(true);
    cy.visit(`http://localhost:3000/plans/1`);
  }

  afterEach(() => {
    cy.task('deletePlan', '1');
  });

  describe('Share the plan with resident', () => {
    it('Shares the plan via SMS', () => {
      cy.get('[data-testid=share-plan-button-test]')
        .click()

      cy.get('#content > h1')
        .should('contain','Bart Simpson\'s shared plan');

      cy.get('#content > h2')
        .should('contain','Share with collaborators');

      cy.get('#content > table > thead > tr')
        .should('contain','Collaborators')
        .and('contain','Share by SMS')
        .and('contain','Share by email')
        .and('contain','Share link to plan');

      cy.get('[data-testid=collaborator-name-row-test]')
        .should('contain','Bart Simpson');

      cy.get('[data-testid=share-by-sms-row-test] > div > div > div > input')
        .should('have.attr','type','checkbox');

      cy.get('[data-testid=share-by-sms-row-test] > div > div > div > input')
        .click();

      cy.get('[data-testid=share-by-sms-row-test] > div > div > div > label')
        .should('contain','+4470000000');

      cy.get('[data-testid=share-by-email-row-test] > div > div > div > input')
        .should('have.attr','type', 'checkbox');

      cy.get('[data-testid=share-by-email-row-test] > div > div > div > label')
        .should('contain','example@plan.com');

      cy.get('[data-testid=share-link-to-plan-row-test] > span')
        .should('contain','Not yet shared with Bart');

      cy.server()
      cy.route({
        method: 'GET',
        url: '/messages',
        response: {ok:true}
      })

      cy.get('[data-testid=share-link-to-plan-row-test] > div > button')
        .should('contain','Share')
      cy.get('[data-testid=share-link-to-plan-row-test] > div > button')
        .click();
      cy.get('#content').should('contain','Last shared with');
    });
}
