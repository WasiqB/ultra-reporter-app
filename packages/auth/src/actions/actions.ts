'use server';

import { headers } from 'next/headers';
import { auth } from '../lib/auth';

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

async function createAnonymousUser() {
  const session = await getSession();
  let userId = session?.user.id;

  if (!userId) {
    const anonymousUser = await auth.api.signInAnonymous();
    if (anonymousUser) {
      userId = anonymousUser.user.id;
    }
  }

  return userId;
}

export { getSession, createAnonymousUser };
