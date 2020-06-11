import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditAction from './index';

describe('EditAction', () => {
  it('renders the edit action form', () => {
    const { getByLabelText } = render(<EditAction />);

    expect(getByLabelText('Summary')).toBeInTheDocument();
    expect(getByLabelText('Full description(optional)')).toBeInTheDocument();
    expect(getByLabelText('Day')).toBeInTheDocument();
    expect(getByLabelText('Month')).toBeInTheDocument();
    expect(getByLabelText('Year')).toBeInTheDocument();
  });
});

describe('OnClick', () => {
  it('Edits an action', async () => {
    const onActionUpdated = jest.fn();
    const { getByLabelText, getByText } = render(
      <EditAction onActionUpdated={onActionUpdated} />
    );
    await userEvent.type(getByLabelText('Summary'), 'summary');
    await userEvent.type(
      getByLabelText('Full description(optional)'),
      'description'
    );
    await userEvent.type(getByLabelText('Day'), '01');
    await userEvent.type(getByLabelText('Month'), '01');
    await userEvent.type(getByLabelText('Year'), '2200');
    await getByText('Save').click();

    expect(onActionUpdated).toHaveBeenCalledWith({
      summary: 'summary',
      description: 'description',
      dueDate: expect.stringContaining('2200-01-01')
    });
  });

  it('does not save the action if the form is not valid', async () => {
    const onActionUpdated = jest.fn();
    const { getByLabelText, getByText } = render(
      <EditAction onActionUpdated={onActionUpdated} />
    );

    await userEvent.type(getByLabelText('Summary'), 'summary');
    await userEvent.type(getByLabelText('Day'), '99');
    await userEvent.type(getByLabelText('Month'), '40000');
    await userEvent.type(getByLabelText('Year'), '0');
    await getByText('Save').click();

    expect(onActionUpdated).not.toHaveBeenCalled();
  });
});
