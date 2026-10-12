import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const protectedPaths = ["/profile"];
  const authPaths = ["/sign-in", "/sign-up"];
  const pathname = request.nextUrl.pathname;

  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  if (isProtectedPath && !session) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    signInUrl.searchParams.set("toast", "auth-required");
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthPath && session) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl") || "/";
    return NextResponse.redirect(new URL(callbackUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/sign-in", "/sign-up"],
};