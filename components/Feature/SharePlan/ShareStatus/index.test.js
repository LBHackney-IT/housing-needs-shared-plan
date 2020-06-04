import { render } from '@testing-library/react';
import ShareStatus from './index';

describe('Share status', () => {
  it('renders correct share status when not shared', () => {
    const plan = {
      firstName: 'Jon',
      goal: {},
      numbers: ['test_number'],
      emails: ['test_email']
    };
    const { getByText } = render(<ShareStatus plan={plan} />);

    expect(getByText('Not yet shared with Jon')).toBeInTheDocument();
  });

  it('renders correct share status when shared', () => {
    const plan = {
      firstName: 'Jon',
      goal: {},
      customerTokens: [
        {
          token: 'abc',
          createdDate: new Date(2018, 9, 4, 5, 35).toISOString()
        },
        { token: 'cba', createdDate: new Date(2017, 9, 4, 4, 34).toISOString() }
      ],
      numbers: ['test_number'],
      emails: ['test_email']
    };
    const { getByText } = render(<ShareStatus plan={plan} />);

    expect(
      getByText('Last shared with Jon at 4 October 2018 at 5:35')
    ).toBeInTheDocument();
  });
});
