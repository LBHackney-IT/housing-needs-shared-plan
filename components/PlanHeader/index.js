import { getPossessiveName } from 'lib/utils/name';

const PlanHeader = ({ firstName, lastName }) => (
  <h1>{getPossessiveName(firstName, lastName)} shared plan</h1>
);

export default PlanHeader;
