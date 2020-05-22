const DueDateInput = () => (
  <div class="govuk-form-group">
    <fieldset class="govuk-fieldset" role="group">
      <label class="govuk-label" for="full-description">
        <h3> Due Date</h3>
      </label>
      <div class="govuk-date-input" id="due-date">
        <div class="govuk-date-input__item">
          <div class="govuk-form-group">
            <label
              class="govuk-label govuk-date-input__label"
              for="due-date-day"
            >
              Day
            </label>
            <input
              class="govuk-input govuk-date-input__input govuk-input--width-2"
              id="due-date-day"
              name="due-date-day"
              type="text"
              pattern="[0-9]*"
              inputmode="numeric"
            />
          </div>
        </div>
        <div class="govuk-date-input__item">
          <div class="govuk-form-group">
            <label
              class="govuk-label govuk-date-input__label"
              for="due-date-month"
            >
              Month
            </label>
            <input
              class="govuk-input govuk-date-input__input govuk-input--width-2"
              id="due-date-month"
              name="due-date-month"
              type="text"
              pattern="[0-9]*"
              inputmode="numeric"
            />
          </div>
        </div>
        <div class="govuk-date-input__item">
          <div class="govuk-form-group">
            <label
              class="govuk-label govuk-date-input__label"
              for="due-date-year"
            >
              Year
            </label>
            <input
              class="govuk-input govuk-date-input__input govuk-input--width-4"
              id="due-date-year"
              name="due-date-year"
              type="text"
              pattern="[0-9]*"
              inputmode="numeric"
            />
          </div>
        </div>
      </div>
    </fieldset>
  </div>
);
export default DueDateInput;
