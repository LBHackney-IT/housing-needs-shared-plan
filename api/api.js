import logger from 'lib/infrastructure/logging/logger';
import { HttpStatusError } from './HttpStatusError';

async function request(path, { token, ...options }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  logger.info(`Fetching ${url}`, options?.body);
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
    logger.error(`Fetching ${url} failed`, response.status);
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

export function requestSharePlan(planId, collaborator, options) {
  return request(`/plans/${planId}/share`, {
    method: 'POST',
    body: collaborator,
    ...options
  });
}

export function requestUpdateAction(planId, actionId, updates, options) {
  return request(`/plans/${planId}/actions/${actionId}`, {
    method: 'PATCH',
    body: updates,
    ...options
  });
}
