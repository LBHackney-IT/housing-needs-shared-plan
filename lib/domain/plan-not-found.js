export default class PlanNotFoundError extends Error {
  constructor(planId) {
    super(`Plan "${planId}" not found`);
    this.name = 'PlanNotFoundError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PlanNotFoundError);
    }
  }
}
