import type * as React from "react"

import { cn } from "@/lib/utils"
import type { MotifId, QattColor } from "@/registry/qatt/lib/qatt-motifs"
import { QattNiche } from "@/registry/qatt/ui/qatt-mural"
import { QattBand } from "@/registry/qatt/ui/qatt-pattern"

export interface QattFrameProps extends Omit<React.ComponentProps<"figure">, "children"> {
  /** Frame colours, from the inside out. Defaults to a restrained three-colour line frame. */
  colors?: QattColor[]
  /** Optional lower-wall band. It is intentionally off by default. */
  base?: MotifId | false
  /** Aspect ratio (width / height) of the content panel. */
  ratio?: number
  caption?: React.ReactNode
  surface?: "default" | "gypsum"
  children?: React.ReactNode
}

/**
 * «الإطار»: a quiet rectangular focal panel based on painted wall and opening frames.
 * It deliberately does not turn a UI image into an arch or place ornamental caps at its corners.
 * The panel remains readable; an optional base band can be used only when it belongs to the layout.
 */
function QattFrame({
  colors,
  base = false,
  ratio = 3 / 4,
  caption,
  surface = "default",
  className,
  children,
  ...props
}: QattFrameProps) {
  return (
    <figure
      data-slot="qatt-frame"
      data-shape="panel"
      data-qatt-surface={surface === "gypsum" ? "gypsum" : undefined}
      className={cn("relative m-0 flex flex-col gap-3 p-5", className)}
      {...props}
    >
      <QattNiche
        frame="sm"
        colors={colors}
        className="relative w-full overflow-hidden [&>img]:size-full [&>img]:object-cover"
        style={{ aspectRatio: String(ratio) }}
      >
        {children}
      </QattNiche>
      {base && <QattBand aria-hidden="true" motif={base} thickness={12} />}
      {caption && <figcaption className="text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}

export { QattFrame }
