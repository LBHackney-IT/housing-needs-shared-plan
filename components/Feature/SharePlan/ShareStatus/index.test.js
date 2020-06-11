import { render } from '@testing-library/react';
import ShareStatus from './index';

describe('Share status', () => {
  it('renders correct share status when not shared', () => {
    const firstName = 'Jon';
    const customerTokens = [
      {
        token: 'tada',
        createdDate: new Date(2020, 9, 2, 9, 31).toISOString(),
        shared: false
      }
    ];
    const { getByText } = render(
      <ShareStatus name={firstName} customerTokens={customerTokens} />
    );

    expect(getByText('Not yet shared with Jon')).toBeInTheDocument();
  });

  it('renders correct share status when shared', () => {
    const firstName = 'Jon';
    const customerTokens = [
      {
        token: 'abc',
        createdDate: new Date(2018, 9, 4, 5, 35).toISOString(),
        shared: true
      },
      {
        token: 'cba',
        createdDate: new Date(2017, 9, 4, 4, 18).toISOString(),
        shared: true
      },
      {
        token: 'tada',
        createdDate: new Date(2020, 9, 2, 9, 31).toISOString(),
        shared: false
      }
    ];
    const { getByText } = render(
      <ShareStatus name={firstName} customerTokens={customerTokens} />
    );

    expect(
      getByText('Last shared with Jon on 4th Oct, 5:35')
    ).toBeInTheDocument();
  });
});
