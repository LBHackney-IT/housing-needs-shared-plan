import css from './index.module.scss';

const LegalText = () => {
  return (
    <div className={css['legal-text']}>
      <h3>About this plan</h3>
      <p>
        The Council gives you a personal housing plan after your assessment. The
        aim of the plan is to try and make sure you have somewhere suitable to
        live for at least the next 6 months. It sets out the steps that you and
        the Council must take to:
      </p>
      <ul>
        <li>stop you becoming homeless</li>
        <li>find housing if you've already lost your home</li>
      </ul>
      <p>
        The Council asks you to agree to any steps included in the plan. If you
        don't agree, the Council decides what steps you must take and records
        the reasons you disagree on the plan.
      </p>

      <details className="govuk-details" data-module="govuk-details">
        <summary className="govuk-details__summary">
          <span className="govuk-details__summary-text">
            About the Council’s duty to you
          </span>
        </summary>
        <div className="govuk-details__text">
          This duty to prevent your homelessness will come to an end if the
          Council notifies you that it is satisfied that:
          <ul>
            <li>
              Suitable accommodation is available for your occupation and there
              is a reasonable prospect that it will continue to be available to
              you for at least six months from the date of this notice; or
            </li>

            <li>
              a period of 56 days has elapsed, from the date of this notice; or
            </li>

            <li>
              you refuse a suitable offer of accommodation and there is a
              reasonable prospect that the accommodation would have been
              available for your occupation for a period of at least six months;
              or
            </li>
            <li>
              you have become homeless intentionally from any accommodation
              which the Council has made available to you as a result of our
              functions under s195; or
            </li>
            <li>you are no longer eligible for homelessness assistance; or</li>
            <li>you become homeless; or</li>
            <li>
              you withdraw your application for homelessness assistance; or
            </li>
            <li>
              you have been notified that you have deliberately and unreasonably
              refused to cooperate with the council or have deliberately and
              unreasonably refused to undertake one or more of the actions
              agreed within your personal housing plan.
            </li>
          </ul>
        </div>
      </details>
    </div>
  );
};

export default LegalText;
