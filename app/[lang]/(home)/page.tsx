import type { Metadata } from "next"
import Link from "next/link"
import { BlocksIcon, LanguagesIcon, PaletteIcon } from "lucide-react"

import { ComponentPreview } from "@/components/docs/component-preview"
import { GalleryGrid } from "@/components/docs/gallery"
import { HomeHero } from "@/components/site/home-hero"
import { QattWallComposition } from "@/components/site/qatt-wall-composition"
import { pageMetadata } from "@/lib/seo"
import { plain, t } from "@/lib/site-copy"
import { source } from "@/lib/source"
import { QattCta } from "@/registry/qatt/blocks/qatt-cta/qatt-cta"
import { QattFeatureGrid } from "@/registry/qatt/blocks/qatt-feature-grid/qatt-feature-grid"
import { buttonVariants } from "@/registry/qatt/ui/button"
import { QattDivider } from "@/registry/qatt/ui/qatt-divider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/qatt/ui/tabs"

export const metadata: Metadata = pageMetadata({
  title: t("seo.home.title"),
  description: t("seo.home.description"),
  path: "/",
})

// Showcase tabs (site-ia §3): button, card, dialog, login.
const SHOWCASE = [
  { example: "button-demo", item: "button" },
  { example: "card-demo", item: "card" },
  { example: "dialog-demo", item: "dialog" },
  { example: "qatt-login-demo", item: "qatt-login" },
] as const

const HIGHLIGHT_BLOCKS = ["qatt-hero", "majlis-welcome", "qatt-pricing"]

export default function HomePage() {
  const titleOf = (item: string) =>
    String(source.getPages("ar").find((p) => p.url.endsWith(`/${item}`))?.data.title ?? item)

  return (
    <>
      <HomeHero />

      <QattFeatureGrid
        title={t("home.value.title")}
        background={false}
        features={[
          { title: t("home.value.rtl.title"), body: plain("home.value.rtl.body"), icon: <LanguagesIcon /> },
          { title: t("home.value.shadcn.title"), body: plain("home.value.shadcn.body"), icon: <BlocksIcon /> },
          { title: t("home.value.heritage.title"), body: plain("home.value.heritage.body"), icon: <PaletteIcon /> },
        ]}
      />

      <section
        aria-labelledby="showcase-title"
        className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6"
      >
        <header className="flex flex-col gap-2 text-start">
          <h2 id="showcase-title" className="font-heading text-3xl font-bold">
            {t("home.showcase.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("home.showcase.subtitle")}</p>
        </header>
        <Tabs defaultValue={SHOWCASE[0].item} className="min-w-0">
          <TabsList variant="qatt" indicator="strip" className="max-w-full flex-wrap">
            {SHOWCASE.map((s) => (
              <TabsTrigger key={s.item} value={s.item}>
                {titleOf(s.item)}
              </TabsTrigger>
            ))}
          </TabsList>
          {SHOWCASE.map((s) => (
            <TabsContent key={s.item} value={s.item} className="min-w-0">
              <ComponentPreview name={s.example} item={s.item} title={titleOf(s.item)} />
            </TabsContent>
          ))}
        </Tabs>
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

      {/* Story: a painted interior wall beside the words (no arch, per the Asir research note). */}
      <section
        aria-labelledby="story-title"
        data-qatt-surface="gypsum"
        className="border-y-2 border-qatt-ink bg-qatt-jiss"
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16 lg:py-20">
          <div className="flex flex-col items-start gap-5 text-start">
            <h2 id="story-title" className="font-heading text-3xl font-bold sm:text-4xl">
              {t("home.story.title")}
            </h2>
            <p className="max-w-[58ch] text-lg leading-8 text-muted-foreground">{t("home.story.body")}</p>
            <Link href="/about" className={buttonVariants({ variant: "qatt-outline", size: "lg" })}>
              {t("home.story.link")}
            </Link>
          </div>
          <QattWallComposition className="w-full" />
        </div>
      </section>

      <QattCta
        title={t("home.cta.title")}
        body={t("home.cta.body")}
        primary={{ label: t("home.cta.button"), href: "/docs/getting-started" }}
      />
    </>
  )
}
