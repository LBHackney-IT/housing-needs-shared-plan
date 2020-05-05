export default class PlanGateway {
  constructor(options) {
    this.db = options.db;
  }

  async create(id) {
    if (!id) throw new Error('id cannot be null.');
    const params = { id };

    return await this.db.createPlan(params);
  }

  async get(id) {
    if (!id) throw new Error('id cannot be null.');
    const params = { id };

    return await this.db.getPlan(params);
  }
}
