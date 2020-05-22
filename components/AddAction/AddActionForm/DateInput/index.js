const getTitle = title => {
  return title.toLowerCase().replace(' ', '-');
};

const DateInput = props => (
  <div class="govuk-form-group">
    <fieldset class="govuk-fieldset" role="group">
      <label class="govuk-label" for="full-description">
        <h3>{props.title}</h3>
      </label>
      <div class="govuk-date-input" id={`${getTitle(props.title)}`}>
        <div class="govuk-date-input__item">
          <div class="govuk-form-group">
            <label
              class="govuk-label govuk-date-input__label"
              for={`${getTitle(props.title)}-day`}
            >
              Day
            </label>
            <input
              class="govuk-input govuk-date-input__input govuk-input--width-2"
              id={`${getTitle(props.title)}-day`}
              name={`${getTitle(props.title)}-day`}
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
              for={`${getTitle(props.title)}-month`}
            >
              Month
            </label>
            <input
              class="govuk-input govuk-date-input__input govuk-input--width-2"
              id={`${getTitle(props.title)}-month`}
              name={`${getTitle(props.title)}-month`}
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
              for={`${getTitle(props.title)}-year`}
            >
              Year
            </label>
            <input
              class="govuk-input govuk-date-input__input govuk-input--width-4"
              id={`${getTitle(props.title)}-year`}
              name={`${getTitle(props.title)}-year`}
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
export default DateInput;
