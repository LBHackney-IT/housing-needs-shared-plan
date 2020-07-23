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

const SharePlan = ({ error, plan, customerUrl, onPlanShared }) => {
  const [selectedContact, setSelectedContact] = useState({});
  const [hasError, setHasError] = useState(false);
  const [editNumber, setEditNumber] = useState(false);
  const [numberText, setNumberText] = useState(plan.numbers?.[0] || '');

  const handleSelectEmail = e => {
    if (!e.target.value) return;
    const contact = selectedContact;
    e.target.checked ? (contact.email = e.target.value) : delete contact.email;
    setSelectedContact(contact);
  };

  const handleSelectNumber = e => {
    if (!e.target.value) return;
    const contact = selectedContact;
    e.target.checked
      ? (contact.number = e.target.value)
      : delete contact.number;
    setSelectedContact(contact);
  };

  const shareThePlan = () => {
    if (Object.keys(selectedContact).length === 0) {
      setHasError(true);
      return;
    }
    onPlanShared(selectedContact, customerUrl);
  };

  const getNumber = number => {
    if (!number) return 'No numbers found.';
    if (number.substring(0, 2) === '07') return '+44' + number.substring(1);
    else return number;
  };

  const saveNumber = () => {
    plan.numbers[0] = numberText;
    setEditNumber(false);
  };

  const handleNumberChange = e => {
    setNumberText(e.target.value);
  };

  return (
    <>
      <Heading as="h2" size="m">
        Share with collaborators
      </Heading>
      <Table className={css['share-plan__table']}>
        <TableHead>
          <TableRow>
            <TableHeader scope="col">Collaborators</TableHeader>
            <TableHeader scope="col">Share by SMS</TableHeader>
            <TableHeader scope="col">Share by email</TableHeader>
            <TableHeader scope="col">Share link to plan</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={`${plan.firstName}_${plan.lastName}`}>
            <TableData
              className={css['share-plan__collaborators-list']}
              data-testid="collaborator-name-row-test"
            >
              <Heading as="h3" size="s">
                {plan.firstName} {plan.lastName}
              </Heading>
            </TableData>
            <TableData
              className={css['share-plan__collaborators-list']}
              data-testid="share-by-sms-row-test"
            >
              {editNumber && (
                <input
                  onChange={handleNumberChange}
                  value={numberText}
                  autoFocus
                  data-testid="edit-number-input-test"
                />
              )}

              {editNumber && (
                <button
                  onClick={saveNumber}
                  className="govuk-details__summary-text"
                  data-testid="save-number-button-test"
                >
                  Save
                </button>
              )}

              {!editNumber && (
                <Checkbox
                  name="share-by-sms"
                  label={getNumber(plan.numbers[0])}
                  value={getNumber(plan.numbers[0])}
                  disabled={!plan.numbers[0]}
                  onClick={handleSelectNumber}
                />
              )}

              {!editNumber && (
                <a
                  onClick={() => setEditNumber(true)}
                  className="govuk-details__summary-text linkStyle"
                  data-testid="edit-number-button-test"
                >
                  Edit phone number
                </a>
              )}
            </TableData>
            <TableData
              className={css['share-plan__collaborators-list']}
              data-testid="share-by-email-row-test"
            >
              <Checkbox
                name="share-by-email"
                label={plan.emails[0] || 'No emails found.'}
                value={plan.emails[0] || 'No emails found.'}
                onClick={handleSelectEmail}
                disabled
              />
            </TableData>
            <TableData
              className={css['share-plan__collaborators-list']}
              data-testid="share-link-to-plan-row-test"
            >
              <Button
                className={`govuk-button ${css['share-link-to-plan__button']}`}
                data-module="govuk-button"
                data-testid="share-plan-button"
                onClick={shareThePlan}
                text="Share"
              />
              <div>
                <span className={`${css['customer-link-to-plan__label']}`}>
                  Unique customer link:{' '}
                </span>
                <a
                  href={customerUrl}
                  data-testid="shareable-link_test"
                  className={`${css['customer-link-to-plan__link']}`}
                >
                  {customerUrl}
                </a>
              </div>
              <ShareStatus
                name={plan.firstName}
                customerTokens={plan.customerTokens}
              />
              {error && (
                <span
                  className="govuk-error-message"
                  data-testid="plan-not-shared-error-test"
                >
                  Something went wrong. The plan could not be shared.
                </span>
              )}
              {hasError && (
                <span id={`${name}-error`} className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> Please
                  select at least one sharing option
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
