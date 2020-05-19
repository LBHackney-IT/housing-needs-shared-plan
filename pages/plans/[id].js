import React from 'react';

const PlanSummary = ({ plan: { firstName, lastName } }) => {
  const getPossessiveName = name => {
    let baseString = `${name}'`;
    if (name[name.length - 1] !== 's') {
      baseString += 's';
    }
    return baseString;
  };

  return (
    <h1>
      {firstName} {getPossessiveName(lastName)} shared plan
    </h1>
  );
};

PlanSummary.getInitialProps = async ({ query }) => {
  const response = await fetch(
    `${process.env.SHARED_PLAN_API_URL}/plans/${query.id}`
  );
  const plan = await response.json();

  return {
    plan: {
      id: plan.id,
      firstName: plan.firstName,
      lastName: plan.lastName
    }
  };
};

export default PlanSummary;
