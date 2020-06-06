import { render } from '@testing-library/react';
import ShareStatus from './index';

describe('Share status', () => {
  it('renders correct share status when not shared', () => {
    const firstName = 'Jon';
    const { getByText } = render(<ShareStatus name={firstName} />);

    expect(getByText('Not yet shared with Jon')).toBeInTheDocument();
  });

  it('renders correct share status when shared', () => {
    const firstName = 'Jon';
    const customerTokens = [
      {
        token: 'abc',
        createdDate: new Date(2018, 9, 4, 5, 35).toISOString()
      },
      { token: 'cba', createdDate: new Date(2017, 9, 4, 4, 34).toISOString() }
    ];
    const { getByText } = render(
      <ShareStatus name={firstName} customerTokens={customerTokens} />
    );

    expect(
      getByText('Last shared with Jon on 4 October at 5:35')
    ).toBeInTheDocument();
  });
});
