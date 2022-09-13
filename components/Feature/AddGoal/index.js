import { useState } from 'react';
import moment from 'moment';
import { Button, Checkbox, DateInput, TextInput } from 'components/Form';
import { convertIsoDateToObject } from 'lib/utils/date';
import ReactMarkdown from 'react-markdown'

const AddGoal = ({ goal, initialUseAsPhp, onGoalAdded }) => {
  const [text, setGoalText] = useState(goal?.text || '');
  const [targetReviewDate, setTargetReviewDate] = useState(
    goal && goal.targetReviewDate
      ? convertIsoDateToObject(goal.targetReviewDate)
      : { day: '', month: '', year: '' }
  );
  const [useAsPhp, setUseAsPhp] = useState(
    !goal ? initialUseAsPhp : goal.useAsPhp
  );
  const [validate, setValidate] = useState(false);
  const actions = goal?.actions || [];
  const [isValidDate, setValidDate] = useState(true);

  const handleGoalTextChange = e => {
    setGoalText(e.target.value);
  };

  const handleTargetReviewDateChange = e => {
    if (e.target.name.includes('day'))
      setTargetReviewDate({
        ...targetReviewDate,
        day: e.target.value ? parseInt(e.target.value) : ''
      });
    if (e.target.name.includes('month'))
      setTargetReviewDate({
        ...targetReviewDate,
        month: e.target.value ? parseInt(e.target.value) : ''
      });
    if (e.target.name.includes('year'))
      setTargetReviewDate({
        ...targetReviewDate,
        year: e.target.value ? parseInt(e.target.value) : ''
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

    const isValidDate = date.isValid() && date.isAfter();
    setValidDate(isValidDate);
    return text && isValidDate;
  };

  const addTheGoal = event => {
    event.preventDefault();
    if (!formIsValid()) {
      setValidate(true);
      return;
    }

    onGoalAdded({ targetReviewDate, text, useAsPhp, actions });
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
            label="Overall resident goal"
            hint="Example: 'Find settled accommodation in the private rental sector' "
            onChange={handleGoalTextChange}
            validate={validate}
            autoComplete="off"
            value={text}
            data-testid="add-goal-text-test"
          />
          <DateInput
            name="target-review-date"
            title="Target review date"
            hint="Your next appointment to review progress"
            onChange={handleTargetReviewDateChange}
            hasError={!isValidDate}
            onInvalid={() => setValidDate(false)}
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
