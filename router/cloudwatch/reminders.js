const { getReminderPlans, sendReminder } = require('../dependencies');
const jwt = require('jsonwebtoken');

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

    planIds.forEach(async id => {
      await sendReminder.execute({
        planId: id,
        authHeader
      });
    });
  } catch (err) {
    console.log(err);
  }
}
module.exports = { handler };
