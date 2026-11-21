import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

import { localePath, type Lang } from "@/lib/i18n"
import { t } from "@/lib/site-copy"

/** Top navigation (site-ia §1): brand at inline-start, the section links, and the language switcher. */
export function baseOptions(lang: Lang = "ar"): BaseLayoutProps {
  const tr = (key: Parameters<typeof t>[0]) => t(key, lang)
  const href = (path: string) => localePath(lang, path)
  return {
    nav: { title: <span className="font-heading text-lg font-bold">{tr("nav.brand")}</span>, url: href("/") },
    i18n: true,
    links: [
      { text: tr("nav.home"), url: href("/"), active: "url", on: "menu" },
      { text: tr("nav.docs"), url: href("/docs/getting-started"), active: "url" },
      { text: tr("nav.components"), url: href("/docs/components"), active: "nested-url" },
      { text: tr("nav.blocks"), url: href("/docs/blocks"), active: "nested-url" },
      { text: tr("nav.theme"), url: href("/docs/theme"), active: "url" },
      { text: tr("nav.about"), url: href("/about"), active: "url" },
    ],
    githubUrl: "https://github.com/RevanNasser/asiri-qatt-ui",
  }
}

/** Fumadocs UI strings, mapped onto existing site-copy keys only. */
export const fumadocsTranslationsAr: Record<string, string> = {
  "Search(search trigger)": t("nav.search.placeholder"),
  "Search(search dialog)": t("nav.search.placeholder"),
  "No results found(search dialog)": t("empty.search.title"),
  "On this page(table of contents)": t("nav.onThisPage"),
  "Next Page(pagination)": t("nav.next"),
  "Previous Page(pagination)": t("nav.prev"),
  "Edit on GitHub(edit page)": t("nav.editPage"),
  "Light(theme switcher)(aria-label)": t("nav.theme.light"),
  "Dark(theme switcher)(aria-label)": t("nav.theme.dark"),
  "System(theme switcher)(aria-label)": t("nav.theme.system"),
  "Theme(site menu)": t("nav.theme"),
  "Toggle Theme(theme switcher)(aria-label)": t("nav.theme.toggle"),
  "Toggle Menu(home layout header)(aria-label)": t("nav.menu.open"),
  "Open Search(search trigger)(aria-label)": t("nav.search.placeholder"),
  "Open Sidebar(aria-label)": t("nav.menu.open"),
  "Open Sidebar(sidebar)(aria-label)": t("nav.menu.open"),
  "Close Sidebar(aria-label)": t("nav.menu.close"),
  "Close Sidebar(sidebar)(aria-label)": t("nav.menu.close"),
  "Skip to Content(skip link)": t("nav.skip"),
  "Copy Text(code block)(aria-label)": t("docs.copy"),
  "Copied Text(code block)(aria-label)": t("docs.copied"),
  "Page Not Found(404 not found page)": t("error.404.title"),
  "Back to Home(404 not found page)": t("error.404.cta"),
  "Prop(type table)": t("docs.props.name"),
  "Default(type table)": t("docs.props.default"),
}
