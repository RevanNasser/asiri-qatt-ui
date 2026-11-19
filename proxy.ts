import { createI18nMiddleware } from "fumadocs-core/i18n/middleware"

import { i18n } from "@/lib/i18n"

// Next 16 "proxy" (formerly middleware): rewrites `/docs` -> `/ar/docs` (Arabic is unprefixed).
export default createI18nMiddleware(i18n)

export const config = {
  // Skip API routes, iframe previews (/preview/*), Next internals, the static registry (/r/*.json) and any file with an extension.
  matcher: ["/((?!api|preview|_next/static|_next/image|r/|favicon.ico|.*\\..*).*)"],
}
