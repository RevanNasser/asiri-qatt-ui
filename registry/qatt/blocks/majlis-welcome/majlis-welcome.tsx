import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/qatt/ui/badge"
import { buttonVariants } from "@/registry/qatt/ui/button"
import { QattDivider } from "@/registry/qatt/ui/qatt-divider"
import { QattFrame } from "@/registry/qatt/ui/qatt-frame"
import { QattMuralStrip } from "@/registry/qatt/ui/qatt-mural"

export type QattCta = { label: string; href: string; variant?: "qatt" | "default" | "outline" | "qatt-outline" }

export interface MajlisWelcomeProps extends Omit<React.ComponentProps<"section">, "title"> {
  eyebrow?: string
  title: string
  body: string
  /** Up to three welcome points. */
  points?: { title: string; body: string; icon?: React.ReactNode }[]
  media?: React.ReactNode
  cta?: QattCta
  /** Small heritage note under the text ("inspired by", see docs). */
  note?: string
}

/** «ترحيب المجلس»: painted frieze, warm heading and body, up to three welcome points, optional framed media. */
function MajlisWelcome({ eyebrow, title, body, points, media, cta, note, className, ...props }: MajlisWelcomeProps) {
  const id = React.useId()
  return (
    <section aria-labelledby={id} data-slot="majlis-welcome" className={cn("@container w-full", className)} {...props}>
      <QattDivider mural="frieze" className="my-0" />
      <div
        className={cn(
          "mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6",
          media && "@4xl:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] @4xl:items-center",
        )}
      >
        <div className="flex flex-col items-start gap-5 text-start">
          {eyebrow && <Badge variant="banat">{eyebrow}</Badge>}
          <h2 id={id} className="font-heading text-3xl font-bold">
            {title}
          </h2>
          <p className="max-w-[65ch] text-lg text-muted-foreground">{body}</p>
          {points && points.length > 0 && (
            <ul className="grid w-full gap-4 @xl:grid-cols-3">
              {points.slice(0, 3).map((point) => (
                <li
                  key={point.title}
                  className="flex flex-col gap-1 overflow-hidden border-2 border-qatt-ink bg-card p-4 pt-0 shadow-[4px_4px_0_var(--qatt-red)]"
                >
                  <QattMuralStrip bands="lines" className="-mx-4 mb-3 w-[calc(100%+2rem)]" />
                  {point.icon && (
                    <span aria-hidden="true" className="mb-1 text-primary [&_svg]:size-5">
                      {point.icon}
                    </span>
                  )}
                  <h3 className="font-heading text-base font-semibold">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.body}</p>
                </li>
              ))}
            </ul>
          )}
          {cta && (
            <a href={cta.href} className={buttonVariants({ variant: cta.variant ?? "qatt", size: "lg" })}>
              {cta.label}
            </a>
          )}
          {note && <p className="text-xs text-muted-foreground">{note}</p>}
        </div>
        {media && <QattFrame className="w-full max-w-xs justify-self-center">{media}</QattFrame>}
      </div>
    </section>
  )
}

export { MajlisWelcome }
