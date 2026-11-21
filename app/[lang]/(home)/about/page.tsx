import type { Metadata } from "next"
import type { ReactNode } from "react"

import { Copy } from "@/components/site/copy"
import { pageMetadata } from "@/lib/seo"
import { t, type CopyKey } from "@/lib/site-copy"
import { MOTIFS } from "@/registry/qatt/lib/qatt-motifs"
import { QattDivider } from "@/registry/qatt/ui/qatt-divider"
import { QattMotifTile, QattPattern } from "@/registry/qatt/ui/qatt-pattern"

export const metadata: Metadata = pageMetadata({
  title: t("seo.about.title"),
  description: t("seo.about.description"),
  path: "/about",
})

const SOURCES: CopyKey[] = [
  "about.sources.s1",
  "about.sources.s2",
  "about.sources.s3",
  "about.sources.s4",
  "about.sources.s5",
  "about.sources.s6",
  "about.sources.s7",
  "about.sources.s8",
  "about.sources.s9",
]

const VOCABULARY = Object.values(MOTIFS).filter((motif) => motif.aboutVocabulary)

function StorySection({ heading, children }: { heading: CopyKey; children: ReactNode }) {
  return (
    <section className="grid gap-3 text-start md:grid-cols-[minmax(10rem,1fr)_minmax(0,3fr)] md:gap-8">
      <h2 className="font-heading text-2xl font-bold">{t(heading)}</h2>
      <div className="space-y-4 leading-8 text-muted-foreground">{children}</div>
    </section>
  )
}

/** Heritage story page (site-ia §9): original project motifs stay on a gypsum ground (D-019). */
export default function AboutPage() {
  return (
    <>
      <QattPattern motif="mathalith-makhamis" surface="gypsum" scale="md" className="min-h-10 sm:min-h-12" />
      <article className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-14 sm:px-6">
        <header className="max-w-3xl space-y-4 text-start">
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">{t("about.title")}</h1>
          <p className="text-xl leading-9 text-muted-foreground">{t("about.lead")}</p>
        </header>

        <QattDivider motif="qatt-lines" surface="gypsum" />

        <StorySection heading="about.what.heading">
          <p>
            <Copy k="about.what.body" />
          </p>
          <p>
            <Copy k="about.what.name" />
          </p>
        </StorySection>
        <StorySection heading="about.where.heading">
          <p>
            <Copy k="about.where.body" />
          </p>
        </StorySection>
        <StorySection heading="about.context.exterior.heading">
          <p>
            <Copy k="about.context.exterior.body" />
          </p>
          <p className="text-sm">
            <Copy
              k="about.context.exterior.source"
              linkClassName="text-foreground underline underline-offset-4 hover:text-primary"
            />
          </p>
        </StorySection>
        <StorySection heading="about.context.interior.heading">
          <p>
            <Copy k="about.context.interior.body" />
          </p>
          <p className="text-sm">
            <Copy
              k="about.context.interior.source"
              linkClassName="text-foreground underline underline-offset-4 hover:text-primary"
            />
          </p>
        </StorySection>
        <StorySection heading="about.context.clothing.heading">
          <p>
            <Copy k="about.context.clothing.body" />
          </p>
          <p className="text-sm">
            <Copy
              k="about.context.clothing.source"
              linkClassName="text-foreground underline underline-offset-4 hover:text-primary"
            />
          </p>
        </StorySection>
        <StorySection heading="about.who.heading">
          <p>
            <Copy k="about.who.body" />
          </p>
        </StorySection>
        <StorySection heading="about.how.heading">
          <p>
            <Copy k="about.how.body" />
          </p>
          <p>
            <Copy k="about.how.vocab" />
          </p>
          <QattPattern surface="gypsum" className="rounded-lg border p-4">
            <div className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-5">
              {VOCABULARY.map((motif) => (
                <div key={motif.id} className="flex flex-col items-center gap-2 text-center text-sm text-foreground">
                  <QattMotifTile motif={motif.id} className="h-10 w-16" />
                  <span>{motif.arabicName}</span>
                </div>
              ))}
            </div>
          </QattPattern>
          <p className="rounded-md border-s-4 border-qatt-yellow bg-muted p-4 text-sm">
            <Copy k="about.how.note" />
          </p>
        </StorySection>
        <StorySection heading="about.unesco.heading">
          <p>
            <Copy k="about.unesco.body" />
          </p>
          <p>
            <Copy k="about.unesco.official" />
          </p>
        </StorySection>
        <StorySection heading="about.project.heading">
          <p>
            <Copy k="about.project.body" />
          </p>
          <p className="font-medium text-foreground">
            <Copy k="about.project.inspired" />
          </p>
        </StorySection>
        <StorySection heading="about.credit.heading">
          <p>
            <Copy k="about.credit.body" />
          </p>
        </StorySection>
        <StorySection heading="about.asir.heading">
          <p>
            <Copy k="about.asir.intro" />
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {(
              [
                ["about.asir.architecture.title", "about.asir.architecture.body"],
                ["about.asir.folklore.title", "about.asir.folklore.body"],
                ["about.asir.crafts.title", "about.asir.crafts.body"],
              ] as const
            ).map(([title, body]) => (
              <section key={title} className="rounded-lg border bg-card p-4 text-foreground">
                <h3 className="mb-2 font-heading font-semibold">{t(title)}</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  <Copy k={body} linkClassName="text-foreground underline underline-offset-4 hover:text-primary" />
                </p>
              </section>
            ))}
          </div>
          <p className="text-sm">
            <Copy k="about.asir.note" />
          </p>
        </StorySection>
        <StorySection heading="about.sources.heading">
          <p>
            <Copy k="about.sources.intro" />
          </p>
          <ol className="list-decimal space-y-2 pe-5 marker:text-foreground">
            {SOURCES.map((source) => (
              <li key={source}>
                <Copy k={source} linkClassName="text-foreground underline underline-offset-4 hover:text-primary" />
              </li>
            ))}
          </ol>
        </StorySection>
      </article>
    </>
  )
}
