import SharePlan from 'components/Feature/SharePlan';
import PlanHeader from 'components/PlanHeader';
import { usePlan, requestPlan, HttpStatusError, requestCustomerUrl } from 'api';
import { getToken } from 'lib/utils/token';

const Share = ({ initialPlan, planId, token, customerUrl }) => {
  const { error, loading, sharePlan, plan } = usePlan(planId, {
    initialPlan,
    token
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PlanHeader firstName={plan.firstName} lastName={plan.lastName} />
      <SharePlan
        error={error}
        plan={plan}
        customerUrl={customerUrl}
        onPlanShared={sharePlan}
      />
    </>
  );
};

Share.getInitialProps = async ({ query: { id }, req, res }) => {
  try {
    const token = getToken(req);
    const plan = await requestPlan(id, { token });
    const { planUrl } = await requestCustomerUrl(id);
    console.log(planUrl);
    console.log('thisss');
    return {
      planId: id,
      initialPlan: plan,
      token,
      customerUrl: planUrl
    };
  } catch (err) {
    console.log(err);
    res.writeHead(err instanceof HttpStatusError ? err.statusCode : 500).end();
  }
};

export default Share;
