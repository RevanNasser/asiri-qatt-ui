import type { Metadata } from "next"

import { ByLang } from "@/components/site/by-lang"
import { SearchButton } from "@/components/site/search-button"
import { SiteShell } from "@/components/site/site-shell"
import { localePath, type Lang } from "@/lib/i18n"
import { t } from "@/lib/site-copy"
import { Qatt404 } from "@/registry/qatt/blocks/qatt-404/qatt-404"

// not-found.tsx gets no route params, so metadata stays in the default language.
export const metadata: Metadata = {
  title: { absolute: t("seo.404.title") },
  description: t("seo.404.description"),
  robots: { index: false },
}

function NotFoundPage({ lang }: { lang: Lang }) {
  return (
    <SiteShell lang={lang}>
      <Qatt404
        title={t("error.404.title", lang)}
        body={t("error.404.body", lang)}
        homeHref={localePath(lang, "/")}
        homeLabel={t("error.404.cta", lang)}
        extra={<SearchButton label={t("blocks.qatt-404.search", lang)} />}
      />
    </SiteShell>
  )
}

/** 404 (site-ia §10): the qatt-404 block, dogfooded, in the language of the requested URL. */
export default function NotFound() {
  return <ByLang ar={<NotFoundPage lang="ar" />} en={<NotFoundPage lang="en" />} />
}
