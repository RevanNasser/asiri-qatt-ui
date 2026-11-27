import * as React from "react"

import { cn } from "@/lib/utils"
import type { QattColor } from "@/registry/qatt/lib/qatt-motifs"
import { QattMotifTile } from "@/registry/qatt/ui/qatt-pattern"

const SIZES = { sm: 16, md: 24, lg: 32 } as const

export interface QattCornerProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** block-inline, logical: "start-start" is top-right in RTL. */
  position?: "start-start" | "start-end" | "end-start" | "end-end"
  motif?: "khatmah" | "taadheeq"
  colors?: QattColor[]
  size?: keyof typeof SIZES | number
  /** px outward (negative = inward). */
  offset?: number
}

/** «زاوية الختمة»: a corner ornament, absolutely positioned inside a `relative` parent. Decorative. */
function QattCorner({
  position = "start-start",
  motif = "khatmah",
  colors,
  size = "md",
  offset = 0,
  className,
  style,
  ...props
}: QattCornerProps) {
  const px = typeof size === "number" ? size : SIZES[size]
  const [block, inline] = position.split("-") as ["start" | "end", "start" | "end"]
  const pos: React.CSSProperties = {
    [block === "start" ? "insetBlockStart" : "insetBlockEnd"]: -offset,
    [inline === "start" ? "insetInlineStart" : "insetInlineEnd"]: -offset,
    inlineSize: px,
    blockSize: px,
  }
  return (
    <span
      aria-hidden="true"
      data-slot="qatt-corner"
      data-position={position}
      className={cn("pointer-events-none absolute z-10 block", className)}
      style={{ ...pos, ...style }}
      {...props}
    >
      <QattMotifTile motif={motif} colors={colors} className="size-full" preserveAspectRatio="xMidYMid meet" />
    </span>
  )
}

export { QattCorner }
