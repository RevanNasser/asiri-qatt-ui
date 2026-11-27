"use client"

import * as React from "react"
import { ArrowRightIcon, CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { MotifId } from "@/registry/qatt/lib/qatt-motifs"
import { Badge } from "@/registry/qatt/ui/badge"
import { Button, buttonVariants } from "@/registry/qatt/ui/button"
import { QattDivider } from "@/registry/qatt/ui/qatt-divider"
import { QattFrame } from "@/registry/qatt/ui/qatt-frame"
import { QattMural, QattNiche } from "@/registry/qatt/ui/qatt-mural"

export type QattCta = { label: string; href: string; variant?: "qatt" | "default" | "outline" | "qatt-outline" }

export interface QattHeroProps extends Omit<React.ComponentProps<"section">, "title"> {
  eyebrow?: string
  title: string
  subtitle?: string
  primaryCta?: QattCta
  secondaryCta?: QattCta
  /** Shown LTR with a copy button when copyLabel/copiedLabel are given. */
  install?: { label?: string; command: string; copyLabel?: string; copiedLabel?: string }
  /** Top band motif. */
  motif?: MotifId
  align?: "center" | "start"
  /** "plain" (default): content on gypsum with edge friezes. "mural" is an explicit marketing treatment. */
  background?: "mural" | "plain"
  /** Shown in an arch frame at inline-end on large screens (with align="start"). */
  media?: React.ReactNode
  animate?: boolean
}

function CopyCommand({
  command,
  copyLabel,
  copiedLabel,
}: {
  command: string
  copyLabel?: string
  copiedLabel?: string
}) {
  const [copied, setCopied] = React.useState(false)
  return (
    <div dir="ltr" className="flex items-center gap-2 rounded-md border border-input bg-card py-1 ps-3 pe-1 text-start">
      <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm whitespace-nowrap">{command}</code>
      {copyLabel && (
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={copyLabel}
          onClick={() => {
            void navigator.clipboard?.writeText(command).then(() => {
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            })
          }}
        >
          {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
        </Button>
      )}
      <span role="status" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </div>
  )
}

/** On the mural, the copy sits in a framed gypsum niche; otherwise in a plain column. */
function HeroPanel({
  onWall,
  className,
  children,
}: {
  onWall: boolean
  className?: string
  children: React.ReactNode
}) {
  return onWall ? (
    <QattNiche className={cn("[--qatt-niche-unit:2.5px]! @xl:[--qatt-niche-unit:4px]!", className)}>
      {children}
    </QattNiche>
  ) : (
    <div className={className}>{children}</div>
  )
}

/** «الواجهة الرئيسية»: a painted wall with the copy in a niche (or friezes only), eyebrow, h1, subtitle, CTAs, optional install command, qatt-lines band. */
function QattHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  install,
  motif = "rukun",
  align = "center",
  media,
  background = "plain",
  animate = false,
  className,
  ...props
}: QattHeroProps) {
  const id = React.useId()
  const centered = align === "center"
  const onWall = background === "mural"
  return (
    <section
      aria-labelledby={id}
      data-slot="qatt-hero"
      data-background={background}
      data-qatt-surface={onWall ? "gypsum" : undefined}
      className={cn("@container relative isolate w-full overflow-hidden", onWall && "bg-qatt-white", className)}
      {...props}
    >
      {onWall ? (
        <QattMural className="absolute inset-0" scale={1.25} />
      ) : (
        <QattDivider motif={motif} mural="frieze" animate={animate} className="my-0" />
      )}
      <div
        className={cn(
          "relative mx-auto grid max-w-6xl gap-14 px-4 py-16 sm:px-6",
          onWall && "px-8 py-20 sm:px-12",
          !centered && media && "@4xl:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] @4xl:items-center",
        )}
      >
        <HeroPanel
          onWall={onWall}
          className={cn(
            "flex min-w-0 flex-col gap-5",
            onWall && "px-6 py-10 @xl:px-12",
            centered ? "mx-auto w-full max-w-3xl items-center text-center" : "items-start text-start",
          )}
        >
          {eyebrow && <Badge variant="qatt">{eyebrow}</Badge>}
          <h1 id={id} className="font-heading text-4xl leading-tight font-bold sm:text-5xl">
            {title}
          </h1>
          {subtitle && <p className="max-w-[60ch] text-lg text-muted-foreground">{subtitle}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap gap-3">
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className={buttonVariants({ variant: primaryCta.variant ?? "qatt", size: "lg" })}
                >
                  {primaryCta.label}
                  <ArrowRightIcon data-icon="inline-end" aria-hidden="true" className="rtl:rotate-180" />
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className={buttonVariants({ variant: secondaryCta.variant ?? "qatt-outline", size: "lg" })}
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
          {install && (
            <div className="flex w-full max-w-xl flex-col gap-2">
              {install.label && <p className="text-sm font-medium">{install.label}</p>}
              <CopyCommand command={install.command} copyLabel={install.copyLabel} copiedLabel={install.copiedLabel} />
            </div>
          )}
        </HeroPanel>
        {!centered && media && <QattFrame className="hidden w-full @4xl:flex">{media}</QattFrame>}
      </div>
      {!onWall && <QattDivider mural="lines" className="my-0" />}
    </section>
  )
}

export { QattHero }
