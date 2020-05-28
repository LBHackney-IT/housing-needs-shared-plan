import { useEffect, useState } from 'react';

const TextInput = ({ label, name, onChange, validate }) => {
  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (validate) setHasError(!inputValue);
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
        onChange={e => {
          setInputValue(e.target.value);
          onChange(e);
        }}
        aria-describedby={hasError ? `${name}-error` : ''}
      />
    </div>
  );
};

export default TextInput;
