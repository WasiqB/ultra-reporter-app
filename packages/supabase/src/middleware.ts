import { createServerClient } from '@supabase/ssr';
import { getFlag } from '@ultra-reporter/feature-toggle/middleware';
import { type NextRequest, NextResponse } from 'next/server';
const protectedRoutes = ['/dashboard'];

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const session = await supabase.auth.getUser();
  const signInSupport = await getFlag('sign_in_support');

  if (!signInSupport && (isProtectedRoute || pathname === '/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isProtectedRoute && session.error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
};
