"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "@/lib/utils"

// No green tone: neither gypsum nor charcoal text reaches 4.5:1 on green paint in light mode.
type Tone = "red" | "blue" | "ink" | "yellow" | "orange"

/**
 * Qatt Avatar: shadcn base-nova Avatar + `ring` on `Avatar` (2px pigment ring with a 2px gap) and
 * `tone` on `AvatarFallback` (pigment fill with a contrast-safe text colour). Groups overlap with
 * logical negative margins (`-ms-2`), so they stack correctly in RTL.
 */
function Avatar({
  className,
  size = "default",
  ring = false,
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg"
  ring?: boolean
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-ring={ring || undefined}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        "data-ring:outline-2 data-ring:outline-offset-2 data-ring:outline-primary",
        className,
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full rounded-full object-cover", className)}
      {...props}
    />
  )
}

const toneClasses: Record<Tone, string> = {
  red: "bg-qatt-red text-qatt-white dark:text-background",
  blue: "bg-qatt-blue text-qatt-white dark:text-background",
  ink: "bg-qatt-black text-qatt-white",
  yellow: "bg-qatt-yellow text-qatt-black dark:text-background",
  orange: "bg-qatt-orange text-qatt-black dark:text-background",
}

function AvatarFallback({ className, tone, ...props }: AvatarPrimitive.Fallback.Props & { tone?: Tone }) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      data-tone={tone}
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted font-heading text-sm font-medium text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        tone && toneClasses[tone],
        className,
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute end-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className,
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:not-first:-ms-2",
        className,
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative -ms-2 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge }
