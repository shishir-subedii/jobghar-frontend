import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const role = request.cookies.get('role')?.value;
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/employer')) {
        if (!token || role !== 'employer') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (pathname.startsWith('/seeker')) {
        if (!token || role !== 'seeker') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (pathname.startsWith('/profile')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/employer/:path*', '/seeker/:path*', '/profile/:path*'],
};
