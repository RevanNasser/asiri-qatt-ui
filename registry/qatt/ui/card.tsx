import * as React from "react"

import { cn } from "@/lib/utils"
import type { MotifId } from "@/registry/qatt/lib/qatt-motifs"
import { QattMuralStrip } from "@/registry/qatt/ui/qatt-mural"
import { QattBand, QattMotifTile } from "@/registry/qatt/ui/qatt-pattern"

/**
 * Qatt Card: shadcn base-nova Card (same parts and `size`) + `variant="painted"` (2px ink border + flat
 * painted shadow) and `variant="framed"` (2px ink border + painted colour lines on the top edge with khatmah caps).
 * `ornament` adds a top-edge motif strip to any variant (framed defaults to "mural"). Decorative only.
 */
function Card({
  className,
  size = "default",
  variant = "default",
  ornament,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm"
  variant?: "default" | "painted" | "framed"
  /** A motif strip on the top edge, "mural" for the multi-colour painted lines, or false. */
  ornament?: MotifId | "mural" | false
}) {
  const strip = ornament ?? (variant === "framed" ? "mural" : false)
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      data-ornament={strip || undefined}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-lg bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg",
        "data-[variant=painted]:border-2 data-[variant=painted]:border-qatt-ink data-[variant=painted]:shadow-[var(--shadow-painted)] data-[variant=painted]:ring-0",
        "data-[variant=framed]:border-2 data-[variant=framed]:border-qatt-ink data-[variant=framed]:ring-0",
        "relative data-ornament:pt-[calc(var(--card-spacing)+16px)] data-[ornament=mural]:pt-[calc(var(--card-spacing)+24px)]",
        className,
      )}
      {...props}
    >
      {strip && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0">
          {strip === "mural" ? <QattMuralStrip bands="lines" /> : <QattBand motif={strip} thickness={12} />}
          {variant === "framed" && (
            <>
              <QattMotifTile motif="khatmah" className="absolute start-0 top-0 size-3" />
              <QattMotifTile motif="khatmah" className="absolute end-0 top-0 size-3" />
            </>
          )}
        </span>
      )}
      {children}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-lg px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading text-lg leading-snug font-semibold group-data-[size=sm]/card:text-base", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-description" className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-(--card-spacing)", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center rounded-b-lg border-t bg-muted/50 p-(--card-spacing)", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
