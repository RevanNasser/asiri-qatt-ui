import type { Metadata } from "next"

import { ComponentGarden, type DemoLabels } from "@/components/site/component-garden"
import { copyFor } from "@/lib/site-copy"
import { QattDivider } from "@/registry/qatt/ui/qatt-divider"
import type { Lang } from "@/lib/i18n"

export async function generateMetadata({ params }: PageProps<"/[lang]/demo">): Promise<Metadata> {
  const lang = (await params).lang as Lang
  const { t } = copyFor(lang)
  return { title: `${t("home.showcase.title")} | قَطّ` }
}

export default async function DemoPage({ params }: PageProps<"/[lang]/demo">) {
  const lang = (await params).lang as Lang
  const { t } = copyFor(lang)
  const labels: DemoLabels = {
    badge: t("demo.badge"), ready: t("demo.ready"), heroTitle: t("demo.hero.title"), heroBody: t("demo.hero.body"), frameCaption: t("demo.frame.caption"),
    cardBadge: t("demo.card.badge"), cardTitle: t("demo.card.title"), cardBody: t("demo.card.body"), cta: t("demo.cta"),
    borderTitle: t("demo.border.title"), borderBody: t("demo.border.body"), formTitle: t("demo.form.title"), formName: t("demo.form.name"), formPlaceholder: t("demo.form.placeholder"),
    formTone: t("demo.form.tone"), quiet: t("demo.form.quiet"), warm: t("demo.form.warm"), bright: t("demo.form.bright"), save: t("demo.form.save"),
    overview: t("demo.tabs.overview"), details: t("demo.tabs.details"), principle: t("demo.accordion.principle"), principleBody: t("demo.accordion.principle.body"),
    motion: t("demo.accordion.motion"), motionBody: t("demo.accordion.motion.body"), detailsBody: t("demo.tabs.details.body"), divider: t("demo.divider"),
  }
  return (
    <main className="min-h-screen bg-qatt-jiss">
      <QattDivider mural="frieze" className="my-0" />
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-14 sm:px-6 sm:py-20">
        <header className="max-w-2xl space-y-3 text-start">
          <p className="font-mono text-sm text-qatt-red">/ demo</p>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">{t("home.showcase.title")}</h1>
          <p className="text-lg leading-8 text-muted-foreground">{t("home.showcase.subtitle")}</p>
          <p className="text-sm text-muted-foreground">{t("demo.hover")}</p>
        </header>
        <ComponentGarden labels={labels} />
      </section>
    </main>
  )
}
