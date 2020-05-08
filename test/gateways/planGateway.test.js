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
    it('throws an error if firstName is not provided', async () => {
      const planGateway = new PlanGateway({ client });

      await expect(async () => {
        await planGateway.create({ lastName: 'name' });
      }).rejects.toThrow();

      expect(client.put).not.toHaveBeenCalled();
    });

    it('throws an error if lastName is not provided', async () => {
      const planGateway = new PlanGateway({ client });

      await expect(async () => {
        await planGateway.create({ firstName: 'name' });
      }).rejects.toThrow();

      expect(client.put).not.toHaveBeenCalled();
    });

    it('can create a plan', async () => {
      const firstName = 'Trevor';
      const lastName = 'McLevor';
      const expectedRequest = {
        TableName,
        Item: expect.objectContaining({
          id: expect.any(String),
          firstName,
          lastName
        })
      };
      const planGateway = new PlanGateway({ client });

      const result = await planGateway.create({ firstName, lastName });

      expect(client.put).toHaveBeenCalledWith(expectedRequest);
      expect(result.id).toStrictEqual(expect.any(String));
      expect(result.id.length).toBe(20);
      expect(result.firstName).toEqual(firstName);
      expect(result.lastName).toEqual(lastName);
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

    it('can get a plan', async () => {
      const customerData = {
        id: 1,
        firstName: 'Trevor',
        lastName: 'McLevor'
      };
      client.query = jest.fn(() => ({
        promise: jest.fn(() => ({ Items: [customerData] }))
      }));
      const expectedRequest = {
        TableName,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
          ':id': customerData.id
        }
      };
      const planGateway = new PlanGateway({ client });

      const result = await planGateway.get({ id: customerData.id });

      expect(client.query).toHaveBeenCalledWith(expectedRequest);
      expect(result).toEqual(customerData);
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
});
