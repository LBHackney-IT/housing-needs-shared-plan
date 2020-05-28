import { useState } from 'react';
import AddGoal from 'components/Feature/AddGoal';
import AddAction from 'components/Feature/AddAction';
import GoalSummary from 'components/Feature/GoalSummary';
import LegalText from 'components/Feature/LegalText';

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

  return (
    <>
      <h1>{getPossessiveName(firstName, lastName)} shared plan</h1>
      {editGoal && <AddGoal planId={id} updatePlan={updatePlan} />}
      {!editGoal && <GoalSummary goal={goal} />}
      {!editGoal && <AddAction id={id} updatePlan={updatePlan} />}
      {goal && goal.useAsPhp && <LegalText />}
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
