export default class Plan {
  constructor({ id, created, firstName, lastName, systemIds, goal }) {
    this.id = id;
    this.created = created ? created : new Date(Date.now()).toISOString();
    this.firstName = firstName;
    this.goal = goal ? goal : null;
    this.lastName = lastName;
    this.systemIds = systemIds || [];
  }
}
