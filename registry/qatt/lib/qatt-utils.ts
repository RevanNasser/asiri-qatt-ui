/**
 * qatt-utils: shared helpers for Qatt UI items.
 *
 * Motif registry: a typed catalogue of the SVG motifs used by decorative items
 * (qatt-divider, qatt-border, qatt-pattern, ...). Motif ids follow
 * docs/agents/heritage/motif-catalog.md. Artwork is filled in during Phase 4.
 */

export type QattMotifId =
  | "kaff"
  | "qatt-lines"
  | "mathalith-makhamis"
  | "rukun"
  | "banat"
  | "balsanah"
  | "amshat"
  | "taadheeq"
  | "mahareeb"
  | "sankroli"
  | "shabakah"
  | "hanash"
  | "khatmah"
  | "sawtooth"

/** `x` = horizontal band, `xy` = field. */
export type QattMotifRepeat = "x" | "xy"

export interface QattMotif {
  id: QattMotifId
  /** Tile width and height in SVG user units. */
  tile: { width: number; height: number }
  repeat: QattMotifRepeat
  /**
   * `true` when the tile is identical under horizontal reflection.
   * Non mirror-safe motifs must decide explicitly what to do in RTL
   * (e.g. `sawtooth` never mirrors, see decision D-007).
   */
  mirrorSafe: boolean
  /** SVG markup of one tile. Use `currentColor` (or CSS vars) for colour slots. */
  svg: string
}

export type QattMotifRegistry = Partial<Record<QattMotifId, QattMotif>>

/** Identity helper that keeps motif definitions type-checked. */
export function defineMotif<T extends QattMotif>(motif: T): T {
  return motif
}

export const qattMotifs: QattMotifRegistry = {
  hanash: defineMotif({
    id: "hanash",
    tile: { width: 12, height: 12 },
    repeat: "x",
    mirrorSafe: true,
    svg: '<polyline points="0,10 6,2 12,10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="miter" />',
  }),
}

export function getMotif(id: QattMotifId): QattMotif | undefined {
  return qattMotifs[id]
}

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
