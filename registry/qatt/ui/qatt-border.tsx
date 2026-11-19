"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { MotifId, MotifVariant, QattColor } from "@/registry/qatt/lib/qatt-motifs"
import { QattBand, QattMotifTile } from "@/registry/qatt/ui/qatt-pattern"

const THICKNESS = { sm: 12, md: 24, lg: 40 } as const
type Side = "block-start" | "block-end" | "inline-start" | "inline-end"

export interface QattBorderProps extends React.ComponentProps<"div"> {
  /** top/bottom = block-start/end; block = both; inline = both inline sides; all = four sides. */
  side?: "top" | "bottom" | "block" | "inline" | "all"
  motif?: MotifId
  variant?: MotifVariant
  colors?: QattColor[]
  thickness?: keyof typeof THICKNESS | number
  /** khatmah caps at the inline-start and inline-end of horizontal strips. */
  caps?: boolean
  /** true: strips sit inside the box (padding); false: outside it. */
  inset?: boolean
  animate?: boolean
  surface?: "default" | "gypsum"
}

const SIDES: Record<NonNullable<QattBorderProps["side"]>, Side[]> = {
  top: ["block-start"],
  bottom: ["block-end"],
  block: ["block-start", "block-end"],
  inline: ["inline-start", "inline-end"],
  all: ["block-start", "block-end", "inline-start", "inline-end"],
}

/**
 * A decorated frame of motif strips around content. The top strip is upright, the bottom strip is turned
 * 180° (triangles point into the content, like a frieze above a door), inline strips are turned 90°.
 * Positions are logical; the artwork never mirrors in RTL. Purely decorative.
 */
function QattBorder({
  side = "block",
  motif = "rukun",
  variant,
  colors,
  thickness = "md",
  caps = false,
  inset = true,
  animate = false,
  surface = "default",
  className,
  style,
  children,
  ...props
}: QattBorderProps) {
  const t = typeof thickness === "number" ? thickness : THICKNESS[thickness]
  const sides = SIDES[side]
  const off = inset ? 0 : -t
  const pad = inset ? t + 8 : undefined // keep children's focus outlines clear of the strips
  const padding: React.CSSProperties = {
    paddingBlockStart: sides.includes("block-start") ? pad : undefined,
    paddingBlockEnd: sides.includes("block-end") ? pad : undefined,
    paddingInlineStart: sides.includes("inline-start") ? pad : undefined,
    paddingInlineEnd: sides.includes("inline-end") ? pad : undefined,
  }

  const strip = (s: Side) => {
    const horizontal = s.startsWith("block")
    const pos: React.CSSProperties = horizontal
      ? { insetInline: 0, [s === "block-start" ? "insetBlockStart" : "insetBlockEnd"]: off, blockSize: t }
      : { insetBlock: 0, [s === "inline-start" ? "insetInlineStart" : "insetInlineEnd"]: off, inlineSize: t }
    return (
      <span key={s} aria-hidden="true" className="pointer-events-none absolute" style={pos} data-side={s}>
        <QattBand
          motif={motif}
          variant={variant}
          colors={colors}
          thickness={t}
          orientation={horizontal ? "horizontal" : "vertical"}
          animate={animate}
          className={cn(s === "block-end" && "rotate-180")}
          {...(s === "inline-end" ? { rotate: 270 as const } : {})}
        />
        {caps && horizontal && (
          <>
            <QattMotifTile motif="khatmah" className="absolute start-0 top-0" style={{ inlineSize: t, blockSize: t }} />
            <QattMotifTile motif="khatmah" className="absolute end-0 top-0" style={{ inlineSize: t, blockSize: t }} />
          </>
        )}
      </span>
    )
  }

  return (
    <div
      data-slot="qatt-border"
      data-side={side}
      data-qatt-surface={surface === "gypsum" ? "gypsum" : undefined}
      className={cn("relative", className)}
      style={{ ...padding, ...style }}
      {...props}
    >
      {sides.map(strip)}
      {children}
    </div>
  )
}

export { QattBorder }
