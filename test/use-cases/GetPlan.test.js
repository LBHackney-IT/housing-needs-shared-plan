const GetPlan = require('../../lib/use-cases/GetPlan');

describe('GetPlan', () => {
  it('Creates a new plan if plan does not exist', async () => {
    const usecase = GetCase({ firstName, lastName });

    const result = await usecase();

    expect(result).toBe({
      id: 'x',
    });
  });
});
