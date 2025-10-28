'use client';

import type { ErrorContext } from 'better-auth/react';
import { authClient } from '../lib/auth-client';

interface AuthProps {
  initFn?: () => Promise<void> | void;
  successFn?: () => Promise<void> | void;
  errorFn?: (error: ErrorContext) => Promise<void> | void;
}

interface SocialProps extends AuthProps {
  provider: 'google';
  url: string;
}

async function signOut({ initFn, successFn, errorFn }: AuthProps) {
  await authClient.signOut({
    fetchOptions: {
      onRequest: initFn,
      onSuccess: successFn,
      onError: errorFn,
    },
  });
}

async function signInWithSocial({ provider, url, initFn, successFn, errorFn }: SocialProps) {
  await authClient.signIn.social(
    {
      provider,
      callbackURL: url,
    },
    {
      onRequest: initFn,
      onSuccess: successFn,
      onError: errorFn,
    },
  );
}

export { signInWithSocial, signOut };
