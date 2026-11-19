/**
 * qatt-utils: shared helpers for Qatt UI items.
 * - the motif registry (generated, see qatt-motifs.ts), re-exported here
 * - Arabic-aware number/date/currency formatting (D-008: Western digits by default)
 */

export * from "@/registry/qatt/lib/qatt-motifs"

// ---------------------------------------------------------------------------
// Formatting (component-specs.md §4.1, decision D-008: Western digits by default)
// ---------------------------------------------------------------------------

export type Numerals = "latn" | "arab"

function withNumerals(locale: string, numerals: Numerals, extra = ""): string {
  return `${locale.split("-u-")[0]}-u-nu-${numerals}${extra}`
}

/** Locale-aware number formatting; pins the numbering system (default "latn" = 0-9). */
export function formatNumber(
  n: number,
  {
    numerals = "latn",
    locale = "ar-SA",
    ...opts
  }: Intl.NumberFormatOptions & { numerals?: Numerals; locale?: string } = {},
): string {
  return new Intl.NumberFormat(withNumerals(locale, numerals), opts).format(n)
}

/** Date formatting with pinned numerals and calendar (default Gregorian). */
export function formatDate(
  d: Date | number | string,
  {
    numerals = "latn",
    calendar = "gregory",
    locale = "ar-SA",
    ...opts
  }: Intl.DateTimeFormatOptions & {
    numerals?: Numerals
    calendar?: "gregory" | "islamic-umalqura"
    locale?: string
  } = {},
): string {
  return new Intl.DateTimeFormat(withNumerals(locale, numerals, `-ca-${calendar}`), opts).format(new Date(d))
}

export function formatCurrency(
  n: number,
  currency = "SAR",
  { numerals = "latn" }: { numerals?: Numerals } = {},
): string {
  return formatNumber(n, { style: "currency", currency, numerals })
}

const RTL_LANGS = new Set(["ar", "fa", "he", "ur", "ps", "sd", "ug", "yi", "dv", "ckb"])

export function isRtlLang(lang: string): boolean {
  return RTL_LANGS.has(lang.toLowerCase().split(/[-_]/)[0] ?? "")
}

/** Wraps text in FIRST STRONG ISOLATE ... POP DIRECTIONAL ISOLATE for plain-text contexts (titles, toasts). */
export function bidiIsolate(s: string): string {
  return `\u2068${s}\u2069`
}
