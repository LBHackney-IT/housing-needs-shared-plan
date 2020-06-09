import { useState } from 'react';
import Table, {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData
} from 'components/Table';
import { Button, Checkbox } from 'components/Form';
import Heading from 'components/Heading';
import css from './index.module.scss';
import ShareStatus from './ShareStatus';

const SharePlan = ({ error, plan, onPlanShared }) => {
  const [selectedContact, setSelectedContact] = useState({});
  const [disableShare, setDisableShare] = useState(true);

  const handleSelectEmail = e => {
    if (!e.target.value) return;
    const contact = selectedContact;
    e.target.checked ? (contact.email = e.target.value) : delete contact.email;
    setSelectedContact(contact);
    setDisableShare(Object.keys(selectedContact).length === 0);
  };

  const handleSelectNumber = e => {
    if (!e.target.value) return;
    const contact = selectedContact;
    e.target.checked
      ? (contact.number = e.target.value)
      : delete contact.number;
    setSelectedContact(contact);
    setDisableShare(Object.keys(selectedContact).length === 0);
  };

  const shareThePlan = () => {
    onPlanShared(selectedContact);
  };

  const getNumber = number => {
    if (!number) return '';
    if (number.substring(0, 2) === '07') return '+44' + number.substring(1);
    else return number;
  };

  return (
    <>
      <Heading as="h2" size="m">
        Share with collaborators
      </Heading>
      <Table className={css['share-plan__table']}>
        <TableHead>
          <TableRow className={css['share-plan__collaborators-list-headers']}>
            <TableHeader scope="col">Collaborators</TableHeader>
            <TableHeader scope="col">Share by SMS</TableHeader>
            <TableHeader scope="col">Share by email</TableHeader>
            <TableHeader scope="col">Share link to plan</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            className={css['share-plan__collaborators-list-row']}
            key={`${plan.firstName}_${plan.lastName}`}
          >
            <TableData className={css['share-plan__collaborators-list']}>
              <Heading as="h3" size="s">
                {plan.firstName} {plan.lastName}
              </Heading>
            </TableData>
            <TableData className={css['share-plan__collaborators-list']}>
              <Checkbox
                name="share-by-sms"
                label={getNumber(plan.numbers[0])}
                value={getNumber(plan.numbers[0])}
                onClick={handleSelectNumber}
              />
            </TableData>
            <TableData className={css['share-plan__collaborators-list']}>
              <Checkbox
                name="share-by-email"
                label={plan.emails[0] || ''}
                value={plan.emails[0] || ''}
                onClick={handleSelectEmail}
                disabled
              />
            </TableData>
            <TableData className={css['share-plan__collaborators-list-button']}>
              <Button
                className={`govuk-button ${css['share-link-to-plan__button']}`}
                data-module="govuk-button"
                onClick={shareThePlan}
                text="Share"
                disabled={disableShare}
              />
              <ShareStatus
                name={plan.firstName}
                customerTokens={plan.customerTokens}
              />
              {error && (
                <span className="govuk-error-message">
                  Something went wrong
                </span>
              )}
            </TableData>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default SharePlan;
