/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import CookieBanner from './index';
import { acceptedCookieIsSet } from 'lib/utils/acceptCookies';
jest.mock('lib/utils/acceptCookies');

describe('CookieBanner', () => {
  it('renders the cookie banner if cookie not set', () => {
    acceptedCookieIsSet.mockImplementationOnce(() => false);
    const { container } = render(<CookieBanner />);
    expect(
      container.querySelector('#global-cookie-message')
    ).toBeInTheDocument();
  });

  it('dones not render the cookie banner if cookie set', () => {
    acceptedCookieIsSet.mockImplementationOnce(() => true);
    const { container } = render(<CookieBanner />);
    expect(
      container.querySelector('#global-cookie-message')
    ).not.toBeInTheDocument();
  });
});
