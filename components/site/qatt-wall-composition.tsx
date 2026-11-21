import { cn } from "@/lib/utils"
import { QattMural, QattNiche } from "@/registry/qatt/ui/qatt-mural"
import { QattMotifTile } from "@/registry/qatt/ui/qatt-pattern"

/**
 * A framed piece of painted wall: dense qatt bands around a small gypsum window holding one
 * closing square («الختمة»). A project interpretation; it does not reproduce a specific wall.
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
      <QattNiche frame="sm" className="relative grid size-[44%] place-items-center p-[12%]">
        <QattMotifTile motif="khatmah" className="size-full" />
      </QattNiche>
    </div>
  )
}
