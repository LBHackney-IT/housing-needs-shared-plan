/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddGoal from './index';


describe('AddGoal', () => {
  it('renders the add goal form', () => {
    const { getByTestId } = render(<AddGoal plan={{ id: 1 }} />);
    expect(getByTestId('add-goal-text-test')).toBeInTheDocument();
    expect(getByTestId('day-test')).toBeInTheDocument();
    expect(getByTestId('month-test')).toBeInTheDocument();
    expect(getByTestId('year-test')).toBeInTheDocument();
    expect(getByTestId('use-as-php-test')).toBeInTheDocument();
    expect(getByTestId('add-actions-button-test')).toBeInTheDocument();
  });

  it('saves the goal when add actions button is clicked', async () => {
    const onGoalAdded = jest.fn();
    const { getByLabelText, getByText, getByTestId } = render(
      <AddGoal initialUseAsPhp={false} onGoalAdded={onGoalAdded} />
    );

    const goalInput = getByTestId('add-goal-text-test');
    const day = getByLabelText('Day');
    const month = getByLabelText('Month')
    const year = getByLabelText('Year')

    await userEvent.type(goalInput, 'this is my goal')
    await userEvent.type(day, '12')
    await userEvent.type(month, '10')
    await userEvent.type(year, '2022')
    

    userEvent.click(getByText('Add actions'))


    expect(onGoalAdded).toHaveBeenCalledWith({
      targetReviewDate: {
        day: 12,
        month: 10,
        year: 2022
      },
      text: 'this is my goal',
      useAsPhp: false,
      actions: []
    });
  });

  it('does not save the goal if the form is not valid', () => {
    const onGoalAdded = jest.fn();
    const { getByText } = render(<AddGoal onGoalAdded={onGoalAdded} />);

    fireEvent(
      getByText('Add actions'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(onGoalAdded).not.toHaveBeenCalled();
  });

  it('sets the goal input value if goal already exists', () => {
    const { getByLabelText } = render(<AddGoal goal={{ text: 'hello' }} />);
    expect(getByLabelText('Overall resident goal').value).toEqual('hello');
  });

  it('sets the target review date input value if goal already exists', () => {
    const { getByLabelText } = render(
      <AddGoal goal={{ targetReviewDate: '2022-10-20T00:00:00.000Z' }} />
    );
    expect(getByLabelText('Day').value).toEqual('20');
    expect(getByLabelText('Month').value).toEqual('10');
    expect(getByLabelText('Year').value).toEqual('2022');
  });

  it('sets the use as php input value if goal already exists', () => {
    const { getByLabelText } = render(<AddGoal goal={{ useAsPhp: true }} />);
    expect(getByLabelText('Use as a PHP').checked).toEqual(true);
  });

  it('checks use as PHP checkbox if resident has PHP record in singleview', () => {
    const { getByLabelText } = render(<AddGoal initialUseAsPhp={true} />);
    expect(getByLabelText('Use as a PHP').checked).toEqual(true);
  });
});
