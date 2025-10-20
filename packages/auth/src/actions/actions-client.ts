'use client';

import type { ErrorContext } from 'better-auth/react';
import { authClient } from '../lib/auth-client';

interface SocialProps {
  provider: 'google';
  url: string;
  initFn?: () => Promise<void> | void;
  successFn?: () => Promise<void> | void;
  errorFn?: (error: ErrorContext) => Promise<void> | void;
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

export { signInWithSocial };
