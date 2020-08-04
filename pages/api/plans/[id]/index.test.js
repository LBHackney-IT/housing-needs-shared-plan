jest.mock('lib/api/models');

import { endpoint } from './index';
import { createMockResponse } from 'lib/api/utils/createMockResponse';
import { createPlanModel } from 'lib/api/models';

describe('Get and Update Plan APIs', () => {
  const id = '1';
  let getPlan;
  let updatePlan;

  beforeEach(() => {
    createPlanModel.mockReturnValue({ id });
    getPlan = {
      execute: jest.fn(() => {
        return Promise.resolve({ id });
      })
    };
    updatePlan = {
      execute: jest.fn()
    };
  });

  const call = async ({ body, method, params }) => {
    const response = createMockResponse();
    await endpoint({ getPlan, updatePlan })(
      {
        body,
        method,
        query: params
      },
      response
    );
    return response;
  };

  it('only accepts GET and PATCH requests', async () => {
    for (const method of ['PUT', 'DELETE', 'POST', 'OPTIONS', 'HEAD']) {
      const response = await call({ method, params: { id } });
      expect(response.statusCode).toBe(405);
    }
  });

  it('returns 400 when planId is missing', async () => {
    const response = await call({ method: 'GET', params: {} });
    expect(response.statusCode).toBe(400);
  });

  describe('Get Plan API', () => {
    it('returns a 200 with a plan', async () => {
      const response = await call({ method: 'GET', params: { id } });
      expect(getPlan.execute).toHaveBeenCalledWith({ id });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(JSON.stringify(createPlanModel({ id })));
    });

    it('returns a 500 for other errors', async () => {
      getPlan.execute = jest.fn(() => {
        throw new Error();
      });

      const response = await call({ method: 'GET', params: { id } });
      expect(response.statusCode).toBe(500);
    });
  });

  describe('Update Plan Api', () => {
    it('returns a 204 when update successful', async () => {
      const updateFields = {
        numbers: ['new number']
      };
      const response = await call({
        method: 'PATCH',
        params: { id },
        body: updateFields
      });
      expect(updatePlan.execute).toHaveBeenCalledWith({
        planId: id,
        updateFields
      });
      expect(response.statusCode).toBe(204);
    });

    it('return a 400 when the body is missing', async () => {
      const response = await call({
        method: 'PATCH',
        params: { id }
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
