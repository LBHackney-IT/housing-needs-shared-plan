import React, { useState } from 'react';
import { DateInput, TextInput, Button, TextArea } from 'components/Form';
import moment from 'moment';

const AddAction = ({ onActionAdded }) => {
  const [summary, setActionSummary] = useState('');
  const [dueDate, setDueDate] = useState({});
  const [description, setActionDescription] = useState('');
  const [validate, setValidate] = useState(false);

  const handleActionSummaryChange = e => {
    setActionSummary(e.target.value);
  };

  const handleDueDateChange = e => {
    if (e.target.name.includes('day'))
      setDueDate({
        ...dueDate,
        day: parseInt(e.target.value)
      });
    if (e.target.name.includes('month'))
      setDueDate({
        ...dueDate,
        month: parseInt(e.target.value)
      });
    if (e.target.name.includes('year'))
      setDueDate({
        ...dueDate,
        year: parseInt(e.target.value)
      });
  };

  const handleActionDescriptionChange = e => {
    setActionDescription(e.target.value);
  };

  const formIsValid = () => {
    const date = moment(
      `${dueDate.day}-${dueDate.month}-${dueDate.year}`,
      'DD-MM-YYYY'
    );
    return summary && date.isValid() && date.isAfter();
  };

  const [buttonClassName, buttonDisabled] =
    summary && dueDate.year && dueDate.month && dueDate.day
      ? ['govuk-button', '']
      : ['govuk-button govuk-button--disabled', 'disabled'];

  const addToPlan = event => {
    event.preventDefault();
    if (!formIsValid()) {
      setValidate(true);
      return;
    }

    onActionAdded({ summary, description, dueDate });
    setActionSummary('');
    setActionDescription('');
    setDueDate({ day: '', month: '', year: '' });
    return false;
  };

  return (
    <div className="govuk-grid-row row-add-new-action">
      <div className="govuk-grid-column-one-quarter">
        <h2 className="govuk-heading-m heading-add-new-action">Our Actions</h2>
      </div>
      <div className="govuk-grid-column-three-quarters">
        <h3 className="govuk-heading-m heading-add-new-action">
          Add new action
        </h3>
        <form onSubmit={addToPlan}>
          <TextInput
            name="summary-text"
            label="Summary"
            onChange={handleActionSummaryChange}
            validate={validate}
            autoComplete="off"
            value={summary}
          />
          <TextArea
            name="full-description"
            label="Full description(optional)"
            onChange={handleActionDescriptionChange}
            value={description}
          />
          <DateInput
            name="due-date"
            title="Due date"
            onChange={handleDueDateChange}
            validate={validate}
            autoComplete="off"
            day={dueDate.day}
            month={dueDate.month}
            year={dueDate.year}
          />
          <Button
            className={buttonClassName}
            disabled={buttonDisabled}
            text="Add to plan"
            data-testid="add-action-button-test"
          />
        </form>
      </div>
    </div>
  );
};

export default AddAction;
