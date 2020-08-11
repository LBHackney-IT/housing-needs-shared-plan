import { usePlan } from './usePlan';
import { enableFetchMocks } from 'jest-fetch-mock';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import jwt from 'jsonwebtoken';

describe('usePlan', () => {
  const expectedPlan = {
    id: 'IRFaVaY2b',
    firstName: 'Expected',
    lastName: 'Plan',
    goal: {
      title: 'Have a goal',
      actions: [
        {
          id: 'PPBqWA9',
          title: 'Have an action',
          description: 'Once you believe, anything is possible.'
        }
      ]
    },
    customerTokens: []
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

  it('shares the plan by sms with a collaborator via the API', async () => {
    const expectedCollaborator = { number: '123' };
    const customerPlanUrl = 'url';
    const body = JSON.stringify({
      collaborator: expectedCollaborator,
      customerPlanUrl
    });

    const { result } = renderHook(() => usePlan(expectedPlan.id));
    await act(() =>
      result.current.sharePlan(expectedCollaborator, customerPlanUrl)
    );

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/plans/${expectedPlan.id}/share`),
      expect.objectContaining({
        body
      })
    );
  });

  it('shares the plan by email with a collaborator via the API', async () => {
    const expectedCollaborator = { email: '123' };
    const customerPlanUrl = 'url';
    const body = JSON.stringify({
      collaborator: expectedCollaborator,
      customerPlanUrl
    });
    const { result } = renderHook(() => usePlan(expectedPlan.id));
    await act(() =>
      result.current.sharePlan(expectedCollaborator, customerPlanUrl)
    );

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/plans/${expectedPlan.id}/share`),
      expect.objectContaining({
        body
      })
    );
  });

  it('updates the completed state of an action', async () => {
    const actionId = 'PPBqWA9';
    const token = jwt.sign({ name: 'Person' }, 'secret');
    const { result } = renderHook(() => usePlan(expectedPlan.id, { token }));

    await act(() =>
      result.current.toggleAction({
        actionId,
        isCompleted: true
      })
    );

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/plans/${expectedPlan.id}/actions/${actionId}`),
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ isCompleted: true, completedBy: 'Person' }),
        headers: expect.objectContaining({
          authorization: `Bearer ${token}`
        })
      })
    );
  });

  it('deletes an action', async () => {
    const actionId = 'PPBqWA9';
    const token = 'a.very.secure.jwt';
    const { result } = renderHook(() => usePlan(expectedPlan.id, { token }));

    await act(() => result.current.deleteAction({ actionId }));

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/plans/${expectedPlan.id}/actions/${actionId}`),
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.objectContaining({
          authorization: `Bearer ${token}`
        })
      })
    );
  });
});
