import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Mural: dense, multi-band qatt wall paint.
 * Built from the documented vocabulary (rows of triangles with branch sprigs, nested
 * diamonds, squares split into coloured triangles, zigzags, chequers and parallel colour
 * lines) in saturated pigments on white gypsum with black outlines and dots.
 * The arrangement is an original project interpretation, not a copy of a specific wall.
 */

const R = "var(--qatt-red)"
const Y = "var(--qatt-yellow)"
const G = "var(--qatt-green)"
const B = "var(--qatt-blue)"
const O = "var(--qatt-orange)"
const K = "var(--qatt-black)"
const W = "var(--qatt-white)"

/** Tile width: every band period divides it, so the tile repeats seamlessly. */
const TW = 192
const LINE = { stroke: K, strokeWidth: 1.6, strokeLinejoin: "round" as const }

type Band = { h: number; draw: (y: number) => React.ReactNode }

/** Parallel colour lines between bands («القطّ»). */
function lines(colors: string[]): Band {
  const seq: [string | null, number][] = [[K, 2]]
  colors.forEach((c) => seq.push([null, 2], [c, 3]))
  seq.push([null, 2], [K, 2])
  const h = seq.reduce((n, [, w]) => n + w, 0)
  return {
    h,
    draw: (y) => {
      let at = y
      return seq.map(([c, w], i) => {
        const r = c ? <rect key={i} x={0} y={at} width={TW} height={w} fill={c} /> : null
        at += w
        return r
      })
    },
  }
}

/** Upright triangles in rotating colours, each crowned with a branch sprig («البنات»). */
function triangles(colors: string[]): Band {
  const p = 24
  const h = 46
  return {
    h,
    draw: (y) =>
      Array.from({ length: TW / p + 1 }, (_, i) => {
        const x = i * p
        const base = y + h - 2
        const apex = y + 17
        return (
          <g key={i}>
            {i < TW / p && (
              <>
                <polygon
                  points={`${x + 1},${base} ${x + 12},${apex} ${x + 23},${base}`}
                  fill={colors[i % colors.length]}
                  {...LINE}
                />
                <circle cx={x + 12} cy={base - 8} r={2} fill={W} stroke={K} strokeWidth={1} />
                <path
                  d={`M${x + 12} ${apex}V${y + 3}M${x + 12} ${y + 10}l-4.5 -5M${x + 12} ${y + 10}l4.5 -5`}
                  {...LINE}
                  fill="none"
                />
              </>
            )}
            <circle cx={x} cy={base - 5} r={1.7} fill={K} />
          </g>
        )
      }),
  }
}

/** Nested diamonds with dots and small triangles in the gaps («البلسنة»). */
function diamonds(pairs: [string, string][]): Band {
  const p = 32
  const h = 42
  return {
    h,
    draw: (y) => {
      const cy = y + h / 2
      return Array.from({ length: TW / p + 1 }, (_, i) => {
        const x = i * p
        const cx = x + p / 2
        const [outer, inner] = pairs[i % pairs.length] as [string, string]
        return (
          <g key={i}>
            {i < TW / p && (
              <>
                <polygon
                  points={`${cx},${cy - 18} ${cx + 14},${cy} ${cx},${cy + 18} ${cx - 14},${cy}`}
                  fill={outer}
                  {...LINE}
                />
                <polygon
                  points={`${cx},${cy - 8} ${cx + 6},${cy} ${cx},${cy + 8} ${cx - 6},${cy}`}
                  fill={inner}
                  {...LINE}
                />
              </>
            )}
            <polygon points={`${x - 6},${y} ${x + 6},${y} ${x},${y + 8}`} fill={K} />
            <polygon points={`${x - 6},${y + h} ${x + 6},${y + h} ${x},${y + h - 8}`} fill={K} />
            <circle cx={x} cy={cy} r={2} fill={K} />
          </g>
        )
      })
    },
  }
}

/** Squares split by their diagonals into four coloured triangles. */
function splitSquares(colors: string[]): Band {
  const p = 48
  const s = 36
  const h = 44
  return {
    h,
    draw: (y) =>
      Array.from({ length: TW / p + 1 }, (_, i) => {
        const x0 = i * p + (p - s) / 2
        const y0 = y + (h - s) / 2
        const cx = x0 + s / 2
        const cy = y0 + s / 2
        const c = (k: number) => colors[(i + k) % colors.length]
        return (
          <g key={i}>
            {i < TW / p && (
              <>
                <polygon points={`${x0},${y0} ${x0 + s},${y0} ${cx},${cy}`} fill={c(0)} {...LINE} />
                <polygon points={`${x0 + s},${y0} ${x0 + s},${y0 + s} ${cx},${cy}`} fill={c(1)} {...LINE} />
                <polygon points={`${x0 + s},${y0 + s} ${x0},${y0 + s} ${cx},${cy}`} fill={c(2)} {...LINE} />
                <polygon points={`${x0},${y0 + s} ${x0},${y0} ${cx},${cy}`} fill={c(3)} {...LINE} />
                <rect
                  x={cx - 4}
                  y={cy - 4}
                  width={8}
                  height={8}
                  fill={W}
                  {...LINE}
                  transform={`rotate(45 ${cx} ${cy})`}
                />
              </>
            )}
            {[y + 11, y + 22, y + 33].map((dy) => (
              <circle key={dy} cx={i * p} cy={dy} r={1.8} fill={K} />
            ))}
          </g>
        )
      }),
  }
}

/** Parallel zigzags in four colours («الحنش»). */
function zigzags(colors: string[]): Band {
  const step = 12
  const amp = 9
  const gap = 5
  const h = 6 + amp + gap * (colors.length - 1) + 6
  return {
    h,
    draw: (y) =>
      colors.map((c, k) => {
        const top = y + 6 + k * gap
        let d = `M0 ${top}`
        for (let x = step; x <= TW; x += step) d += `L${x} ${(x / step) % 2 ? top + amp : top}`
        return <path key={c + k} d={d} fill="none" stroke={c} strokeWidth={3.2} strokeLinejoin="miter" />
      }),
  }
}

/** Two rows of small coloured squares. */
function chequers(colors: string[]): Band {
  const s = 12
  const h = s * 2
  return {
    h,
    draw: (y) =>
      [0, 1].flatMap((row) =>
        Array.from({ length: TW / s }, (_, col) => {
          const on = (col + row) % 2 === 0
          return (
            <rect
              key={`${row}-${col}`}
              x={col * s}
              y={y + row * s}
              width={s}
              height={s}
              fill={on ? colors[Math.floor(col / 2 + row) % colors.length] : W}
              stroke={K}
              strokeWidth={1}
            />
          )
        }),
      ),
  }
}

/** Vertical colour stripes separated by white. */
function stripes(colors: string[]): Band {
  const w = 6
  const h = 30
  return {
    h,
    draw: (y) =>
      Array.from({ length: TW / (w * 2) }, (_, i) => (
        <rect key={i} x={i * w * 2} y={y} width={w} height={h} fill={colors[i % colors.length]} />
      )),
  }
}

const GAP = 5

/** The named bands a mural or strip can be built from. */
const BAND_DEFS = {
  lines: lines([R, Y, G, B]),
  "lines-ink": lines([K]),
  "lines-short": lines([R, G]),
  triangles: triangles([R, G, Y, B]),
  diamonds: diamonds([
    [Y, R],
    [B, Y],
    [G, R],
  ]),
  squares: splitSquares([R, Y, G, B]),
  zigzag: zigzags([R, G, B, Y]),
  chequers: chequers([R, G, B, Y, O, G, R, B]),
  stripes: stripes([R, Y, G, B]),
} satisfies Record<string, Band>

export type QattMuralBand = keyof typeof BAND_DEFS

/** Ready-made band sequences (top to bottom). `wall` is the full repeating mural. */
export const QATT_MURAL_PRESETS = {
  wall: [
    "lines",
    "triangles",
    "lines-ink",
    "diamonds",
    "lines-short",
    "squares",
    "lines",
    "zigzag",
    "lines-ink",
    "chequers",
    "lines",
    "stripes",
  ],
  /** A crown of sprigged triangles between colour lines. */
  frieze: ["lines", "triangles", "lines"],
  /** Nested diamonds between colour lines. */
  diamonds: ["lines", "diamonds", "lines"],
  /** Split squares between colour lines. */
  squares: ["lines", "squares", "lines"],
  /** A lower wall: zigzags, chequers and colour lines. */
  base: ["lines", "zigzag", "lines-ink", "chequers", "lines"],
  /** Just the parallel colour lines (the «قطّ» belt). */
  lines: ["lines"],
} satisfies Record<string, QattMuralBand[]>

export type QattMuralPreset = keyof typeof QATT_MURAL_PRESETS

function layout(bands: QattMuralBand[], gap: number) {
  const defs = bands.map((b) => BAND_DEFS[b])
  const offsets = defs.reduce<number[]>((acc, b) => [...acc, (acc.at(-1) ?? 0) + b.h + gap], [0])
  return { defs, offsets, height: offsets.at(-1) ?? 0 }
}

function useMuralId() {
  return `qatt-mural-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
}

function MuralSvg({
  bands,
  scale,
  gap,
  fixedHeight,
  className,
  style,
  ...props
}: Omit<React.ComponentProps<"svg">, "scale"> & {
  bands: QattMuralBand[]
  scale: number
  gap: number
  fixedHeight: boolean
}) {
  const id = useMuralId()
  const { defs, offsets, height } = layout(bands, gap)
  // A strip draws its bands once, so its last gap is trimmed.
  const tileH = fixedHeight ? height - gap : height
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-slot={fixedHeight ? "qatt-mural-strip" : "qatt-mural"}
      className={cn("pointer-events-none block w-full", !fixedHeight && "h-full", className)}
      style={fixedHeight ? { height: tileH * scale, ...style } : style}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={TW}
          height={tileH}
          patternUnits="userSpaceOnUse"
          patternTransform={scale === 1 ? undefined : `scale(${scale})`}
        >
          <rect width={TW} height={tileH} fill={W} />
          {defs.map((band, i) => (
            <g key={i}>{band.draw(offsets[i] ?? 0)}</g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

export interface QattMuralProps extends Omit<React.ComponentProps<"svg">, "children" | "scale"> {
  /** A preset name or your own band sequence (top to bottom). Default "wall". */
  bands?: QattMuralPreset | QattMuralBand[]
  /** 1 SVG unit = 1px × scale. Default 1. */
  scale?: number
}

function resolveBands(bands: QattMuralProps["bands"]): QattMuralBand[] {
  return typeof bands === "string" ? [...QATT_MURAL_PRESETS[bands]] : (bands ?? [...QATT_MURAL_PRESETS.wall])
}

/** Fills its box with the repeating painted wall. Decorative (aria-hidden); size it with CSS. */
function QattMural({ bands = "wall", scale = 1, ...props }: QattMuralProps) {
  return <MuralSvg bands={resolveBands(bands)} scale={scale} gap={GAP} fixedHeight={false} {...props} />
}

/** One horizontal pass of bands at its natural height (frieze, base, header/footer edge). Decorative. */
function QattMuralStrip({ bands = "frieze", scale = 1, ...props }: QattMuralProps) {
  return <MuralSvg bands={resolveBands(bands)} scale={scale} gap={GAP} fixedHeight {...props} />
}

const NICHE_COLORS = [B, G, Y, R] as const
const NICHE_UNIT = { sm: "2.5px", md: "4px", lg: "5px" } as const

export interface QattNicheProps extends React.ComponentProps<"div"> {
  /** Thickness of the painted frame. Default "md". Override responsively with `--qatt-niche-unit`. */
  frame?: keyof typeof NICHE_UNIT
  /** Frame colours from the inside out; defaults to blue, green, yellow, red. */
  colors?: string[]
}

/** Concentric rings: ink, then each colour separated by gypsum, then an ink edge. */
function nicheShadow(colors: string[]) {
  const ring = (n: number, c: string) => `0 0 0 calc(var(--qatt-niche-unit) * ${n}) ${c}`
  const rings = [ring(0.5, K)]
  let n = 0.5
  colors.forEach((c, i) => {
    n += 1.5
    rings.push(ring(n, c))
    if (i < colors.length - 1) {
      n += 0.75
      rings.push(ring(n, W))
    }
  })
  rings.push(ring(n + 0.75, K))
  return rings.join(", ")
}

/**
 * Niche: a plain gypsum panel framed by concentric painted lines, as around a doorway or window
 * in a qatt wall. The frame is drawn with box-shadows, so it takes no layout space: leave room
 * around the niche (about 10 × the frame unit) inside containers that clip.
 */
function QattNiche({ frame = "md", colors, className, style, ...props }: QattNicheProps) {
  return (
    <div
      data-slot="qatt-niche"
      data-qatt-surface="gypsum"
      className={cn("bg-qatt-white text-foreground", className)}
      style={
        {
          "--qatt-niche-unit": NICHE_UNIT[frame],
          boxShadow: nicheShadow(colors ?? [...NICHE_COLORS]),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { QattMural, QattMuralStrip, QattNiche }
