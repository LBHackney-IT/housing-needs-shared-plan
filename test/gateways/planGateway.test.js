import PlanGateway from '../../lib/gateways/planGateway';

describe('PlanGateway', () => {
  const client = {
    put: jest.fn(() => ({ promise: jest.fn() }))
  };

  const TableName = 'plans';

  describe('create', () => {
    it('throws an error if id is null', async () => {
      const planGateway = new PlanGateway({ client });

      await expect(async () => {
        await planGateway.create(null);
      }).rejects.toThrow();
      expect(db.getPlan).not.toHaveBeenCalled();
    });

    it('can create a plan', async () => {
      const id = 2;
      const firstName = 'Trevor';
      const lastName = 'McLevor';
      const expectedRequest = {
        TableName,
        Item: {
          id,
          firstName,
          lastName
        }
      };
      const planGateway = new PlanGateway({ client });

      await planGateway.create({ id, firstName, lastName });

      expect(client.put).toHaveBeenCalledWith(expectedRequest);
    });
  });

  describe('get', () => {
    it('throws an error if id is null', async () => {
      const planGateway = new PlanGateway({ client });

      await expect(async () => {
        await planGateway.get(null);
      }).rejects.toThrow();
      expect(db.getPlan).not.toHaveBeenCalled();
    });
  });

  it('can get a plan', async () => {
    const planGateway = new PlanGateway({ db });
    const id = 1;

    const result = await planGateway.get(id);
    expect(db.getPlan).toHaveBeenCalledWith({ id });

    expect(result).toEqual({ id });
  });
});
