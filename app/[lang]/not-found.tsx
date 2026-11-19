import type { Metadata } from "next"

import { SearchButton } from "@/components/site/search-button"
import { SiteShell } from "@/components/site/site-shell"
import { t } from "@/lib/site-copy"
import { Qatt404 } from "@/registry/qatt/blocks/qatt-404/qatt-404"

export const metadata: Metadata = {
  title: { absolute: t("seo.404.title") },
  description: t("seo.404.description"),
  robots: { index: false },
}

/** 404 (site-ia §10): the qatt-404 block, dogfooded. */
export default function NotFound() {
  return (
    <SiteShell>
      <Qatt404
        title={t("error.404.title")}
        body={t("error.404.body")}
        homeLabel={t("error.404.cta")}
        extra={<SearchButton label={t("blocks.qatt-404.search")} />}
      />
    </SiteShell>
  )
}
