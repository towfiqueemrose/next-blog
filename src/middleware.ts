import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const isAuthRoute = request.nextUrl.pathname === "/auth/signin";
  
  // যদি ইউজার লগইন থাকে এবং /auth/signin পেজে যেতে চায়
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // যদি ইউজার লগইন না থাকে এবং /add-article পেজে যেতে চায়
  if (!session && request.nextUrl.pathname === "/add-article") {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/add-article',
    '/auth/signin',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};