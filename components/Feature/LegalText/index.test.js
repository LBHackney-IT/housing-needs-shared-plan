import { render } from '@testing-library/react';
import LegalText from './index';

describe('LegalText', () => {
  it('renders the legal text', () => {
    const text = 'About this plan';
    const { getByText } = render(<LegalText />);
    expect(getByText(text)).toBeInTheDocument();
  });
});
