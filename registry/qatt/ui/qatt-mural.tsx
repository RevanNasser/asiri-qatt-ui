import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Mural: dense, multi-band qatt wall paint.
 * Built from a small, documented vocabulary: parallel colour lines, rows of triangles
 * with branch sprigs, rhombuses, horizontal broken lines and vertical chevrons.
 * The arrangement is an original project interpretation, not a copy of a specific wall.
 */

const R = "var(--qatt-red)"
const Y = "var(--qatt-yellow)"
const G = "var(--qatt-green)"
const B = "var(--qatt-blue)"
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
                <path
                  d={`M${x + 12} ${apex}V${y + 3}M${x + 12} ${y + 10}l-4.5 -5M${x + 12} ${y + 10}l4.5 -5`}
                  {...LINE}
                  fill="none"
                />
              </>
            )}
          </g>
        )
      }),
  }
}

/** Nested diamonds («البلسنة»). */
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
          </g>
        )
      })
    },
  }
}

/** Horizontal broken waves («المحاريب»). */
function mahareeb(colors: string[]): Band {
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

/** Vertical broken lines, usually facing right («سنكرولي»). */
function sankroli(colors: string[]): Band {
  const p = 24
  const h = 42
  return {
    h,
    draw: (y) =>
      Array.from({ length: TW / p }, (_, i) => {
        const x = i * p + 5
        const color = colors[i % colors.length]
        return (
          <path
            key={i}
            d={`M${x} ${y}l12 10-12 10 12 10-12 10`}
            fill="none"
            stroke={color}
            strokeWidth={4}
            strokeLinejoin="miter"
          />
        )
      }),
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
  mahareeb: mahareeb([R, Y, B]),
  sankroli: sankroli([R, K, Y, B]),
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
    "mahareeb",
    "lines",
    "sankroli",
    "lines-ink",
  ],
  /** A crown of sprigged triangles between colour lines. */
  frieze: ["lines", "triangles", "lines"],
  /** Nested diamonds between colour lines. */
  diamonds: ["lines", "diamonds", "lines"],
  /** Horizontal broken lines between colour lines. */
  mahareeb: ["lines", "mahareeb", "lines"],
  /** A lower wall of horizontal and vertical broken lines. */
  base: ["lines", "mahareeb", "lines-ink", "sankroli", "lines"],
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

const NICHE_COLORS = [R, Y, G] as const
const NICHE_UNIT = { sm: "2.5px", md: "4px", lg: "5px" } as const

export interface QattNicheProps extends React.ComponentProps<"div"> {
  /** Thickness of the painted frame. Default "md". Override responsively with `--qatt-niche-unit`. */
  frame?: keyof typeof NICHE_UNIT
  /** Frame colours from the inside out; defaults to blue, green, yellow, red. */
  colors?: string[]
}

/** Restrained painted lines: ink, then colour lines separated by gypsum, then an ink edge. */
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
