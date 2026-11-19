import * as React from "react"

import { cn } from "@/lib/utils"

const TILE_WIDTH = 12
const TILE_HEIGHT = 12

export interface QattDividerProps extends React.ComponentProps<"div"> {
  /**
   * When `true` (default) the band is purely decorative and hidden from
   * assistive technology. Set to `false` to expose it as a separator.
   */
  decorative?: boolean
}

/**
 * A horizontal zigzag band (motif `hanash`) that separates sections.
 * Uses `currentColor`, so colour it with `text-*` utilities.
 * The motif is mirror-safe: it renders identically in RTL and LTR.
 */
function QattDivider({ className, decorative = true, ...props }: QattDividerProps) {
  const patternId = `qatt-divider-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`

  return (
    <div
      data-slot="qatt-divider"
      role={decorative ? "presentation" : "separator"}
      aria-hidden={decorative ? true : undefined}
      aria-orientation={decorative ? undefined : "horizontal"}
      className={cn("my-6 h-3 w-full text-primary", className)}
      {...props}
    >
      <svg className="block size-full" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
        <defs>
          <pattern id={patternId} width={TILE_WIDTH} height={TILE_HEIGHT} patternUnits="userSpaceOnUse">
            <polyline
              points="0,10 6,2 12,10"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinejoin="miter"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}

export { QattDivider }
