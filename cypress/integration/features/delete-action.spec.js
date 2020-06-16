context('with two actions', () => {
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
            description: 'This shall remain forever.',
            dueDate: '2020-05-20',
            isCompleted: true
          },
          {
            id: 'hwX6aOr7',
            summary: 'This is another test action',
            description: 'We will delete this action in a test!',
            dueDate: '2020-06-20',
            isCompleted: false
          }
        ],
        agreedWithName: 'Ami Working'
      }
    });

    cy.setHackneyCookie(true);
    cy.visit('http://localhost:3000/plans/1');
  });

  describe('clicking the delete button', () => {
    it('deletes the action', () => {
      const actionId = 'hwX6aOr7';
      const selector = `[data-testid=actions-list-button-delete-${actionId}]`;
      cy.get(selector).click().should('not.exist');
    });
  });
});
