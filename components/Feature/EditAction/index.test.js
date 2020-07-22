import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditAction from './index';

describe('EditAction', () => {
  it('renders the edit action form', () => {
    const { getByLabelText } = render(<EditAction action={{dueDate: '2025-11-28'}} />);

    expect(getByLabelText('Action title')).toBeInTheDocument();
    expect(getByLabelText('Full description (optional)')).toBeInTheDocument();
    expect(getByLabelText('Day')).toBeInTheDocument();
    expect(getByLabelText('Month')).toBeInTheDocument();
    expect(getByLabelText('Year')).toBeInTheDocument();
  });
});

describe('OnClick', () => {
  it('Edits an action', async () => {
    const onActionUpdated = jest.fn();
    const { getByLabelText, getByTestId } = render(
      <EditAction action={{dueDate: '2200-01-01', description: 'description', summary: 'summary'}} onActionUpdated={onActionUpdated} />
    );
    await userEvent.clear(getByLabelText('Action title'));
    await userEvent.type(getByLabelText('Action title'), 'Action title');
    await userEvent.clear(getByLabelText('Full description (optional)'));
    await userEvent.type(
      getByLabelText('Full description (optional)'),
      'description'
    );
    await userEvent.clear(getByLabelText('Day'));
    await userEvent.type(getByLabelText('Day'), '01');
    await userEvent.clear(getByLabelText('Month'));
    await userEvent.type(getByLabelText('Month'), '01');
    await userEvent.clear(getByLabelText('Year'));
    await userEvent.type(getByLabelText('Year'), '2200');
    await getByTestId('save-action-button-test').click();

    expect(onActionUpdated).toHaveBeenCalledWith({
      summary: 'Action title',
      description: 'description',
      dueDate: expect.stringContaining('2200-01-01')
    });
  });

  it('does not save the action if the form is not valid', async () => {
    const onActionUpdated = jest.fn();
    const { getByLabelText, getByTestId } = render(
      <EditAction action={{description: 'description', summary: 'summary', dueDate: '2025-11-28'}} onActionUpdated={onActionUpdated} />
    );

    await userEvent.clear(getByLabelText('Action title'));
    await userEvent.type(getByLabelText('Action title'), 'Action title');
    await userEvent.clear(getByLabelText('Day'));
    await userEvent.type(getByLabelText('Day'), '99');
    await userEvent.clear(getByLabelText('Month'));
    await userEvent.type(getByLabelText('Month'), '40000');
    await userEvent.clear(getByLabelText('Year'));
    await userEvent.type(getByLabelText('Year'), '0');
    await getByTestId('save-action-button-test').click();

    expect(onActionUpdated).not.toHaveBeenCalled();
  });
});
