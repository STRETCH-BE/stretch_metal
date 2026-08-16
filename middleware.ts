/**
 * Host-based locale entry for stretchmetal.be.
 * File path: /middleware.ts
 *
 * The Dutch (/nl) tree is canonical on the Belgian domain. A visitor who
 * types stretchmetal.be lands on the Dutch homepage instead of the Polish
 * root: the .be root (and only the root) 308-redirects to /nl. All other
 * paths are served unchanged on either host — canonicals and hreflang
 * (see lib/i18n-routes.ts) tell search engines which host owns which
 * tree, so no rewrite maze is needed.
 *
 * Matcher is limited to "/" so the middleware never runs for assets,
 * API calls, or inner pages — zero overhead outside the one redirect.
 */

import { NextRequest, NextResponse } from "next/server";

const BE_HOSTS = new Set(["stretchmetal.be", "www.stretchmetal.be"]);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase().split(":")[0] ?? "";
  if (BE_HOSTS.has(host)) {
    const url = request.nextUrl.clone();
    url.pathname = "/nl";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
