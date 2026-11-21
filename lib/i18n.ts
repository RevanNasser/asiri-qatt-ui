import { defineI18n } from "fumadocs-core/i18n"

/**
 * Arabic is the default language and is served without a prefix (`/`, `/docs/...`);
 * English is served at `/en/...`. Docs pages have a `*.en.mdx` sibling (Fumadocs "dot" parser)
 * and UI copy comes from `lib/site-copy.ts` (`copyFor(lang)`).
 */
export const i18n = defineI18n({
  languages: ["ar", "en"],
  defaultLanguage: "ar",
  hideLocale: "default-locale",
  parser: "dot",
})

export type Lang = (typeof i18n.languages)[number]

export const RTL_LANGUAGES: readonly string[] = ["ar"]

export function dirOf(lang: string): "rtl" | "ltr" {
  return RTL_LANGUAGES.includes(lang) ? "rtl" : "ltr"
}

/** Prefix an internal path for a language (Arabic stays unprefixed). */
export function localePath(lang: string, path: string): string {
  if (lang === i18n.defaultLanguage || !path.startsWith("/") || path.startsWith("//")) return path
  return path === "/" ? `/${lang}` : `/${lang}${path}`
}
