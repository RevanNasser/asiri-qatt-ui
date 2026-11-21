import { cn } from "@/lib/utils"
import { QattMural, QattNiche } from "@/registry/qatt/ui/qatt-mural"

/**
 * A framed piece of painted wall: dense qatt bands around a plain gypsum window in concentric
 * painted lines. A project interpretation; it does not reproduce a specific wall.
 */
export function QattWallComposition({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-slot="qatt-wall-composition"
      data-qatt-surface="gypsum"
      className={cn(
        "relative isolate grid aspect-[4/5] place-items-center overflow-hidden border-4 border-qatt-black bg-qatt-white shadow-[8px_8px_0_var(--qatt-red)]",
        className,
      )}
    >
      <QattMural className="absolute inset-0" />
      <QattNiche frame="sm" className="relative size-[44%]" />
    </div>
  )
}
