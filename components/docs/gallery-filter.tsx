"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type Filter = "all" | "ornament" | "core"

/** Filter buttons; the (server-rendered) cards hide themselves with group-data-[filter=…] CSS. */
export function GalleryFilter({
  labels,
  children,
}: {
  labels: Record<Filter, string>
  children: React.ReactNode
}) {
  const [filter, setFilter] = React.useState<Filter>("all")
  return (
    <div data-filter={filter} className="group/gallery not-prose flex flex-col gap-6">
      <div role="group" className="flex flex-wrap gap-2" data-slot="gallery-filter">
        {(Object.keys(labels) as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "h-9 rounded-md border-2 border-qatt-ink px-3 text-sm font-medium outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              filter === f ? "bg-qatt-ink text-background" : "bg-card hover:bg-muted",
            )}
          >
            {labels[f]}
          </button>
        ))}
      </div>
      {children}
    </div>
  )
}
