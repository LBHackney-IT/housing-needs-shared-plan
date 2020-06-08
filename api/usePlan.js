import { useState } from 'react';
import useSWR from 'swr';
import {
  requestPlan,
  requestAddGoal,
  requestAddAction,
  requestSharePlan
} from './api';

export function usePlan(planId, { initialPlan, token, ...options } = {}) {
  const [error, setError] = useState(null);
  const { data, mutate } = useSWR(planId, id => requestPlan(id, { token }), {
    initialData: initialPlan,
    ...options
  });

  return {
    plan: data,
    error,
    loading: data === null,
    addGoal: async goal => {
      try {
        await requestAddGoal(planId, goal, { token });
        mutate({ ...data, goal });
      } catch (err) {
        setError(err);
      }
    },
    addAction: async action => {
      try {
        await requestAddAction(planId, action, { token });
        mutate({
          ...data,
          goal: {
            ...data.goal,
            actions: data.goal.actions.concat(action)
          }
        });
      } catch (err) {
        setError(err);
      }
    },
    sharePlan: async collaborator => {
      try {
        const newToken = await requestSharePlan(planId, collaborator, {
          token
        });
        mutate({
          ...data,
          customerTokens: data.customerTokens.concat([newToken])
        });
      } catch (err) {
        setError(err);
      }
    }
  };
}
