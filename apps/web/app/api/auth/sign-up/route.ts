import { logger } from '@ultra-reporter/logger';
import { createClient } from '@ultra-reporter/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = await createClient();

  const origin = req.headers.get('origin');

  const { provider } = await req.json();
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    logger.error('Sign up failed', error);
    return new NextResponse('Error while signing up', {
      status: 500,
    });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    logger.error('User not found');
    return new NextResponse('Error while signing up', {
      status: 500,
    });
  }

  logger.info('Sign up successful', data);
  return NextResponse.json(user, {
    status: 201,
  });
}
