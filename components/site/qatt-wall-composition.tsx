import { cn } from "@/lib/utils"
import { QattBand, QattMotif } from "@/registry/qatt/ui/qatt-pattern"

/**
 * One original wall composition built as ordered bands, rather than a collection of ornaments.
 * The arrangement is a project interpretation: a quiet gypsum field, then a base, parallel
 * strokes, a triangle band, and one diamond field. It does not claim to reproduce a specific wall.
 */
export function QattWallComposition({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-slot="qatt-wall-composition"
      className={cn(
        "relative isolate overflow-hidden border-2 border-qatt-ink bg-qatt-jiss p-3 shadow-[6px_6px_0_var(--qatt-red)] sm:p-4",
        className,
      )}
    >
      <div className="qatt-wall-layer qatt-wall-step-4 border-x-2 border-qatt-ink bg-qatt-jiss p-3 sm:p-5">
        <div className="qatt-wall-layer qatt-wall-step-4 overflow-hidden border-y-2 border-qatt-ink bg-qatt-jiss">
          <QattBand motif="banat" thickness={28} colors={["var(--qatt-red)", "var(--qatt-green)"]} />
        </div>

        <div className="qatt-wall-layer qatt-wall-step-3 relative mt-3 aspect-[5/3] overflow-hidden border-2 border-qatt-ink bg-qatt-jiss">
          <QattMotif
            motif="balsanah"
            colors={["var(--qatt-blue)", "var(--qatt-yellow)"]}
            ground="var(--qatt-jiss)"
            scale="lg"
            className="absolute inset-0 opacity-95"
          />
          <div className="absolute inset-[16%] border-2 border-qatt-ink bg-qatt-jiss/95" />
          <div className="absolute inset-x-[29%] inset-y-[31%] border-2 border-qatt-red" />
        </div>

        <div className="qatt-wall-layer qatt-wall-step-2 mt-3 overflow-hidden border-y-2 border-qatt-ink bg-qatt-jiss">
          <QattBand motif="rukun" thickness={34} colors={["var(--qatt-red)", "var(--qatt-ink)"]} />
        </div>
        <div className="qatt-wall-layer qatt-wall-step-1 mt-3 overflow-hidden bg-qatt-jiss">
          <QattBand
            motif="qatt-lines"
            thickness={26}
            colors={["var(--qatt-red)", "var(--qatt-yellow)", "var(--qatt-ink)"]}
          />
        </div>
        <div className="qatt-wall-layer qatt-wall-step-0 mt-2 overflow-hidden border-t-2 border-qatt-ink bg-qatt-jiss">
          <QattBand motif="kaff" thickness={32} colors={["var(--qatt-black)", "var(--qatt-red)"]} />
        </div>
      </div>
    </div>
  )
}
