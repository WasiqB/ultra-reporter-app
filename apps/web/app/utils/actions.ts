'use server';

import { logger } from '@ultra-reporter/logger';
import { Provider } from '@ultra-reporter/supabase/client';
import { createClient } from '@ultra-reporter/supabase/server';
import { isPreview, isProd } from '@ultra-reporter/utils/constants';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const getURL = () => {
  let url = isProd
    ? process?.env?.NEXT_PUBLIC_SITE_URL
    : isPreview
      ? process?.env?.NEXT_PUBLIC_VERCEL_URL
      : 'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url?.startsWith('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
};

const signInWith = (provider: Provider) => async () => {
  const supabase = await createClient();
  const requestHeaders = await headers();
  const origin = getURL();

  if (isPreview) {
    logger.debug('====================');
    logger.debug(`Actions Received provider: ${provider}`);
    logger.debug(`Actions Received origin: ${origin}`);
    requestHeaders.forEach((key, value) => {
      logger.debug(`Actions Header [${key}]: [${value}]`);
    });
    logger.debug('====================');
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${origin}auth/callback`,
    },
  });

  if (error) {
    logger.error(`Error while signing in with ${provider}: ${error.message}`);
  } else {
    if (isPreview) {
      logger.debug('====================');
      logger.debug(`Success Login data: ${JSON.stringify(data)}`);
      logger.debug('====================');
    }
    redirect('/dashboard');
  }
};

const signinWithGoogle = signInWith('google');

const signOut = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (!error) {
    redirect('/');
  } else {
    logger.error(`Error while signing out: ${error.message}`);
  }
};

export { signinWithGoogle, signOut };
