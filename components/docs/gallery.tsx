import Link from "next/link"

import { GalleryFilter } from "@/components/docs/gallery-filter"
import { examples } from "@/components/docs/examples"
import { source } from "@/lib/source"
import type { Lang } from "@/lib/i18n"
import { t } from "@/lib/site-copy"
import { cn } from "@/lib/utils"

type Kind = "components" | "blocks"

function itemsOf(kind: Kind, lang: Lang) {
  return source
    .getPages(lang)
    .filter((p) => p.slugs[0] === kind && p.slugs.length === 2)
    .map((p) => ({
      name: p.slugs[1]!,
      title: String(p.data.title),
      description: String(p.data.description ?? ""),
      url: p.url,
    }))
}

/** Live, non-interactive thumbnail of an example (inert + aria-hidden; the card link is the only control). */
function Thumbnail({ name, kind }: { name: string; kind: Kind }) {
  const Example = examples[`${name}-demo`]?.component
  if (!Example) return <div className="h-44" />
  return (
    <div
      aria-hidden="true"
      inert
      className="pointer-events-none relative h-44 overflow-hidden bg-background select-none"
    >
      {kind === "blocks" ? (
        <div className="absolute start-0 top-0 w-[1100px] origin-top-left scale-[0.3] rtl:origin-top-right">
          <Example />
        </div>
      ) : (
        <div className="flex size-full scale-90 items-center justify-center p-4">
          <Example />
        </div>
      )}
    </div>
  )
}

/** Gallery cards: live thumbnail, name (one stretched link) and the one-line glossary description. */
export function GalleryGrid({
  kind,
  only,
  headingLevel = 2,
  lang = "ar",
}: {
  kind: Kind
  only?: string[]
  headingLevel?: 2 | 3
  lang?: Lang
}) {
  const items = itemsOf(kind, lang).filter((i) => !only || only.includes(i.name))
  const H = headingLevel === 2 ? "h2" : "h3"
  return (
    <ul
      data-slot="gallery"
      className={cn(
        "not-prose grid gap-6 p-0",
        kind === "blocks" ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {items.map((item) => (
        <li
          key={item.name}
          data-item={item.name}
          data-group={item.name.startsWith("qatt-") ? "ornament" : "core"}
          className="group/card relative flex list-none flex-col overflow-hidden rounded-lg border-2 border-qatt-ink bg-card shadow-painted has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ring group-data-[filter=ornament]/gallery:data-[group=core]:hidden group-data-[filter=core]/gallery:data-[group=ornament]:hidden"
        >
          <Thumbnail name={item.name} kind={kind} />
          <div className="flex flex-col gap-1 border-t-2 border-qatt-ink p-4 text-start">
            <H className="font-heading text-lg font-semibold">
              <Link href={item.url} className="outline-none after:absolute after:inset-0 hover:underline">
                {item.title}
              </Link>
            </H>
            <code dir="ltr" className="self-start text-xs text-muted-foreground">
              {item.name}
            </code>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Component gallery with the «الكل / زخرفية / أساسية» filter (site-ia §5). */
export function ComponentGallery({ lang = "ar" }: { lang?: Lang }) {
  return (
    <GalleryFilter
      labels={{
        all: t("docs.gallery.filter.all", lang),
        ornament: t("docs.gallery.filter.ornament", lang),
        core: t("docs.gallery.filter.core", lang),
      }}
    >
      <GalleryGrid kind="components" lang={lang} />
    </GalleryFilter>
  )
}

export function BlockGallery({ lang = "ar" }: { lang?: Lang }) {
  return <GalleryGrid kind="blocks" lang={lang} />
}
