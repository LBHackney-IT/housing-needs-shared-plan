export default class ActionNotFoundError extends Error {
  constructor(actionId) {
    super(`Action "${actionId}" not found`);
    this.name = 'ActionNotFoundError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ActionNotFoundError);
    }
  }
}
