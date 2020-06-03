import { getPossessiveName } from 'lib/utils/possessiveName';
import SharePlan from 'components/Feature/SharePlan';
import { usePlan, requestPlan, HttpStatusError } from 'api';
import { getToken } from 'lib/utils/token';

const Share = ({ plan, planId, token }) => {
  const { sharePlan } = usePlan(planId, {
    plan,
    token
  });
  console.log(plan);
  return (
    <>
      <h1>{getPossessiveName(plan.firstName, plan.lastName)} shared plan</h1>
      <SharePlan plan={plan} onPlanShared={sharePlan} />
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
