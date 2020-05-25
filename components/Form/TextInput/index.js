const TextInput = ({ label, name }) => (
  <div className="govuk-form-group">
    <label className="govuk-label" htmlFor={name}>
      {label}
    </label>
    <input className="govuk-input" id={name} name={name} type="text" />
  </div>
);

export default TextInput;
