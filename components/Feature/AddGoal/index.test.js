import { fireEvent, render } from '@testing-library/react';
import { enableFetchMocks } from 'jest-fetch-mock';
import AddGoal from './index';

describe('AddGoal', () => {
  beforeEach(() => {
    enableFetchMocks();
    fetch.resetMocks();
  });

  it('renders the add goal form', () => {
    const { getByLabelText, getByText } = render(<AddGoal plan={{ id: 1 }} />);
    expect(getByLabelText('Goal')).toBeInTheDocument();
    expect(getByLabelText('Day')).toBeInTheDocument();
    expect(getByLabelText('Month')).toBeInTheDocument();
    expect(getByLabelText('Year')).toBeInTheDocument();
    expect(getByLabelText('Use as a PHP')).toBeInTheDocument();
    expect(getByText('Add actions')).toBeInTheDocument();
  });

  it('saves the goal when add actions button is clicked', () => {
    fetch.mockResponse(JSON.stringify({}));
    const token = 'blah';
    const updatePlan = jest.fn();
    const plan = { id: 1 };
    const { getByLabelText, getByText } = render(
      <AddGoal hackneyToken={token} plan={plan} updatePlan={updatePlan} />
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
      expect.stringContaining(`/api/plans/${plan.id}/goals`),
      expect.objectContaining({
        headers: {
          Authorization: `Bearer ${token}`,
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
      })
    );
  });

  it('does not save the goal if the form is not valid', () => {
    const { getByText } = render(<AddGoal plan={{ id: 1 }} />);
    fireEvent(
      getByText('Add actions'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it('sets the goal input value if goal already exists', () => {
    const { getByLabelText } = render(
      <AddGoal plan={{ id: 1, goal: { text: 'hello' } }} />
    );
    expect(getByLabelText('Goal').value).toEqual('hello');
  });

  it('sets the target review date input value if goal already exists', () => {
    const { getByLabelText } = render(
      <AddGoal
        plan={{ id: 1, goal: { targetReviewDate: '2022-10-20T00:00:00.000Z' } }}
      />
    );
    expect(getByLabelText('Day').value).toEqual('20');
    expect(getByLabelText('Month').value).toEqual('10');
    expect(getByLabelText('Year').value).toEqual('2022');
  });

  it('sets the use as php input value if goal already exists', () => {
    const { getByLabelText } = render(
      <AddGoal plan={{ id: 1, goal: { useAsPhp: true } }} />
    );
    expect(getByLabelText('Use as a PHP').checked).toEqual(true);
  });
});
