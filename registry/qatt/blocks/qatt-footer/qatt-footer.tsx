import * as React from "react"
import { ExternalLinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { QattMuralStrip } from "@/registry/qatt/ui/qatt-mural"
import { QattBand } from "@/registry/qatt/ui/qatt-pattern"
import { Separator } from "@/registry/qatt/ui/separator"

export interface QattFooterLink {
  label: string
  href: string
  external?: boolean
}

export interface QattFooterProps extends React.ComponentProps<"footer"> {
  brand: React.ReactNode
  tagline?: string
  heritageNote?: string
  columns: { title: string; links: QattFooterLink[] }[]
  bottom?: React.ReactNode
  /** kaff band along the bottom edge. */
  kaff?: boolean
  /** Accessible name of the links navigation. */
  navLabel?: string
  /** Screen-reader suffix for external links, e.g. "(opens in a new window)". */
  externalLabel?: string
}

/** «تذييل الصفحة»: brand, link columns, copyright line, resting on a painted diamond band and kaff base. */
function QattFooter({
  brand,
  tagline,
  heritageNote,
  columns,
  bottom,
  kaff = true,
  navLabel,
  externalLabel,
  className,
  ...props
}: QattFooterProps) {
  return (
    <footer data-slot="qatt-footer" className={cn("@container w-full border-t bg-card", className)} {...props}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pt-12 pb-8 sm:px-6">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,18rem)_1fr]">
          <div className="flex flex-col gap-3 text-start">
            <div className="font-heading text-2xl font-bold">{brand}</div>
            {tagline && <p className="text-muted-foreground">{tagline}</p>}
            {heritageNote && <p className="text-xs text-muted-foreground">{heritageNote}</p>}
          </div>
          <nav aria-label={navLabel} className="grid grid-cols-2 gap-8 @xl:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold">{col.title}</h2>
                <ul className="flex flex-col gap-2 text-sm">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-1 rounded-sm text-muted-foreground underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        {link.label}
                        {link.external && (
                          <>
                            {/* D-014: the external-link arrow never flips */}
                            <ExternalLinkIcon aria-hidden="true" className="size-3.5" />
                            {externalLabel && <span className="sr-only"> {externalLabel}</span>}
                          </>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <Separator variant="qatt" />
        {bottom && (
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
            {bottom}
          </div>
        )}
      </div>
      {kaff && (
        <div aria-hidden="true">
          <QattMuralStrip bands="diamonds" />
          <QattBand motif="kaff" thickness={24} />
        </div>
      )}
    </footer>
  )
}

export { QattFooter }
