import { useEffect, useState } from 'react';

const TextInput = ({
  hint,
  label,
  name,
  onChange,
  validate,
  value,
  autoComplete,
  ...others
}) => {
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (validate) setHasError(!value);
  });

  return (
    <div
      className={`govuk-form-group${
        hasError ? ' govuk-form-group--error' : ''
      }`}
    >
      <label className="govuk-label" htmlFor={name}>
        {label}
      </label>

      {hint && (
        <span id={`${name}-hint`} className="govuk-hint">
          {hint}
        </span>
      )}
      {hasError && (
        <span id={`${name}-error`} className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> The {label} is
          required
        </span>
      )}
      <input
        className={`govuk-input${hasError ? ' govuk-input--error' : ''}`}
        id={name}
        name={name}
        type="text"
        autoComplete={autoComplete}
        {...others}
        onChange={e => {
          onChange(e);
        }}
        value={value}
        aria-describedby={hasError ? `${name}-error` : undefined}
      />
    </div>
  );
};

export default TextInput;
