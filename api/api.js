import { HttpStatusError } from './HttpStatusError';

async function request(path, { token, ...options }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    credentials: 'same-origin',
    headers: {
      accept: 'application/json',
      authorization: token ? `Bearer ${token}` : undefined,
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

export function requestPlan(planId, options) {
  return request(`/plans/${planId}`, options);
}

export function requestAddGoal(planId, goal, options) {
  return request(`/plans/${planId}/goals`, {
    method: 'POST',
    body: goal,
    ...options
  });
}

export function requestAddAction(planId, action, options) {
  return request(`/plans/${planId}/actions`, {
    method: 'POST',
    body: action,
    ...options
  });
}
