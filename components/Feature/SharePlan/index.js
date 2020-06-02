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

const SharePlan = ({ plan, email, number, onPlanShared }) => {
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
                label={number}
                onClick={handleSelectedCheck}
                method="SMS"
              />
            </TableData>
            <TableData className="lbh-actions-list__due-date">
              <Checkbox
                name="share-by-email"
                label={email}
                onClick={handleSelectedCheck}
                method="email"
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
