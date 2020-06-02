import React from 'react';
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

const SharePlan = ({ plan, onPlanShared }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedContact, setSelectedContact] = useState('');

  const handleSelectedCheck = e => {
    setSelectedMethod(e.target.method);
    setSelectedContact(e.target.label);
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
          {plan.numbers.map((number, i) => (
            <TableRow>
              <TableData>
                <Heading as="h3" size="s">
                  {plan.firstName} {plan.lastName}
                </Heading>
              </TableData>
              <TableData className="lbh-actions-list__due-date">
                <Checkbox
                  name="share-by-sms"
                  label={number || ''}
                  onClick={handleSelectedCheck}
                  method="SMS"
                />
              </TableData>
              <TableData className="lbh-actions-list__due-date">
                <Checkbox
                  name="share-by-email"
                  label={plan.emails ? plan.emails[i] : ''}
                  onClick={handleSelectedCheck}
                  method="email"
                  disabled
                />
              </TableData>
              <TableData className="lbh-actions-list__due-date">
                <button
                  className={`govuk-button ${css['share-link-to-plan__button']}`}
                  data-module="govuk-button"
                  onClick={() => onPlanShared(selectedContact)}
                >
                  Share
                </button>
                <label className={`govuk-label ${css['share-plan_status']}`}>
                  Not yet shared with {plan.firstName}
                </label>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SharePlan;
