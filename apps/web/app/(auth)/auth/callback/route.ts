import { logger } from '@ultra-reporter/logger';
import { createClient } from '@ultra-reporter/supabase/server';
import { isDev, isPreview } from '@ultra-reporter/utils/constants';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (isPreview) {
    logger.debug('====================');
    logger.debug(`Route Received URL: ${request.url}`);
    logger.debug(`Route Received searchParams: ${searchParams}`);
    logger.debug(`Route Received code: ${code}`);
    logger.debug(`Route Received next: ${next}`);
    logger.debug(`Route Received origin: ${origin}`);
    logger.debug('====================');
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      if (isPreview) {
        logger.debug('====================');
        logger.debug(`Route Received forwardedHost: ${forwardedHost}`);
        logger.debug(`Route Received isLocalEnv: ${isDev}`);
        logger.debug('====================');
      }
      if (isDev) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
