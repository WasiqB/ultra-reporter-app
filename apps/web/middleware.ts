import AuthMiddleware from '@ultra-reporter/auth/auth-middleware';
import { type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  return AuthMiddleware(request);
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
