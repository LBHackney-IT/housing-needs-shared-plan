import { getHackneyToken, getUsername } from 'lib/utils/cookie';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
jest.mock('js-cookie');
jest.mock('jsonwebtoken');

describe('Cookies', () => {
  describe('getHackneyToken', () => {
    it('gets the token', () => {
      getHackneyToken();
      expect(Cookies.get).toHaveBeenCalledWith('hackneyToken');
    });
  });

  describe('getUsername', () => {
    it('returns name if cookie contains name', () => {
      Cookies.get.mockReturnValue({});
      jwt.decode.mockReturnValue({ name: 'Matt' });
      const result = getUsername();
      expect(result).toEqual('Matt');
    });

    it('returns falsy if cookie cant be decoded', () => {
      Cookies.get.mockReturnValue({});
      jwt.decode.mockReturnValue();
      const result = getUsername();
      expect(result).toBeFalsy();
    });

    it('returns falsy if no cookie', () => {
      Cookies.get.mockReturnValue();
      const result = getUsername();
      expect(result).toBeFalsy();
    });
  });
});
