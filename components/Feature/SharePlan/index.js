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

  return (
    <>
      <Heading as="h2" size="m">
        Share with collaborators
      </Heading>
      <div
        className={`${css['share-plan__grid']} ${css['share-plan__collaborators-list-header-row']}`}
        data-testid="share-plan-header-row"
      >
        <div className={css['collaborator']}>Collaborators</div>
        <div className={css['sms']}>Share by SMS</div>
        <div className={css['email']}>Share by email</div>
        <div className={css['share']}>Share link to plan</div>
      </div>

      <div
        className={css['share-plan__grid']}
        key={`${plan.firstName}_${plan.lastName}`}
      >
        <div
          className={css['collaborator']}
          data-testid="collaborator-name-row-test"
        >
          <Heading as="h3" size="s">
            {plan.firstName} {plan.lastName}
          </Heading>
        </div>
        <div className={css['sms']} data-testid="share-by-sms-row-test">
          <Checkbox
            name="share-by-sms"
            label={getNumber(plan.numbers[0])}
            value={getNumber(plan.numbers[0])}
            disabled={!plan.numbers[0]}
            onClick={handleSelectNumber}
          />
        </div>
        <div className={css['email']} data-testid="share-by-email-row-test">
          <Checkbox
            name="share-by-email"
            label={plan.emails[0] || 'No emails found.'}
            value={plan.emails[0] || 'No emails found.'}
            onClick={handleSelectEmail}
            disabled
          />
        </div>
        <div className={css['share']} data-testid="share-link-to-plan-row-test">
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
            <span className="govuk-error-message">
              Something went wrong. The plan could not be shared.
            </span>
          )}
          {hasError && (
            <span id={`${name}-error`} className="govuk-error-message">
              <span className="govuk-visually-hidden">Error:</span> Please
              select at least one sharing option
            </span>
          )}
        </div>
      </div>

      <div className="govuk-form-group">
        <fieldset className="govuk-fieldset" aria-describedby="waste-hint">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">
              Which types of waste do you transport?
            </h1>
          </legend>
          <span id="waste-hint" className="govuk-hint">
            Select all that apply.
          </span>
          <div className="govuk-checkboxes">
            <Checkbox
              name="share-by-sms"
              label={getNumber(plan.numbers[0])}
              value={getNumber(plan.numbers[0])}
              disabled={!plan.numbers[0]}
              onClick={handleSelectNumber}
            />
            <Checkbox
              name="share-by-email"
              label={plan.emails[0] || 'No emails found.'}
              value={plan.emails[0] || 'No emails found.'}
              onClick={handleSelectEmail}
              disabled
            />
          </div>
        </fieldset>
      </div>

      <main className="govuk-main-wrapper">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-quarter">
            <Heading as="h3" size="s">
              Collaborators
            </Heading>
            <div
              className={css['collaborator']}
              data-testid="collaborator-name-row-test"
            >
              <div>
                {plan.firstName} {plan.lastName}
              </div>
            </div>
          </div>
          <div className="govuk-grid-column-one-quarter">
            <Heading as="h3" size="s">
              Collaborators
            </Heading>
            <Checkbox
              name="share-by-sms"
              label={getNumber(plan.numbers[0])}
              value={getNumber(plan.numbers[0])}
              disabled={!plan.numbers[0]}
              onClick={handleSelectNumber}
            />
          </div>
          <div className="govuk-grid-column-one-quarter">
            <Heading as="h3" size="s">
              Collaborators
            </Heading>
            <Checkbox
              name="share-by-email"
              label={plan.emails[0] || 'No emails found.'}
              value={plan.emails[0] || 'No emails found.'}
              onClick={handleSelectEmail}
              disabled
            />
          </div>
          <div className="govuk-grid-column-one-quarter">
            <Heading as="h3" size="s">
              Collaborators
            </Heading>
            <div>
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
                <span className="govuk-error-message">
                  Something went wrong. The plan could not be shared.
                </span>
              )}
              {hasError && (
                <span id={`${name}-error`} className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> Please
                  select at least one sharing option
                </span>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SharePlan;
