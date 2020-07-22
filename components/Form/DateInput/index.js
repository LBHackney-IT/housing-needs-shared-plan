import { useEffect, useState } from 'react';
import moment from 'moment';

const DateInput = ({
  autoComplete,
  day,
  hint,
  month,
  name,
  onChange,
  required = true,
  title,
  validate,
  year,
  ...others
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (validate) {
      const date = moment(`${day}-${month}-${year}`, 'DD-MM-YYYY');
      const isValid = day && month && year && date.isValid() && date.isAfter();
      setHasError(!isValid);
    }
  }, [day, month, year, validate]);

  return (
    <div
      className={`govuk-form-group${
        hasError ? ' govuk-form-group--error' : ''
      }`}
    >
      <fieldset
        className="govuk-fieldset"
        role="group"
        aria-describedby={`${hint ? `${name}-hint` : ''}${
          hasError ? ` ${name}-error` : ''
        }`}
      >
        <legend>
          <h3 className="govuk-label">{title}</h3>
        </legend>

        {hint && (
          <span id={`${name}-hint`} className={'govuk-hint'}>
            {hint}
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
                required={required}
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
                data-testid="day-test"
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
                required={required}
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
                data-testid="month-test"
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
                required={required}
                inputMode="numeric"
                onChange={e => {
                  setHasError(false);
                  onChange(e);
                }}
                onInvalid={e => {
                  e.preventDefault();
                  setHasError(true);
                }}
                value={year}
                autoComplete={autoComplete}
                data-testid="year-test"
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default DateInput;
