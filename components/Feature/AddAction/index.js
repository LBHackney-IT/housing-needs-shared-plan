import React from 'react';
import { DateInput, TextInput, Button } from '../../Form';
import TextArea from '../../Form/TextArea';

const onClick = async () => {
  const action = {
    summary: document.getElementById('summary-text').value,
    description: document.getElementById('full-description').value,
    dueDate: new Date(
      document.getElementById('due-date-year').value,
      document.getElementById('due-date-month').value,
      document.getElementById('due-date-day').value
    )
  };

  const response = await fetch(
    `${process.env.SHARED_PLAN_API_URL}/plans/${query.id}/actions`,
    {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action)
    }
  );
  return response.json(response); //take to the summary page
};

const AddAction = () => (
  <div class="govuk-width-container">
    <main class="govuk-main-wrapper">
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-one-third">
          <h2 class="govuk-heading-m">Our Actions</h2>
        </div>
        <div class="govuk-grid-column-two-thirds">
          <h2 class="govuk-heading-m">Add new action</h2>
          <TextInput name="summary-text" label="Summary" />
          <DateInput name="due-date" title="Due date" />
          <TextArea
            name="full-description"
            label="Full description(optional)"
          />
          <Button text="Add to plan" onClick={onClick()} />
        </div>
      </div>
    </main>
  </div>
);

export default AddAction;
