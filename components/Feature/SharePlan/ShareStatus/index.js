import css from '../index.module.scss';
import { Token } from 'lib/domain';

const suffixes = new Map([
  ['one', 'st'],
  ['two', 'nd'],
  ['few', 'rd'],
  ['other', 'th']
]);

const formatOrdinals = n => {
  const rule = new Intl.PluralRules('en-GB', {
    type: 'ordinal'
  }).select(n);

  const suffix = suffixes.get(rule);
  return `${n}${suffix}`;
};

const formatDate = date => {
  return `${formatOrdinals(date.getDay())} 
    ${new Intl.DateTimeFormat('en-GB', {
      hour: 'numeric',
      minute: 'numeric',
      month: 'long'
    }).format(date)}`;
};

const ShareStatus = ({ name, customerTokens }) => {
  let shareStatus = `Not yet shared with ${name}`;

  const sharedTokens = customerTokens?.filter(token => token.sharedDate);

  if (sharedTokens?.length > 0) {
    const sortedTokens = sharedTokens.sort((a, b) => {
      return Date.parse(b.sharedDate) - Date.parse(a.sharedDate);
    });

    const shareTime = formatDate(new Date(sortedTokens[0].sharedDate));

    shareStatus = `Last shared with ${name} on ${shareTime}`;
  }

  return <span className={`${css['share-plan_status']}`}>{shareStatus}</span>;
};

export default ShareStatus;
