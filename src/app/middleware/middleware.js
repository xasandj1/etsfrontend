import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const hasVisited = request.cookies.get('hasSignedUp')?.value;

  if (pathname === '/' && !hasVisited) {
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/'], // faqat root sahifaga kirilganda ishlaydi
};
