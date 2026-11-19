import { cn } from "@/lib/utils"

/**
 * A decorative Asir horizon: escarpment ridges in fog, and a near slope cut into farming terraces.
 * Project illustration (design-tokens §1 imagery: mountains, terraces, fog). It is NOT a Qatt motif, and it
 * never carries a "motif" caption (D-020). Colours come from theme tokens, so it follows light/dark.
 */
export function AsirLandscape({ className }: { className?: string }) {
  // Terraces: stepped contour lines climbing the near slope (each step = a retaining wall + a field).
  const terraces = Array.from({ length: 7 }, (_, i) => ({ x: 560 + i * 52, y: 226 - i * 13 }))
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1200 240"
      preserveAspectRatio="xMidYMax slice"
      data-slot="asir-landscape"
      className={cn("pointer-events-none block w-full", className)}
    >
      {/* far escarpment */}
      <path
        d="M0 150 L70 118 L130 132 L210 84 L270 104 L340 62 L420 98 L480 80 L560 112 L640 70 L720 96 L800 58 L880 92 L960 74 L1040 104 L1120 86 L1200 110 V240 H0Z"
        className="fill-muted-foreground/15"
      />
      {/* fog over the escarpment */}
      <path d="M0 132 C200 118 380 140 600 126 S1000 118 1200 130 V150 H0Z" className="fill-background/70" />
      {/* middle ridge */}
      <path
        d="M0 190 L90 160 L170 174 L260 140 L350 168 L430 150 L520 176 L610 146 L700 170 L790 152 L880 178 L1000 150 L1100 170 L1200 158 V240 H0Z"
        className="fill-muted-foreground/25"
      />
      {/* near slope cut into terraces: each step is a field behind a retaining wall */}
      <g className="fill-secondary">
        {terraces.map(({ x, y }) => (
          <rect key={x} x={x} y={y} width={1200 - x} height={240 - y} />
        ))}
      </g>
      <g className="stroke-qatt-ink/45" strokeWidth="2" fill="none">
        {terraces.map(({ x, y }) => (
          <path key={x} d={`M${x} ${y}H1200M${x} ${y}V${y + 13}`} />
        ))}
      </g>
      {/* stone tower houses on the ridge line */}
      <g className="fill-qatt-ink/70">
        <rect x="930" y="118" width="18" height="30" />
        <rect x="952" y="110" width="14" height="38" />
        <rect x="972" y="124" width="16" height="24" />
      </g>
      <g className="fill-qatt-white">
        <rect x="934" y="124" width="4" height="4" />
        <rect x="956" y="116" width="4" height="4" />
        <rect x="976" y="130" width="4" height="4" />
      </g>
      {/* the near ground line */}
      <path d="M0 236 H1200" className="stroke-border" strokeWidth="2" />
    </svg>
  )
}
