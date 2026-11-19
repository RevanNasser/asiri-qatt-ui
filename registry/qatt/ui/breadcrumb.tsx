import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Qatt Breadcrumb: shadcn base-nova Breadcrumb. Default `aria-label` «مسار التنقّل» (ar-glossary).
 * `BreadcrumbSeparator` gains `separator="chevron" | "slash" | "khatmah"`: the chevron points to
 * inline-end (flips in RTL); "khatmah" is a tiny painted diamond; slash never flips (avoid it in Arabic).
 */
function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="مسار التنقّل" data-slot="breadcrumb" className={cn(className)} {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-1", className)} {...props} />
}

function BreadcrumbLink({ className, render, ...props }: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "rounded-sm underline-offset-4 transition-colors outline-none hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  separator = "chevron",
  ...props
}: React.ComponentProps<"li"> & { separator?: "chevron" | "slash" | "khatmah" }) {
  return (
    <li
      data-slot="breadcrumb-separator"
      data-separator={separator}
      role="presentation"
      aria-hidden="true"
      className={cn("inline-flex items-center [&>svg]:size-3.5", className)}
      {...props}
    >
      {children ??
        (separator === "slash" ? (
          <span>/</span>
        ) : separator === "khatmah" ? (
          <span className="mx-0.5 size-1.5 rotate-45 bg-primary" />
        ) : (
          <ChevronRightIcon className="rtl:rotate-180" />
        ))}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  label = "المزيد",
  ...props
}: React.ComponentProps<"span"> & { label?: string }) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      className={cn("flex size-5 items-center justify-center [&>svg]:size-4", className)}
      {...props}
    >
      <MoreHorizontalIcon aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
