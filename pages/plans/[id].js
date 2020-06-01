import { useState } from 'react';
import AddGoal from 'components/Feature/AddGoal';
import AddAction from 'components/Feature/AddAction';
import GoalSummary from 'components/Feature/GoalSummary';
import LegalText from 'components/Feature/LegalText';
import ActionsList from 'components/ActionsList';
import { Button } from 'components/Form';

const PlanSummary = ({ plan }) => {
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
      {editGoal && <AddGoal plan={_plan} updatePlan={updatePlan} />}
      {!editGoal && <GoalSummary plan={_plan} />}
      {!editGoal && (
        <Button text="Edit goal" onClick={() => setEditGoal(true)} />
      )}
      {<ActionsList actions={actions} />}
      {!editGoal && <AddAction id={id} updatePlan={updatePlan} />}
      {!editGoal && goal && goal.useAsPhp && <LegalText />}
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
  return { plan: await response.json() };
};

export default PlanSummary;
