import * as React from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/qatt/ui/button"
import { QattDivider } from "@/registry/qatt/ui/qatt-divider"
import { QattFrame } from "@/registry/qatt/ui/qatt-frame"

export interface Qatt404Props extends Omit<React.ComponentProps<"section">, "title"> {
  code?: string
  title: string
  body?: string
  homeHref?: string
  homeLabel?: string
  /** Extra links or elements, e.g. search. */
  extra?: React.ReactNode
}

/** «صفحة غير موجودة»: the code inside a painted niche (decorative); the h1 is the sentence, not the number. */
function Qatt404({ code = "404", title, body, homeHref = "/", homeLabel, extra, className, ...props }: Qatt404Props) {
  const id = React.useId()
  return (
    <section aria-labelledby={id} data-slot="qatt-404" className={cn("@container w-full", className)} {...props}>
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6">
        <QattFrame aria-hidden="true" className="w-60" base={false} ratio={4 / 5}>
          <div className="grid size-full place-items-center bg-qatt-white">
            <bdi dir="ltr" className="font-heading text-6xl font-bold text-primary tabular-nums">
              {code}
            </bdi>
          </div>
        </QattFrame>
        <h1 id={id} className="font-heading text-3xl font-bold">
          {title}
        </h1>
        {body && <p className="text-lg text-muted-foreground">{body}</p>}
        <div className="flex flex-wrap justify-center gap-3">
          {homeLabel && (
            <a href={homeHref} className={buttonVariants({ variant: "qatt", size: "lg" })}>
              {homeLabel}
            </a>
          )}
          {extra}
        </div>
        <QattDivider mural="frieze" className="mt-4" />
      </div>
    </section>
  )
}

export { Qatt404 }
