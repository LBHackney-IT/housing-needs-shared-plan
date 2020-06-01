import { HttpStatusError } from './HttpStatusError';

async function request(path, options) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    credentials: 'same-origin',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json'
    },
    body: options?.body ? JSON.stringify(options.body) : null
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new HttpStatusError(response.status);
  }
}

export function requestPlan(planId) {
  return request(`/plans/${planId}`);
}

export function requestAddGoal(planId, goal) {
  return request(`/plans/${planId}/goals`, {
    method: 'POST',
    body: goal
  });
}

export function requestAddAction(planId, action) {
  return request(`/plans/${planId}/actions`, {
    method: 'POST',
    body: action
  });
}
