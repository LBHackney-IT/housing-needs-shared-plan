import AddAction from 'components/AddAction';

const AddGoal = ({ plan: { firstName, lastName } }) => {
  const getPossessiveName = (firstName, lastName) => {
    let baseString = `${firstName} ${lastName}'`;
    if (lastName === '') {
      baseString = `${firstName}'`;
    }
    if (baseString[baseString.length - 2] !== 's') {
      baseString += 's';
    }
    return baseString;
  };

  return (
    <div>
      <h1>{getPossessiveName(firstName, lastName)} shared plan</h1>
      <AddAction />
    </div>
  );
};

AddGoal.getInitialProps = async ({ query, res }) => {
  const response = await fetch(
    `${process.env.SHARED_PLAN_API_URL}/plans/${query.id}`
  );
  if (response.status === 404) {
    res.statusCode = 404;
    return res.end('Not found');
  }

  const plan = await response.json();

  return {
    plan: {
      id: plan.id,
      firstName: plan.firstName,
      lastName: plan.lastName
    }
  };
};

export default AddGoal;
