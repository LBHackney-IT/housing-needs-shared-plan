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
    let currentDate = targetReviewDate;
    if (e.target.name.includes('day'))
      currentDate.day = parseInt(e.target.value);
    if (e.target.name.includes('month'))
      currentDate.month = parseInt(e.target.value);
    if (e.target.name.includes('year'))
      currentDate.year = parseInt(e.target.value);
    setTargetReviewDate(currentDate);
  };

  const handleUseAsPhpChange = e => {
    setUseAsPhp(e.target.checked);
  };

  const formIsValid = () => {
    const date = moment(
      `${targetReviewDate.day}-${targetReviewDate.month}-${targetReviewDate.year}`,
      'DD-MM-YYYY'
    );
    return text && date.isValid() && date.isAfter();
  };

  const addTheGoal = async () => {
    if (!formIsValid()) {
      setValidate(true);
      return;
    }

    onGoalAdded({ targetReviewDate, text, useAsPhp });
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-quarter">
        <h2 className="govuk-heading-m">Overview</h2>
      </div>
      <div className="govuk-grid-column-three-quarters">
        <TextInput
          name="goal-text"
          label="Goal"
          onChange={handleGoalTextChange}
          validate={validate}
          value={text}
        />
        <DateInput
          name="target-review-date"
          title="Target review date"
          onChange={handleTargetReviewDateChange}
          validate={validate}
          day={targetReviewDate.day}
          month={targetReviewDate.month}
          year={targetReviewDate.year}
        />
        <Checkbox
          name="use-as-php"
          label="Use as a PHP"
          onClick={handleUseAsPhpChange}
          checked={useAsPhp}
        />
        <Button text="Add actions" onClick={addTheGoal} />
      </div>
    </div>
  );
};

export default AddGoal;
