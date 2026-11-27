import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { MotifId } from "@/registry/qatt/lib/qatt-motifs"
import { Card, CardContent, CardHeader } from "@/registry/qatt/ui/card"
import { QattMuralStrip } from "@/registry/qatt/ui/qatt-mural"

export interface QattFeature {
  title: string
  body: string
  icon?: React.ReactNode
  href?: string
}

export interface QattFeatureGridProps extends Omit<React.ComponentProps<"section">, "title"> {
  title: string
  subtitle?: string
  features: QattFeature[]
  columns?: 2 | 3 | 4
  /** Faint motif behind the grid, or false. */
  background?: MotifId | false
  /** Visual "read more" hint on linked cards (the link's name stays the feature title). */
  moreLabel?: string
}

const COLS = {
  2: "@xl:grid-cols-2",
  3: "@xl:grid-cols-2 @4xl:grid-cols-3",
  4: "@xl:grid-cols-2 @4xl:grid-cols-4",
} as const
/** «شبكة المزايا»: calm gypsum cards; the shared wall band belongs to the grid, not every icon. */
function QattFeatureGrid({
  title,
  subtitle,
  features,
  columns = 3,
  background = false,
  moreLabel,
  className,
  ...props
}: QattFeatureGridProps) {
  const id = React.useId()
  const grid = (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6">
      <header className="flex max-w-2xl flex-col gap-2 text-start">
        <h2 id={id} className="font-heading text-3xl font-bold">
          {title}
        </h2>
        {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
      </header>
      <ul className={cn("grid gap-5", COLS[columns])}>
        {features.map((f, i) => (
          <li key={f.title} className="flex">
            <Card
              variant="framed"
              ornament={i === features.length - 1 ? "rukun" : false}
              className="relative w-full has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ring"
            >
              <CardHeader className="gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-8 place-items-center text-qatt-ink [&_svg]:size-5",
                  )}
                >
                  {f.icon}
                </span>
                <h3 className="font-heading text-lg leading-snug font-semibold">
                  {f.href ? (
                    <a
                      href={f.href}
                      className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {f.title}
                    </a>
                  ) : (
                    f.title
                  )}
                </h3>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-muted-foreground">
                <p>{f.body}</p>
                {f.href && moreLabel && (
                  <span aria-hidden="true" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {moreLabel}
                    <ArrowRightIcon className="size-4 rtl:rotate-180" />
                  </span>
                )}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <section
      aria-labelledby={id}
      data-slot="qatt-feature-grid"
      data-background={background || undefined}
      className={cn("@container w-full", className)}
      {...props}
    >
      <QattMuralStrip bands="lines" />
      {grid}
    </section>
  )
}

export { QattFeatureGrid }
