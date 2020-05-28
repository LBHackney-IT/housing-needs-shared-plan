import moment from 'moment';
import { SummaryList } from 'components/Form';

const GoalSummary = ({ goal }) => {
  return (
    <SummaryList
      name="goal-summary"
      entries={{
        Goal: goal.text,
        'Target review date': moment(goal.targetReviewDate)
          .utc()
          .format('DD/MM/YYYY')
      }}
    />
  );
};

export default GoalSummary;
