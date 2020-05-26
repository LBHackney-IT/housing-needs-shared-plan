const TextInput = ({ label, name, onChange }) => (
  <div className="govuk-form-group">
    <label className="govuk-label" htmlFor={name}>
      {label}
    </label>
    <input
      className="govuk-input"
      id={name}
      name={name}
      type="text"
      onChange={onChange}
    />
  </div>
);

export default TextInput;
