/**
 * UI strings. All Arabic comes verbatim from Heritage files; never write Arabic here.
 * - `arCopy` is generated from docs/agents/heritage/site-copy.ar.md (`pnpm copy:gen`).
 * - `pigments` are the Arabic labels from docs/agents/heritage/motif-catalog.md §Palette. They are
 *   labels after traditional materials, not sourcing claims (D-019 review; the blue is disputed).
 * Values may contain inline markup (`code`, <bdi …>…</bdi>, [text](url)); render them with
 * <Copy k="…" /> (components/site/copy.tsx), or use `plain()` for attributes and metadata.
 */
import { arCopy } from "@/lib/copy.ar.generated"

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

export const ar = { ...arCopy, ...pigments } as const

export type CopyKey = keyof typeof ar

export function t(key: CopyKey): string {
  return ar[key]
}

export function hasCopy(key: string): key is CopyKey {
  return Object.prototype.hasOwnProperty.call(ar, key)
}

/** Copy with markup removed: tags dropped, `code` unwrapped, [text](url) -> text. For attributes/metadata. */
export function plain(key: CopyKey, vars?: Record<string, string | number>): string {
  return fill(t(key), vars)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/`([^`]+)`/g, "$1")
}

/** Replace {name} placeholders. */
export function fill(text: string, vars?: Record<string, string | number>): string {
  if (!vars) return text
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m))
}
