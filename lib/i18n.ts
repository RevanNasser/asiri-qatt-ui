import { defineI18n } from "fumadocs-core/i18n"

/**
 * Arabic is the default language and is served without a prefix (`/`, `/docs/...`).
 * To add English later: add "en" to `languages`, write `*.en.mdx` next to each page
 * (Fumadocs "dot" parser) and add an `en` entry to `lib/site-copy.ts`; it is served at `/en/...`.
 */
export const i18n = defineI18n({
  languages: ["ar"],
  defaultLanguage: "ar",
  hideLocale: "default-locale",
  parser: "dot",
})

export type Lang = (typeof i18n.languages)[number]

export const RTL_LANGUAGES: readonly string[] = ["ar"]

export function dirOf(lang: string): "rtl" | "ltr" {
  return RTL_LANGUAGES.includes(lang) ? "rtl" : "ltr"
}
