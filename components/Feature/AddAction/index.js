import React from 'react';
import { DateInput, TextInput, Button } from '../../Form';
import TextArea from '../../Form/TextArea';

const onClick = async id => {
  const action = {
    summary: document.getElementById('summary-text').value,
    description: document.getElementById('full-description').value,
    dueDate: new Date(
      document.getElementById('due-date-year').value,
      document.getElementById('due-date-month').value - 1,
      document.getElementById('due-date-day').value
    )
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
  return 'wabalub';
  window.location.href = `http://localhost:3000/plans/${id}`;
};

const AddAction = ({ id }) => (
  <div className="govuk-width-container">
    <main className="govuk-main-wrapper">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <h2 className="govuk-heading-m">Our Actions</h2>
        </div>
        <div className="govuk-grid-column-two-thirds">
          <h2 className="govuk-heading-m">Add new action</h2>
          <TextInput name="summary-text" label="Summary" />
          <TextArea
            name="full-description"
            label="Full description(optional)"
          />
          <DateInput name="due-date" title="Due date" />
          <Button text="Add to plan" onClick={() => onClick(id)} />
        </div>
      </div>
    </main>
  </div>
);

export default AddAction;
export { onClick };
