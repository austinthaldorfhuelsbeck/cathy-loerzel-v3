import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, req, evt) {
    const { pathname } = req.nextUrl;

    // Redirect all users from the home page ("/") to "/site" regardless of authentication status
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/site", req.url));
    }

    // Redirect users attempting to access "/admin" without being signed in to "sign-in"
    if (pathname.startsWith("/admin") && !auth.userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Allow signed-in users to access "/admin"
    if (pathname.startsWith("/admin") && auth.userId) {
      return NextResponse.next();
    }

    // For any other case, allow the request to proceed
    return NextResponse.next();
  },
});
