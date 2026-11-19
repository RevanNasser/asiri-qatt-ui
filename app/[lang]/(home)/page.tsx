import type { Metadata } from "next"
import Link from "next/link"
import { BlocksIcon, LanguagesIcon, PaletteIcon } from "lucide-react"

import { ComponentPreview } from "@/components/docs/component-preview"
import { GalleryGrid } from "@/components/docs/gallery"
import { QattWallComposition } from "@/components/site/qatt-wall-composition"
import { resolveRegistryUrl } from "@/lib/registry-url"
import { pageMetadata } from "@/lib/seo"
import { plain, t } from "@/lib/site-copy"
import { source } from "@/lib/source"
import { MajlisWelcome } from "@/registry/qatt/blocks/majlis-welcome/majlis-welcome"
import { QattCta } from "@/registry/qatt/blocks/qatt-cta/qatt-cta"
import { QattFeatureGrid } from "@/registry/qatt/blocks/qatt-feature-grid/qatt-feature-grid"
import { buttonVariants } from "@/registry/qatt/ui/button"
import { QattDivider } from "@/registry/qatt/ui/qatt-divider"
import { QattPattern } from "@/registry/qatt/ui/qatt-pattern"

export const metadata: Metadata = pageMetadata({
  title: t("seo.home.title"),
  description: t("seo.home.description"),
  path: "/",
})

const HIGHLIGHT_BLOCKS = ["qatt-hero", "majlis-welcome", "qatt-pricing"]

export default function HomePage() {
  const titleOf = (item: string) =>
    String(source.getPages("ar").find((p) => p.url.endsWith(`/${item}`))?.data.title ?? item)

  return (
    <>
      <section aria-labelledby="home-title" data-qatt-surface="gypsum" className="relative overflow-hidden bg-qatt-jiss">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,25rem)] lg:items-center lg:gap-16">
          <div className="flex min-w-0 flex-col items-start gap-5 text-start">
            <p className="font-mono text-xs tracking-[0.08em] text-qatt-red sm:text-sm">{t("home.hero.eyebrow")}</p>
            <h1 id="home-title" className="max-w-[13ch] font-heading text-4xl leading-[1.25] font-bold sm:text-6xl">
              {t("home.hero.title")}
            </h1>
            <p className="max-w-[56ch] text-lg text-muted-foreground">{t("home.hero.subtitle")}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/docs/getting-started" className={buttonVariants({ variant: "qatt", size: "lg" })}>
                {t("home.hero.cta.primary")}
              </Link>
              <Link href="/docs/components" className={buttonVariants({ variant: "qatt-outline", size: "lg" })}>
                {t("home.hero.cta.secondary")}
              </Link>
            </div>
            <div dir="ltr" className="w-full max-w-xl border border-input bg-card px-3 py-2 text-start">
              <p dir="rtl" className="mb-1 text-xs font-medium text-foreground">
                {t("home.hero.install.label")}
              </p>
              <code className="block overflow-x-auto font-mono text-sm whitespace-nowrap">
                {`pnpm dlx shadcn@latest add ${resolveRegistryUrl()}/r/qatt-theme.json`}
              </code>
            </div>
          </div>
          <QattWallComposition className="mx-auto w-full max-w-md lg:max-w-none" />
        </div>
        <QattDivider motif="mathalith-makhamis" thickness="sm" className="my-0" />
      </section>

      <QattFeatureGrid
        title={t("home.value.title")}
        background={false}
        features={[
          { title: t("home.value.rtl.title"), body: plain("home.value.rtl.body"), icon: <LanguagesIcon /> },
          { title: t("home.value.shadcn.title"), body: plain("home.value.shadcn.body"), icon: <BlocksIcon /> },
          { title: t("home.value.heritage.title"), body: plain("home.value.heritage.body"), icon: <PaletteIcon /> },
        ]}
      />

      <section aria-labelledby="showcase-title" className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6">
        <header className="flex flex-col gap-2 text-start">
          <h2 id="showcase-title" className="font-heading text-3xl font-bold">
            {t("home.showcase.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("home.showcase.subtitle")}</p>
        </header>
        <ComponentPreview name="button-demo" item="button" title={titleOf("button")} />
        <QattDivider label={t("docs.blocks.title")} motif="mathalith-makhamis" />
        <p className="text-muted-foreground">{t("docs.blocks.intro")}</p>
        <GalleryGrid kind="blocks" only={HIGHLIGHT_BLOCKS} headingLevel={3} />
        <div className="flex flex-wrap gap-3">
          <Link href="/docs/components" className={buttonVariants({ variant: "qatt-outline" })}>
            {t("home.hero.cta.secondary")}
          </Link>
          <Link href="/docs/blocks" className={buttonVariants({ variant: "qatt-outline" })}>
            {t("nav.blocks")}
          </Link>
        </div>
      </section>

      <MajlisWelcome
        title={t("home.story.title")}
        body={t("home.story.body")}
        cta={{ label: t("home.story.link"), href: "/about", variant: "qatt-outline" }}
        media={<QattPattern motif="sankroli" surface="gypsum" scale="lg" className="size-full" />}
      />

      <QattCta
        title={t("home.cta.title")}
        body={t("home.cta.body")}
        primary={{ label: t("home.cta.button"), href: "/docs/getting-started" }}
      />
    </>
  )
}
