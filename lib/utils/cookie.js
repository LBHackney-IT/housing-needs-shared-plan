import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const getHackneyToken = function() {
  return Cookies.get('hackneyToken');
};

const getUsername = function() {
  const hackneyToken = getHackneyToken();
  if (!hackneyToken) return '';
  const decoded = jwt.decode(hackneyToken);
  return decoded ? decoded.name : '';
};

export { getHackneyToken, getUsername };
