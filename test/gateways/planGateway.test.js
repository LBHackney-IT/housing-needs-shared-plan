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

  describe('find', () => {
    it('throws an error if first name is missing', async () => {
      const planGateway = new PlanGateway({ client });

      await expect(async () => {
        await planGateway.find({});
      }).rejects.toThrow('first name cannot be null.');
      expect(client.query).not.toHaveBeenCalled();
    });

    it('throws an error if last name is missing', async () => {
      const planGateway = new PlanGateway({ client });

      await expect(async () => {
        await planGateway.find({ firstName: 'Linda' });
      }).rejects.toThrow('last name cannot be null.');
      expect(client.query).not.toHaveBeenCalled();
    });

    it('can find matching plans by name', async () => {
      const customerData = {
        id: '123',
        firstName: 'Barry',
        lastName: 'Jones'
      };

      client.query = jest.fn(() => ({
        promise: jest.fn(() => ({ Items: [customerData] }))
      }));

      const expectedRequest = {
        TableName,
        IndexName: 'name_idx',
        KeyConditionExpression: 'lastName = :l and firstName = :f',
        ExpressionAttributeValues: {
          ':f': customerData.firstName,
          ':l': customerData.lastName
        }
      };

      const planGateway = new PlanGateway({ client });

      const result = await planGateway.find({
        firstName: customerData.firstName,
        lastName: customerData.lastName
      });

      expect(client.query).toHaveBeenCalledWith(expectedRequest);
      expect(result).toEqual([customerData]);
    });

    it('filters plans using system ids', async () => {
      const customerData = {
        firstName: 'Tom',
        lastName: 'Jones',
        systemIds: ['HH123456']
      };

      client.query.mockImplementation(request => {
        if (request.KeyConditionExpression === 'id = :id') {
          return {
            promise: () =>
              Promise.resolve({
                Items: [customerData]
              })
          };
        }

        return {
          promise: () =>
            Promise.resolve({
              Items: [
                {
                  id: '123',
                  firstName: customerData.firstName,
                  lastName: customerData.lastName,
                  systemIds: ['ABC123456']
                },
                {
                  id: '456',
                  firstName: customerData.firstName,
                  lastName: customerData.lastName,
                  systemIds: ['HH123456']
                }
              ]
            })
        };
      });

      const planGateway = new PlanGateway({ client });
      const result = await planGateway.find(customerData);
      expect(result).toEqual([customerData]);
    });

    it('returns empty array when no matching plans', async () => {
      client.query = jest.fn(() => ({
        promise: jest.fn(() => ({ Items: [] }))
      }));
      const planGateway = new PlanGateway({ client });

      const result = await planGateway.find({
        firstName: 'Janos',
        lastName: 'Manos'
      });

      expect(result).toEqual([]);
    });
  });
});
