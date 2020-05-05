import PlanGateway from '../../lib/gateways/planGateway';
import { JestEnvironment } from '@jest/environment/build/';

describe('PlanGateway', () => {
  const db = {
    getPlan: jest.fn(params => {
      return params;
    }),
    createPlan: jest.fn(params => {
      return params;
    })
  };

  describe('create', () => {
    it('throws an error if id is null', async () => {
      const planGateway = new PlanGateway({ db });

      await expect(async () => {
        await planGateway.create(null);
      }).rejects.toThrow();
      expect(db.getPlan).not.toHaveBeenCalled();
    });

    it('creates a plan', async () => {
      const planGateway = new PlanGateway({ db });
      const id = 2;

      const plan = await planGateway.create(id);
      expect(db.createPlan).toHaveBeenCalledWith({
        id
      });

      expect(plan).toEqual({ id });
    });
  });

  describe('get', () => {
    it('throws an error if id is null', async () => {
      const planGateway = new PlanGateway({ db });

      await expect(async () => {
        await planGateway.get(null);
      }).rejects.toThrow();
      expect(db.getPlan).not.toHaveBeenCalled();
    });
  });

  it('queries the database for a plan', async () => {
    const planGateway = new PlanGateway({ db });
    const id = 1;

    const result = await planGateway.get(id);
    expect(db.getPlan).toHaveBeenCalledWith({ id });

    expect(result).toEqual({ id });
  });
});
