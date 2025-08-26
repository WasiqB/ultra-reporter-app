import { db } from '@ultra-reporter/db';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies, toNextJsHandler } from 'better-auth/next-js';

const auth = betterAuth({
  cookieCache: {
    enabled: true,
    maxAge: 1 * 60,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
    },
  },
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  plugins: [nextCookies()],
});

export { auth, toNextJsHandler };
