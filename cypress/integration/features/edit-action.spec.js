import IsoDate, { IsoDateTime } from '../../../lib/domain/isodate';

context('Edit action', () => {
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
        actions: [
          {
            id: '0',
            summary: 'action1',
            description: 'action description',
            dueDate: '2025-11-18',
            _isCompleted: false,
            completedDate: undefined
          }
        ],
        agreedWithName: 'Ami Working'
      }
    });

    cy.setHackneyCookie(true);
    cy.visit(`http://localhost:3000/plans/1`);
  });

  afterEach(() => {
    cy.task('deletePlan', '1');
  });

  describe('Edit action', () => {
    it('Can edit an existing action', () => {});
  });
});
