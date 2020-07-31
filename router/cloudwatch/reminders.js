const { getReminderPlans, sendReminder } = require('../dependencies');

const createToken = () => {
  const token = jwt.sign(
    { groups: [process.env.ALLOWED_GROUPS] },
    process.env.JWT_SECRET
  );
  return token;
};

async function handler(event, context) {
  try {
    const { planIds } = await getReminderPlans.execute({});
    const authHeader = createToken();

    planIds.forEach(async element => {
      await sendReminder.execute({
        planId: element.id,
        authHeader
      });
    });
    console.log(event);
    console.log(context);
  } catch (err) {
    console.log(err);
  }
}
module.exports = { handler };
