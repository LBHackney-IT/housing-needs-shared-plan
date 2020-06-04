import { useEffect, useState } from 'react';
import moment from 'moment';

const DateInput = ({
  day,
  month,
  name,
  onChange,
  showHint,
  title,
  validate,
  year,
  autoComplete
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (validate) {
      const date = moment(
        `${day}-${month}-${year}`,
        'DD-MM-YYYY'
      );
      const isValid =
        day && month && year && date.isValid() && date.isAfter();
      setHasError(!isValid);
    }
  });

  return (
    <div
      className={`govuk-form-group${
        hasError ? ' govuk-form-group--error' : ''
      }`}
    >
      <fieldset
        className="govuk-fieldset"
        role="group"
        aria-describedby={`${showHint ? `${name}-hint` : ''}${
          hasError ? ` ${name}-error` : ''
        }`}
      >
        <legend>
          <h3 className="govuk-label">{title}</h3>
        </legend>

        {showHint && (
          <span id={`${name}-hint`} className="govuk-hint">
            For example, 12 10 2025
          </span>
        )}

        {hasError && (
          <span id={`${name}-error`} className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> The {title}{' '}
            must be valid and in the future
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
                className={`govuk-input govuk-date-input__input govuk-input--width-2${
                  hasError ? ' govuk-input--error' : ''
                }`}
                id={`${name}-day`}
                name={`${name}-day`}
                type="text"
                pattern="^[0-9]{1,2}$"
                inputMode="numeric"
                onChange={e => {
                  onChange(e);
                }}
                onInvalid={e => {
                  e.preventDefault();
                  setHasError(true);
                }}
                value={day}
                autoComplete={autoComplete}
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
                className={`govuk-input govuk-date-input__input govuk-input--width-2${
                  hasError ? ' govuk-input--error' : ''
                }`}
                id={`${name}-month`}
                name={`${name}-month`}
                type="text"
                pattern="^[0-9]{1,2}$"
                inputMode="numeric"
                onChange={e => {
                  onChange(e);
                }}
                onInvalid={e => {
                  e.preventDefault();
                  setHasError(true);
                }}
                value={month}
                autoComplete={autoComplete}
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
                className={`govuk-input govuk-date-input__input govuk-input--width-4${
                  hasError ? ' govuk-input--error' : ''
                }`}
                id={`${name}-year`}
                name={`${name}-year`}
                type="text"
                pattern="^[0-9]{4}$"
                inputMode="numeric"
                onChange={e => {
                  onChange(e);
                }}
                onInvalid={e => {
                  e.preventDefault();
                  setHasError(true);
                }}
                value={year}
                autoComplete={autoComplete}
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default DateInput;
