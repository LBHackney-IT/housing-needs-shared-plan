import React from 'react';

const PlanSummary = ({ plan }) => {
  return <h1>{plan.id}</h1>;
};

PlanSummary.getInitialProps = async ({ query }) => {
  // fetch plan /api/get-plan?id=123
  // fetch plan /api/plans/123
  const response = await fetch(`http://localhost:3000/api/plans/${query.id}`);
  const plan = await response.json();

  return {
    plan: {
      id: plan.id
    }
  };
};

export default PlanSummary;
