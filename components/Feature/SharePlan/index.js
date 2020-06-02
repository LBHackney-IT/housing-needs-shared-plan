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
          <TableRow>
            <TableData>
              <Heading as="h3" size="s">
                {plan.firstName} {plan.lastName}
              </Heading>
            </TableData>
            <TableData className="lbh-actions-list__due-date">
              <Checkbox
                name="share-by-sms"
                label={plan.numbers ? plan.numbers[0] : 'no number'}
                onClick={handleSelectedCheck}
                method="SMS"
              />
              <Button
                text="Edit phone number"
                className={css['share-plan__edit-contact-details-button']}
              />
            </TableData>
            <TableData className="lbh-actions-list__due-date">
              <Checkbox
                name="share-by-email"
                label={plan.emails ? plan.emails[0] : 'no email'}
                onClick={handleSelectedCheck}
                method="email"
              />
              <Button
                text="Edit email address"
                className={css['share-plan__edit-contact-details-button']}
              />
            </TableData>
            <TableData className="lbh-actions-list__due-date">
              <Button
                text="Share"
                onClick={() => onPlanShared(selectedContact)}
              />
            </TableData>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default SharePlan;
