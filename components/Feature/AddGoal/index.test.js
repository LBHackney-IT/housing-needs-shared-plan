import { fireEvent, render } from '@testing-library/react';
import { enableFetchMocks } from 'jest-fetch-mock';
import AddGoal from './index';

describe('AddGoal', () => {
  beforeEach(() => {
    enableFetchMocks();
    fetch.resetMocks();
  });

  it('renders the add goal form', () => {
    const { getByLabelText, getByText } = render(<AddGoal />);
    expect(getByLabelText('Goal')).toBeInTheDocument();
    expect(getByLabelText('Day')).toBeInTheDocument();
    expect(getByLabelText('Month')).toBeInTheDocument();
    expect(getByLabelText('Year')).toBeInTheDocument();
    expect(getByLabelText('Use as a PHP')).toBeInTheDocument();
    expect(getByText('Add actions')).toBeInTheDocument();
  });

  it('saves the goal when add actions button is clicked', () => {
    fetch.mockResponse(JSON.stringify({}));
    const updatePlan = jest.fn();
    const planId = 1;
    const { getByLabelText, getByText } = render(
      <AddGoal planId={planId} updatePlan={updatePlan} />
    );

    fireEvent.change(getByLabelText('Goal'), {
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

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/plans/1/goals'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          goal: {
            targetReviewDate: {
              day: 12,
              month: 10,
              year: 2021
            },
            text: 'this is my goal',
            useAsPhp: false
          }
        })
      }
    );
  });

  it('does not save the goal if the form is not valid', () => {
    const { getByText } = render(<AddGoal planId={1} />);

    fireEvent(
      getByText('Add actions'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(fetch).not.toHaveBeenCalled();
  });
});
