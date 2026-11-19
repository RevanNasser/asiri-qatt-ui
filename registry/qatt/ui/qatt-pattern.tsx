"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  getMotifTile,
  MOTIFS,
  slotStyle,
  type MotifId,
  type MotifVariant,
  type QattColor,
} from "@/registry/qatt/lib/qatt-motifs"
import { revealClasses, useReveal } from "@/registry/qatt/hooks/use-reveal"

export type QattScale = "sm" | "md" | "lg" | "xl" | number
const SCALES = { sm: 0.5, md: 1, lg: 1.5, xl: 2 } as const
export function resolveScale(scale: QattScale = "md"): number {
  return typeof scale === "number" ? scale : SCALES[scale]
}

function useSafeId(prefix: string) {
  return `${prefix}-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
}

export interface QattMotifProps extends Omit<React.ComponentProps<"svg">, "children" | "scale" | "rotate"> {
  motif: MotifId
  variant?: MotifVariant
  colors?: QattColor[]
  ground?: QattColor
  /** 1 SVG unit = 1px × scale. */
  scale?: QattScale
  /** Tile rotation in 90° steps (90/270 for vertical strips; 180 for a downward frieze). */
  rotate?: 0 | 90 | 180 | 270
}

/**
 * Low-level, decorative motif fill: an inline <svg> with one <pattern> that tiles the motif across the
 * element's box, so slot CSS variables (and dark mode) apply. Always aria-hidden, never focusable.
 * Artwork never mirrors in RTL (flipInRtl=false for every motif, D-007).
 */
function QattMotif({ motif, variant, colors, ground, scale, rotate = 0, className, style, ...props }: QattMotifProps) {
  const id = useSafeId("qatt-motif")
  const tile = getMotifTile(motif, variant)
  const s = resolveScale(scale)
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-slot="qatt-motif"
      data-motif={motif}
      className={cn("pointer-events-none block size-full", className)}
      style={{ ...slotStyle(motif, colors, ground), ...style }}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={tile.width * s}
          height={tile.height * s}
          patternUnits="userSpaceOnUse"
          patternTransform={rotate ? `rotate(${rotate})` : undefined}
        >
          <g transform={`scale(${s})`} dangerouslySetInnerHTML={{ __html: tile.markup }} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

export interface QattMotifTileProps extends Omit<React.ComponentProps<"svg">, "children"> {
  motif: MotifId
  variant?: MotifVariant
  colors?: QattColor[]
  ground?: QattColor
}

/** A single motif tile scaled to the element's box (corners, caps, small ornaments). Decorative. */
function QattMotifTile({ motif, variant, colors, ground, className, style, ...props }: QattMotifTileProps) {
  const tile = getMotifTile(motif, variant)
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-slot="qatt-motif-tile"
      data-motif={motif}
      viewBox={`0 0 ${tile.width} ${tile.height}`}
      className={cn("pointer-events-none block", className)}
      style={{ ...slotStyle(motif, colors, ground), ...style }}
      dangerouslySetInnerHTML={{ __html: tile.markup }}
      {...props}
    />
  )
}

/** The catalog wall recipe, bottom to top (project interpretation). */
const WALL_RECIPE: { motif: MotifId; variant?: MotifVariant; gap?: number }[] = [
  { motif: "kaff" },
  { motif: "qatt-lines", gap: 8 },
  { motif: "rukun" },
  { motif: "balsanah" },
  { motif: "mathalith-makhamis" },
  { motif: "hanash" },
]

export interface QattPatternProps extends Omit<React.ComponentProps<"div">, "children"> {
  motif?: MotifId
  variant?: MotifVariant
  colors?: QattColor[]
  ground?: QattColor
  scale?: QattScale
  /** 0..1. Clamped to 0.12 (light) / 0.18 (dark) when `children` are present. */
  opacity?: number
  fade?: "none" | "block-end" | "block-start" | "radial"
  as?: "div" | "section" | "span"
  /** "gypsum" renders a light-theme island (day-wall colours in both modes, D-019). */
  surface?: "default" | "gypsum"
  /** "full" stacks the catalog wall recipe (project interpretation). */
  preset?: "full"
  children?: React.ReactNode
}

const FADES = {
  none: undefined,
  "block-end": "linear-gradient(to bottom, black 55%, transparent)",
  "block-start": "linear-gradient(to top, black 55%, transparent)",
  radial: "radial-gradient(closest-side, black 55%, transparent)",
} as const

/** Repeating Qatt motif background, optionally behind content. Decorative only. */
function QattPattern({
  motif = "balsanah",
  variant,
  colors,
  ground,
  scale = "md",
  opacity = 1,
  fade = "none",
  as: Comp = "div",
  surface = "default",
  preset,
  className,
  style,
  children,
  ...props
}: QattPatternProps) {
  const hasChildren = React.Children.count(children) > 0
  const mask = FADES[fade]
  const layerStyle: React.CSSProperties & Record<string, string | number | undefined> = {
    "--qatt-pattern-opacity": opacity,
    opacity: hasChildren ? "min(var(--qatt-pattern-opacity), var(--qatt-pattern-max))" : opacity,
    maskImage: mask,
    WebkitMaskImage: mask,
  }
  const s = resolveScale(scale)

  return (
    <Comp
      data-slot="qatt-pattern"
      data-motif={preset ? undefined : motif}
      data-preset={preset}
      data-qatt-surface={surface === "gypsum" ? "gypsum" : undefined}
      className={cn(
        "relative isolate block [--qatt-pattern-max:0.12] dark:[--qatt-pattern-max:0.18]",
        !hasChildren && "min-h-16",
        className,
      )}
      style={style}
      {...props}
    >
      {preset === "full" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col-reverse"
          style={layerStyle}
        >
          {WALL_RECIPE.map((band) => (
            <span
              key={band.motif}
              className="block w-full shrink-0"
              style={{ height: MOTIFS[band.motif].height * s, marginBlockStart: (band.gap ?? 0) * s }}
            >
              <QattMotif motif={band.motif} variant={band.variant} scale={s} />
            </span>
          ))}
        </span>
      ) : (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={layerStyle}>
          <QattMotif motif={motif} variant={variant} colors={colors} ground={ground} scale={s} />
        </span>
      )}
      {hasChildren && <span className="relative z-10 block">{children}</span>}
    </Comp>
  )
}

export interface QattBandProps extends Omit<QattMotifProps, "scale"> {
  /** Band thickness in px; the motif is scaled to fit. */
  thickness: number
  orientation?: "horizontal" | "vertical"
  animate?: boolean
}

/** A single motif strip of a given thickness (used by divider, border, frame and component ornaments). */
function QattBand({
  motif,
  variant,
  thickness,
  orientation = "horizontal",
  animate = false,
  className,
  style,
  ...props
}: QattBandProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const shown = useReveal(ref, animate)
  const tile = getMotifTile(motif, variant)
  const vertical = orientation === "vertical"
  return (
    <span
      ref={ref}
      data-slot="qatt-band"
      data-qatt-motion={animate ? "" : undefined}
      className={cn(
        "pointer-events-none block shrink-0",
        vertical ? "h-full" : "w-full",
        revealClasses(animate, shown),
        className,
      )}
      style={{ [vertical ? "inlineSize" : "blockSize"]: thickness, ...style }}
      aria-hidden="true"
    >
      <QattMotif
        motif={motif}
        variant={variant}
        scale={thickness / tile.height}
        rotate={vertical ? 90 : 0}
        {...props}
      />
    </span>
  )
}

export { QattPattern, QattMotif, QattMotifTile, QattBand }
