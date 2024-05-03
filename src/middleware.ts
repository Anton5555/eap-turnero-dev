import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    if (req?.nextauth?.token)
      return NextResponse.redirect(new URL("/platform", req.url));
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  /**
   * TODO: fix redirection in here and remove it from the login and signup pages
   * The issue is that the middleware automatically redirects to the login page because of the pages config below
   * and if we add the auth path in the matcher this produces a redirection loop
   */
  // if (pathname.startsWith("/auth") && pathname !== '/auth/welcome' && req?.nextauth?.token)
  // return NextResponse.redirect(new URL("/platform", req.url));

  return NextResponse.next();
});

export const config = {
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/signup",
  },
  matcher: [
    "/",
    "/platform",
    "/platform/:path*",
    "/profile",
    "/profile/:path*",
  ],
};
