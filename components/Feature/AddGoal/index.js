import { useState } from 'react';
import moment from 'moment';
import { Button, Checkbox, DateInput, TextInput } from 'components/Form';

const AddGoal = ({ hackneyToken, planId, updatePlan }) => {
  const [text, setGoalText] = useState('');
  const [targetReviewDate, setTargetReviewDate] = useState({});
  const [useAsPhp, setUseAsPhp] = useState(false);
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

    const response = await fetch(`/api/plans/${planId}/goals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${hackneyToken}`
      },
      body: JSON.stringify({
        goal: {
          targetReviewDate,
          text,
          useAsPhp
        }
      })
    });

    const plan = await response.json();
    if (plan) await updatePlan(plan);
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
        />
        <DateInput
          name="target-review-date"
          title="Target review date"
          onChange={handleTargetReviewDateChange}
          validate={validate}
        />
        <Checkbox
          name="use-as-php"
          label="Use as a PHP"
          onClick={handleUseAsPhpChange}
        />
        <Button text="Add actions" onClick={addTheGoal} />
      </div>
    </div>
  );
};

export default AddGoal;
