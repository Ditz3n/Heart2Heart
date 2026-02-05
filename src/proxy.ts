// src/proxy.ts

import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // List of paths to bypass localization
  const publicPaths = ["/api/", "/auth/callback-handler"];

  // Check if the request path starts with any of the public paths
  const isPublicPath = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isPublicPath) {
    return NextResponse.next();
  }

  // Let next-intl handle everything else, including root redirect
  return intlMiddleware(request);
}

export const config = {
  // Match all paths except for static files
  matcher: ["/((?!_next|_static|_vercel|.*\\..*).*)"],
};
