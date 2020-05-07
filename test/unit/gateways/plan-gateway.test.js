import PlanGateway from '../../../lib/gateways/plan-gateway';
import { ArgumentError, Plan } from '../../../lib/domain';

describe('Plan Gateway', () => {
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
      }).rejects.toThrow(ArgumentError);

      expect(client.put).not.toHaveBeenCalled();
    });

    it('throws an error if lastName is not provided', async () => {
      const planGateway = new PlanGateway({ client });

      await expect(async () => {
        await planGateway.create({ firstName: 'name' });
      }).rejects.toThrow(ArgumentError);

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
      expect(result).toBeInstanceOf(Plan);
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
        await planGateway.get({ id: null });
      }).rejects.toThrow(ArgumentError);
      expect(client.query).not.toHaveBeenCalled();
    });

    it('can get a plan', async () => {
      const id = 1;
      const firstName = 'Trevor';
      const lastName = 'McLevor';

      client.query = jest.fn(() => ({
        promise: jest.fn(() => ({ Items: [{ id, firstName, lastName }] }))
      }));
      const expectedRequest = {
        TableName,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
          ':id': id
        }
      };
      const planGateway = new PlanGateway({ client });

      const result = await planGateway.get({ id });

      expect(client.query).toHaveBeenCalledWith(expectedRequest);
      expect(result).toBeInstanceOf(Plan);
      expect(result.id).toEqual(id);
      expect(result.firstName).toEqual(firstName);
      expect(result.lastName).toEqual(lastName);
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

    it('can find matching plans', async () => {
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
        FilterExpression: 'firstName = :f',
        ExpressionAttributeValues: {
          ':f': customerData.firstName,
          ':l': customerData.lastName
        }
      };
      const planGateway = new PlanGateway({ client });

      const result = await planGateway.find(customerData);

      expect(client.query).toHaveBeenCalledWith(expectedRequest);
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
