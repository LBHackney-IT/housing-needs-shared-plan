import { render } from '@testing-library/react';
import LegalText from './index';

describe('LegalText', () => {
  it('renders the legal text', () => {
    const text = 'the legal stuff';
    const { getByText } = render(<LegalText />);
    expect(getByText(text)).toBeInTheDocument();
  });
});
