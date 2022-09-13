import { render } from '@testing-library/react';
import SharePlan from './index';
import userEvent from '@testing-library/user-event';
/**
 * @jest-environment jsdom
 */
describe('Share plan', () => {
  it('renders the share plan options', () => {
    const plan = {
      firstName: 'Sally',
      lastName: 'West',
      numbers: ['test_number'],
      emails: ['test_email']
    };
    const { getByText } = render(<SharePlan plan={plan} />);

    expect(getByText('Sally West')).toBeInTheDocument();
    expect(getByText('test_number')).toBeInTheDocument();
    expect(getByText('test_email')).toBeInTheDocument();
  });

  it('renders fixed number if it starts with 07', () => {
    const plan = {
      firstName: 'Sally',
      lastName: 'West',
      numbers: ['07666666666'],
      emails: []
    };
    const { getByText, queryByText } = render(<SharePlan plan={plan} />);

    expect(queryByText('07666666666')).toBeNull();
    expect(getByText('+447666666666')).toBeInTheDocument();
  });

  it('enables the share button when contact option is selected', () => {
    const plan = {
      numbers: ['123'],
      emails: []
    };
    const { getByLabelText, getByTestId } = render(<SharePlan plan={plan} />);
    getByLabelText('123').click();

    expect(getByTestId('share-plan-button').disabled).toBe(false);
  });

  xit('calls the onPlanShared handler when plan is shared', () => {
    const plan = {
      numbers: ['123'],
      emails: []
    };
    const onPlanShared = jest.fn();

    const { getByLabelText, getByTestId } = render(
      <SharePlan plan={plan} onPlanShared={onPlanShared} />
    );

    getByLabelText('123').click();
    getByTestId('share-plan-button').click();

    expect(onPlanShared).toHaveBeenCalled();
  });

  it('shows error message when there is an error', () => {
    const plan = {
      numbers: ['123'],
      emails: []
    };
    const { getByTestId } = render(<SharePlan error={true} plan={plan} />);

    expect(getByTestId('plan-not-shared-error-test')).toBeInTheDocument();
  });

  it('renders disabled checkbox when phone numbers and emails do not exist ', () => {
    const plan = {
      firstName: 'Sally',
      lastName: 'West',
      numbers: [],
      emails: []
    };
    const { getByLabelText } = render(<SharePlan plan={plan} />);

    expect(getByLabelText('No numbers found.').disabled).toBe(true);
    expect(getByLabelText('No emails found.').disabled).toBe(true);
  });

  it('renders input field and save button when edit phone number is clicked', async () => {
    const plan = {
      firstName: 'Sally',
      lastName: 'West',
      numbers: [],
      emails: []
    };
    const { getByTestId } = render(<SharePlan plan={plan} />);
    getByTestId('edit-number-button-test').click();

    await new Promise((r) => setTimeout(r, 500));

    expect(getByTestId('edit-number-input-test')).toBeInTheDocument();
    expect(getByTestId('save-number-button-test')).toBeInTheDocument();
  });
});
