import GetReminderPlans from 'lib/use-cases/get-reminder-plans';

describe('Get Reminder Plans Use Case', () => {
  const logger = { info: jest.fn(), error: jest.fn() };

  it('gets plan ids', async () => {
    const id = 1;
    const planGateway = {
      getReminderPlans: jest.fn(() => {
        return { planIds: ['1', '2'] };
      })
    };

    const getReminderPlans = new GetReminderPlans({ planGateway, logger });
    const result = await getReminderPlans.execute({ id });

    expect(planGateway.getReminderPlans).toHaveBeenCalled();
    expect(result).toEqual(expect.objectContaining({ planIds: ['1', '2'] }));
  });
});
