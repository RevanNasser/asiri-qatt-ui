import type { Metadata } from "next"

import { resolveRegistryUrl } from "@/lib/registry-url"
import { t } from "@/lib/site-copy"

/** Public site origin: SITE_URL, else the registry origin (same deployment, D-003/D-015). */
export function siteUrl(): string {
  return (process.env.SITE_URL?.trim() || resolveRegistryUrl()).replace(/\/+$/, "")
}

/** Per-page metadata: absolute title (copy titles already end with «— قَطّ»), description, canonical, OpenGraph. */
export function pageMetadata({
  title,
  description,
  path,
  absolute = true,
}: {
  title: string
  description: string
  path: string
  absolute?: boolean
}): Metadata {
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ar_SA",
      siteName: t("nav.brand"),
      title,
      description,
      url: path,
    },
    twitter: { card: "summary", title, description },
  }
}
