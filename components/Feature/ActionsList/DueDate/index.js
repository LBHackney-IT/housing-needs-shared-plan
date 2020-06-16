import moment from 'moment';

const DueDate = ({ dateTime }) => (
  <time data-testid="due-date-test" dateTime={dateTime}>
    {moment(dateTime).format('DD MMMM YYYY')}
  </time>
);

export default DueDate;
