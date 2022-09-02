import Panel from 'components/Form/Panel';
import { logger } from 'lib/infrastructure/logging';
import { convertIsoDateToString } from 'lib/utils/date';
import css from './index.module.scss';

const GoalSummary = ({ plan }) => {
  logger.info(`inside the goal summary. the plan looks like this: ${JSON.Stringify(plan)}`)
  const agreedWith = plan.goal.agreedWithName;

  return (
    <Panel>
      <div className={`govuk-grid-row ${css['goal-summary']}`}>
        <div className="govuk-grid-column-two-thirds">
          <div className={css['grid-column-group']}>
            <h2 data-testid="goal-label-test">Goal</h2>
            <p className={css['data-text']} data-testid="goal-text-test">
              {plan.goal.text}
            </p>
            <p className={css['note-text']}>
              Agreed by {plan.firstName} {plan.lastName} and {agreedWith} on{' '}
              {convertIsoDateToString(plan.goal.agreedDate)}
            </p>
          </div>
          <div className={css['grid-column-group']}>
            <h3 data-testid="target-review-date-label-test">
              Target review date
            </h3>
            <p
              className={css['data-text']}
              data-testid="target-review-date-input-test"
            >
              {convertIsoDateToString(plan.goal.targetReviewDate)}
            </p>
            <p className={css['note-text']}>
              We'll evaluate progress and any next steps at this appointment
            </p>
          </div>
        </div>
        <div className="govuk-grid-column-one-third">
          <h2>Shared with</h2>
          <p data-testid="resident-name-test">
            {plan.firstName} {plan.lastName}
          </p>
          <p data-testid="agreedWith-name-test">{agreedWith}</p>
        </div>
      </div>
    </Panel>
  );
};

export default GoalSummary;
