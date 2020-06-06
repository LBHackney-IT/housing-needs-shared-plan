import css from '../index.module.scss';

const formatDate = date => {
  return new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long'
  }).format(date);
};

const ShareStatus = ({ name, customerTokens }) => {
  let shareStatus = `Not yet shared with ${name}`;

  if (customerTokens?.length > 1) {
    const dateTimes = customerTokens
      .map(token => new Date(token.createdDate))
      .sort((a, b) => {
        return Date.parse(b) - Date.parse(a);
      });

    const shareTime = formatDate(dateTimes[0]);

    shareStatus = `Last shared with ${name} on ${shareTime}`;
  }

  return <span className={`${css['share-plan_status']}`}>{shareStatus}</span>;
};

export default ShareStatus;
