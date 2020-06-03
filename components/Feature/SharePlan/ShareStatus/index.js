import css from '../index.module.scss';

const formatter = new Intl.DateTimeFormat('en-GB', {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

const ShareStatus = ({ plan }) => {
  let shareStatus = `Not yet shared with ${plan.firstName}`;

  if (plan.tokens?.length > 1) {
    const times = plan.tokens.map(token => new Date(token.createdDate));

    const orderedTimes = times.sort((a, b) => {
      return Date.parse(a) - Date.parse(b);
    });

    const shareTime = formatter.format(orderedTimes[0]);

    shareStatus = `Last shared with ${plan.firstName} at ${shareTime}`;
  }

  return (
    <label className={`govuk-label ${css['share-plan_status']}`}>
      {shareStatus}
    </label>
  );
};

export default ShareStatus;
