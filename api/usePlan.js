import useSWR from 'swr';
import { requestPlan, requestAddGoal, requestAddAction } from './api';

export function usePlan(planId, { initialPlan, ...options } = {}) {
  const { data, error, mutate } = useSWR(planId, requestPlan, {
    initialData: initialPlan,
    ...options
  });

  return {
    plan: data,
    error,
    loading: data === null,
    addGoal: async goal => {
      await requestAddGoal(planId, goal);
      mutate({ ...data, goal });
    },
    addAction: async action => {
      await requestAddAction(planId, action);
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
    }
  };
}
