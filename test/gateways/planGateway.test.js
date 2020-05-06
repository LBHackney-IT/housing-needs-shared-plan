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

    it('can find matching plans when first name and last name match', async () => {
      const customerData = {
        firstName: 'Barry',
        lastName: 'Jones'
      };
      client.query = jest.fn(() => ({
        promise: jest.fn(() => ({ Items: [customerData] }))
      }));
      const expectedRequest = {
        TableName,
        IndexName: 'name_idx',
        KeyConditionExpression: 'lastName = :l',
        ExpressionAttributeValues: { ':l': customerData.lastName }
      };
      const planGateway = new PlanGateway({ client });

      const result = await planGateway.find(customerData);

      expect(client.query).toHaveBeenCalledWith(expectedRequest);
      expect(result).toEqual([customerData]);
    });

    it('cant find matching plans when only the last name matches', async () => {
      client.query = jest.fn(() => ({
        promise: jest.fn(() => ({
          Items: [
            {
              firstName: 'Jane',
              lastName: 'Brown'
            }
          ]
        }))
      }));
      const planGateway = new PlanGateway({ client });

      const result = await planGateway.find({
        firstName: 'Sarah',
        lastName: 'Brown'
      });

      expect(result).toEqual([]);
    });
  });
});
