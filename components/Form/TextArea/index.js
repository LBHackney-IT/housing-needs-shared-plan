const TextArea = ({ label, name }) => (
  <div className="govuk-form-group">
    <label className="govuk-label" htmlFor={`${name}`}>
      {label}
    </label>
    <textarea
      className="govuk-textarea"
      id={`${name}`}
      name={`${name}`}
      rows="5"
    ></textarea>
  </div>
);

export default TextArea;
