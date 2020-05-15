class CheckAuth {
  constructor({ allowedGroups, jwt }) {
    this.allowedGroups = allowedGroups;
    this.jwt = jwt;
  }

  execute({ token }) {
    const payload = this.jwt.decode(token);
    return (
      Boolean(payload) &&
      Boolean(payload.groups) &&
      payload.groups.some(g => this.allowedGroups.includes(g))
    );
  }
}
module.exports = CheckAuth;
