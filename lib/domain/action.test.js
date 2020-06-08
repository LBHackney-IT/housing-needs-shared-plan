import { Action } from 'lib/domain';
import MockDate from 'mockdate';

describe('Action', () => {
  let action;

  beforeEach(() => {
    MockDate.set('2020-03-04T01:02:03.000Z');

    action = new Action({
      id: 'PPBqWA9',
      summary: 'Solve the problem',
      description: 'Once you have solved it, it will not be a problem',
      dueDate: '2020-05-01',
      isCompleted: false
    });
  });

  describe('isCompleted', () => {
    it('sets the completed date when added', () => {
      expect(action.completedDate).toBeUndefined();

      action.isCompleted = true;
      expect(action.isCompleted).toBe(true);
      expect(action.completedDate).toBe('2020-03-04T01:02:03.000Z');
    });

    it('sets the completed date via #update', () => {
      expect(action.completedDate).toBeUndefined();

      action.update({ isCompleted: true });
      expect(action.isCompleted).toBe(true);
      expect(action.completedDate).toBe('2020-03-04T01:02:03.000Z');
    });

    it('removes the completed date when removed', () => {
      const completed = new Action({
        ...action,
        isCompleted: true,
        completedDate: '2020-03-04T01:02:03.000Z'
      });

      expect(completed.completedDate).toBeDefined();

      completed.isCompleted = false;
      expect(completed.isCompleted).toBe(false);
      expect(completed.completedDate).toBeUndefined();
    });
  });

  describe('update', () => {
    it('applies the update to the Action', () => {
      action.update({
        summary: 'Update an action',
        description: 'By calling #update on the instance',
        isCompleted: true
      });

      expect(action.summary).toBe('Update an action');
      expect(action.description).toBe('By calling #update on the instance');
      expect(action.isCompleted).toBe(true);
    });

    it('ignores controlled properties', () => {
      action.update({ completedDate: '2020-05-06T22:00:00.000Z' });
      expect(action.completedDate).toBeUndefined();
    });
  });
});
