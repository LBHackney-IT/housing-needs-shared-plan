import { useState } from 'react';
import AddGoal from '../../components/Feature/AddGoal';
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

  const goalComponent = () => {
    if (editGoal) {
      return <AddGoal planId={id} updatePlan={updatePlan} />;
    } else {
      return <GoalSummary goal={_plan.goal} />;
    }
  };

  const legalComponent = () => {
    if (_plan.goal && _plan.goal.useAsPhp) {
      return <LegalText />;
    }
  };

  return (
    <>
      <h1>{getPossessiveName(firstName, lastName)} shared plan</h1>
      {goalComponent()}
      {legalComponent()}
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
    plan: {
      id: plan.id,
      firstName: plan.firstName,
      lastName: plan.lastName,
      goal: plan.goal
    }
  };
};

export default PlanSummary;
