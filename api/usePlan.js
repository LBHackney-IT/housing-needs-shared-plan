import { useState } from 'react';
import useSWR, { mutate as globalMutate } from 'swr';
import {
  requestPlan,
  requestAddGoal,
  requestAddAction,
  requestSharePlan,
  requestUpdateAction
} from './api';

export function usePlan(planId, { initialPlan, token, ...options } = {}) {
  const [error, setError] = useState(null);
  const { data, mutate } = useSWR(planId, id => requestPlan(id, { token }), {
    initialData: initialPlan,
    ...options
  });

  function withErrorHandling(fn) {
    return async (...args) => {
      try {
        await fn(...args);
      } catch (err) {
        setError(err);
      }
    };
  }

  return {
    plan: data,
    error,
    loading: data === null,
    addGoal: withErrorHandling(async goal => {
      await requestAddGoal(planId, goal, { token });
      mutate({ ...data, goal });
    }),
    addAction: withErrorHandling(async action => {
      await requestAddAction(planId, action, { token });
      mutate({
        ...data,
        goal: {
          ...data.goal,
          actions: data.goal.actions.concat(action)
        }
      });
    }),
    updateAction: withErrorHandling(async updatedAction => {
      await requestUpdateAction(planId, updatedAction.id, updatedAction, { token });
      mutate();
    }),
    toggleAction: withErrorHandling(async ({ actionId, isCompleted }) => {
      await requestUpdateAction(planId, actionId, { isCompleted }, { token });
      mutate();
    }),
    sharePlan: withErrorHandling(async collaborator => {
      const newToken = await requestSharePlan(planId, collaborator, {
        token
      });
      mutate({
        ...data,
        customerTokens: data.customerTokens.concat([newToken])
      });
    })
  };
}
