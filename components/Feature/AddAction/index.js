import React, { useState } from 'react';
import { DateInput, TextInput, Button } from '../../Form';
import TextArea from '../../Form/TextArea';

const AddAction = ({ id }) => {
  const [summary, setActionSummary] = useState('');
  const [dueDate, setDueDate] = useState({});
  const [description, setActionDescription] = useState('');
  const [button, setActionButtonVisibility] = useState({
    className: 'govuk-button govuk-button--disabled',
    disabled: 'disabled'
  });

  const handleActionSummaryChange = async e => {
    await setActionSummary(e.target.value);
    await updateButton();
  };

  const handleDueDateChange = async e => {
    let currentDate = dueDate;
    if (e.target.name.includes('day'))
      currentDate.day = parseInt(e.target.value);
    if (e.target.name.includes('month'))
      currentDate.month = parseInt(e.target.value);
    if (e.target.name.includes('year'))
      currentDate.year = parseInt(e.target.value);
    await setDueDate(currentDate);
    await updateButton();
  };

  const handleActionDescriptionChange = async e => {
    await setActionDescription(e.target.value);
    await updateButton();
  };

  const updateButton = async () => {
    if (summary && dueDate.year && dueDate.month && dueDate.day) {
      setActionButtonVisibility({ className: 'govuk-button', disabled: '' });
    } else {
      setActionButtonVisibility({
        className: 'govuk-button govuk-button--disabled',
        disabled: 'disabled'
      });
    }
  };

  const onClick = async id => {
    const action = {
      summary,
      description,
      dueDate
    };

    const response = await fetch(
      `http://localhost:3000/api/plans/${id}/actions`,
      {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action)
      }
    );
    location.reload();
    return false;
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <h2 className="govuk-heading-m">Our Actions</h2>
          </div>
          <div className="govuk-grid-column-two-thirds">
            <h2 className="govuk-heading-m">Add new action</h2>
            <TextInput
              name="summary-text"
              label="Summary"
              onChange={handleActionSummaryChange}
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
            />
            <Button
              className={button.className}
              disabled={button.disabled}
              text="Add to plan"
              data-testid="add-action-button-test"
              onClick={() => onClick(id)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddAction;
