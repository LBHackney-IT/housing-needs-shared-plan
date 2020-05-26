const Button = ({ onClick, text }) => (
  <div className="govuk-form-group">
    <button
      className="govuk-button"
      data-module="govuk-button"
      onClick={onClick}
    >
      {text}
    </button>
  </div>
);

export default Button;
