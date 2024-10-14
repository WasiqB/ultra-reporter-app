import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { updateSession } from './lib/supabase/middleware';

export async function middleware(req: NextRequest) {
  const response = await updateSession(req);

  if (
    req.nextUrl.pathname === '/loading' ||
    req.nextUrl.pathname === '/results'
  ) {
    const referer = req.headers.get('referer');
    if (!referer || !referer.includes(req.nextUrl.origin)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/loading', '/results'],
};
