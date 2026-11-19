import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { MotifId } from "@/registry/qatt/lib/qatt-motifs"
import { buttonVariants } from "@/registry/qatt/ui/button"
import { QattBand } from "@/registry/qatt/ui/qatt-pattern"

export type QattCta = { label: string; href: string; variant?: "qatt" | "default" | "outline" | "qatt-outline" }

export interface QattCtaProps extends Omit<React.ComponentProps<"section">, "title"> {
  title: string
  body?: string
  primary: QattCta
  secondary?: QattCta
  /** Band colour. On red/ink the text is gypsum and the primary button becomes yellow paint. */
  tone?: "red" | "ink" | "gypsum"
  /** Crest row motif. */
  motif?: MotifId
}

const TONES = {
  ink: "bg-qatt-black text-qatt-white",
  red: "bg-qatt-red text-qatt-white dark:text-background",
  gypsum: "bg-card text-foreground",
} as const

/** «دعوة إلى العمل»: a closing band in one colour with a crest row. */
function QattCta({
  title,
  body,
  primary,
  secondary,
  tone = "ink",
  motif = "taadheeq",
  className,
  ...props
}: QattCtaProps) {
  const id = React.useId()
  const onPaint = tone !== "gypsum"
  return (
    <section
      aria-labelledby={id}
      data-slot="qatt-cta"
      data-tone={tone}
      className={cn("@container w-full", TONES[tone], className)}
      {...props}
    >
      <QattBand motif={motif} thickness={24} colors={onPaint ? ["yellow", "white"] : undefined} />
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 py-14 text-center sm:px-6">
        <h2 id={id} className="font-heading text-3xl font-bold">
          {title}
        </h2>
        {body && <p className={cn("max-w-2xl text-lg", onPaint ? "opacity-90" : "text-muted-foreground")}>{body}</p>}
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={primary.href}
            className={cn(
              onPaint
                ? buttonVariants({ variant: "painted", tone: "yellow", size: "lg" })
                : buttonVariants({ variant: primary.variant ?? "qatt", size: "lg" }),
            )}
          >
            {primary.label}
            <ArrowRightIcon data-icon="inline-end" aria-hidden="true" className="rtl:rotate-180" />
          </a>
          {secondary && (
            <a
              href={secondary.href}
              className={cn(
                buttonVariants({ variant: secondary.variant ?? "qatt-outline", size: "lg" }),
                onPaint && "border-qatt-white text-inherit hover:bg-qatt-white/10",
              )}
            >
              {secondary.label}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export { QattCta }
