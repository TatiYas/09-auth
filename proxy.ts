// proxy.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

// Масив приватних маршрутів
const privateRoutes = [
  '/profile',
  '/notes/action/create',
  '/notes/action/edit',
  '/notes',
];

// Публічні маршрути
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  //  Якщо є accessToken
  if (accessToken) {
    // Авторизованный пользователь не должен видеть sign-in / sign-up
    if (isPublicRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Доступ до приватних та публічних сторінок дозволений
    return NextResponse.next();
  }

  //  Немає accessToken, але є refreshToken
  if (!accessToken && refreshToken) {
    try {
      const sessionRes = await checkServerSession();
      const setCookie = sessionRes.headers['set-cookie'];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            path: parsed.Path || '/',
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
          };

          if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
          if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
        }

        // Після silent refresh
        if (isPublicRoute) {
          return NextResponse.redirect(new URL('/', request.url), {
            headers: { Cookie: cookieStore.toString() },
          });
        }

        if (isPrivateRoute) {
          return NextResponse.next({ headers: { Cookie: cookieStore.toString() } });
        }
      }
    } catch (err) {
      console.error('Silent refresh failed:', err);
    }
  }

  // 3️⃣ Немає токенів
  if (isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Публічні сторінки доступні всім
  return NextResponse.next();
}

// Налаштування matcher для Next.js
export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
