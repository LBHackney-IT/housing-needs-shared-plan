import Checkbox from 'components/Form/Checkbox';
import Details from 'components/Form/Details';
import DueDate from './DueDate';
import Heading from 'components/Heading';
import Table, {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData
} from 'components/Table';
import styles from './index.module.scss';

const ActionsList = ({ actions, onActionToggled }) => {
  return (
    <>
      <Heading as="h2" size="m">
        Our Actions
      </Heading>
      {actions.length > 0 && (
        <Table className={styles['lbh-actions-list__table']}>
          <TableHead>
            <TableRow className={styles['lbh-actions-list__header']}>
              <TableHeader
                scope="col"
                className={styles['lbh-actions-list__complete']}
              >
                Complete?
              </TableHeader>
              <TableHeader scope="col">Description</TableHeader>
              <TableHeader
                scope="col"
                className={styles['lbh-actions-list__due-date']}
              >
                Due date
              </TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {actions.map(action => (
              <TableRow key={action.id}>
                <TableData className={styles['lbh-actions-list__complete']}>
                  <Checkbox
                    aria-label="Completed?"
                    checked={action.isCompleted}
                    data-testid="action-checkbox"
                    name="completed"
                    onChange={event => {
                      onActionToggled({
                        actionId: action.id,
                        isCompleted: event.target.checked
                      });
                    }}
                  />
                </TableData>
                <TableData
                  className={styles['lbh-actions-list__description']}
                  data-testid="action-details-test"
                >
                  <Heading as="h2" size="m">
                    {action.summary}
                  </Heading>
                  {action.description && (
                    <Details title="Show details" color="#00513f">
                      {action.description}
                    </Details>
                  )}
                  <div
                    className={styles['lbh-actions-list__descriptions-mobile']}
                  >
                    Due <DueDate dateTime={action.dueDate} />
                  </div>
                </TableData>
                <TableData className={styles['lbh-actions-list__due-date']}>
                  <DueDate dateTime={action.dueDate} />
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default ActionsList;
