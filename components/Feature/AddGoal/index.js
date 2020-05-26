import DateInput from '../../Form/DateInput';
import TextInput from '../../Form/TextInput';
import Checkbox from '../../Form/Checkbox';

const AddGoal = () => (
  <div className="govuk-form-group">
    <TextInput name="goal-text" label="Goal" />
    <DateInput name="target-review-date" title="Target review date" />
    <Checkbox name="use-as-php" label="Use as a PHP" />
  </div>
);

export default AddGoal;
