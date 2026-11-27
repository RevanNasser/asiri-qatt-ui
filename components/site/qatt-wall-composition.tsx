import { cn } from "@/lib/utils"
import { QattMuralStrip } from "@/registry/qatt/ui/qatt-mural"

/**
 * A quiet wall study: gypsum carries the space, and the painted vocabulary stays at the base.
 * It is a project interpretation; it does not reproduce a specific wall.
 */
export function QattWallComposition({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-slot="qatt-wall-composition"
      data-qatt-surface="gypsum"
      className={cn(
        "relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden border-2 border-qatt-black bg-qatt-jiss",
        className,
      )}
    >
      <div className="absolute inset-x-[14%] top-[17%] h-px bg-qatt-ink/35" />
      <div className="absolute inset-x-[22%] top-[30%] h-px bg-qatt-ink/20" />
      <QattMuralStrip bands="base" scale={0.9} />
    </div>
  )
}
