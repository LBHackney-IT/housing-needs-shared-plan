import React, { useState, useEffect } from 'react';
import TagManager from 'react-gtm-module';
import ButtonGroup from '../../Form/ButtonGroup';
import {
  acceptedCookieIsSet,
  setAcceptedCookie,
  userHasAcceptedCookies
} from 'lib/utils/acceptCookies';

const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cookieIsSet = acceptedCookieIsSet(document.cookie);
    if (!cookieIsSet || userHasAcceptedCookies(document.cookie)) {
      TagManager.initialize({
        gtmId: process.env.NEXT_PUBLIC_GTM_ID
      });
    }
    setShow(!cookieIsSet);
  });

  const handleAccept = () => {
    setAcceptedCookie(true);
    setShow(false);
  };

  const handleDecline = () => {
    setAcceptedCookie(false);
    setShow(false);
  };

  return (
    <>
      {show && (
        <div
          id="global-cookie-message"
          className="gem-c-cookie-banner govuk-clearfix"
          role="region"
          aria-label="cookie banner"
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
                      data-testid="cookies-yes-button-test"
                      onClick={handleAccept}
                    >
                      Yes
                    </button>
                    <button
                      className="gem-c-button govuk-button gem-c-button--inline"
                      type="submit"
                      data-testid="cookies-no-button-test"
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
      )}
    </>
  );
};

export default CookieBanner;
