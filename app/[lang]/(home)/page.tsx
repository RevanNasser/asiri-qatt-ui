import Link from "next/link"

import { InstallCommand } from "@/components/docs/install-command"
import { t } from "@/lib/site-copy"
import { QattDivider } from "@/registry/qatt/ui/qatt-divider"

// Phase 3 placeholder landing: structure + copy only. Visual design comes from UX/UI (Phase 5).
export default function HomePage() {
  return (
    <main id="main" className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-16 text-start">
      <p className="text-sm font-medium text-muted-foreground">{t("home.hero.eyebrow")}</p>
      <h1 className="text-4xl leading-tight font-bold">{t("home.hero.title")}</h1>
      <p className="text-lg leading-relaxed text-muted-foreground">{t("home.hero.subtitle")}</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/docs" className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground">
          {t("home.hero.cta.primary")}
        </Link>
        <Link href="/docs/components/qatt-divider" className="rounded-md border border-border px-4 py-2 font-medium">
          {t("home.hero.cta.secondary")}
        </Link>
      </div>
      <QattDivider />
      <section aria-labelledby="install-label" className="flex flex-col gap-3">
        <h2 id="install-label" className="text-lg font-semibold">
          {t("home.hero.install.label")}
        </h2>
        <InstallCommand item="qatt-theme" />
      </section>
    </main>
  )
}
