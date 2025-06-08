import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Extracts and parses the Redux persisted state from an array of cookies.
 * It uses the 'reduxPersistIndex' cookie to find the actual state cookie name,
 * decoding cookie names to ensure a match. It also parses the nested 'user' slice if present.
 * @param cookiesArray Array of cookie objects from `request.cookies.getAll()`.
 * @returns The parsed persisted state object (with 'user' slice potentially parsed) or null if critical parsing fails.
 */
function getPersistedStateFromCookies(cookiesArray: RequestCookie[]): any | null {
  try {
    const persistIndexCookie = cookiesArray.find(cookie => cookie.name === 'reduxPersistIndex');
    if (!persistIndexCookie) {
      return null;
    }

    const persistKeys: string[] = JSON.parse(persistIndexCookie.value);
    if (!persistKeys || persistKeys.length === 0) {
      return null;
    }
    const mainPersistKey = persistKeys[0]; 

    const stateCookie = cookiesArray.find(cookie => {
      try {
        return decodeURIComponent(cookie.name) === mainPersistKey;
      } catch (e) {
        return false; 
      }
    });

    if (!stateCookie) {
      return null;
    }

    const persistedState = JSON.parse(stateCookie.value);

    if (persistedState && typeof persistedState.user === 'string') {
      try {
        persistedState.user = JSON.parse(persistedState.user);
      } catch (userParseError) {
        persistedState.user = null; 
      }
    }
    
    return persistedState;

  } catch (error) {
    return null; 
  }
}

const protectedRoutes = ['/ani-list'];

/**
 * Middleware function to handle request authentication.
 * It checks if a route is protected and if the user is authenticated.
 * Unauthenticated users trying to access protected routes are redirected to /login.
 * @param request The incoming NextRequest object.
 * @returns NextResponse to continue, redirect, or rewrite the request.
 */
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedRoutes.includes(pathname);

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const allCookies = request.cookies.getAll();
  const persistedState = getPersistedStateFromCookies(allCookies);
  let isAuthenticated = false;

  if (persistedState && persistedState.user && persistedState.user.username && persistedState.user.jobTitle) {
    isAuthenticated = true;
  }

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

/**
 * Configuration object for the middleware.
 * The `matcher` property specifies the paths on which the middleware should run.
 * This pattern excludes API routes, Next.js static files, images, and favicon.
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico).*)'],
};
