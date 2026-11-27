import type * as React from "react"

import { cn } from "@/lib/utils"
import type { MotifId, QattColor } from "@/registry/qatt/lib/qatt-motifs"
import { QattBand } from "@/registry/qatt/ui/qatt-pattern"

export interface QattFrameProps extends Omit<React.ComponentProps<"figure">, "children"> {
  /** Frame colours. Only ink and the first accent are used. */
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
 * «الإطار»: a quiet rectangular plaster panel bounded by thin painted rules.
 * It deliberately does not turn a UI image into an arch or place ornamental caps at its corners.
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
  const frameColors = (colors?.filter((color) => color !== "ink").slice(0, 1) ?? []).concat("ink")
  const accentColors = frameColors.length > 1 ? ["ink", frameColors[0]!] : ["ink", "red"]
  return (
    <figure
      data-slot="qatt-frame"
      data-shape="panel"
      data-qatt-surface={surface === "gypsum" ? "gypsum" : undefined}
      className={cn("relative m-0 flex flex-col gap-3 bg-qatt-jiss p-3", className)}
      {...props}
    >
      <QattBand motif="mathalith-makhamis" colors={accentColors} thickness={10} />
      <div className="relative w-full overflow-hidden bg-qatt-jiss [&>img]:size-full [&>img]:object-cover" style={{ aspectRatio: String(ratio) }}>
        {children}
      </div>
      <QattBand motif="mathalith-makhamis" colors={accentColors} thickness={10} />
      {base && (
        <div aria-hidden="true" className="flex flex-col gap-1">
          <QattBand motif="qatt-lines" colors={accentColors} thickness={10} />
          <QattBand motif={base === "kaff" ? "hanash" : base} colors={accentColors} thickness={14} />
          <QattBand motif="kaff" colors={accentColors} thickness={10} />
        </div>
      )}
      {caption && <figcaption className="text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}

export { QattFrame }
