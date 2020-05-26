import { useState } from 'react';
import AddGoal from '../../components/Feature/AddGoal';
import SummaryList from '../../components/Form/SummaryList';

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
      let listObject = {
        Goal: goal.text,
        'Target review date': goal.targetReviewDate
      };
      if (goal.useAsPhp) {
        listObject['Legal stuff'] = 'This is the legal text';
      }
      return <SummaryList name="goal-summary" listObject={listObject} />;
    }
  };

  return (
    <>
      <h1>{getPossessiveName(firstName, lastName)} shared plan</h1>
      <div>{goalComponent()}</div>
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
