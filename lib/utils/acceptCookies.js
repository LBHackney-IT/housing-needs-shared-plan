import Cookies from 'js-cookie';

const cookieKey = 'cookies-accepted';

export function acceptedCookieIsSet(c) {
  if (!c) return false;
  const cookie = Cookies.get(cookieKey);
  return cookie !== undefined;
}

export function userHasAcceptedCookies(c) {
  if (!c) return false;
  const cookie = Cookies.get(cookieKey);
  return cookie === true;
}

export function setAcceptedCookie(accept) {
  Cookies.set(cookieKey, accept, { expires: 365 });
}
