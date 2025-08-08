import { withIronSessionApiRoute } from 'iron-session/next';

export const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: 'session',
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};


export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
