import CreatePlan from '../../../lib/use-cases/create-plan';
import Plan from '../../../lib/domain/plan';

describe('Create Plan Use Case', () => {
  it('creates a new plan', async () => {
    const id = 1;
    const firstName = 'Bart';
    const lastName = 'Simpson';

    const planGateway = {
      create: jest.fn(() => new Plan({ id, firstName, lastName }))
    };
    const createPlan = new CreatePlan({ planGateway });

    const result = await createPlan.execute({ firstName, lastName });

    expect(planGateway.create).toHaveBeenCalledWith({ firstName, lastName });
    expect(result).toEqual({ id, firstName, lastName });
  });
});
