import { useState } from 'react';
import { usePlan, requestPlan, HttpStatusError } from 'api';
import AddGoal from 'components/Feature/AddGoal';
import AddAction from 'components/Feature/AddAction';
import ActionsList from 'components/ActionsList';
import GoalSummary from 'components/Feature/GoalSummary';
import LegalText from 'components/Feature/LegalText';
import { Button } from 'components/Form';
import { getToken } from 'lib/utils/token';
import { getPossessiveName } from 'lib/utils/name';
import Link from 'next/link';

const PlanSummary = ({ planId, initialPlan, token }) => {
  const { plan, loading, addGoal, addAction } = usePlan(planId, {
    initialPlan,
    token
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  const [editGoal, setEditGoal] = useState(!plan.goal ? true : false);
  const { id, firstName, lastName, goal } = plan;

  return (
    <>
      <h1>{getPossessiveName(firstName, lastName)} shared plan</h1>
      {editGoal && (
        <AddGoal
          goal={goal}
          onGoalAdded={async goal => {
            await addGoal(goal);
            setEditGoal(false);
          }}
        />
      )}
      {!editGoal && <GoalSummary plan={plan} token={token} />}
      {!editGoal && (
        <Button text="Edit goal" onClick={() => setEditGoal(true)} />
      )}

      {!editGoal && <ActionsList actions={plan.goal?.actions || []} />}
      {!editGoal && <AddAction id={id} onActionAdded={addAction} />}
      {!editGoal && goal && goal.useAsPhp && <LegalText />}
      {!editGoal && (
        <Link href={`/plans/${planId}/share`}>
          <a>Share plan</a>
        </Link>
      )}
    </>
  );
};

PlanSummary.getInitialProps = async ({ query: { id }, req, res }) => {
  try {
    const token = getToken(req);
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

export default PlanSummary;
