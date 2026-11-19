"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { resolveColor, type MotifId, type QattColor } from "@/registry/qatt/lib/qatt-motifs"
import { useReveal } from "@/registry/qatt/hooks/use-reveal"
import { QattBand, QattMotifTile } from "@/registry/qatt/ui/qatt-pattern"

/** Arch outlines in objectBoundingBox units (0..1). Symmetric, so nothing flips in RTL. */
const ARCHES = {
  pointed: "M0 1V0.34C0 0.16 0.3 0.08 0.5 0C0.7 0.08 1 0.16 1 0.34V1Z",
  round: "M0 1V0.4C0 0.12 0.25 0.02 0.5 0.02C0.75 0.02 1 0.12 1 0.4V1Z",
  // project extension (terraces), like the `stepped` motif (D-020)
  stepped: "M0 1V0.3H0.15V0.2H0.3V0.1H0.42V0H0.58V0.1H0.7V0.2H0.85V0.3H1V1Z",
} as const

export interface QattFrameProps extends Omit<React.ComponentProps<"figure">, "children"> {
  shape?: keyof typeof ARCHES
  /** Number of nested arch outlines (3 ≈ sankroli). */
  outline?: 1 | 2 | 3
  /** [outer, inner, base]; defaults: primary red, ink, yellow. */
  colors?: QattColor[]
  /** Base band motif, or false for none. */
  base?: MotifId | false
  /** khatmah caps at the base corners. */
  caps?: boolean
  /** Aspect ratio (width / height) of the content box. */
  ratio?: number
  caption?: React.ReactNode
  /** Draw the arch outline once on first view (off with prefers-reduced-motion). */
  animate?: boolean
  surface?: "default" | "gypsum"
  children?: React.ReactNode
}

/**
 * «إطار القوس»: an arch frame around images or focal content. Content is clipped to the inner arch;
 * the drawing is decorative (aria-hidden). Rendered as <figure>/<figcaption>.
 */
function QattFrame({
  shape = "pointed",
  outline = 2,
  colors,
  base = "kaff",
  caps = true,
  ratio = 3 / 4,
  caption,
  animate = false,
  surface = "default",
  className,
  children,
  ...props
}: QattFrameProps) {
  const id = `qatt-frame-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
  const ref = React.useRef<SVGSVGElement>(null)
  const shown = useReveal(ref, animate)
  const [outer = "red", inner = "ink", baseColor = "yellow"] = colors ?? []
  const path = ARCHES[shape]
  const strokes = [outer, inner, outer].slice(0, outline)
  const INSET = 0.035 // per nested outline, in box units

  return (
    <figure
      data-slot="qatt-frame"
      data-shape={shape}
      data-qatt-surface={surface === "gypsum" ? "gypsum" : undefined}
      className={cn("relative m-0 flex flex-col gap-2", className)}
      {...props}
    >
      <div className="relative w-full" style={{ aspectRatio: String(ratio) }}>
        <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute size-0">
          <defs>
            <clipPath id={id} clipPathUnits="objectBoundingBox">
              <path
                d={path}
                transform={`translate(${INSET * outline} ${INSET * outline}) scale(${1 - 2 * INSET * outline})`}
              />
            </clipPath>
          </defs>
        </svg>
        <div
          className="absolute inset-0 overflow-hidden [&>img]:size-full [&>img]:object-cover"
          style={{ clipPath: `url(#${id})` }}
        >
          {children}
        </div>
        <svg
          ref={ref}
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
        >
          {strokes.map((c, i) => (
            <path
              key={i}
              d={path}
              transform={`translate(${INSET * i} ${INSET * i}) scale(${1 - 2 * INSET * i})`}
              fill="none"
              stroke={resolveColor(c)}
              strokeWidth={i === 0 ? 3 : 2}
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray={animate ? 1 : undefined}
              data-qatt-motion={animate ? "" : undefined}
              className={cn(
                animate &&
                  (shown
                    ? "animate-qatt-draw motion-reduce:animate-none"
                    : "[stroke-dashoffset:1] motion-reduce:[stroke-dashoffset:0]"),
              )}
            />
          ))}
        </svg>
      </div>
      {base && (
        <div aria-hidden="true" className="relative">
          <QattBand motif={base} thickness={16} colors={base === "kaff" ? [outer, inner] : undefined} />
          {caps && (
            <>
              <QattMotifTile
                motif="khatmah"
                colors={[inner, outer, baseColor]}
                className="absolute start-0 top-0 size-4"
              />
              <QattMotifTile
                motif="khatmah"
                colors={[inner, outer, baseColor]}
                className="absolute end-0 top-0 size-4"
              />
            </>
          )}
        </div>
      )}
      {caption && <figcaption className="text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}

export { QattFrame }
