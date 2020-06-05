import { endpoint } from './[actionId]';
import { createMockResponse } from 'lib/api/utils/createMockResponse';

describe('PATCH /api/plans/[id]/actions/[actionid]', () => {
  const updateAction = { execute: jest.fn() };
  const call = endpoint({ updateAction });

  it('only accepts PATCH requests', async () => {
    const response = createMockResponse();
    await call({ method: 'POST' }, response);

    expect(response.statusCode).toBe(405);
  });

  describe('validation', () => {
    it('returns 400 when parameters are missing', async () => {
      const response = createMockResponse();
      await call(
        {
          method: 'PATCH',
          query: { id: '', actionId: '' },
          body: { isCompleted: true }
        },
        response
      );

      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).errors.length).toBe(2);
    });

    it('returns 400 when the body is missing', async () => {
      const response = createMockResponse();
      await call(
        {
          method: 'PATCH',
          query: { id: 'd6BQiWGGhOrF8mFdPp4T', actionId: 'PPBqWA9' },
          body: ''
        },
        response
      );

      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).errors.length).toBe(1);
    });
  });

  it('returns 204 when action updated successfully', async () => {
    const response = createMockResponse();
    updateAction.execute.mockImplementation(() => Promise.resolve());

    await call(
      {
        method: 'PATCH',
        query: { id: 'd6BQiWGGhOrF8mFdPp4T', actionId: 'PPBqWA9' },
        body: { isCompleted: true }
      },
      response
    );

    expect(updateAction.execute).toHaveBeenCalledWith({
      planId: 'd6BQiWGGhOrF8mFdPp4T',
      actionId: 'PPBqWA9',
      updateFields: { isCompleted: true }
    });

    expect(response.statusCode).toBe(204);
    expect(response.body).toBeUndefined();
  });
});
