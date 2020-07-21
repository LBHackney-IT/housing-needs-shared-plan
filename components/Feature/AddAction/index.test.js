import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddAction from './index';

describe('AddAction', () => {
  it('renders the add action form', () => {
    const { getByTestId } = render(<AddAction />);

    expect(getByTestId('action-title-test')).toBeInTheDocument();
    expect(getByTestId('description-test')).toBeInTheDocument();
    expect(getByTestId('day-test')).toBeInTheDocument();
    expect(getByTestId('month-test')).toBeInTheDocument();
    expect(getByTestId('year-test')).toBeInTheDocument();
  });
});

describe('OnClick', () => {
  it('Adds an action', async () => {
    const onActionAdded = jest.fn();
    const { getByTestId } = render(
      <AddAction onActionAdded={onActionAdded} />
    );
    await userEvent.type(getByTestId('text-input-test'), 'Action title');
    await userEvent.type(
      getByTestId('text-area-input-test'),
      'description'
    );
    await userEvent.type(getByTestId('day-test'), '01');
    await userEvent.type(getByTestId('month-test'), '01');
    await userEvent.type(getByTestId('year-test'), '2200');
    await getByTestId('add-action-button-test').click();

    expect(onActionAdded).toHaveBeenCalledWith({
      summary: 'Action title',
      description: 'description',
      dueDate: expect.stringContaining('2200-01-01')
    });
  });

  it('does not save the action if the form is not valid', async () => {
    const onActionAdded = jest.fn();
    const { getByTestId } = render(
      <AddAction onActionAdded={onActionAdded} />
    );

    await userEvent.type(getByTestId('text-input-test'), 'Action title');
    await userEvent.type(getByTestId('day-test'), '99');
    await userEvent.type(getByTestId('month-test'), '40000');
    await userEvent.type(getByTestId('year-test'), '0');
    await getByTestId('add-action-button-test').click();

    expect(onActionAdded).not.toHaveBeenCalled();
  });
});
