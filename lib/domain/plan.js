const patchableKeys = ['numbers', 'emails'];

export default class Plan {
  constructor({
    id,
    created,
    goal,
    firstName,
    lastName,
    systemIds,
    numbers,
    emails,
    customerTokens,
    initialUseAsPhp
  }) {
    this.id = id;
    this.created = created ? created : new Date(Date.now()).toISOString();
    this.firstName = firstName;
    this.goal = goal || null;
    this.lastName = lastName;
    this.systemIds = systemIds || [];
    this.numbers = numbers || [];
    this.emails = emails || [];
    this.customerTokens = customerTokens || [];
    this.initialUseAsPhp = initialUseAsPhp;
  }
  update(updateFields) {
    Object.entries(updateFields)
      .filter(([key]) => patchableKeys.includes(key))
      .forEach(([key, value]) => {
        this[key] = value;
      });
  }
}
