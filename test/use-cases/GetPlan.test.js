const GetPlan = require('../../lib/use-cases/GetPlan');
import 'regenerator-runtime/runtime.js';
describe('GetPlan', () => {
  it('Creates a new plan if plan does not exist', async () => {
    const usecase = GetPlan({ firstName, lastName });

    const result = await usecase();

    expect(result).toBe({
      id: 'x'
    });
  });
});
