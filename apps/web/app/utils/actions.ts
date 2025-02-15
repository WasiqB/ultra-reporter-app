'use server';

import { logger } from '@ultra-reporter/logger';
import { Provider } from '@ultra-reporter/supabase/client';
import { createClient } from '@ultra-reporter/supabase/server';
import { isPreview } from '@ultra-reporter/utils/constants';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const signInWith = (provider: Provider) => async () => {
  const supabase = await createClient();
  const requestHeaders = await headers();
  const origin = requestHeaders.get('origin');

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
      redirectTo: `${origin}/auth/callback`,
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
