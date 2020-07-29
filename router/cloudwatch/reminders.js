import { getReminderPlans } from 'lib/dependencies';
import { createToken } from 'lib/utils/token';

export async function handler(event, context) {
  try {
    const { planIds } = await getReminderPlans.execute({});
    const authHeader = createToken();

    planIds.forEach(async element => {
      await sendReminder.execute({
        planId: element.id,
        authHeader
      });
    });
    event.response.send('wub');
    return 'wub';
    //res.status(201).json({ success: 'whoop!' });
  } catch (err) {
    logger.error(err.message, { err });
    if (err instanceof ArgumentError) {
      return res.status(400).json({ error: `could not send reminders` });
    }
    // res.status(500).json({
    //   error: `could not send reminders`
    // });
  }
}
