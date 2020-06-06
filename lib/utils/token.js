import cookie from 'cookie';
import jwt from 'jsonwebtoken';

const getToken = req => {
  if (!req || !req.headers || !req.headers.cookie) return '';
  const cookies = cookie.parse(req.headers.cookie);
  if (cookies.hackneyToken) return cookies.hackneyToken;
  return '';
};

const getUsername = token => {
  if (!token) return '';
  const decoded = jwt.decode(token);
  return decoded ? decoded.name : '';
};

const createToken = () => {
  const token = jwt.sign(
    { groups: [process.env.ALLOWED_GROUPS] },
    process.env.JWT_SECRET,
    { expiresIn: 30 } //timeout after 30 sedonds because new token would be generated after refreshing the link anyways
  );
  return token;
};

export { getToken, getUsername, createToken };
