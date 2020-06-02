import { usePlan } from './usePlan';
import { enableFetchMocks } from 'jest-fetch-mock';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

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
    const { result, waitForNextUpdate } = renderHook(() =>
      usePlan(expectedPlan.id)
    );

    await waitForNextUpdate();
    expect(result.current.plan).toStrictEqual(expectedPlan);
  });

  it('adds a goal via the API', async () => {
    const expectedGoal = {
      text: 'Achieve a goal',
      targetReviewDate: { day: 1, month: 2, year: 2003 },
      useAsPhp: false
    };

    const { result } = renderHook(() => usePlan(expectedPlan.id));
    await act(() => result.current.addGoal(expectedGoal));

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/plans/${expectedPlan.id}/goal`),
      expect.objectContaining({
        body: JSON.stringify(expectedGoal)
      })
    );
  });

  it('adds an action via the API', async () => {
    const expectedAction = {
      summary: 'Do the action',
      description: 'It will be super exciting',
      dueDate: { day: 1, month: 2, year: 2003 }
    };

    const { result } = renderHook(() => usePlan(expectedPlan.id));
    await act(() => result.current.addAction(expectedAction));

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/plans/${expectedPlan.id}/actions`),
      expect.objectContaining({
        body: JSON.stringify(expectedAction)
      })
    );
  });
});
