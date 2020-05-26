import { addGoal } from '../../lib/dependencies';
import AddGoal from '../../components/Feature/AddGoal';
import SummaryList from '../../components/Form/SummaryList';

const PlanSummary = ({ editGoal, plan: { id, firstName, lastName, goal } }) => {
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
    <>
      <h1>{getPossessiveName(firstName, lastName)} shared plan</h1>
      {editGoal ? (
        <AddGoal addGoalUseCase={addGoal} planId={id} />
      ) : (
        <SummaryList
          name="goal-summary"
          listObject={{
            Goal: goal.text
          }}
        />
      )}
    </>
  );
};

PlanSummary.getInitialProps = async ({ query, res }) => {
  const response = await fetch(
    `${process.env.SHARED_PLAN_API_URL}/plans/${query.id}`
  );
  if (response.status === 404) {
    res.statusCode = 404;
    return res.end('Not found');
  }

  const plan = await response.json();

  return {
    editGoal: !plan.goal ? true : false,
    plan: {
      id: plan.id,
      firstName: plan.firstName,
      lastName: plan.lastName
    }
  };
};

export default PlanSummary;
