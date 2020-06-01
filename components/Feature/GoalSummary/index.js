import moment from 'moment';
import Panel from 'components/Form/Panel';
import { getUsername } from 'lib/utils/token';
import css from './index.module.scss';

const GoalSummary = ({ hackneyToken, plan }) => {
  const user = getUsername(hackneyToken);

  return (
    <Panel>
      <div className={`govuk-grid-row ${css['goal-summary']}`}>
        <div className="govuk-grid-column-two-thirds">
          <div className={css['grid-column-group']}>
            <h3>Goal</h3>
            <p className={css['data-text']}>{plan.goal.text}</p>
            <p className={css['note-text']}>
              Agreed by {plan.firstName} {plan.lastName} and {user} on{' '}
              {moment(plan.goal.agreedDate)
                .utc()
                .format('DD/MM/YYYY')}
            </p>
          </div>
          <div className={css['grid-column-group']}>
            <h3>Target Review Date</h3>
            <p className={css['data-text']}>
              {moment(plan.goal.targetReviewDate)
                .utc()
                .format('DD/MM/YYYY')}
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
