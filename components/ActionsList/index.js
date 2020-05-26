import DueDate from './DueDate';
import Heading from 'components/Heading';
import Table, {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData
} from 'components/Table';

const ActionsList = ({ actions }) => (
  <Table>
    <TableHead>
      <TableRow className="lbh-actions-list__header">
        <TableHeader scope="col">Description</TableHeader>
        <TableHeader scope="col" className="lbh-actions-list__due-date">
          Due date
        </TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {actions.map(action => (
        <TableRow key={action.title}>
          <TableData>
            <Heading as="h2" size="m">
              {action.title}
            </Heading>
          </TableData>
          <TableData className="lbh-actions-list__due-date">
            <DueDate dateTime={action.dueDate} />
          </TableData>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ActionsList;
