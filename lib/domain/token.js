import ArgumentError from './argument-error';

export default class Token {
  constructor({ token, sharedDate }) {
    if (!token) throw new ArgumentError('no token');
    this.token = token;
    this.sharedDate = sharedDate || null;
  }

  get shared() {
    return this.sharedDate !== null;
  }
}
