import css from './index.module.scss';

const Details = ({ color, children, title }) => (
  <details
    className={`govuk-details ${css['lbh-details']}`}
    data-module="govuk-details"
  >
    <summary
      className={`govuk-details__summary ${css['lbh-details__summary']}`}
      style={color && { color: `${color}` }}
      data-testid="details-summary"
    >
      <span className="govuk-details__summary-text">{title}</span>
    </summary>
    <div className={`govuk-details__text ${css['lbh-details__text']}`} data-testid="details_text">
      {children}
    </div>
  </details>
);

export default Details;
