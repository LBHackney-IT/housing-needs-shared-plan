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
    it('Can edit an existing action', () => {
      cy.get('[data-testid=edit-action-button-test]').click();
      cy.get('[data-testsid=edit-action-heading-test]');
      cy.get('#summary-text')
        .clear()
        .type('Edited summary');
      cy.get('#full-description')
        .clear()
        .type('Edited description');
      cy.get('#due-date-day')
        .clear()
        .type('20');
      cy.get('#due-date-month')
        .clear()
        .type('10');
      cy.get('#due-date-year')
        .clear()
        .type('2025');
      cy.get('[data-testid=save-action-button-test]').click({ force: true });
      cy.get('[data-testid=action-details-test]').should(
        'contain',
        'Edited summary'
      );
      cy.get('[data-testid=details-summary]').click();
      cy.get('[data-testid=action-details-test]').should(
        'contain',
        'Edited description'
      );
      cy.get('[data-testid=due-date-test]').should(
        'contain',
        '20 October 2025'
      );
    });

    it('Checks the form is hidden after editing an action', () => {
      cy.get('[data-testid=edit-action-button-test]').click();
      cy.get('[data-testid=save-action-button-test]').click({ force: true });
      cy.get('[data-testsid=edit-action-heading-test]').should('not.exist');
      cy.get('[data-testid=save-action-button-test]').should('not.exist');
    });
  });
});
