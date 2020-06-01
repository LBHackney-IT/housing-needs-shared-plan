import Panel from 'components/Form/Panel';
import { getUsername } from 'lib/utils/token';
import { convertIsoDateToString } from 'lib/utils/date';
import css from './index.module.scss';

const GoalSummary = ({ hackneyToken, plan }) => {
  const user = getUsername(hackneyToken);

  return (
    <Panel>
      <div className={`govuk-grid-row ${css['goal-summary']}`}>
        <div className="govuk-grid-column-two-thirds">
          <div className={css['grid-column-group']}>
            <h3 data-testid="goal-label-test">Goal</h3>
            <p className={css['data-text']} data-testid="goal-text-test">
              {plan.goal.text}
            </p>
            <p className={css['note-text']}>
              Agreed by {plan.firstName} {plan.lastName} and {user} on{' '}
              {convertIsoDateToString(plan.goal.agreedDate)}
            </p>
          </div>
          <div className={css['grid-column-group']}>
            <h3 data-testid="target-review-date-label-test">
              Target Review Date
            </h3>
            <p className={css['data-text']} data-testid="target-review-date-input-test">
              {convertIsoDateToString(plan.goal.targetReviewDate)}
            </p>
            <p className={css['note-text']}>
              We'll evaluate progress and any next steps at this appointment
            </p>
          </div>
        </div>
        <div className="govuk-grid-column-one-third">
          <h3>Shared with</h3>
          <p>
            {plan.firstName} {plan.lastName}
          </p>
          <p>{user}</p>
        </div>
      </div>
    </Panel>
  );
};

export default GoalSummary;
