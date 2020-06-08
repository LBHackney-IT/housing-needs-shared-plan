import DueDate from './DueDate';
import Details from 'components/Form/Details';
import Heading from 'components/Heading';
import Table, {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData
} from 'components/Table';
import css from './index.module.scss';

const ActionsList = ({ actions }) => {
  return (
    <>
      {actions.length > 0 && (
        <Table className={css['lbh-actions-list__table']}>
          <TableHead>
            <TableRow className={css['lbh-actions-list__header']}>
              <TableHeader scope="col">Description</TableHeader>
              <TableHeader
                scope="col"
                className={css['lbh-actions-list__due-date']}
              >
                Due date
              </TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {actions.map(action => (
              <TableRow key={action.summary}>
                <TableData className={css['lbh-actions-list__description']}>
                  <Heading as="h2" size="m">
                    {action.summary}
                  </Heading>
                  {action.description && (
                    <Details title={'Show details'} color={'#00513f'}>
                      {action.description}
                    </Details>
                  )}
                  <div className={css['lbh-actions-list__descriptions-mobile']}>
                    Due <DueDate dateTime={action.dueDate} />
                  </div>
                </TableData>
                <TableData className={css['lbh-actions-list__due-date']}>
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
