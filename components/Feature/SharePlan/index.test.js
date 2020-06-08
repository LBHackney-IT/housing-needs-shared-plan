import { render } from '@testing-library/react';
import SharePlan from './index';

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

  it('renders disabled share button if no contact options are selected', () => {
    const plan = {
      numbers: [],
      emails: []
    };
    const { getByText } = render(<SharePlan plan={plan} />);

    expect(getByText('Share').disabled).toBe(true);
  });

  it('enables the share button when contact option is selected', () => {
    const plan = {
      numbers: ['123'],
      emails: []
    };
    const { getByLabelText, getByText } = render(<SharePlan plan={plan} />);
    getByLabelText('123').click();

    expect(getByText('Share').disabled).toBe(false);
  });

  it('calls the onPlanShared handler when plan is shared', () => {
    const plan = {
      numbers: ['123'],
      emails: []
    };
    const onPlanShared = jest.fn();

    const { getByLabelText, getByText } = render(
      <SharePlan plan={plan} onPlanShared={onPlanShared} />
    );

    getByLabelText('123').click();
    getByText('Share').click();

    expect(onPlanShared).toHaveBeenCalled();
  });

  it('shows error message when there is an error', () => {
    const plan = {
      numbers: ['123'],
      emails: []
    };
    const { getByText } = render(<SharePlan error={true} plan={plan} />);

    expect(getByText('Something went wrong')).toBeInTheDocument();
  });
});
