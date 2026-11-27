"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { MotifId, MotifVariant, QattColor } from "@/registry/qatt/lib/qatt-motifs"
import { QattMuralStrip, type QattMuralBand, type QattMuralPreset } from "@/registry/qatt/ui/qatt-mural"
import { QattBand } from "@/registry/qatt/ui/qatt-pattern"

const THICKNESS = { sm: 12, md: 24, lg: 40 } as const

export interface QattDividerProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Default "qatt-lines" (the dividing belt of the wall). */
  motif?: MotifId
  variant?: MotifVariant
  colors?: QattColor[]
  thickness?: keyof typeof THICKNESS | number
  orientation?: "horizontal" | "vertical"
  /** `true` (default): hidden from assistive technology (role="none"). `false`: a real separator. */
  decorative?: boolean
  /** Optional centred label: band | label | band. */
  label?: React.ReactNode
  /** Paint reveal from inline-start on first view (off with prefers-reduced-motion). */
  animate?: boolean
  /** "gypsum" renders a light-theme island (D-019). */
  surface?: "default" | "gypsum"
  /**
   * Draw a dense multi-band mural strip instead of a single motif (horizontal only):
   * a preset ("frieze", "diamonds", "mahareeb", "base", "lines") or a band list.
   */
  mural?: QattMuralPreset | QattMuralBand[]
  /** Mural strip scale (1 SVG unit = 1px × scale). Default 1. */
  muralScale?: number
}

/**
 * A motif band between sections, like the «قطّ» belt that divides the majlis wall.
 * Symmetric: nothing flips in RTL; the reveal grows from inline-start.
 */
function QattDivider({
  motif = "qatt-lines",
  variant,
  colors,
  thickness = "sm",
  orientation = "horizontal",
  decorative = true,
  label,
  animate = false,
  surface = "default",
  mural,
  muralScale = 1,
  className,
  ...props
}: QattDividerProps) {
  const t = typeof thickness === "number" ? thickness : THICKNESS[thickness]
  const vertical = orientation === "vertical"
  const band =
    mural && !vertical ? (
      <QattMuralStrip bands={mural} scale={muralScale} />
    ) : (
      <QattBand
        motif={motif}
        variant={variant}
        colors={colors}
        thickness={t}
        orientation={orientation}
        animate={animate}
      />
    )

  return (
    <div
      data-slot="qatt-divider"
      data-orientation={orientation}
      data-qatt-surface={surface === "gypsum" ? "gypsum" : undefined}
      role={decorative ? "none" : "separator"}
      aria-hidden={decorative && !label ? true : undefined}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(vertical ? "self-stretch" : "my-6 w-full", className)}
      {...props}
    >
      {label && !vertical ? (
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          {band}
          <span className="text-sm text-muted-foreground">{label}</span>
          {band}
        </div>
      ) : (
        band
      )}
    </div>
  )
}

export { QattDivider }
