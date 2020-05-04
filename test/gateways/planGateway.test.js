import PlanGateway from '../../lib/gateways/planGateway';

describe('PlanGateway', () => {
  describe('create', () => {
    it('throws an error if id is null', async () => {
      const planGateway = new PlanGateway();

      await expect(async () => {
        await planGateway.create(null);
      }).rejects.toThrow();
    });
  });

  describe('get', () => {
    it('throws an error if id is null', async () => {
      const planGateway = new PlanGateway();

      await expect(async () => {
        await planGateway.get(null);
      }).rejects.toThrow();
    });
  });
});
