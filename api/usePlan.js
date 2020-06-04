import useSWR from 'swr';
import {
  requestPlan,
  requestAddGoal,
  requestAddAction,
  requestSharePlan
} from './api';

export function usePlan(planId, { initialPlan, token, ...options } = {}) {
  const { data, error, mutate } = useSWR(
    planId,
    id => requestPlan(id, { token }),
    {
      initialData: initialPlan,
      ...options
    }
  );

  return {
    plan: data,
    error,
    loading: data === null,
    addGoal: async goal => {
      await requestAddGoal(planId, goal, { token });
      mutate({ ...data, goal });
    },
    addAction: async action => {
      await requestAddAction(planId, action, { token });
      mutate({
        ...data,
        goal: {
          ...data.goal,
          actions: data.goal.actions.concat({
            ...action,
            dueDate: new Date(
              action.dueDate.year,
              action.dueDate.month - 1,
              action.dueDate.day
            ).toISOString()
          })
        }
      });
    },
    sharePlan: async collaborator => {
      const newToken = await requestSharePlan(planId, collaborator, {
        token
      });
      mutate({
        ...data,
        customerTokens: data.customerTokens.concat([newToken])
      });
    }
  };
}
