import SharePlan from 'components/Feature/SharePlan';
import PlanHeader from 'components/PlanHeader';
import { usePlan, requestPlan, HttpStatusError } from 'api';
import { getToken } from 'lib/utils/token';

const Share = ({ plan, planId, token }) => {
  const { error, loading, sharePlan } = usePlan(planId, {
    plan,
    token
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PlanHeader firstName={plan.firstName} lastName={plan.lastName} />
      <SharePlan error={error} plan={plan} onPlanShared={sharePlan} />
    </>
  );
};

Share.getInitialProps = async ({ query: { id }, req, res }) => {
  try {
    const token = getToken(req);
    const plan = await requestPlan(id, { token });
    return {
      planId: id,
      plan,
      token
    };
  } catch (err) {
    res.writeHead(err instanceof HttpStatusError ? err.statusCode : 500).end();
  }
};

export default Share;
