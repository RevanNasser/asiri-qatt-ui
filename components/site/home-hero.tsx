import Link from "next/link"

import { InstallCommand } from "@/components/site/install-command"
import { QattMuralStrip } from "@/registry/qatt/ui/qatt-mural"
import { Copy } from "@/components/site/copy"
import { localePath, type Lang } from "@/lib/i18n"
import { copyFor } from "@/lib/site-copy"
import { buttonVariants } from "@/registry/qatt/ui/button"

/**
 * Home hero as a quiet gypsum field: a single painted frieze frames the words rather than
 * turning the whole page into a mural. The dense mural stays in its dedicated component demo.
 * This is an original project interpretation — it does not reproduce a specific wall.
 */
export function HomeHero({ lang = "ar" }: { lang?: Lang }) {
  const { t } = copyFor(lang)
  return (
    <section
      aria-labelledby="home-title"
      data-qatt-surface="gypsum"
      className="relative isolate overflow-hidden border-b-4 border-qatt-black bg-qatt-white text-foreground"
    >
      <QattMuralStrip bands="lines" className="qatt-wall-layer absolute inset-x-0 top-0" />
      <QattMuralStrip bands="frieze" className="qatt-wall-layer absolute inset-x-0 bottom-0" scale={0.9} />

      <div className="relative mx-auto flex w-full max-w-6xl justify-center px-7 py-24 sm:px-14 sm:py-32 lg:py-36">
        <div className="qatt-rise flex w-full max-w-[48rem] flex-col items-center gap-6 text-center">
          <p className="inline-flex items-center gap-2 border-b-2 border-qatt-red pb-1 text-sm font-medium text-qatt-red">
            {t("home.hero.eyebrow")}
          </p>
          <h1
            id="home-title"
            className="font-heading text-[2.4rem] leading-[1.2] font-bold tracking-tight text-balance text-qatt-black sm:text-6xl"
          >
            {/* keep hyphenated names such as "Al-Qatt" on one line, without changing the text */}
            {t("home.hero.title")
              .split(/(\S*-\S*)/)
              .map((part, i) =>
                part.includes("-") ? (
                  <span key={i} className="whitespace-nowrap">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
          </h1>
          <p className="max-w-[52ch] text-lg leading-8 text-pretty text-muted-foreground sm:text-xl sm:leading-9">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={localePath(lang, "/docs/getting-started")}
              className={buttonVariants({ variant: "qatt", size: "lg" })}
            >
              {t("home.hero.cta.primary")}
            </Link>
            <Link
              href={localePath(lang, "/docs/components")}
              className={buttonVariants({ variant: "qatt-outline", size: "lg" })}
            >
              {t("home.hero.cta.secondary")}
            </Link>
          </div>
          <InstallCommand
            className="text-center"
            label={t("home.hero.install.label")}
            command="pnpm dlx shadcn@latest add @qatt/qatt-theme"
            copyLabel={t("docs.copy.command")}
            copiedLabel={t("docs.copied")}
            hint={{
              label: <Copy lang={lang} k="home.hero.install.setup" />,
              href: localePath(lang, "/docs/getting-started"),
            }}
          />
        </div>
      </div>
    </section>
  )
}
