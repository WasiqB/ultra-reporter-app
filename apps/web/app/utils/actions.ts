'use server';

import {
  createLoginDetail,
  createUser,
  getUser,
  updateLogoutDate,
} from '@ultra-reporter/db';
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

const getClientIp = async (): Promise<string | undefined> => {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim();
  }

  const realIp = requestHeaders.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
};

const updateLoginDetails = async (userId: string): Promise<void> => {
  try {
    const clientIp = await getClientIp();

    await createLoginDetail({ userId, ip: clientIp });

    logger.debug(`Login details recorded for user ${userId}`);
  } catch (error) {
    logger.error(
      `Failed to update login details: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

const updateLogoutDetails = async (userId: string): Promise<void> => {
  try {
    await updateLogoutDate({ userId });
  } catch (error) {
    logger.error(
      `Failed to update logout details: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

const signInWith = (provider: Provider) => async () => {
  const supabase = await createClient();
  const requestHeaders = await headers();
  const origin = getURL();

  if (isPreview) {
    logger.debug('====================');
    logger.debug(`Actions Received provider: ${provider}`);
    logger.debug(`Actions Received origin: ${origin}`);
    requestHeaders.forEach((value: string, key: string) => {
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
  }
  if (data?.url) {
    if (isPreview) {
      logger.debug(`Actions Redirecting to: ${data.url}`);
    }
    redirect(data.url);
  }
};

const signinWithGoogle = signInWith('google');

const signOut = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.auth.signOut();

  if (!error && user) {
    const { data: dbUser, error } = await getUser(user.email as string);

    if (error) {
      logger.error(
        `Database error during logout: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    if (dbUser) {
      await updateLogoutDetails(dbUser.id);
    } else {
      logger.warn(`User not found in database during logout: ${user.email}`);
    }

    redirect('/');
  } else {
    logger.error(
      `Error while signing out: ${error?.message || 'Unknown error'}`
    );
  }
};

const handleAuthCallback = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    let { data, error } = await getUser(user.email as string);

    if (error) {
      logger.error(
        `Error storing user login data: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    if (!data) {
      data = await createUser({
        email: user.email as string,
        full_name: user.user_metadata.full_name,
      });
      logger.debug(`Created new user: ${data.id}`);
    }

    await updateLoginDetails(data.id);
  }
};

export { handleAuthCallback, signinWithGoogle, signOut };
