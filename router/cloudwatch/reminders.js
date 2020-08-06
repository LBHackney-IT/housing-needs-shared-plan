const { getReminderPlans, sendReminder } = require('../dependencies');
const jwt = require('jsonwebtoken');

const createToken = () => {
  const token = jwt.sign(
    { groups: [process.env.ALLOWED_GROUPS], name: 'Housing Needs' },
    process.env.JWT_SECRET
  );
  return token;
};

async function handler(event, context, callback) {
  try {
    const { planIds } = await getReminderPlans.execute({});

    const authHeader = createToken();

    for (const id of planIds) {
      await sendReminder.execute({
        planId: id,
        authHeader
      });
    }
    return true;
  } catch (err) {
    console.log(err);
  }
}
module.exports = { handler };
