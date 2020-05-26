import React from 'react';
import SummaryTextBox from './SummaryTextBox';
import DescriptionTextArea from './DescriptionTextArea';
import DateInput from './DateInput';

const AddAction = async () => {
  const plan = {};

  const response = await fetch(
    `${process.env.SHARED_PLAN_API_URL}/plans/${query.id}/actions`,
    {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(plan)
    }
  );
  return response.json();
};
const AddActionForm = () => (
  <p class="govuk-body">
    <SummaryTextBox />
    <DescriptionTextArea />
    <DateInput title="Due date" />

    <button
      class="govuk-button"
      data-module="govuk-button"
      onClick={AddAction()}
    >
      Add to plan
    </button>
  </p>
);

export default AddActionForm;
