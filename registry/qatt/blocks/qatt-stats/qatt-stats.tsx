"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formatNumber, type MotifId, type Numerals } from "@/registry/qatt/lib/qatt-utils"
import { useReveal } from "@/registry/qatt/hooks/use-reveal"
import { QattPattern } from "@/registry/qatt/ui/qatt-pattern"

export interface QattStat {
  value: number
  label: string
  prefix?: string
  suffix?: string
  /** Intl options, e.g. { maximumFractionDigits: 1 }. */
  format?: Intl.NumberFormatOptions
}

export interface QattStatsProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string
  stats: QattStat[]
  /** Western 0-9 by default (D-008); "arab" for Arabic-Indic digits in decorative contexts. */
  numerals?: Numerals
  background?: MotifId | false
  /** Count up to the value once in view; the final value is in the DOM for screen readers from the start. */
  animate?: boolean
  /** Small note under the figures (e.g. "sample numbers"). */
  note?: string
}

function StatValue({ stat, numerals, animate }: { stat: QattStat; numerals: Numerals; animate: boolean }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useReveal(ref, animate)
  const [shown, setShown] = React.useState(animate ? 0 : stat.value)
  React.useEffect(() => {
    if (!animate || !inView) return
    // reduced motion: the static final value is shown by CSS (motion-reduce:), so don't count at all
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900)
      setShown(stat.value * (1 - Math.pow(1 - t, 3)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [animate, inView, stat.value])

  const fmt = (n: number) => `${stat.prefix ?? ""}${formatNumber(n, { numerals, ...stat.format })}${stat.suffix ?? ""}`
  return (
    <span ref={ref} className="font-heading text-5xl font-bold tabular-nums">
      <bdi className={animate ? "sr-only" : undefined}>{fmt(stat.value)}</bdi>
      {animate && (
        <>
          {/* reduced motion: the final value from the first frame (CSS, no JS wait) */}
          <bdi aria-hidden="true" className="hidden motion-reduce:inline">
            {fmt(stat.value)}
          </bdi>
          <bdi aria-hidden="true" data-qatt-motion="" className="motion-reduce:hidden">
            {fmt(stat.format?.maximumFractionDigits ? shown : Math.round(shown))}
          </bdi>
        </>
      )}
    </span>
  )
}

/** «الأرقام والإحصاءات»: bold figures over a faint balsanah field. */
function QattStats({
  title,
  stats,
  numerals = "latn",
  background = "balsanah",
  animate = false,
  note,
  className,
  ...props
}: QattStatsProps) {
  const id = React.useId()
  const content = (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6">
      {title && (
        <h2 id={id} className="font-heading text-3xl font-bold">
          {title}
        </h2>
      )}
      <dl className="grid gap-6 @xl:grid-cols-2 @4xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-1 border-s-4 border-primary ps-4">
            <dt className="text-muted-foreground">{stat.label}</dt>
            <dd className="m-0">
              <StatValue stat={stat} numerals={numerals} animate={animate} />
            </dd>
          </div>
        ))}
      </dl>
      {note && <p className="text-xs text-muted-foreground">{note}</p>}
    </div>
  )
  return (
    <section
      aria-labelledby={title ? id : undefined}
      data-slot="qatt-stats"
      className={cn("@container w-full", className)}
      {...props}
    >
      {background ? (
        <QattPattern motif={background} opacity={0.08}>
          {content}
        </QattPattern>
      ) : (
        content
      )}
    </section>
  )
}

export { QattStats }
