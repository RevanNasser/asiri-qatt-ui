/**
 * UI strings in Arabic (default) and English. All copy comes verbatim from Heritage files; never
 * write Arabic here.
 * - `arCopy` / `enCopy` are generated from docs/agents/heritage/site-copy.{ar,en}.md (`pnpm copy:gen`).
 * - `pigments` are the Arabic labels from docs/agents/heritage/motif-catalog.md §Palette. They are
 *   labels after traditional materials, not sourcing claims (D-019 review; the blue is disputed).
 * Values may contain inline markup (`code`, <bdi …>…</bdi>, [text](url)); render them with
 * <Copy k="…" /> (components/site/copy.tsx), or use `plain()` for attributes and metadata.
 */
import { arCopy } from "@/lib/copy.ar.generated"
import { enCopy } from "@/lib/copy.en.generated"
import type { Lang } from "@/lib/i18n"

const pigments = {
  "docs.theme.pigment.white": "جصّ",
  "docs.theme.pigment.red": "أحمر المَشقة",
  "docs.theme.pigment.yellow": "أصفر",
  "docs.theme.pigment.black": "أسود الفحم",
  "docs.theme.pigment.blue": "أزرق النيلة",
  "docs.theme.pigment.green": "أخضر البرسيم",
  "docs.theme.pigment.orange": "برتقالي",
  "docs.theme.pigment.brown": "بنّي الصمغ",
} as const

/** English pigment labels, from the same motif-catalog.md §Palette table. */
const enPigments = {
  "docs.theme.pigment.white": "Gypsum white",
  "docs.theme.pigment.red": "Meshiga red",
  "docs.theme.pigment.yellow": "Safra yellow",
  "docs.theme.pigment.black": "Charcoal black",
  "docs.theme.pigment.blue": "Nila blue",
  "docs.theme.pigment.green": "Alfalfa green",
  "docs.theme.pigment.orange": "Orange",
  "docs.theme.pigment.brown": "Gum brown",
} as const

export const ar = { ...arCopy, ...pigments } as const

export type CopyKey = keyof typeof ar

/** English must define every Arabic key (the type check fails the build otherwise). */
export const en: Record<CopyKey, string> = { ...enCopy, ...enPigments }

const COPY: Record<Lang, Record<CopyKey, string>> = { ar, en }

export function t(key: CopyKey, lang: Lang = "ar"): string {
  return COPY[lang][key]
}

export function hasCopy(key: string): key is CopyKey {
  return Object.prototype.hasOwnProperty.call(ar, key)
}

/** Copy with markup removed: tags dropped, `code` unwrapped, [text](url) -> text. For attributes/metadata. */
export function plain(key: CopyKey, vars?: Record<string, string | number>, lang: Lang = "ar"): string {
  return fill(t(key, lang), vars)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/`([^`]+)`/g, "$1")
}

/** Copy helpers bound to one language, for a page or component that knows its `lang`. */
export function copyFor(lang: Lang) {
  return {
    lang,
    t: (key: CopyKey) => t(key, lang),
    plain: (key: CopyKey, vars?: Record<string, string | number>) => plain(key, vars, lang),
  }
}

/** Replace {name} placeholders. */
export function fill(text: string, vars?: Record<string, string | number>): string {
  if (!vars) return text
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m))
}
