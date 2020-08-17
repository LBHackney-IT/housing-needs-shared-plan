import { usePlan, requestPlan, HttpStatusError } from 'api';
import PlanHeader from 'components/PlanHeader';
import ActionsList from 'components/Feature/ActionsList';
import GoalSummary from 'components/Feature/GoalSummary';
import LegalText from 'components/Feature/LegalText';
import { createToken } from 'lib/utils/token';

const CustomerPlanSummary = ({ planId, initialPlan, token }) => {
  const { plan, loading, toggleAction } = usePlan(planId, {
    initialPlan,
    token
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  const { firstName, lastName } = plan;

  return (
    <>
      <PlanHeader firstName={firstName} lastName={lastName} />
      <GoalSummary plan={plan} />
      <ActionsList
        actions={plan.goal?.actions || []}
        onActionToggled={toggleAction}
        officerName={plan.goal?.agreedWithName}
      />
      {plan.goal.useAsPhp && <LegalText />}
    </>
  );
};

CustomerPlanSummary.getInitialProps = async ({ query: { id }, req, res }) => {
  try {
    const token = createToken();
    const plan = await requestPlan(id, { token });
    const tokenWithName = createToken(`${plan.firstName} ${plan.lastName}`);
    return {
      planId: id,
      initialPlan: plan,
      token: tokenWithName
    };
  } catch (err) {
    res.writeHead(err instanceof HttpStatusError ? err.statusCode : 500).end();
  }
};

export default CustomerPlanSummary;
