import ArgumentError from './argument-error';

export default class Token {
  constructor({ token, sharedDate, previouslySharedOn }) {
    if (!token) throw new ArgumentError('no token');
    this.token = token;
    this.sharedDate = sharedDate || null;
    this.previouslySharedOn = previouslySharedOn || [];
  }

  get shared() {
    return this.sharedDate !== null;
  }
}
