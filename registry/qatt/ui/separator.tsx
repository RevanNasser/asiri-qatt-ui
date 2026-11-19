"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

/**
 * Qatt Separator: shadcn base-nova Separator + `variant="qatt"`: three thin parallel rules
 * (al-mathalith, "the triple lines"), drawn with CSS gradients in the ink colour. Symmetric, never flips.
 * TODO(track-2-motifs): `motif` prop (e.g. hanash) lands with the reviewed motif artwork.
 */
function Separator({
  className,
  orientation = "horizontal",
  variant = "default",
  ...props
}: SeparatorPrimitive.Props & { variant?: "default" | "qatt" }) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      data-variant={variant}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        "data-[variant=qatt]:bg-transparent data-[variant=qatt]:text-qatt-ink",
        "data-[variant=qatt]:data-horizontal:h-2 data-[variant=qatt]:data-horizontal:bg-[repeating-linear-gradient(to_bottom,currentColor_0_1px,transparent_1px_3.5px)]",
        "data-[variant=qatt]:data-vertical:w-2 data-[variant=qatt]:data-vertical:bg-[repeating-linear-gradient(to_right,currentColor_0_1px,transparent_1px_3.5px)]",
        className,
      )}
      {...props}
    />
  )
}

export { Separator }
