const TextArea = ({ hint, label, name, onChange, value, ...others }) => (
  <div className="govuk-form-group">
    <label className="govuk-label" htmlFor={`${name}`}>
      {label}
    </label>
    {hint && (
      <span id={`${name}-hint`} className={'govuk-hint'}>
        {hint}
      </span>
    )}
    <textarea
      className="govuk-textarea"
      id={name}
      name={name}
      data-testid={name}
      rows="5"
      onChange={onChange}
      value={value}
      {...others}
    ></textarea>
  </div>
);

export default TextArea;
