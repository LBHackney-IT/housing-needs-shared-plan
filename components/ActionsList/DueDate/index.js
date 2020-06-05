const format = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

const DueDate = ({ dateTime }) => (
  <time data-testid="due-date-test" dateTime={dateTime}>{format.format(new Date(dateTime))}</time>
);

export default DueDate;
