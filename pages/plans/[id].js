import { useState } from 'react';
import AddGoal from 'components/Feature/AddGoal';
import AddAction from 'components/Feature/AddAction';
import GoalSummary from 'components/Feature/GoalSummary';
import LegalText from 'components/Feature/LegalText';
import ActionsList from 'components/ActionsList';
import { Button } from 'components/Form';
import { getToken } from 'lib/utils/token';

const PlanSummary = ({ hackneyToken, plan }) => {
  const [_plan, setPlan] = useState(plan);
  const [editGoal, setEditGoal] = useState(!_plan.goal ? true : false);
  const { id, firstName, lastName, goal } = _plan;

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

  const updatePlan = async newPlan => {
    setPlan(newPlan);
    setEditGoal(false);
  };

  const actions = _plan.goal ? _plan.goal.actions : null;

  return (
    <>
      <h1>{getPossessiveName(firstName, lastName)} shared plan</h1>
      {editGoal && (
        <AddGoal
          hackneyToken={hackneyToken}
          plan={_plan}
          updatePlan={updatePlan}
        />
      )}
      {!editGoal && <GoalSummary hackneyToken={hackneyToken} plan={_plan} />}
      {!editGoal && (
        <Button text="Edit goal" onClick={() => setEditGoal(true)} />
      )}
      {<ActionsList actions={actions} />}
      {!editGoal && (
        <AddAction
          hackneyToken={hackneyToken}
          id={id}
          updatePlan={updatePlan}
        />
      )}
      {!editGoal && goal && goal.useAsPhp && <LegalText />}
    </>
  );
};

PlanSummary.getInitialProps = async ({ query, req, res }) => {
  const hackneyToken = getToken(req);

  const response = await fetch(
    `${process.env.SHARED_PLAN_API_URL}/plans/${query.id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${hackneyToken}`
      }
    }
  );
  if (response.status === 404) {
    res.statusCode = 404;
    return res.end('Not found');
  }

  const plan = await response.json();

  return {
    hackneyToken,
    plan
  };
};

export default PlanSummary;
