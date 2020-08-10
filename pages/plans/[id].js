import { useState } from 'react';
import PlanHeader from 'components/PlanHeader';
import { usePlan, requestPlan, HttpStatusError } from 'api';
import AddGoal from 'components/Feature/AddGoal';
import AddAction from 'components/Feature/AddAction';
import EditAction from 'components/Feature/EditAction';
import ActionsList from 'components/Feature/ActionsList';
import GoalSummary from 'components/Feature/GoalSummary';
import LegalText from 'components/Feature/LegalText';
import { Button, ButtonGroup } from 'components/Form';
import { getToken } from 'lib/utils/token';

const PlanSummary = ({ planId, initialPlan, token }) => {
  const {
    plan,
    loading,
    addGoal,
    addAction,
    updateAction,
    toggleAction,
    deleteAction
  } = usePlan(planId, { initialPlan, token });

  if (loading) {
    return <p>Loading...</p>;
  }

  const [editGoal, setEditGoal] = useState(!plan.goal ? true : false);
  const [showAddAction, setShowAddAction] = useState(!plan.goal ? true : false);
  const [editActionId, setEditActionId] = useState(false);
  const { firstName, lastName, goal, initialUseAsPhp } = plan;
  return (
    <>
      <PlanHeader firstName={firstName} lastName={lastName} />
      {editGoal && (
        <AddGoal
          goal={goal}
          initialUseAsPhp={initialUseAsPhp}
          onGoalAdded={async goal => {
            await addGoal(goal);
            setEditGoal(false);
          }}
        />
      )}
      {!editGoal && <GoalSummary plan={plan} />}
      {!editGoal && (
        <Button
          text="Edit goal"
          data-testid="edit-goal-button-test"
          isSecondary={true}
          onClick={() => setEditGoal(true)}
        />
      )}

      {!editGoal && (
        <ActionsList
          actions={plan.goal?.actions || []}
          onEditAction={actionId => setEditActionId(actionId)}
          onActionToggled={toggleAction}
          onActionDeleted={deleteAction}
          officerName={plan.goal?.agreedWithName}
          userName={`${plan.firstName} ${plan.lastName}`}
        />
      )}
      {!editGoal && !showAddAction && (
        <ButtonGroup>
          <Button
            data-testid="add-action-button"
            text="Add action"
            isSecondary={true}
            onClick={() => setShowAddAction(true)}
          />
          <a
            className="govuk-button"
            href={`/plans/${planId}/share`}
            data-testid="share-plan-button-test"
          >
            Share plan
          </a>
        </ButtonGroup>
      )}
      {!editGoal && showAddAction && (
        <AddAction
          onActionAdded={async action => {
            await addAction(action);
            setShowAddAction(false);
          }}
          officerName={goal.agreedWithName}
          residentName={plan.firstName}
        />
      )}
      {editActionId && (
        <EditAction
          onActionUpdated={async action => {
            await updateAction(action);
            setEditActionId(false);
          }}
          officerName={goal.agreedWithName}
          residentName={plan.firstName}
          action={plan.goal.actions.find(action => action.id === editActionId)}
        />
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
