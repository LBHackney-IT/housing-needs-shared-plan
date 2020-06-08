import React, { useState } from 'react';
import { DateInput, TextInput, Button, TextArea } from 'components/Form';
import moment from 'moment';
import css from './index.module.scss';

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
        day: e.target.value ? parseInt(e.target.value) : ''
      });
    if (e.target.name.includes('month'))
      setDueDate({
        ...dueDate,
        month: e.target.value ? parseInt(e.target.value) : ''
      });
    if (e.target.name.includes('year'))
      setDueDate({
        ...dueDate,
        year: e.target.value ? parseInt(e.target.value) : ''
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

  const addToPlan = event => {
    event.preventDefault();
    if (!formIsValid()) {
      setValidate(true);
      return;
    }

    const { year, month, day } = dueDate;
    onActionAdded({
      summary,
      description,
      dueDate: new Date(Date.UTC(year, month - 1, day)).toISOString()
    });

    setActionSummary('');
    setActionDescription('');
    setDueDate({ day: '', month: '', year: '' });
    setValidate(false);
    return false;
  };

  return (
    <div className={`govuk-grid-row ${css['row-add-new-action']}`}>
      <div className="govuk-grid-column-three-quarters">
        <h3 className={`govuk-heading-m ${css['heading-add-new-action']}`}>
          Add new action
        </h3>
        <form onSubmit={addToPlan}>
          <TextInput
            name="summary-text"
            label="Summary"
            required
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
          <Button text="Add to plan" data-testid="add-action-button-test" />
        </form>
      </div>
    </div>
  );
};

export default AddAction;
