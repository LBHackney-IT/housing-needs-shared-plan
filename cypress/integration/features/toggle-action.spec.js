context('with no completed actions', () => {
  beforeEach(() => {
    cy.task('createPlan', {
      id: '1',
      firstName: 'Bart',
      lastName: 'Simpson',
      queryFirstName: 'bart',
      queryLastName: 'simpson',
      goal: {
        targetReviewDate: '2022-05-29T00:00:00.000Z',
        text: 'This is a test goal',
        useAsPhp: false,
        actions: [
          {
            id: 'PPbqWA9',
            summary: 'This is a test action',
            description: 'We will complete this action in a test!',
            dueDate: '2020-05-20',
            isCompleted: false
          }
        ],
        agreedWithName: 'Ami Working'
      }
    });

    cy.setHackneyCookie(true);
    cy.visit('http://localhost:3000/plans/1');
  });

  afterEach(() => {
    cy.task('deletePlan', '1');
  });

  describe('toggling the action checkbox', () => {
    it('can complete an action', () => {
      cy.get('[data-testid=action-checkbox]').check();
      cy.reload();

      cy.get('[data-testid=action-checkbox]').should('have.attr', 'checked');
    });
  });
});
