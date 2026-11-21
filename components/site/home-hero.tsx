import Link from "next/link"

import { InstallCommand } from "@/components/site/install-command"
import { QattMural, QattNiche } from "@/registry/qatt/ui/qatt-mural"
import { resolveRegistryUrl } from "@/lib/registry-url"
import { t } from "@/lib/site-copy"
import { buttonVariants } from "@/registry/qatt/ui/button"

/**
 * Home hero as a painted majlis wall: dense qatt bands cover the whole wall and the words
 * sit in a plain gypsum niche framed by concentric colour lines. An original project
 * interpretation — it does not reproduce a specific wall.
 */
export function HomeHero() {
  return (
    <section
      aria-labelledby="home-title"
      data-qatt-surface="gypsum"
      className="relative isolate overflow-hidden border-b-4 border-qatt-black bg-qatt-white text-foreground"
    >
      <QattMural className="qatt-wall-layer qatt-wall-step-0 absolute inset-0 sm:hidden" />
      <QattMural className="qatt-wall-layer qatt-wall-step-0 absolute inset-0 hidden sm:block" scale={1.5} />

      <div className="relative mx-auto flex w-full max-w-6xl justify-center px-7 py-20 sm:px-14 sm:py-28 lg:py-32">
        <QattNiche className="qatt-rise flex w-full max-w-[44rem] flex-col items-center gap-6 px-5 py-10 text-center [--qatt-niche-unit:2.5px]! sm:px-12 sm:py-14 sm:[--qatt-niche-unit:4px]!">
          <p className="inline-flex items-center gap-2 border-y-2 border-qatt-red py-1 text-sm font-medium text-qatt-red">
            {t("home.hero.eyebrow")}
          </p>
          <h1
            id="home-title"
            className="font-heading text-[2.4rem] leading-[1.2] font-bold tracking-tight text-balance text-qatt-black sm:text-6xl"
          >
            {t("home.hero.title")}
          </h1>
          <p className="max-w-[52ch] text-lg leading-8 text-pretty text-muted-foreground sm:text-xl sm:leading-9">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/docs/getting-started" className={buttonVariants({ variant: "qatt", size: "lg" })}>
              {t("home.hero.cta.primary")}
            </Link>
            <Link href="/docs/components" className={buttonVariants({ variant: "qatt-outline", size: "lg" })}>
              {t("home.hero.cta.secondary")}
            </Link>
          </div>
          <InstallCommand
            className="[&>p]:text-center"
            label={t("home.hero.install.label")}
            command={`pnpm dlx shadcn@latest add ${resolveRegistryUrl()}/r/qatt-theme.json`}
            copyLabel={t("docs.copy.command")}
            copiedLabel={t("docs.copied")}
          />
        </QattNiche>
      </div>
    </section>
  )
}
