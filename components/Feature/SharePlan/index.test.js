import { render } from '@testing-library/react';
import SharePlan from './index';

describe('Share plan', () => {
  it('renders the share plan options', () => {
    const plan = {
      goal: {},
      numbers: ['test_number'],
      emails: ['test_email']
    };
    const { getByText } = render(<SharePlan plan={plan} />);

    expect(getByText('Share with collaborators')).toBeInTheDocument();
    expect(getByText('Collaborators')).toBeInTheDocument();
    expect(getByText('Share by SMS')).toBeInTheDocument();
    expect(getByText('test_number')).toBeInTheDocument();
    expect(getByText('test_email')).toBeInTheDocument();
  });

  it('renders correct share status', () => {
    const plan = {
      firstName: 'Jon',
      goal: {},
      numbers: ['test_number'],
      emails: ['test_email']
    };
    const { getByText } = render(<SharePlan plan={plan} />);

    expect(getByText('Not yet shared with Jon')).toBeInTheDocument();
  });

  it('renders correct share status', () => {
    const plan = {
      firstName: 'Jon',
      goal: {},
      tokens: [
        {
          token: 'abc',
          createdDate: new Date(2018, 9, 4, 5, 35).toISOString()
        },
        { token: 'cba', createdDate: new Date(2017, 9, 4, 4, 34).toISOString() }
      ],
      numbers: ['test_number'],
      emails: ['test_email']
    };
    const { getByText } = render(<SharePlan plan={plan} />);

    expect(
      getByText('Last shared with Jon at 4:34, 4th April 2017')
    ).toBeInTheDocument();
  });
});
