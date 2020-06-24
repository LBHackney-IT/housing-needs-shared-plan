import css from '../index.module.scss';
import moment from 'moment';

const ShareStatus = ({ name, customerTokens }) => {
  let shareStatus = `Not yet shared with ${name}`;

  const sharedTokens = customerTokens?.filter(token => token.sharedDate);

  if (sharedTokens?.length > 0) {
    const sortedTokens = sharedTokens.sort((a, b) => {
      return Date.parse(b.sharedDate) - Date.parse(a.sharedDate);
    });

    const shareTime = moment(sortedTokens[0].sharedDate).format('Do MMM, h:mm');

    shareStatus = `Last shared with ${name} on ${shareTime}`;
  }

  return <span className={`${css['share-plan_status']}`}>{shareStatus}</span>;
};

export default ShareStatus;
