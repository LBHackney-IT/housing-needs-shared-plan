import { render } from '@testing-library/react';
import ShareableLink from './index';

describe('Shareable link', () => {
  it('Renders correct link after clicking show unique link', () => {
    const customerUrl = 'Magic_link';
    const { getByText } = render(<ShareableLink customerUrl={customerUrl} />);

    expect(getByText('Show unique link')).toBeInTheDocument();
    getByText('Show unique link').click();
    expect(getByText('Magic_link')).toBeInTheDocument();
  });
});
