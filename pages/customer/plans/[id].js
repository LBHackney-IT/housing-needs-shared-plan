import { usePlan, requestPlan, HttpStatusError } from 'api';
import ActionsList from 'components/ActionsList';
import GoalSummary from 'components/Feature/GoalSummary';
import LegalText from 'components/Feature/LegalText';
import { createToken } from 'lib/utils/token';
import { getPossessiveName } from 'lib/utils/name';

const CustomerPlanSummary = ({ planId, initialPlan, token }) => {
  const { plan, loading } = usePlan(planId, {
    initialPlan,
    token
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  const { firstName, lastName } = plan;

  return (
    <>
      <h1>{getPossessiveName(firstName, lastName)} shared plan</h1>
      <GoalSummary plan={plan} token={token} />
      <ActionsList actions={plan.goal?.actions || []} />
      {<LegalText />}
    </>
  );
};

CustomerPlanSummary.getInitialProps = async ({ query: { id }, req, res }) => {
  try {
    const token = createToken();
    const plan = await requestPlan(id, { token });
    return {
      planId: id,
      initialPlan: plan,
      token
    };
  } catch (err) {
    res.writeHead(err instanceof HttpStatusError ? err.statusCode : 500).end();
  }
};

export default CustomerPlanSummary;
