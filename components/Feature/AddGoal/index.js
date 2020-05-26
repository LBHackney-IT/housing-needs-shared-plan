import { useState } from 'react';
import { Button, Checkbox, DateInput, TextInput } from '../../Form';

const AddGoal = ({ planId, updatePlan }) => {
  const [text, setGoalText] = useState('');
  const [targetReviewDate, setTargetReviewDate] = useState({});
  const [useAsPhp, setUseAsPhp] = useState(false);

  const handleGoalTextChange = async e => {
    await setGoalText(e.target.value);
  };

  const handleTargetReviewDateChange = async e => {
    let currentDate = targetReviewDate;
    if (e.target.name.includes('day'))
      currentDate.day = parseInt(e.target.value);
    if (e.target.name.includes('month'))
      currentDate.month = parseInt(e.target.value);
    if (e.target.name.includes('year'))
      currentDate.year = parseInt(e.target.value);
    await setTargetReviewDate(currentDate);
  };

  const handleUseAsPhpChange = async e => {
    await setUseAsPhp(e.target.checked);
  };

  const addTheGoal = async () => {
    const response = await fetch(`/api/plans/${planId}/goals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
    <div className="govuk-form-group">
      <TextInput
        name="goal-text"
        label="Goal"
        onChange={handleGoalTextChange}
      />
      <DateInput
        name="target-review-date"
        title="Target review date"
        onChange={handleTargetReviewDateChange}
      />
      <Checkbox
        name="use-as-php"
        label="Use as a PHP"
        onClick={handleUseAsPhpChange}
      />
      <Button text="Add actions" onClick={addTheGoal} />
    </div>
  );
};

export default AddGoal;
