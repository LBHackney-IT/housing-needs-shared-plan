import { useState } from 'react';
import moment from 'moment';
import { Button, Checkbox, DateInput, TextInput } from 'components/Form';
import { convertIsoDateToObject } from 'lib/utils/date';

const AddGoal = ({ goal, onGoalAdded }) => {
  const [text, setGoalText] = useState(goal?.text || '');
  const [targetReviewDate, setTargetReviewDate] = useState(
    goal && goal.targetReviewDate
      ? convertIsoDateToObject(goal.targetReviewDate)
      : {}
  );
  const [useAsPhp, setUseAsPhp] = useState(goal?.useAsPhp || false);
  const [validate, setValidate] = useState(false);

  const handleGoalTextChange = e => {
    setGoalText(e.target.value);
  };

  const handleTargetReviewDateChange = e => {
    if (e.target.name.includes('day'))
      setTargetReviewDate({
        ...targetReviewDate,
        day: e.target.value ? parseInt(e.target.value):''
      });
    if (e.target.name.includes('month'))
      setTargetReviewDate({
        ...targetReviewDate,
        month: e.target.value ? parseInt(e.target.value):''
      });
    if (e.target.name.includes('year'))
      setTargetReviewDate({
        ...targetReviewDate,
        year: e.target.value ? parseInt(e.target.value):''
      });
  };

  const handleUseAsPhpChange = e => {
    setUseAsPhp(e.target.checked);
  };

  const formIsValid = () => {
    if (
      !targetReviewDate ||
      !targetReviewDate.day ||
      !targetReviewDate.month ||
      !targetReviewDate.year
    ) {
      return false;
    }
    const date = moment(
      `${targetReviewDate.day}-${targetReviewDate.month}-${targetReviewDate.year}`,
      'DD-MM-YYYY'
    );
    return text && date.isValid() && date.isAfter();
  };

  const addTheGoal = event => {
    event.preventDefault();
    if (!formIsValid()) {
      setValidate(true);
      return;
    }

    onGoalAdded({ targetReviewDate, text, useAsPhp, actions: [] });
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-quarter">
        <h2 className="govuk-heading-m">Overview</h2>
      </div>
      <div className="govuk-grid-column-three-quarters">
        <form onSubmit={addTheGoal}>
          <TextInput
            name="goal-text"
            label="Goal"
            onChange={handleGoalTextChange}
            validate={validate}
            autoComplete="off"
            value={text}
          />
          <DateInput
            name="target-review-date"
            title="Target review date"
            onChange={handleTargetReviewDateChange}
            validate={validate}
            autoComplete="off"
            day={targetReviewDate.day}
            month={targetReviewDate.month}
            year={targetReviewDate.year}
          />
          <Checkbox
            name="use-as-php"
            label="Use as a PHP"
            onClick={handleUseAsPhpChange}
            checked={useAsPhp}
            data-testid="use-as-php-test"
          />
          <Button text="Add actions" data-testid="add-actions-button-test" />
        </form>
      </div>
    </div>
  );
};

export default AddGoal;
