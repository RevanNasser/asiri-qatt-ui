import type { ReactNode } from "react"
import { HomeLayout } from "fumadocs-ui/layouts/home"

import { HomeContainer } from "@/components/site/home-container"
import { SiteFooter } from "@/components/site/site-footer"
import { baseOptions } from "@/lib/layout.shared"
import type { Lang } from "@/lib/i18n"
import { t } from "@/lib/site-copy"

/** Marketing layout (site-ia §2.1): skip link, header, <main id="main">, qatt-footer. */
export function SiteShell({ children, lang = "ar" }: { children: ReactNode; lang?: Lang }) {
  return (
    <HomeLayout {...baseOptions(lang)} slots={{ container: HomeContainer }}>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-background px-3 py-2 focus:not-sr-only focus:fixed focus:start-3 focus:top-3"
      >
        {t("nav.skip", lang)}
      </a>
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        {children}
      </main>
      <SiteFooter lang={lang} />
    </HomeLayout>
  )
}
