export default class Token {
  constructor({ token, createdDate }) {
    this.token = token;
    this.createdDate = createdDate || new Date().toISOString();
  }
}
