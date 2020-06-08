import ArgumentError from './argument-error';

export default class Token {
  constructor({ token, createdDate, shared }) {
    if (!token) throw new ArgumentError('no token');
    this.token = token;
    this.createdDate = createdDate || new Date(Date.now()).toISOString();
    this.shared = shared || false;
  }
}
