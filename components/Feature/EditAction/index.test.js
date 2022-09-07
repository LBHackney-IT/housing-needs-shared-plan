import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditAction from './index';
/**
 * @jest-environment jsdom
 */
describe('EditAction', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  it('renders the edit action form', () => {
    const { getByTestId } = render(
      <EditAction action={{ dueDate: '2025-11-28' }} />
    );

    expect(getByTestId('edit-action-title-test')).toBeInTheDocument();
    expect(getByTestId('edit-action-description-test')).toBeInTheDocument();
    expect(getByTestId('day-test')).toBeInTheDocument();
    expect(getByTestId('month-test')).toBeInTheDocument();
    expect(getByTestId('year-test')).toBeInTheDocument();
  });
});

describe('OnClick', () => {
  it('Edits an action', async () => {
    const onActionUpdated = jest.fn();
    const { getByTestId } = render(
      <EditAction
        action={{
          dueDate: '2200-01-01',
          description: 'description',
          summary: 'summary'
        }}
        onActionUpdated={onActionUpdated}
      />
    );
    await userEvent.clear(getByTestId('edit-action-title-test'));
    await userEvent.type(getByTestId('edit-action-title-test'), 'Action title');
    await userEvent.clear(getByTestId('edit-action-description-test'));
    await userEvent.type(
      getByTestId('edit-action-description-test'),
      'description'
    );
    await userEvent.clear(getByTestId('day-test'));
    await userEvent.type(getByTestId('day-test'), '01');
    await userEvent.clear(getByTestId('month-test'));
    await userEvent.type(getByTestId('month-test'), '01');
    await userEvent.clear(getByTestId('year-test'));
    await userEvent.type(getByTestId('year-test'), '2200');
    await getByTestId('save-action-button-test').click();

    expect(onActionUpdated).toHaveBeenCalledWith({
      summary: 'Action title',
      description: 'description',
      dueDate: expect.stringContaining('2200-01-01')
    });
  });

  it('does not save the action if the form is not valid', async () => {
    const onActionUpdated = jest.fn();
    const { getByTestId } = render(
      <EditAction
        action={{
          description: 'description',
          summary: 'summary',
          dueDate: '2025-11-28'
        }}
        onActionUpdated={onActionUpdated}
      />
    );

    await userEvent.clear(getByTestId('edit-action-title-test'));
    await userEvent.type(getByTestId('edit-action-title-test'), 'Action title');
    await userEvent.clear(getByTestId('day-test'));
    await userEvent.type(getByTestId('day-test'), '99');
    await userEvent.clear(getByTestId('month-test'));
    await userEvent.type(getByTestId('month-test'), '40000');
    await userEvent.clear(getByTestId('year-test'));
    await userEvent.type(getByTestId('year-test'), '0');
    await getByTestId('save-action-button-test').click();

    expect(onActionUpdated).not.toHaveBeenCalled();
  });
});
