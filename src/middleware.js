import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all routes except static files and Clerk's own API
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};