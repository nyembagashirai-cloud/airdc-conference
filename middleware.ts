import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Admin route protection ──────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    // Always add noindex header to every admin response
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

    // Allow the login page through
    if (pathname === "/admin/login") return res;

    // All other /admin/* routes require a valid JWT
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
