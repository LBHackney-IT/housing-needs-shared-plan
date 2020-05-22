import React from 'react';
import AddActionForm from './AddActionForm';

const AddAction = () => (
  <div class="govuk-width-container">
    <main class="govuk-main-wrapper">
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-one-third">
          <h2 class="govuk-heading-m">Our Actions</h2>
        </div>
        <div class="govuk-grid-column-two-thirds">
          <h2 class="govuk-heading-m">Add new action</h2>
          <AddActionForm />
        </div>
      </div>
    </main>
  </div>
);

export default AddAction;
