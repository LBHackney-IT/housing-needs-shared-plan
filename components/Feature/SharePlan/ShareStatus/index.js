import css from '../index.module.scss';

const formatDate = date => {
  return new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const ShareStatus = ({ plan }) => {
  let shareStatus = `Not yet shared with ${plan.firstName}`;

  if (plan.customerTokens?.length > 1) {
    const dateTimes = plan.customerTokens
      .map(token => new Date(token.createdDate))
      .sort((a, b) => {
        return Date.parse(b) - Date.parse(a);
      });

    const shareTime = formatDate(dateTimes[0]);

    shareStatus = `Last shared with ${plan.firstName} at ${shareTime}`;
  }

  return <span className={`${css['share-plan_status']}`}>{shareStatus}</span>;
};

export default ShareStatus;
