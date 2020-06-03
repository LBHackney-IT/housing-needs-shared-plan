import React, { useState } from 'react';
import { DateInput, TextInput, Button, TextArea } from 'components/Form';
import moment from 'moment';
import css from './index.module.scss';

const AddAction = ({ id, onActionAdded }) => {
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

  const addToPlan = async () => {
    if (!formIsValid()) {
      setValidate(true);
      return;
    }

    onActionAdded({ summary, description, dueDate });
  };

  return (
    <div className={`govuk-grid-row ${css['row-add-new-action']}`}>
      <div className="govuk-grid-column-one-quarter">
        <h2 className={`govuk-heading-m ${css['heading-add-new-action']}`}>
          Our Actions
        </h2>
      </div>
      <div className="govuk-grid-column-three-quarters">
        <h3 className={`govuk-heading-m ${css['heading-add-new-action']}`}>
          Add new action
        </h3>

        <TextInput
          name="summary-text"
          label="Summary"
          onChange={handleActionSummaryChange}
          validate={validate}
        />
        <TextArea
          name="full-description"
          label="Full description(optional)"
          onChange={handleActionDescriptionChange}
        />
        <DateInput
          name="due-date"
          title="Due date"
          onChange={handleDueDateChange}
          validate={validate}
        />
        <Button
          className={buttonClassName}
          disabled={buttonDisabled}
          text="Add to plan"
          onClick={addToPlan}
          data-testid="add-action-button-test"
        />
      </div>
    </div>
  );
};

export default AddAction;
