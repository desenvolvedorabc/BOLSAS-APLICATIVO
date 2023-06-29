import * as cookie from 'cookie';
import _ from 'lodash';

import {
  destroyCookie as _destroyCookie,
  parseCookies as _parseCookies,
  setCookie as _setCookie,
} from 'nookies';

export const parseCookies = (ctx?: unknown): Record<string, string> => {
  const sessionCookie = _parseCookies(ctx).__session;
  if (sessionCookie) {
    return JSON.parse(sessionCookie);
  } else {
    return {};
  }
};

export const setCookie = (
  ctx: unknown,
  name: string,
  value: string,
  options?: cookie.CookieSerializeOptions,
): void => {
  const sessionCookie = parseCookies(ctx);
  const newSessionCookie = Object.assign(sessionCookie, {
    [name]: value,
  });

  _setCookie(ctx, '__session', JSON.stringify(newSessionCookie), options);
};

export const destroyCookie = (
  ctx: unknown,
  name: string,
  options?: cookie.CookieSerializeOptions,
): void => {
  const sessionCookie = parseCookies(ctx);
  delete sessionCookie[name];

  if (_.isEmpty(sessionCookie)) {
    _destroyCookie(ctx, '__session', options);
    return;
  }

  _setCookie(ctx, '__session', JSON.stringify(sessionCookie), options);
};
