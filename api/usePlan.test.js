import { useEffect } from 'react';
import { usePlan } from './usePlan';
import { enableFetchMocks } from 'jest-fetch-mock';
import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('usePlan', () => {
  const expectedPlan = {
    id: 'IRFaVaY2b',
    firstName: 'Expected',
    lastName: 'Plan',
    goal: {
      title: 'Have a goal',
      actions: [
        {
          title: 'Have an action',
          description: 'Once you believe, anything is possible.'
        }
      ]
    }
  };

  beforeAll(() => {
    enableFetchMocks();
  });

  beforeEach(() => {
    fetch.mockReset();
    fetch.mockResponse(JSON.stringify(expectedPlan));
  });

  it('fetches a plan from the API', async () => {
    const Component = () => {
      const { plan } = usePlan(expectedPlan.id);
      return <p>{plan?.id}</p>;
    };

    const { getByText } = render(<Component />);
    await waitFor(() => expect(getByText(expectedPlan.id)).toBeInTheDocument());
  });

  it('adds a goal via the API', () => {
    const expectedGoal = {
      text: 'Achieve a goal',
      targetReviewDate: { day: 1, month: 2, year: 2003 },
      useAsPhp: false
    };

    const Component = () => {
      const { addGoal } = usePlan(expectedPlan.id);

      useEffect(() => {
        const add = async () => addGoal(expectedGoal);
        add();
      }, []);

      return null;
    };

    act(() => render(<Component />));

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/plans/${expectedPlan.id}/goal`),
      expect.objectContaining({
        body: JSON.stringify(expectedGoal)
      })
    );
  });

  it('adds an action via the API', () => {
    const expectedAction = {
      summary: 'Do the action',
      description: 'It will be super exciting',
      dueDate: { day: 1, month: 2, year: 2003 }
    };

    const Component = () => {
      const { addAction } = usePlan(expectedPlan.id);

      useEffect(() => {
        const add = async () => addAction(expectedAction);
        add();
      }, []);

      return null;
    };

    act(() => render(<Component />));

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/plans/${expectedPlan.id}/actions`),
      expect.objectContaining({
        body: JSON.stringify(expectedAction)
      })
    );
  });
});
