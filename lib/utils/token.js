import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { logger } from 'lib/infrastructure/logging';

const getToken = req => {
  logger.info('Getting token...');
  if (!req || !req.headers || !req.headers.cookie) {
    logger.info('Problem with request');
    return ''
  };
  const cookies = cookie.parse(req.headers.cookie);
  if (cookies.hackneyToken) {
    logger.info('returning hackneyToken');
    return cookies.hackneyToken
  };
  return '';
};

const getUsername = token => {
  if (!token)  {
    logger.info('No token provided');
    return ''};
  const decoded = jwt.decode(token);
  logger.info(`decoding jwt... result is ${decoded}`);
  return decoded ? decoded.name : '';
};

const createToken = name => {
  logger.info('creating a new token...');
  const token = jwt.sign(
    { groups: [process.env.ALLOWED_GROUPS], name },
    process.env.JWT_SECRET
  );
  logger.info('token created. returning token.');
  return token;
};

export { getToken, getUsername, createToken };
