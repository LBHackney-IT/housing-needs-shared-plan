const DateInput = ({ name, showHint, title }) => (
  <div className="govuk-form-group">
    <fieldset
      className="govuk-fieldset"
      role="group"
      aria-describedby={`${name}-hint`}
    >
      <legend>
        <h3 className="govuk-label">{title}</h3>
      </legend>

      {showHint && (
        <span id={`${name}-hint`} className="govuk-hint">
          For example, 12 10 2025
        </span>
      )}

      <div className="govuk-date-input" id={name}>
        <div className="govuk-date-input__item">
          <div className="govuk-form-group">
            <label
              className="govuk-label govuk-date-input__label"
              htmlFor={`${name}-day`}
            >
              Day
            </label>
            <input
              className="govuk-input govuk-date-input__input govuk-input--width-2"
              id={`${name}-day`}
              name={`${name}-day`}
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>
        </div>
        <div className="govuk-date-input__item">
          <div className="govuk-form-group">
            <label
              className="govuk-label govuk-date-input__label"
              htmlFor={`${name}-month`}
            >
              Month
            </label>
            <input
              className="govuk-input govuk-date-input__input govuk-input--width-2"
              id={`${name}-month`}
              name={`${name}-month`}
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>
        </div>
        <div className="govuk-date-input__item">
          <div className="govuk-form-group">
            <label
              className="govuk-label govuk-date-input__label"
              htmlFor={`${name}-year`}
            >
              Year
            </label>
            <input
              className="govuk-input govuk-date-input__input govuk-input--width-4"
              id={`${name}-year`}
              name={`${name}-year`}
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>
        </div>
      </div>
    </fieldset>
  </div>
);

export default DateInput;
