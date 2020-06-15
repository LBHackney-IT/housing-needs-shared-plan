const Button = ({ onClick, text, isSecondary, ...others }) => (
  <button
    className={`lbh-button govuk-button${
      isSecondary ? ' govuk-button--secondary' : ''
      }`}
    data-module="govuk-button"
    onClick={onClick}
    {...others}
  >
    {text}
  </button>
);

export default Button;
