import Panel from 'components/Form/Panel';
import { getUsername } from 'lib/utils/cookie';
import { convertIsoDateToString } from 'lib/utils/date';
import css from './index.module.scss';

const GoalSummary = ({ plan }) => {
  const user = getUsername();

  return (
    <Panel>
      <div className={`govuk-grid-row ${css['goal-summary']}`}>
        <div className="govuk-grid-column-two-thirds">
          <div className={css['grid-column-group']}>
            <h3>Goal</h3>
            <p className={css['data-text']}>{plan.goal.text}</p>
            <p className={css['note-text']}>
              Agreed by {plan.firstName} {plan.lastName} and {user} on{' '}
              {convertIsoDateToString(plan.goal.agreedDate)}
            </p>
          </div>
          <div className={css['grid-column-group']}>
            <h3>Target Review Date</h3>
            <p className={css['data-text']}>
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
