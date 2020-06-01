import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddAction from './index';

describe('AddAction', () => {
  it('renders the add action form', () => {
    const { getByLabelText } = render(<AddAction />);

    expect(getByLabelText('Summary')).toBeInTheDocument();
    expect(getByLabelText('Full description(optional)')).toBeInTheDocument();
    expect(getByLabelText('Day')).toBeInTheDocument();
    expect(getByLabelText('Month')).toBeInTheDocument();
    expect(getByLabelText('Year')).toBeInTheDocument();
  });
});

describe('OnClick', () => {
  it('Adds an action', async () => {
    const onActionAdded = jest.fn();
    const { getByLabelText, getByText } = render(
      <AddAction onActionAdded={onActionAdded} />
    );
    await userEvent.type(getByLabelText('Summary'), 'summary');
    await userEvent.type(
      getByLabelText('Full description(optional)'),
      'description'
    );
    await userEvent.type(getByLabelText('Day'), '01');
    await userEvent.type(getByLabelText('Month'), '01');
    await userEvent.type(getByLabelText('Year'), '2200');
    await getByText('Add to plan').click();

    expect(onActionAdded).toHaveBeenCalledWith({
      summary: 'summary',
      description: 'description',
      dueDate: {
        day: 1,
        month: 1,
        year: 2200
      }
    });
  });

  it('does not save the action if the form is not valid', async () => {
    const onActionAdded = jest.fn();
    const { getByLabelText, getByText } = render(
      <AddAction onActionAdded={onActionAdded} />
    );

    await userEvent.type(getByLabelText('Summary'), 'summary');
    await userEvent.type(getByLabelText('Day'), 'aa');
    await userEvent.type(getByLabelText('Month'), 'd1');
    await userEvent.type(getByLabelText('Year'), 'one');
    await getByText('Add to plan').click();

    expect(onActionAdded).not.toHaveBeenCalled();
  });
});
