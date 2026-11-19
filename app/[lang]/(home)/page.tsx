import type { Metadata } from "next"
import Link from "next/link"
import { AccessibilityIcon, BlocksIcon, GitFork, LanguagesIcon, PaletteIcon, SunMoonIcon } from "lucide-react"

import { ComponentPreview } from "@/components/docs/component-preview"
import { GalleryGrid } from "@/components/docs/gallery"
import { AsirLandscape } from "@/components/site/asir-landscape"
import { resolveRegistryUrl } from "@/lib/registry-url"
import { pageMetadata } from "@/lib/seo"
import { plain, t } from "@/lib/site-copy"
import { source } from "@/lib/source"
import { MajlisWelcome } from "@/registry/qatt/blocks/majlis-welcome/majlis-welcome"
import { QattCta } from "@/registry/qatt/blocks/qatt-cta/qatt-cta"
import { QattFeatureGrid } from "@/registry/qatt/blocks/qatt-feature-grid/qatt-feature-grid"
import { QattHero } from "@/registry/qatt/blocks/qatt-hero/qatt-hero"
import { buttonVariants } from "@/registry/qatt/ui/button"
import { QattDivider } from "@/registry/qatt/ui/qatt-divider"
import { QattPattern } from "@/registry/qatt/ui/qatt-pattern"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/qatt/ui/tabs"

export const metadata: Metadata = pageMetadata({
  title: t("seo.home.title"),
  description: t("seo.home.description"),
  path: "/",
})

// Showcase tabs (site-ia §3): button, card, dialog, login. Labels are the glossary display names.
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
      {/* Hero: rukun band, copy, install command; a motif wall in an arch frame (on gypsum, D-019). */}
      <QattHero
        eyebrow={t("home.hero.eyebrow")}
        title={t("home.hero.title")}
        subtitle={t("home.hero.subtitle")}
        primaryCta={{ label: t("home.hero.cta.primary"), href: "/docs/getting-started" }}
        secondaryCta={{ label: t("home.hero.cta.secondary"), href: "/docs/components" }}
        install={{
          label: t("home.hero.install.label"),
          command: `pnpm dlx shadcn@latest add ${resolveRegistryUrl()}/r/qatt-theme.json`,
          copyLabel: t("docs.copy.command"),
          copiedLabel: t("docs.copied"),
        }}
        align="start"
        media={<QattPattern preset="full" surface="gypsum" scale="sm" className="size-full" />}
        animate
      />
      {/* The Asir horizon: escarpment, fog, terraces and tower houses (illustration, not a motif). */}
      <AsirLandscape className="h-24 sm:h-32 lg:h-40" />

      <QattFeatureGrid
        title={t("home.value.title")}
        features={[
          { title: t("home.value.rtl.title"), body: plain("home.value.rtl.body"), icon: <LanguagesIcon /> },
          { title: t("home.value.shadcn.title"), body: plain("home.value.shadcn.body"), icon: <BlocksIcon /> },
          { title: t("home.value.heritage.title"), body: plain("home.value.heritage.body"), icon: <PaletteIcon /> },
          { title: t("home.value.a11y.title"), body: plain("home.value.a11y.body"), icon: <AccessibilityIcon /> },
          { title: t("home.value.theme.title"), body: plain("home.value.theme.body"), icon: <SunMoonIcon /> },
          { title: t("home.value.open.title"), body: plain("home.value.open.body"), icon: <GitFork /> },
        ]}
      />

      <section aria-labelledby="showcase-title" className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6">
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
