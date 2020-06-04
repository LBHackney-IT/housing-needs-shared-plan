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

  return (
    <>
      <Heading as="h2" size="m">
        Share with collaborators
      </Heading>
      <Table className="lbh-actions-list__table">
        <TableHead>
          <TableRow className="">
            <TableHeader scope="col">Collaborators</TableHeader>
            <TableHeader scope="col">Share by SMS</TableHeader>
            <TableHeader scope="col">Share by email</TableHeader>
            <TableHeader scope="col">Share link to plan</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={`${plan.firstName}_${plan.lastName}`}>
            <TableData className="share-plan__collaborators-list">
              <Heading as="h3" size="s">
                {plan.firstName} {plan.lastName}
              </Heading>
            </TableData>
            <TableData className="share-plan__collaborators-list">
              <Checkbox
                name="share-by-sms"
                label={plan.numbers[0] || ''}
                value={plan.numbers[0] || ''}
                onClick={handleSelectNumber}
              />
            </TableData>
            <TableData className="share-plan__collaborators-list">
              <Checkbox
                name="share-by-email"
                label={plan.emails[0] || ''}
                value={plan.emails[0] || ''}
                onClick={handleSelectEmail}
                disabled
              />
            </TableData>
            <TableData className="share-plan__collaborators-list">
              <Button
                className={`govuk-button ${css['share-link-to-plan__button']}`}
                data-module="govuk-button"
                onClick={shareThePlan}
                text="Share"
                disabled={disableShare}
              />
              <ShareStatus plan={plan} />
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
