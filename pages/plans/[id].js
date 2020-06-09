import { useState } from 'react';
import PlanHeader from 'components/PlanHeader';
import { usePlan, requestPlan, HttpStatusError } from 'api';
import AddGoal from 'components/Feature/AddGoal';
import AddAction from 'components/Feature/AddAction';
import ActionsList from 'components/Feature/ActionsList';
import GoalSummary from 'components/Feature/GoalSummary';
import LegalText from 'components/Feature/LegalText';
import { Button } from 'components/Form';
import { getToken } from 'lib/utils/token';

const PlanSummary = ({ planId, initialPlan, token }) => {
  const { plan, loading, addGoal, addAction, toggleAction } = usePlan(planId, {
    initialPlan,
    token
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  const [editGoal, setEditGoal] = useState(!plan.goal ? true : false);
  const [showAddAction, setShowAddAction] = useState(false);
  const { firstName, lastName, goal, hasPhp } = plan;

  return (
    <>
      <PlanHeader firstName={firstName} lastName={lastName} />
      {editGoal && (
        <AddGoal
          goal={goal}
          hasPhp={hasPhp}
          onGoalAdded={async goal => {
            await addGoal(goal);
            setEditGoal(false);
          }}
        />
      )}
      {!editGoal && <GoalSummary plan={plan} token={token} />}
      {!editGoal && (
        <Button
          text="Edit goal"
          isSecondary={true}
          onClick={() => setEditGoal(true)}
        />
      )}

      {!editGoal && (
        <ActionsList
          actions={plan.goal?.actions || []}
          onActionToggled={toggleAction}
        />
      )}
      {!editGoal && !showAddAction && (
        <Button
          data-testid="add-action-button"
          text="Add action"
          isSecondary={true}
          onClick={() => setShowAddAction(true)}
        />
      )}
      {!editGoal && showAddAction && (
        <AddAction
          onActionAdded={async action => {
            await addAction(action);
            setShowAddAction(false);
          }}
        />
      )}
      {!editGoal && (
        <a
          className="govuk-button"
          href={`/plans/${planId}/share`}
          data-testid="share-plan-button-test"
        >
          Share plan
        </a>
      )}
      {!editGoal && goal && goal.useAsPhp && <LegalText />}
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
