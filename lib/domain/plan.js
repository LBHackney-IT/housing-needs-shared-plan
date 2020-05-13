export default class Plan {
  constructor({ id, created, firstName, lastName, systemIds }) {
    this.id = id;
    this.created = created;
    this.firstName = firstName;
    this.lastName = lastName;
    this.systemIds = systemIds || [];
  }
}
