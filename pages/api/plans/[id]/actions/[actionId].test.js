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

  it('returns 400 when parameters are missing', async () => {
    const response = createMockResponse();
    await call(
      {
        method: 'PATCH',
        query: { id: '', actionId: '' }
      },
      response
    );

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).errors.length).toBe(2);
  });

  it('returns 204 when action updated successfully', async () => {
    const response = createMockResponse();
    updateAction.execute.mockImplementation(() => Promise.resolve());

    await call(
      {
        method: 'PATCH',
        query: { id: 'd6BQiWGGhOrF8mFdPp4T', actionId: 'PPBqWA9' }
      },
      response
    );

    expect(response.statusCode).toBe(204);
    expect(response.body).toBeUndefined();
  });
});
