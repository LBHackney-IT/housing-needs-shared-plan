import { Button, ButtonGroup, Checkbox, Details } from 'components/Form';
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
import ReactMarkdown from 'react-markdown/with-html';

const ActionsList = ({
  actions,
  onActionToggled,
  onEditAction,
  onActionDeleted,
  officerName
}) => {
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
                    aria-labeledby={`completed-${action.id}`}
                    checked={action.isCompleted}
                    data-testid="action-checkbox"
                    name={`completed-${action.id}`}
                    label={`Completed ${action.summary} checkbox`}
                    hidden={true}
                    disabled={!onActionToggled}
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
                      <ReactMarkdown
                        source={action.description.replace(
                          new RegExp('\n', 'g'),
                          '  \n'
                        )}
                      />
                    </Details>
                  )}
                  {action.created && (
                    <div data-testid="action-added-message">
                      Added on <DueDate dateTime={action.created} /> by{' '}
                      {action.addedBy || officerName}.
                    </div>
                  )}
                  {action.isCompleted && (
                    <div data-testid="completion-message">
                      Marked as complete on{' '}
                      <DueDate dateTime={action.completedDate} /> by{' '}
                      {action.completedBy}.
                    </div>
                  )}
                  <div
                    className={styles['lbh-actions-list__descriptions-mobile']}
                  >
                    Due <DueDate dateTime={action.dueDate} />
                    <ButtonGroup>
                      {onEditAction && (
                        <Button
                          text="Edit"
                          isSecondary={true}
                          data-testid="edit-action-button-mobile-test"
                          onClick={() => onEditAction(action.id)}
                        />
                      )}
                      {onActionDeleted && (
                        <Button
                          text="Delete"
                          isSecondary={true}
                          data-testid={`actions-list-button-mobile-delete-${action.id}`}
                          onClick={() =>
                            onActionDeleted({ actionId: action.id })
                          }
                        />
                      )}
                    </ButtonGroup>
                  </div>
                </TableData>
                <TableData className={styles['lbh-actions-list__due-date']}>
                  <DueDate dateTime={action.dueDate} />
                  <ButtonGroup>
                    {onEditAction && (
                      <Button
                        text="Edit"
                        isSecondary={true}
                        data-testid="edit-action-button-test"
                        onClick={() => onEditAction(action.id)}
                      />
                    )}
                    {onActionDeleted && (
                      <Button
                        text="Delete"
                        isSecondary={true}
                        data-testid={`actions-list-button-delete-${action.id}`}
                        onClick={() => onActionDeleted({ actionId: action.id })}
                      />
                    )}
                  </ButtonGroup>
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
