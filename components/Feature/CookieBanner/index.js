import React, { useState, useEffect } from 'react';
import ButtonGroup from '../../Form/ButtonGroup';

const deleteCookies = () => {
  document.cookie = '_ga=; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  document.cookie = '_gid=; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  document.cookie =
    '_gat_UA-168604600-1=; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
};

const CookieBanner = () => {
  const [cookieState, setCookieState] = useState('unread');

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const cookiesPreferencesSet = cookies
      .find(c => c.trim().startsWith('cookies_preferences_set'))
      ?.split('=')?.[1];

    if (cookiesPreferencesSet === 'true') {
      setCookieState('set');
    } else {
      setCookieState('unset');
    }
  }, []);

  const handleAccept = () => {
    const today = new Date(),
      [year, month, day] = [
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      ],
      cookieExpiryDate = new Date(year + 1, month, day).toUTCString();

    document.cookie = `cookies_preferences_set=true; expires=${cookieExpiryDate};`;
    document.cookie = `cookies_accepted=true; expires=${cookieExpiryDate};`;
    window['ga-disable-UA-168604600-1'] = false;
    setCookieState('set');
  };

  const handleDecline = () => {
    const today = new Date(),
      [year, month, day] = [
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      ],
      cookieExpiryDate = new Date(year + 1, month, day).toUTCString();
    deleteCookies();
    document.cookie = `cookies_preferences_set=true; expires=${cookieExpiryDate};`;
    document.cookie = `cookies_accepted=false; expires=${cookieExpiryDate};`;
    setCookieState('set');
  };

  if (cookieState === 'unset') {
    return (
      <div
        id="global-cookie-message"
        className="gem-c-cookie-banner govuk-clearfix"
        data-module="cookie-banner"
        role="region"
        aria-label="cookie banner"
        data-nosnippet=""
        style={{ display: 'block' }}
      >
        <div className="gem-c-cookie-banner__wrapper govuk-width-container">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <div className="gem-c-cookie-banner__message">
                <span className="govuk-heading-m">
                  Tell us whether you accept cookies
                </span>
                <p className="govuk-body">
                  We use{' '}
                  <a
                    href="https://hackney.gov.uk/privacy"
                    className="govuk-link"
                  >
                    cookies to collect information
                  </a>{' '}
                  about how you use this site. We use this information to make
                  the website work as well as possible.
                </p>
              </div>
              <div className="gem-c-cookie-banner__buttons gem-c-cookie-banner__buttons--flex">
                <ButtonGroup>
                  <button
                    className="gem-c-button govuk-button gem-c-button--inline"
                    type="submit"
                    data-module="track-click"
                    data-accept-cookies="true"
                    data-track-category="cookieBanner"
                    onClick={handleAccept}
                  >
                    Yes
                  </button>
                  <button
                    className="gem-c-button govuk-button gem-c-button--inline"
                    type="submit"
                    data-module="track-click"
                    data-track-category="cookieBanner"
                    onClick={handleDecline}
                  >
                    No
                  </button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default CookieBanner;
