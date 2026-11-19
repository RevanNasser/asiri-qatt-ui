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
