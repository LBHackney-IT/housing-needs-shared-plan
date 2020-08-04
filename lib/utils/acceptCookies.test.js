import {
  acceptedCookieIsSet,
  userHasAcceptedCookies,
  setAcceptedCookie
} from './acceptCookies.js';
import Cookies from 'js-cookie';
jest.mock('js-cookie');

describe('Accept cookies', () => {
  describe('acceptedCookieIsSet', () => {
    it('returns false if no cookies', () => {
      const result = acceptedCookieIsSet();
      expect(result).toEqual(false);
    });

    it('returns false if no cookies-accepted cookie', () => {
      Cookies.get.mockReturnValue(undefined);
      const result = acceptedCookieIsSet({});
      expect(result).toEqual(false);
    });

    it('returns true if cookies-accepted cookie', () => {
      Cookies.get.mockReturnValue(false);
      const result = acceptedCookieIsSet({});
      expect(result).toEqual(true);
    });
  });

  describe('userHasAcceptedCookies', () => {
    it('return true if user has accepted cookies', () => {
      Cookies.get.mockReturnValue(true);
      const result = userHasAcceptedCookies({});
      expect(result).toEqual(true);
    });

    it('return false if user has accepted cookies', () => {
      Cookies.get.mockReturnValue(false);
      const result = userHasAcceptedCookies({});
      expect(result).toEqual(false);
    });
  });

  describe('setAcceptedCookie', () => {
    beforeEach(() => {
      Date.now = jest.fn(() => 0); // 2019-10-30T00:00Z0 (GMT)
    });

    it('sets the cookies-accepted cookie', () => {
      setAcceptedCookie(true);
      expect(Cookies.set).toHaveBeenCalledWith('cookies-accepted', true, {
        expires: 365
      });
    });
  });
});
