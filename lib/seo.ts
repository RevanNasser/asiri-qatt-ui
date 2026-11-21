import type { Metadata } from "next"

import { resolveRegistryUrl } from "@/lib/registry-url"
import { i18n, localePath, type Lang } from "@/lib/i18n"
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
  lang = "ar",
}: {
  title: string
  description: string
  /** Unprefixed path, e.g. "/about"; it is localized here. */
  path: string
  absolute?: boolean
  lang?: Lang
}): Metadata {
  const url = localePath(lang, path)
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(i18n.languages.map((l) => [l, localePath(l, path)])),
    },
    openGraph: {
      type: "website",
      locale: lang === "ar" ? "ar_SA" : "en_US",
      siteName: t("nav.brand", lang),
      title,
      description,
      url,
    },
    twitter: { card: "summary", title, description },
  }
}
