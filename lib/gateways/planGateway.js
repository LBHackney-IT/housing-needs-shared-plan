export default class PlanGateway {
  constructor() {}

  async create(id) {
    if (!id) throw new Error('id cannot be null.');
  }

  async get(id) {
    if (!id) throw new Error('id cannot be null.');
  }
}
