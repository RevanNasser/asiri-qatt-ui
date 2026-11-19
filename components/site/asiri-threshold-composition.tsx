import { cn } from "@/lib/utils"

import { QattWallComposition } from "@/components/site/qatt-wall-composition"

/**
 * An original threshold illustration that keeps two visual languages separate:
 * a restrained exterior facade and a painted interior wall. It is not a depiction
 * of a particular village, house, or historic wall.
 */
export function AsiriThresholdComposition({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-slot="asiri-threshold-composition"
      className={cn("grid gap-3 bg-qatt-jiss p-2 sm:grid-cols-[.72fr_1fr] sm:p-3", className)}
    >
      <div className="relative overflow-hidden border-2 border-qatt-ink bg-qatt-jiss shadow-[4px_4px_0_var(--qatt-brown)]">
        <svg viewBox="0 0 230 330" className="block h-full min-h-64 w-full" preserveAspectRatio="xMidYMid meet">
          <rect width="230" height="330" fill="var(--qatt-jiss)" />
          {/* Flat roof and a restrained, stepped parapet. */}
          <path d="M19 72h20V55h19v17h18V55h19v17h19V55h19v17h19V55h19v17h20v22H19z" fill="var(--qatt-brown)" />
          <path d="M20 88h190v222H20z" fill="var(--qatt-brown)" stroke="var(--qatt-ink)" strokeWidth="3" />
          {/* Structured horizontal stone courses, intentionally quiet and regular. */}
          <g stroke="var(--qatt-jiss)" strokeOpacity=".45" strokeWidth="3">
            <path d="M21 124h188M21 161h188M21 198h188M21 235h188M21 272h188" />
          </g>
          {/* Small, rectangular openings: white surrounds and blue shutters. */}
          <g stroke="var(--qatt-jiss)" strokeWidth="6">
            <rect x="45" y="127" width="34" height="43" fill="var(--qatt-blue)" />
            <rect x="151" y="127" width="34" height="43" fill="var(--qatt-blue)" />
            <rect x="97" y="191" width="36" height="43" fill="var(--qatt-blue)" />
          </g>
          <g stroke="var(--qatt-jiss)" strokeWidth="2" opacity=".85">
            <path d="M62 130v37M48 148h28M168 130v37M154 148h28M115 194v37M100 212h30" />
          </g>
          {/* A simple, recessed geometric entry — deliberately not an arch. */}
          <path d="M71 310v-49h87v49" fill="var(--qatt-ink)" stroke="var(--qatt-jiss)" strokeWidth="4" />
          <path d="M115 262v48" stroke="var(--qatt-jiss)" strokeWidth="3" opacity=".7" />
          <path d="M19 311h191" stroke="var(--qatt-red)" strokeWidth="5" />
        </svg>
      </div>

      <QattWallComposition className="min-w-0 shadow-[4px_4px_0_var(--qatt-red)]" />
    </div>
  )
}
