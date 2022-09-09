/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import AddGoal from './index';

// xit('re-enable tests', () => {
//   expect(1).toEqual(1);
// })

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

  xit('saves the goal when add actions button is clicked', () => {
    const onGoalAdded = jest.fn();
    const { getByLabelText, getByText, getByTestId } = render(
      <AddGoal initialUseAsPhp={false} onGoalAdded={onGoalAdded} />
    );

    fireEvent.change(getByTestId('add-goal-text-test'), {
      target: { value: 'this is my goal' }
    });
    fireEvent.change(getByLabelText('Day'), {
      target: { value: '12' }
    });
    fireEvent.change(getByLabelText('Month'), {
      target: { value: '10' }
    });
    fireEvent.change(getByLabelText('Year'), {
      target: { value: '2021' }
    });

    fireEvent(
      getByText('Add actions'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(onGoalAdded).toHaveBeenCalledWith({
      targetReviewDate: {
        day: 12,
        month: 10,
        year: 2021
      },
      text: 'this is my goal',
      useAsPhp: false,
      actions: []
    });
  });

  xit('does not save the goal if the form is not valid', () => {
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
