"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"
import type { MotifId } from "@/registry/qatt/lib/qatt-motifs"
import { QattBand } from "@/registry/qatt/ui/qatt-pattern"

/**
 * Qatt Separator: shadcn base-nova Separator + `variant="qatt"`: three thin parallel rules
 * (al-mathalith, "the triple lines"), drawn with CSS gradients in the ink colour. Symmetric, never flips.
 * `motif` (qatt variant only) swaps the triple rules for a motif band, e.g. "hanash".
 */
function Separator({
  className,
  orientation = "horizontal",
  variant = "default",
  motif,
  ...props
}: SeparatorPrimitive.Props & { variant?: "default" | "qatt"; motif?: MotifId }) {
  const band = variant === "qatt" && motif
  return (
    <SeparatorPrimitive
      data-slot="separator"
      data-variant={variant}
      data-motif={band ? motif : undefined}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        "data-[variant=qatt]:bg-transparent data-[variant=qatt]:text-qatt-ink",
        "data-[variant=qatt]:data-horizontal:h-2 data-[variant=qatt]:data-horizontal:bg-[repeating-linear-gradient(to_bottom,currentColor_0_1px,transparent_1px_3.5px)]",
        "data-[variant=qatt]:data-vertical:w-2 data-[variant=qatt]:data-vertical:bg-[repeating-linear-gradient(to_right,currentColor_0_1px,transparent_1px_3.5px)]",
        "data-motif:bg-none data-motif:data-horizontal:h-3 data-motif:data-vertical:w-3",
        className,
      )}
      {...props}
    >
      {band && (
        <QattBand motif={motif} thickness={12} orientation={orientation === "vertical" ? "vertical" : "horizontal"} />
      )}
    </SeparatorPrimitive>
  )
}

export { Separator }
