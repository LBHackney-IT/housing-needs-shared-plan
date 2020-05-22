import React from 'react';
import SummaryTextBox from './SummaryTextBox';
import DescriptionTextArea from './DescriptionTextArea';
import DueDateInput from './DueDateInput';

const AddActionForm = () => (
  <p class="govuk-body">
    <SummaryTextBox />
    <DescriptionTextArea />
    <DueDateInput />
    <button
      disabled="disabled"
      class="govuk-button govuk-button--disabled"
      data-module="govuk-button"
    >
      Add to plan
    </button>
  </p>
);

export default AddActionForm;
