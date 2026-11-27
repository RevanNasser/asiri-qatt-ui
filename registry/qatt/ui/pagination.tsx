import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { type Button, buttonVariants } from "@/registry/qatt/ui/button"
import { QattMarker } from "@/registry/qatt/ui/qatt-pattern"

/**
 * Qatt Pagination: shadcn base-nova Pagination. Arabic defaults from site-copy: «السابق» / «التالي»
 * (nav.prev / nav.next) and `aria-label` «ترقيم الصفحات» (ar-glossary). Previous sits at inline-start with a
 * chevron pointing to inline-start (flips in RTL). Labels stay available to screen readers on small screens.
 * `variant="qatt"` on `Pagination`: the active page is a solid red paint chip. Western digits, tabular.
 * In the qatt variant the shared diamond marker sits below the active page.
 */
function Pagination({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"nav"> & { variant?: "default" | "qatt" }) {
  return (
    <nav
      aria-label="ترقيم الصفحات"
      data-slot="pagination"
      data-variant={variant}
      className={cn("group/pagination mx-auto flex w-full justify-center tabular-nums", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="pagination-content" className={cn("flex items-center gap-0.5", className)} {...props} />
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({ className, isActive, size = "icon", children, ...props }: PaginationLinkProps) {
  // A real link (no role="button"): styled with buttonVariants instead of rendering <Button>.
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
        "relative",
        "group-data-[variant=qatt]/pagination:data-[active=true]:border-2 group-data-[variant=qatt]/pagination:data-[active=true]:border-qatt-ink group-data-[variant=qatt]/pagination:data-[active=true]:bg-primary group-data-[variant=qatt]/pagination:data-[active=true]:text-primary-foreground",
        className,
      )}
      {...props}
    >
      {children}
      {isActive && <QattMarker className="pointer-events-none absolute start-1/2 -bottom-2.5 hidden -ms-1 group-data-[variant=qatt]/pagination:block" />}
    </a>
  )
}

function PaginationPrevious({
  className,
  size = "default",
  text = "السابق",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink size={size} className={cn("ps-2!", className)} {...props}>
      <ChevronLeftIcon data-icon="inline-start" aria-hidden="true" className="rtl:rotate-180" />
      <span className="sr-only sm:not-sr-only">{text}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  size = "default",
  text = "التالي",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink size={size} className={cn("pe-2!", className)} {...props}>
      <span className="sr-only sm:not-sr-only">{text}</span>
      <ChevronRightIcon data-icon="inline-end" aria-hidden="true" className="rtl:rotate-180" />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  label = "صفحاتٌ أخرى",
  ...props
}: React.ComponentProps<"span"> & { label?: string }) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center [&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      <MoreHorizontalIcon aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
