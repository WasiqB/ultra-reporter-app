'use server';

import { logger } from '@ultra-reporter/logger';
import { Provider } from '@ultra-reporter/supabase/client';
import { createClient } from '@ultra-reporter/supabase/server';
import { isProd } from '@ultra-reporter/utils/constants';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const signInWith = (provider: Provider) => async () => {
  const supabase = await createClient();
  const requestHeaders = await headers();
  const origin = requestHeaders.get('origin');

  logger.info(`Is Production: ${isProd}`);
  if (!isProd) {
    logger.info(`Received provider: ${provider}`);
    logger.info(`Received origin: ${origin}`);
    requestHeaders.forEach((key, value) => {
      logger.info(`${key}: ${value}`);
    });
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    logger.error(`Error while signing in with ${provider}: ${error.message}`);
  }

  if (data?.url) {
    redirect(data.url);
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
