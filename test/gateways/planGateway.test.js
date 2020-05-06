import PlanGateway from '../../lib/gateways/planGateway';

describe('PlanGateway', () => {
  let client;

  beforeEach(() => {
    client = {
      put: jest.fn(request => ({
        promise: jest.fn(() => ({ Items: [request.Item] }))
      })),
      query: jest.fn(() => ({ promise: jest.fn() }))
    };
  });

  const TableName = 'plans';

  describe('create', () => {
    it('throws an error if id is null', async () => {
      const planGateway = new PlanGateway({ client });

      await expect(async () => {
        await planGateway.create(null);
      }).rejects.toThrow();
      expect(client.put).not.toHaveBeenCalled();
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

      const result = await planGateway.create({ id, firstName, lastName });

      expect(client.put).toHaveBeenCalledWith(expectedRequest);
      expect(result).toEqual({ id, firstName, lastName });
    });
  });

  describe('get', () => {
    it('throws an error if id is null', async () => {
      const planGateway = new PlanGateway({ client });

      await expect(async () => {
        await planGateway.get(null);
      }).rejects.toThrow();
      expect(client.query).not.toHaveBeenCalled();
    });
  });

  it('can get a plan', async () => {
    const id = 1;
    const firstName = 'Trevor';
    const lastName = 'McLevor';
    const expectedRequest = {
      TableName,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id
      }
    };
    client.query = jest.fn(() => ({
      promise: jest.fn(() => ({ Items: [{ id, firstName, lastName }] }))
    }));

    const planGateway = new PlanGateway({ client });

    const result = await planGateway.get({ id });

    expect(client.query).toHaveBeenCalledWith(expectedRequest);
    expect(result).toEqual({ id, firstName, lastName });
  });

  it('can return null if plan does not exist', async () => {
    client.query = jest.fn(() => ({
      promise: jest.fn(() => ({ Items: [] }))
    }));

    const planGateway = new PlanGateway({ client });

    const result = await planGateway.get({ id: 1 });

    expect(result).toBeNull();
  });
});
